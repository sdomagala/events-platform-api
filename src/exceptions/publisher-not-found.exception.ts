import { BaseException } from "./base.exception"

export class PublisherNotFoundException extends BaseException {
    constructor() {
        super(404, 'Publisher not found')
    }
}