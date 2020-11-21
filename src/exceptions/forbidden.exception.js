const { BaseException } = require("./base.exception");

class ForbiddenException extends BaseException {
    constructor(message) {
        super(403, message)
    }
}

module.exports = { ForbiddenException }