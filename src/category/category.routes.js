import {Router} from "express"
import { /*categoryDelete,*/ getAll, getCategory, saveCategory, updateCategory } from "./category.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"


const api = Router()

api.post(
    '/save',validateJwt, isAdmin, saveCategory
)

api.get(
    '/get/:id',validateJwt, isAdmin, getCategory
)

api.get(
    '/getAll',validateJwt, isAdmin, getAll
)

api.put(
    '/:id', validateJwt, isAdmin, updateCategory
)

// api.delete(
//     '/:id', categoryDelete
// )
export default api