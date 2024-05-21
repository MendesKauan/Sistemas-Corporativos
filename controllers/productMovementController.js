// ./controller/productMovementController.js

class productMovementController {

    constructor(productMovementService) {
        this.productMovementService = productMovementService;
    }

    async create(req, res) {
        const {nameDeposit, nameProduct, typeMovement, subtypeMovement, amount, unitPrice, date} = req.body;
        try {

         const newMovement = await this.productMovementService.create(nameDeposit, nameProduct, typeMovement, subtypeMovement, amount, unitPrice, date);
         res.status(200).json(newMovement);
            
        } catch (error) {
           
        }
    }

}

module.exports = productMovementController;