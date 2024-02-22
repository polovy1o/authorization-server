import ValidationError from "../errors/ValidationError.js"

function ErrorHandlerMiddleware(err, req, res, next) {
    return res.status(err.status || 500).json({
        message: err.message || 'Невідома помилка на сервері',
        details: process.env.NODE_ENV === 'production' && !(err instanceof ValidationError)? undefined : err.details
    })
}

export default ErrorHandlerMiddleware