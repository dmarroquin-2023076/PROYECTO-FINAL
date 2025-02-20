import Product from './product.model.js'
import Category from '../category/category.model.js'
import User from '../user/user.model.js'

export const saveProduct = async(req, res)=>{
    try {
        const data = req.body
       
        const category = await Category.findById(data.category)
        if (!category) {
            return res.status(404).send(
                {
                success: false,
                message: 'Product not found'
            }
        )
        }
       
        // const user = await User.findOne(
        //     {
        //         _id: data.keeper,
        //          role: 'ADMIN'
        //      }
        //  )

        // if(!user) return res.status(403).send(
        //     {
        //         success:false,
        //         message:'keeper not found or acces denied'
        // }
        // )
        
        const newProduct = new Product(data)
        
        await newProduct.save()
        return res.send({
            success: true,
            message: `Saved product`
        })
        
    } catch (e) {
        console.error(e)
        return res.status(500).send({
                success:false,
                message:'General error',
                e
            })
    }
}

export const getAll = async(req, res)=>{
    const{ limit, skip } = req.query
    try {
        const products = await Product.find()
            .populate(
                {
                    path: 'category',
                    select: 'name -_id'
                }
            )
            .skip(skip)
            .limit(limit)
        if(products.length === 0){
            return res.statis(404).send(
                {
                    success:false,
                    message: 'Products not fpund'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Products found:',
                total: products.length,
                products
            }
        )

    }catch(e){
        console.error(e)
        return res.status(500).send(
            {
                success: false,
                message: 'General error when adding products',
                e
            }
        )
    }
}

export const getProduct = async (req, res) => {
    try {
        let { id } = req.params

        let product = await Product.findById(id)
            .populate(
                {
                path: 'category',
                select: 'name -_id'
                }
            )

       
        if (!product) {
            return res.status(404).send(
                {
                success: false,
                message: 'Product not found'
                }
            )
        }

        return res.send(
            {
            success: true,
            message: 'Product found',
            product
            }
        )

    } catch (e) {
        console.error(e)
        return res.status(500).send(
            {
            success: false,
            message: 'General error',
            error: e
            }
        )
    }
}


export const updateProduct = async(req, res)=>{
    try{
        const { id } = req.params

        const data = req.body

        const update = await Product.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'Product not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Product updated',
                product: update
            }
        )
    } catch (e) {
        console.error('General error', e)
        return res.status(500).send({
                success: false,
                message:'General error',
                e
            })
    }
}

export const stockProduct = async(req, res)=>{
    try {
        const stockProduct = await Product.find(
            { 
                stock: 0
            }
        )

        if(stockProduct.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    messsage: 'There are no products out of stock'
                }
            )
        }
        return res.send({
            success: true,
            message: 'Out of stock products are:',
            product: stockProduct
        })
        
    } catch (e) {
        console.error('General error', e)
        return res.status(500).send({
                success: false,
                message:'General error',
                e
            })
    }
}

export const bestSellers = async(req, res)=>{
    try {
        const bestSellers = await Product.find()
            .sort({ sales: -1}) //Orden descendente en las ventas
            .limit(10) //Fija limite en productos mostrados
            .select("name sales stock") //Campos que queremos que se muestren

        if(!bestSellers.length){
            return res.status(404).send(
                {
                    success: false,
                    messsage: "No hay productos vendidos"
                }
            )
        }
        return res.send({
            success: true,
            message: 'Los productosmas vendidos son',
            product: bestSellers
        }
    )

    } catch (e) {
        console.error('General error', e)
        return res.status(500).send({
                success: false,
                message:'General error',
                e
            })
    }
}
