import nodemailer from 'nodemailer';

class Email {
    constructor(){
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
            secure: false,
            tls: {
                rejectUnauthorized: false
            }
        });
    }

    async sendRegisterLink(email, code, firstName) {
        const options = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: process.env.BRAND_NAME + ' Активація облікового запису',
            html: `
                <h1>Ласкаво просимо, ${firstName}!</h1>
                Для активації вашого облікового запису перейдіть за посиланням:
                <a href="${process.env.CLIENT_URL + 'register/' + code}">
                    ${process.env.CLIENT_URL + 'register/' + code}
                </a>
            `
        }
        return await this.transporter.sendMail(options);
    }

    async sendPasswordLink(email, code, firstName) {
        const options = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: process.env.BRAND_NAME + ' Зміна паролю',
            html:  `
                <h1>Новий пароль</h1>
                <br>Щоб встановити новий пароль, перейдіть за посиланням:
                <a href="${process.env.CLIENT_URL + 'reset/' + code}">${process.env.CLIENT_URL + 'reset/' + code}</a>
                <br><br><strong>Якщо ви не відправляли запит на зміну паролю - ігноруйте цей лист</strong>
            `
        }
        return await this.transporter.sendMail(options);
    }
}

const EmailUtil = new Email()

export default EmailUtil;