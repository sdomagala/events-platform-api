import { BaseException } from "./base.exception"

class UserAlreadyExistsException extends BaseException {
    constructor() {
        super(400, 'User already exists')
    }
}

export { UserAlreadyExistsException }