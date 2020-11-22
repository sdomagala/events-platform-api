
class BaseException extends Error {
    private code
    private returnMessage
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

export { BaseException }