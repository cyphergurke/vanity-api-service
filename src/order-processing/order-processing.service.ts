import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { spawn } from 'child_process';
import { existsSync, readFileSync } from 'fs';
import { ConfigService } from '@nestjs/config';
import { MailerService } from 'src/mailer/mailer.service';
import { OrderService } from 'src/order/order.service';
import axios from 'axios';

@Injectable()
export class OrderProcessingService implements OnModuleInit {

    private readonly logger = new Logger(OrderProcessingService.name);
    private vanitySearchPath: string;
    private outputDir: string;
    private threads: string;

    constructor(
        private configService: ConfigService,
        private mailerService: MailerService,
        private orderService: OrderService
    ) {
        this.vanitySearchPath = this.configService.get<string>('VANITY_SEARCH_PATH');
        this.outputDir = this.configService.get<string>('VANITY_SEARCH_OUT_TXT_PATH');
        this.threads = this.configService.get<string>('THREADS');
    }

    onModuleInit() {
        this.processNextOrder();
    }

    private async handleBookingFile(order: any) {
        const bookingFile = `${this.outputDir}/${order._id}.txt`;
        if (existsSync(bookingFile)) {
            try {
                const data = readFileSync(bookingFile, 'utf8');
                const lines = data.split(/\r?\n/);
                const vaddr = lines[0].split(' ')[1];
                const partialPriv = lines[1].split(' ')[1];

                this.logger.log(`bookingId #${order._id} --> pubaddr: ${vaddr} && partialPriv: ${partialPriv}`);
                await this.orderService.findOneAndUpdate(
                    { _id: order._id },
                    { $set: { vanityAddr: vaddr, partialPriv: partialPriv, status: 'COMPLETED' } },
                );

                if (order.callback_url) {
                    await axios.post(order.callback_url, { _id: order._id, vaddr, partialPriv })
                }

                if (order.email) {
                    await this.mailerService.sendPartialPriv(order.email, vaddr, partialPriv, order.language);
                }

                if (order.lnurl) {
                    this.logger.log('LNURL');
                }
            } catch (err) {
                this.logger.error(err);
            }
        } else {
            this.logger.log(`Couldn’t find file ${bookingFile}`);
        }
    }

    private async startVanitySearch(order: any) {

        if (!this.vanitySearchPath) {
            this.logger.error('VanitySearch path is not defined in the environment variables.');
            return;
        }

        const getCurrentOrderStatusInterval = setInterval(async () => {
            const currentOrder = await this.orderService.findOrderById(order._id);
            order = currentOrder;
            if (currentOrder.status === 'COMPLETED') {
                await vanityProcess.kill('SIGTERM');
                this.processNextOrder();
                clearInterval(getCurrentOrderStatusInterval);
            }
        }, 15000);

        let args: string[] = [];
        args.push('-stop');
        args.push('-t', this.threads.toString());
        args.push('-sp', order.publickey);
        if (order.casesensitive === 0) args.push('-c');
        args.push('-o', `${this.outputDir}/${order._id}.txt`);
        args.push(order.addrtype + order.prefixstr);

        const vanityProcess = spawn(this.vanitySearchPath, args);
        let outputCounter = 0;
        vanityProcess.stdout.on('data', async (data: any) => {
            const dataString = data.toString();
            if (dataString.includes('Mkey/s')) {
                outputCounter++;
                if (outputCounter % 5 === 0) {
                    const elements = dataString.split('[');
                    const desiredElements = elements.slice(1, 6).map((element: any) => `[${element.trim()}`);
                    this.logger.log(desiredElements);
                    await this.orderService.findOneAndUpdate(
                        { _id: order._id },
                        { $set: { progress: desiredElements } },
                    );
                }
            } else {
                outputCounter = 0;
            }
        });

        vanityProcess.stderr.on('data', (data) => {
            this.logger.error(`stderr: ${data}`);
        });

        vanityProcess.on('close', async (code) => {
            clearInterval(getCurrentOrderStatusInterval);
            this.logger.log(`child process exited with code ${code}`);
            if (code === 0) {
                await this.handleBookingFile(order);
            } else {
                await this.orderService.findOneAndUpdate(
                    { _id: order._id, status: { $ne: 'COMPLETED' } },
                    { $set: { status: 'ERROR' } },
                    { sort: { createdAt: 1 }, returnDocument: 'after' },
                );
            }
            this.processNextOrder();
        });
    }

    private async getOrders() {
        let order = await this.orderService.findOneAndUpdate(
            { status: { $in: ['PAID', 'QUEUED'] } },
            { $set: { status: 'COMPUTING' } },
            { sort: { createdAt: 1 }, returnDocument: 'after' },
        );
        if (!order) {
            order = await this.orderService.findOneAndUpdate(
                { status: { $in: ['COMPUTING'] } },
                { $set: { status: 'COMPUTING' } },
                { sort: { createdAt: 1 }, returnDocument: 'after' },
            );
        }
        return order;
    }

    public async processNextOrder() {
        let order = await this.getOrders();
        if (!order) {
            const getOrderInterval = setInterval(async () => {
                order = await this.getOrders();
                if (order) {
                    clearInterval(getOrderInterval);
                    await this.startVanitySearch(order);
                }
            }, 5000);
        } else {
            this.logger.log(`Processing order #${order}`);
            await this.startVanitySearch(order);
        }
    }
}
