const {User} = require("../models")

const { comparePassword } = require("../helpers/bcrypt")
const { generateToken } = require("../helpers/jwt")
const authentication = require("../middlewares/authentication")

class userController{
    static async register(req, res){
        try {
            const {
                full_name,
                email,
                username,
                password,
                profile_image_url,
                age,
                phone_number
            } = req.body

            const data = await User.create({
                full_name,
                email,
                username,
                password,
                profile_image_url,
                age,
                phone_number

              })
        
              const response = {
                user: {
                    id: data.id,
                    full_name: data.full_name,
                    email: data.email,
                    username: data.username,
                    profile_image_url: data.profile_image_url,
                    age: data.age,
                    phone_number: data.phone_number
                }
                
              }
        
              res.status(201).json(response)
        
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }
    static async login(req, res){
        try {
            const {
              email,
              password
            } = req.body

            const user = await User.findOne({
              where: {
                email: email
              }
            })
      
            if (!user) {
              throw {
                code: 404,
                message: "User not found"
              }
            }
      
            // compare password
            const isCorrect = comparePassword(password, user.password)
      
            if (!isCorrect) {
              throw {
                code: 401,
                message: "Incorrect password"
              }
            }
      
            const response = {
              id: user.id,
              email: user.email,
              username: user.username
            }
      
            const access_token = generateToken(response)
      
            res.status(200).json({
              access_token
            })
      
          } catch (error) {
            res.status(error?.code || 500).json(error)
            
          }
    }

    static async updateUser(req, res){
        try {
            const { id } = req.params    
            const {
                full_name,
                email,
                username,
                profile_image_url,
                age,
                phone_number
            } = req.body
            
            const data = await User.findByPk(id)

        if(data === req.userData){
            const result = await User.update({
                full_name,
                email,
                username,
                profile_image_url,
                age,
                phone_number
            }, {
                where: {
                    id
            },
            returning: true
        })
            res.status(201).json(result)
        }else{
            throw{
                code: 401,
                message: "unauthorized"
            }
        }
            } catch (error) {
                res.status(error?.code || 500).json(error)
        }
    
    }

    static async deleteUser(req, res){
        try {
            const { id } = req.params
            const data = await User.findByPk(id)

        if(data === req.userData){
            const result = await User.destroy({
                where : { id }
            })

            if(!result) {
                throw {
                    code: 404,
                    message: "data not found"
                }
            }
            res.status(201).json({"message":"your account has sucessfully deleted"})
        }else{
            throw{
                code: 401,
                message: "unauthorized"
            }
        }
        } catch (error) {
            res.status(error?.code || 500).json(error)
        }
    }
}   

module.exports = userController