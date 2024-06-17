// ../services/userService
const { generatorToken, authUser } = require ('../auth/authServices');
const bcrypt = require('bcrypt');


class userService {
    
    constructor(userModel, departmentModel) {
        this.userModel = userModel;
        this.departmentModel = departmentModel;
    }

    async create(nome, email, senha, nameDepartment) {
        try {
            const encryptedPassword = await bcrypt.hashSync(senha, 10);

            const department = await this.departmentModel.findOne({
                where: {
                    name: nameDepartment
                }
            });

            const newUser = await this.userModel.create (
                {
                    name : nome,
                    email : email,
                    password : encryptedPassword,
                    IdDepartment : department.id
                }
            );
            
            newUser.password = '';
            return newUser ? newUser  : null;

        } catch (error) {
            
        }
    }

    async getAllUser() {
        try {
           const AllUser = this.User.findAll();
            
            return AllUser ? AllUser : null;

        } catch (error) {
            throw error;
        }
    }

    async getUserById(Userid) {
        try {
            const UserById = this.userModel.findOne({
                where:{
                    id : Userid
                }
        });

        UserById.password = '*********';  
        return UserById ? UserById : null;

        } catch (error) {
            throw error;
        }
    }

    async login(email, password) {
        try {
            
            const user = await this.userModel.findOne({
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