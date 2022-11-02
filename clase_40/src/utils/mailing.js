import nodemailer from 'nodemailer'
import {config} from '../configs/config.js'

export default class MailingService{
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: config.NODEMAILER.EMAIL,
                pass: config.NODEMAILER.PASSWORD
            }
        });
    }

    async sendMail ({from, to, subject, html}) {
        let result = await this.transporter.sendMail({
            from, to, subject, html
        })
        return result
    }
}