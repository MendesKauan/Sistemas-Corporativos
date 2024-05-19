// ./controller/depositController.js

class depositController {
    constructor(depositService) {
        this.depositService = depositService;
    }

    async create(req, res) {
        const {name, active} = req.body;

        try {
            const newDeposit = await this.depositService.create(name, active);
            res.status(200).json(newDeposit);
            
        } catch (error) {
            res.status(500).json({error:'erro ao inserir novo deposito'});
        }
    }

    async update(req, res) {
        const {id, updates} = req.body;

        try {
            const updateDeposit = await this.depositService.update(id, updates);
            res.status(200).json(updateDeposit);
            
        } catch (error) {
            res.status(500).json({error:'erro ao atualizar deposito'});    
        }
    }
    
    async getAllDeposit(req, res) {
        try {
            const AllDeposits = await this.depositService.getAllDeposit();
            res.status(200).json(AllDeposits);    

        } catch (error) {
            res.status(400).json({error:'depositos não localizados'})
        }
    }

    async getDepositById(req, res) {

        const {id} = req.body;

        try {
            const Deposit = await this.depositService.getDepositById(id);
            res.status(200).json(Deposit);    

        } catch (error) {
            res.status(400).json({error:'deposito não localizado'})
        }
    }
}

module.exports = depositController;