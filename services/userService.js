// ../services/userService
const { where } = require ('sequelize');
const { generatorToken, authUser } = require ('../auth/authServices');
const bcrypt = require('bcrypt');


class userService {
    // construtor da classe recebe a User da model
    constructor(userModel) {
        this.User = userModel;
    }

    async create(nome, email, senha) {
        try {

            const encryptedPassword = await bcrypt.hashSync(senha, 10);

            const newUser = await this.User.create (
                {
                    name : nome,
                    email : email,
                    password : encryptedPassword
                }
            )
            
            newUser.password = '';
            return newUser ? newUser  : null;

        } catch (error) {
            
        }
    }

    async getAllUser(login, password) {
        try {
           const AllUser = this.User.findAll();
            
            return AllUser ? AllUser : null;

        } catch (error) {
            throw error;
        }
    }

    async getUserById(Userid) {
        try {
            const UserById = this.User.findOne({
                where:{
                    id : Userid
                }
        })

        UserById.password = '';  
        return UserById ? UserById : null;

        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            
            const user = await this.User.findOne({
                where:{email : email}
            });
            if(!user) {
                throw new Error('Usuario não encontrado');
            }

            const authPassword = await authUser(user, password);
            if (!authPassword) {
                throw new Error('Senha incorreta');
            }

            const token = generatorToken(user);
            return token;

        } catch (error) {
            
        }
    }

}

module.exports = userService;