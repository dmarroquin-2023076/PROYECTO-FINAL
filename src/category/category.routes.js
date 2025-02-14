import {Router} from "express"
import { categoryDelete, getAll, getCategory, saveCategory, updateCategory } from "./category.controller.js"


const api = Router()

api.post(
    '/save', saveCategory
)

api.get(
    '/get/:id', getCategory
)

api.get(
    '/getAll', getAll
)

api.put(
    '/:id', updateCategory
)

api.delete(
    '/:id', categoryDelete
)
export default api