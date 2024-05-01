// ./controller/userController.js


class userController {
    constructor(userService) {
        this.userService = userService;
    }

    async create(req, res) {
        const {name, email, password} = req.body; //será alterado pq tem um erro de codigo

        try {

            const newUser = await this.userService.create(name, email, password);
            res.status(200).json(newUser);

        } catch (error) {
            res.status(500).json({error:'erro ao inserir novo usuario'});
        }
    }

    async getAllUser(req, res) {
        const {login, password} = req.body;

        try {
            const AllUsers = await this.userService.getAllUser(login, password);
            res.status(200).json(AllUsers);    

        } catch (error) {
            res.status(400).json({error:'usuarios não localizados'})
        }
    }

    async getUserById(req, res) {
        const { id } = req.body;

        try {
                const UserById = await this.userService.getUserById(id);
                res.status(200).json(UserById);
        } catch (error) {
            res.status(400).json({error:'usuario não localizado'})
            
        }
    }

    async login(req, res) {
        const { email, password } = req.body;
        try {   
            const token = await this.userService.login(email, password);
            res.status(200).json({'token' : token});
        } catch (error) {
            res.status(400).json({error:'deu ruim na geração do token'});
        }
    }
}

module.exports = userController;