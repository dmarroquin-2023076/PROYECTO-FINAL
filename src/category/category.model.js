import { Schema, model } from 'mongoose'

const categorySchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required']
        },
        description: {
            type: String,
            required: [true, 'Description is required'],
            minLength: [5, 'Description must be at least 5 characters long'], 
            maxLength: [100, 'Description must be at most 100 characters long']
        },
    },
    {
        versionKey: false, // Deshabilitar el __v (Versión del documento)
        timestamps: true // Agrega propiedades de fecha (Fecha de creación y de última actualización)
    }
)

categorySchema.methods.toJSON = function() {
    const { __v, ...category } = this.toObject()  // Convierte un documento de MongoDB a Objeto de JS
    return category
}

export default model('Category', categorySchema)