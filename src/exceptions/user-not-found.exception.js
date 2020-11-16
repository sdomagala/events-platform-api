const { BaseException } = require("./base.exception");

class UserNotFoundException extends BaseException {
    constructor() {
        super(404, 'User not found')
    }
}

module.exports = { UserNotFoundException }