import { Router } from "express"
import { bestSellers, deleteProduct, getAll, getProduct, saveProduct, stockProduct, updateProduct } from "./product.controller.js"
import { isAdmin, validateJwt } from "../../middlewares/validate.jwt.js"


const api = Router()
api.post(
    '/save', validateJwt, isAdmin, saveProduct
)

api.get(
    '/get', validateJwt, getAll
)

api.get(
    '/get/:id', validateJwt, getProduct
)

api.put(
    '/update/:id',validateJwt, updateProduct
)

api.get('/stockProduct',validateJwt, stockProduct

)

api.get('/bestSellers',validateJwt, bestSellers)

api.delete('/:id',validateJwt, deleteProduct)

export default api