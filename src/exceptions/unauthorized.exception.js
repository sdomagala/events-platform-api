const { BaseException } = require("./base.exception");

class UnauthorizedException extends BaseException {
    constructor(message) {
        super(401, message)
    }
}

module.exports = { UnauthorizedException }