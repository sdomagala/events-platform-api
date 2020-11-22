import { BaseException } from "./base.exception"

class UnauthorizedException extends BaseException {
    constructor(message) {
        super(401, message)
    }
}

export { UnauthorizedException }