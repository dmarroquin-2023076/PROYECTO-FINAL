import { Schema, model } from 'mongoose'

const userSchema = Schema(
    {
        name: {
            type: String,
            required: [true, 'Name is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        surname: {
            type: String,
            required: [true, 'Surname is required'],
            maxLength: [25, `Can't be overcome 25 characters`]
        },
        username: {
            type: String,
            required: [true, 'Username is required'],
            unique: [true, 'Username is already taken'],
            lowercase: true,
            maxLength: [15, `Can't be overcome 15 characters`]
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true     
        },
        password: {
            type: String,
            required: [true, 'Password is required'],
            minLength: [8, 'Password must be 8 characters'],
            maxLength: [100, `Can't be overcome 100 characters`],
        },
        phone: {
            type: String,
            required: [true, 'Phone is required'],
            minLength: [8, 'Phone number must have at least 8 characters'],
            maxLength: [15, 'Phone number must not exceed 15 characters']
        },        
        role: {
            type: String,
            required: [true, 'Role is required'],
            uppercase: true,
            enum: ['ADMIN', 'CLIENT'],
            default: 'CLIENT'
        }
    },
    {
        versionKey: false, //Deshabilitar el __v(Versión del documento)
        timestamps: true //Agrega propiedades de fecha (Fecha de creación y de ultima actualización)
    }
)

//Modificar el toJSON -> toObject para excluir datos en la respuesta
userSchema.methods.toJSON = function(){
    const { __v, password, ...user } = this.toObject() //Sirve para convertir un documento de MongoDB a Objeto de JS
    return user
}

export default model('User', userSchema)