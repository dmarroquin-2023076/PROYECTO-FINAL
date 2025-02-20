import express from "express"
import cors from 'cors'
import helmet from "helmet"
import morgan from "morgan"

<<<<<<< HEAD
import userRouter from '../src/user/user.routes.js'
import productRoutes from '../src/product/product.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
import authRoutes from '../src/auth/auth.routes.js'
=======
import productRoutes from '../src/product/product.routes.js'
import categoryRoutes from '../src/category/category.routes.js'
>>>>>>> 942d1ff36ca37759fe6cb9a9dd5edc24833cdb23

const configs = (app)=>{
    app.use(express.json())
    app.use(express.urlencoded({extended:false}))
    app.use(cors())
    app.use(helmet())
    app.use(morgan('dev'))
}

const routes = (app)=>{
    app.use('/v1/product', productRoutes)
    app.use('/v1/category', categoryRoutes)
<<<<<<< HEAD
    app.use('/v1/user', userRouter)
    app.use('/v1',authRoutes)
=======
>>>>>>> 942d1ff36ca37759fe6cb9a9dd5edc24833cdb23
}



export const initServer = ()=>{
    const app = express()
    try {
        configs(app)
        routes(app)
        app.listen(process.env.PORT)
        console.log(`Server running in port ${process.env.PORT}`);
    } catch (error) {
        console.error(`Server init failed`,error);
        
    }
}