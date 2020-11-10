const { BaseException } = require("./base.exception");

class InvalidCredentialsException extends BaseException {
    constructor() {
        super(401, 'Email or password does not exist')
    }
}

module.exports = { InvalidCredentialsException }