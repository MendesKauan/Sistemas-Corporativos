// controllers/proposalsController.js

class proposalsController {
    
    constructor(proposalsService) {
        this.proposalsService = proposalsService;
    }

    async create(req, res) {
        const {nameProduct, nameSupplier, proposedPrice, dateProposals, buyer, expirationDate} = req.body; 

        try {
            const newProposals = await this.proposalsService.create(nameProduct, nameSupplier, proposedPrice, dateProposals, buyer, expirationDate);
            res.status(200).json(newProposals);

        } catch (error) {
            res.status(500).json({error:'erro ao inserir nova proposta'});
        }
    }

}

module.exports = proposalsController;