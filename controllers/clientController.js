// controllers/clientController.js

class clientController {
    constructor(clientService) {
        this.clientService = clientService;
    }

    async create(req, res) {
        const {name, CPF} = req.body;

        try {
            const newClient = await this.clientService.create(name, CPF);
            res.status(200).json(newClient);

        } catch (error) {
            res.status(500).json({error:'erro ao inserir novo cliente'});
        }
    }

}

module.exports = clientController;