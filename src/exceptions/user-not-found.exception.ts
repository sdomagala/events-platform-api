import { BaseException } from "./base.exception"

class UserNotFoundException extends BaseException {
    constructor() {
        super(404, 'User not found')
    }
}

export { UserNotFoundException }