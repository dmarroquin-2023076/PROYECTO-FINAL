import { Router } from "express"
import { bestSellers, deleteProduct, getAll, getProduct, getProductsByCategory, saveProduct, searchProductsByName, stockProduct, updateProduct } from "./product.controller.js"
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

api.get('/stockProduct',validateJwt, stockProduct)

api.get('/productos/categoria/:categoryName', validateJwt, getProductsByCategory)

api.get('/bestSellers',validateJwt, bestSellers)

api.delete('/:id',validateJwt, isAdmin, deleteProduct)

api.get('/productos/buscar/:name', validateJwt, searchProductsByName)


export default api