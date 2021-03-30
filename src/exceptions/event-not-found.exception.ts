import { BaseException } from "./base.exception"

class EventNotFoundException extends BaseException {
    constructor() {
        super(404, 'Event not found')
    }
}

export { EventNotFoundException }