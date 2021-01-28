
import jwt from 'jsonwebtoken'
import { UnauthorizedException } from '../exceptions/unauthorized.exception'
const secret = '34963a67-8795-4bfd-9010-1c9cc5b3ef8c'

async function createToken(userId): Promise<string> {
    const payload = {
        userId
    }
    console.log('Payload to generate token', payload)
    return new Promise(resolve => jwt.sign(payload, secret, { expiresIn: '1h' }, (err, val) => {
        if (err) {
            // TODO: exception
            throw new Error(`Token sign failed. Reason: ${err.message}`)
        }
        resolve(val)
    }))
}

async function validateToken(token) {
    return new Promise(resolve => jwt.verify(token, secret, (err, val) => {
        if (err) {
            // TODO: unauthorized exception
            throw new UnauthorizedException(`Token sign failed. Reason: ${err.message}`)
        }
        resolve(val)
    }))
}

export {
    createToken,
    validateToken
}

