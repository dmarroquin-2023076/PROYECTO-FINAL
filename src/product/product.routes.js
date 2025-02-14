import { Router } from "express"
import { bestSellers, getAll, getProduct, saveProduct, stockProduct, updateProduct } from "./product.controller.js"


const api = Router()
api.post(
    '/save', saveProduct
)

api.get(
    '/get', getAll
)

api.get(
    '/get/:id', getProduct
)

api.put(
    '/update/:id', updateProduct
)

api.get('/stockProduct', stockProduct

)

api.get('/bestSellers', bestSellers)

export default api