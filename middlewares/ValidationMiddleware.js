import { validationResult } from "express-validator"
import ValidationError from "../errors/ValidationError.js";

function formatter({msg, param}) {
    return { field: param, message: msg }
}

function ValidationMiddleware(req, res, next) {
    try {
        if (req.method === 'OPTIONS') {
            return next()
        }
    
        let errors = validationResult(req).formatWith(formatter);
    
        if (!errors.isEmpty()) {
            next(new ValidationError(errors.array()))
            return;
        } 
    
        next()
    } catch (err) {
        next(err)
    }
}

export default ValidationMiddleware