import axios from "axios";

export const getBTCInvoice = async (id: any, amount: any) => {

    try {
        const options = {
            method: 'POST',
            url: 'https://api.opennode.com/v1/charges',
            headers: {
                accept: 'application/json', 'Content-Type': 'application/json',
                authorization: process.env.OPENNODE_KEY
            },
            data: {
                amount: amount,
                currency: 'EUR',
                description: `Vanity Address Order: ${id}`,
                /*  customer_name: 'User Name',
                 customer_email: 'User email ', */
                order_id: id,
                callback_url: `${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${id}`,
                success_url: `${process.env.NEXT_PUBLIC_API_URL}/api/btc/paid/${id}`,
                auto_settle: true,
                split_to_btc_bps: 0,
                ttl: 30
            }
        };
        const response = await axios.request(options)
        return response.data.data
    } catch (error: any) {
        console.log(error.message)
    }
}