
import jwt from 'jsonwebtoken'
import { ForbiddenException } from '../exceptions/forbidden.exception'
import { UnauthorizedException } from '../exceptions/unauthorized.exception'
const secret = '34963a67-8795-4bfd-9010-1c9cc5b3ef8c'

export interface JWTUser {
    userId: number
}

async function createToken(userId: number): Promise<string> {
    const payload = {
        userId
    }
    console.log('Payload to generate token', payload)
    return new Promise(resolve => jwt.sign(payload, secret, { expiresIn: '1h' }, (err, val) => {
        if (err || !val) {
            // TODO: exception
            throw new Error(`Token sign failed. Reason: ${err ? err.message : 'Empty value received'}`)
        }
        resolve(val)
    }))
}

async function validateToken(token: string): Promise<JWTUser> {
    return new Promise(resolve => jwt.verify(token, secret, (err, val) => {
        if (err || !val) {
            // TODO: unauthorized exception
            throw new UnauthorizedException(`Token sign failed. Reason: ${err ? err.message : 'Empty value received'}`)
        }
        if (isValidJWTUser(val)) {
            resolve(val)
        } else {
            throw new ForbiddenException('Not valid user payload')
        }
    }))
}

function isValidJWTUser(val: any): val is JWTUser {
    return !!(val.userId && !isNaN(val.userId))
}

export {
    createToken,
    validateToken
}

