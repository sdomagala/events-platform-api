import { BaseException } from "./base.exception"

class ForbiddenException extends BaseException {
    constructor(message: string) {
        super(403, message)
    }
}

export { ForbiddenException }