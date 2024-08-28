import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { ConfigService } from '@nestjs/config';
import deMail from './mails/demail';
import enMail from './mails/enmail';

@Injectable()
export class MailerService {
    private transporter: nodemailer.Transporter;

    constructor(private configService: ConfigService) {
        const smtpHost = this.configService.get<string>('SMTP_HOST');
        const smtpPort = parseInt(this.configService.get<string>('SMTP_PORT') || '0', 10);

        this.transporter = nodemailer.createTransport({
            host: smtpHost,
            port: smtpPort,
            secure: false,
            auth: {
                user: this.configService.get<string>('SMTP_USER'),
                pass: this.configService.get<string>('SMTP_PASS'),
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
    }

    async sendPartialPriv(email: string, vaddr: string, partialPriv: string, language: string) {
        let mailContent;
        let subject;

        if (language === '/en' || language === undefined) {
            mailContent = await enMail(vaddr, partialPriv);
            subject = 'Vanity Address Generator - Your address was calculated';
        } else if (language === '/de') {
            mailContent = await deMail(vaddr, partialPriv);
            subject = 'Vanity Adressen Generator - Deine Vanity Adresse wurde gefunden';
        }

        const info = await this.transporter.sendMail({
            from: '"₿itcoin-Uni.de" <info@bitcoin-uni.de>',
            to: email,
            bcc: this.configService.get<string>('VANITY_BBC_EMAIL'),
            subject: subject,
            text: mailContent?.mailtext,
            html: mailContent?.mailHTML,
        });

        console.info(`Calculated keys sent by Email to ${email}`);
        return info;
    }
}
