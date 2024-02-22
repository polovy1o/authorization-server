class ValidationError extends Error {
    constructor(details) {
        super()
        this.message = 'Validation error'
        this.status = 400
        this.details = details
    }
}

export default ValidationError