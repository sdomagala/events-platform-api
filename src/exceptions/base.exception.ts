
class BaseException extends Error {
    private code: number
    private returnMessage: string
    constructor(code: number, message: string) {
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