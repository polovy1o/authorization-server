import bcrypt from 'bcryptjs'
import {randomBytes} from 'crypto'

class Crypto {
    passwordSymbols = '_@#$!abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

    get passwordSymbols() {
        return this.passwordSymbols;
    }

    async hashPassword(password) {
        return await bcrypt.hash(password, 7)
    }

    async comparePasswords(password, passwordHash) {
        return await bcrypt.compare(password, passwordHash)
    }

    async randomCode(id) {
        const code = await bcrypt.hash(randomBytes(6).toString('hex') + id, 6)
        return Buffer.from(code).toString('hex')
    }

    generatePasswordLength() {
        const min = 8;
        const max = 11;
        return Math.floor(min + Math.random() * (max + 1 - min));
    }

    generatePassword(length = this.generatePasswordLength()) {
        let password = "";
        
        while (length) {
            const randIndex = Math.floor(Math.random() * (this.passwordSymbols.length + 1))
            password += this.passwordSymbols[randIndex]
            --length;
        }

        return password;
    }
}

const CryptoUtil = new Crypto()

export default CryptoUtil;