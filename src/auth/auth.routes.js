//Rutas de autenticación
import { Router } from "express"
import { 
    login,
    register,  
} from "./auth.controler.js"
import { registerValidator } from "../../middlewares/validators.js"


const api = Router()

api.post(
    '/register', 
    registerValidator,
    register,

)

api.post('/login', login)



//Exporto las rutas
export default api