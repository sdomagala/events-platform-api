
class BaseException extends Error {
    constructor(code, message) {
        super(`${code}: ${message}`)
        this.code = code
        this.returnMessage = message
    }

    getErrorDetails() {
        return { 
            code: this.code,
            message: this.returnMessage
        }
    }
}

module.exports = { BaseException }