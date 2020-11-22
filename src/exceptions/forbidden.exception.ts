import { BaseException } from "./base.exception"

class ForbiddenException extends BaseException {
    constructor(message) {
        super(403, message)
    }
}

export { ForbiddenException }