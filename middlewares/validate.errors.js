import { validationResult } from "express-validator"



export const validateErrors = (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        // Mapea los errores para devolver solo los mensajes
        const errorMessages = errors.array().map(err => err.msg);

        return res.status(400).send({
            success: false,
            message: 'Error with validations',
            errors: errorMessages // Devuelve un array de mensajes de error
        })
    }
    next()
}

export const validateErrorsWithoutFiles = (req, res, next)=>{
    const errors = validationResult(req)
    console.log(validationResult(req))
    if(!errors.isEmpty()){
        return res.status(400).send(
            {
                success: false,
                message: 'Error with validations',
                errors: errors.errors
            }
        )
    }
    next()
}