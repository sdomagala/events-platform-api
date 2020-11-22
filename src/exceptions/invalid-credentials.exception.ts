import { BaseException } from "./base.exception"

class InvalidCredentialsException extends BaseException {
    constructor() {
        super(401, 'Email or password does not exist')
    }
}

export { InvalidCredentialsException }