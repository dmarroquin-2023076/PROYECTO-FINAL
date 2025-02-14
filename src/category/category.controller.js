import Category from './category.model.js'
import Product from '../product/product.model.js'
//crear categoria 

export const saveCategory = async (req, res)=>{
    try {
        let data = req.body
        
        let newCategory = new Category(data)

        await newCategory.save()

        return res.send({
                message:`Saved category`
        })

    } catch (e) {
        console.error(e)
        return res.status(500).send({
                message:'General error',
                e
            })
    }
}

// Obtener una categoria
export const getCategory = async(req, res)=>{
    try {
        let { id } = req.params
        
        let category = await Category.findById(id)

        if(!category) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Category found:',
                category
            }
        )

    } catch (e) {
        console.error(e)
        return res.status(500).send({
                message:'General error',
                e
            })
    }
}

//Obtener todas las categorias

export const getAll = async(req,res)=>{
    try{
        const { limit = 20, skip = 0 } = req.query

        const categories = await Category.find()
            .skip(skip)
            .limit(limit)
            
        if(categories.length === 0){
            return res.status(404).send(
                {
                    success: false,
                    message: 'Categories not found'
                }
            )
        }
        return res.send(
            {
                success: true,
                message: 'Categories found:', 
                categories
            }   
        )
    } catch (e) {
        console.error(e)
        return res.status(500).send({
                message:'General error',
                e
            })
    }
}

//Acxtualizar datos

export const updateCategory = async(req, res)=>{
    try{
        const { id } = req.params

        const data = req.body

        const update = await Category.findByIdAndUpdate(
            id,
            data,
            {new: true}
        )

        if(!update) return res.status(404).send(
            {
                success: false,
                message: 'Category not found'
            }
        )
        return res.send(
            {
                success: true,
                message: 'Category updated',
                category: update
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


export const categoryDelete = async (request, response) => {
    try {
        let { id } = request.params;

        // Buscar la categoría que se va a eliminar
        const categoryToDelete = await Category.findById(id);
        if (!categoryToDelete) {
            return response.status(404).send({
                success: false,
                message: 'Category not found'
            });
        }

        // Definir la categoría predeterminada (asegúrate de que esta categoría exista en tu base de datos)
        const defaultCategory = await Category.findOne({ name: 'unika' }); // Cambia 'Default Category' por el nombre de tu categoría predeterminada
        if (!defaultCategory) {
            return response.status(500).send({
                success: false,
                message: 'Default category not found'
            });
        }

        // Actualizar todos los productos que pertenecen a la categoría que se está eliminando
        await Product.updateMany(
            { category: id }, // Filtrar productos que pertenecen a la categoría eliminada
            { category: defaultCategory._id } // Asignar la categoría predeterminada
        );

        // Eliminar la categoría
        let deleteCategory = await Category.findByIdAndDelete(id);
        
        return response.status(200).send({
            success: true,
            message: 'Category deleted successfully',
            deleteCategory
        });
    } catch (e) {
        console.error(e);
        return response.status(500).send({
            success: false,
            message: 'General error',
            error: e
        });
    }
};