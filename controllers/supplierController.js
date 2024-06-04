// controllers/supplierController.js

class supplierController {
    
    constructor(supplierService) {
        this.supplierService = supplierService;
    }

    async create(req, res) {
        const {name, company} = req.body; 

        try {
            const newSupplier = await this.supplierService.create(name, company);
            res.status(200).json(newSupplier);

        } catch (error) {
            res.status(500).json({error:'erro ao inserir novo Fornecedor'});
        }
    }

}

module.exports = supplierController;