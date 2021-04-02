import { BaseException } from "./base.exception"

class AttendeeNotFoundException extends BaseException {
    constructor() {
        super(404, 'Attendee not found')
    }
}

export { AttendeeNotFoundException }