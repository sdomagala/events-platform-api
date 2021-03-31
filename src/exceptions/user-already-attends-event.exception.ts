import { BaseException } from "./base.exception"

class UserAlreadyAttendsEvent extends BaseException {
    constructor() {
        super(400, 'User already attends given event')
    }
}

export { UserAlreadyAttendsEvent }