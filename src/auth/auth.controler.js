import User from '../user/user.model.js'
import { checkPassword, encrypt } from '../../utils/encryp.js'
import { generateJwt } from '../../utils/jwt.js'

export const register = async(req, res)=>{
    try{    
    
        let data = req.body
        let user = new User(data)
        user.password = await encrypt(user.password)
      
        await user.save()
        return res.send({message: `Registered successfully, can be login with username: ${user.username}`})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with user registration', err})
    }
}



export const login = async(req, res)=>{
    try{
       
        let { userLoggin, password } = req.body
        
        let user = await User.findOne(
            {
                $or: [ 
                    {email: userLoggin},
                    {username: userLoggin}
                ]
            }
        ) 
        console.log(user)
        
        if(user && await checkPassword(user.password, password)){
            //Generar el token
            let loggedUser = {
                uid: user._id,
                username: user.username,
                name: user.name,
                role: user.role
            }
            let token = await generateJwt(loggedUser)
            return res.send(
                {
                    message: `Welcome ${user.name}`,
                    loggedUser,
                    token
                }
            )
        }
        //Responder al usuario
        return res.status(400).send({message: 'Invalid credentials'})
    }catch(err){
        console.error(err)
        return res.status(500).send({message: 'General error with login function', err})
    }
}

const agregarUsuarioPorDefecto = async () => {
    try {
        const adminExistente = await User.findOne({ role: "ADMIN" })

        if (!adminExistente) {
            const passwordHash = await encrypt("Admin1234", 10)

            const usuarioAdmin = new User({
                name: "Diego ",
                surname: "Chupina",
                username: "dchupina",
                email: "dchupina-2023120@kinal.edu.gt",
                phone: "41662867",
                password: passwordHash,
                role: "ADMIN",
            })

            await usuarioAdmin.save()
            console.log("Default admin user added")
        }
    } catch (error) {
        console.error("Error adding default user:", error)
    }
}

agregarUsuarioPorDefecto()