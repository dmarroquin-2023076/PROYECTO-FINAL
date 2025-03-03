import Cart from '../cart/cart.model.js'
import Product from '../product/product.model.js'

export const addToCart = async (req, res) => {
    try {
        const { productName } = req.body
        const userId = req.user.uid

        if (!userId) {
            return res.status(400).send({ message: 'User  ID is required' })
        }

        // Buscar el producto por su nombre para obtener su id y que no se vea tan mal
        const product = await Product.findOne({ name: productName })
        if (!product) {
            return res.status(404).send({ message: 'Product not found' })
        }

        let cart = await Cart.findOne({ userId })

        if (cart) {
            // Buscar si el producto ya esta
            const existingProduct = cart.products.find(item => item.productId.equals(product._id))

            if (existingProduct) {
                // Si el producto ya existe, solo incrementa el prdocut
                existingProduct.quantity += 1// Incrementar en 1
            } else {
                // si el producto no esta en el carrito agrega
                cart.products.push({ 
                    productId: product._id, 
                    productName: product.name, // Guardar el nombre opcionalmente
                    quantity: 1 // Inicializar la cantidad en 1
                })
            }
            await cart.save()
        } else {
            
            const newCart = new Cart({
                userId,
                products: [{ 
                    productId: product._id, 
                    productName: product.name,
                    quantity: 1 // Sino aprece undefinied
                }]
            })
            await newCart.save()
        }

        return res.send({ message: 'Product added to cart' })
    } catch (error) {
        console.error(error)
        return res.status(500).send({ message: 'Error adding to cart', error })
    }
}