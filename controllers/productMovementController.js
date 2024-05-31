// ./controller/productMovementController.js


const CustomError = require("../Errors/CustomError");

class productMovementController {

    constructor(productMovementService) {
        this.productMovementService = productMovementService;
    }

    async create(req, res) {
        const {nameDeposit, nameProduct, typeMovement, subtypeMovement, quantityInputOutput, unitPrice, date} = req.body;
        try {

         const newMovement = await this.productMovementService.create(nameDeposit, nameProduct, typeMovement, subtypeMovement, quantityInputOutput, unitPrice, date);
         res.status(200).json(newMovement);
            
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.status).json({ message: error.message });
            } 
        }
    }

    async findByProduct(req, res) {
        const { nameProduct } = req.body;
        try {
            const product = await this.productMovementService.findByProduct(nameProduct);
            res.status(200).json(product);
        } catch (error) {
            
        }
    }

    async findByDeposit(req, res) {
        const { nameDeposit } = req.body;
        try {
            const deposit = await this.productMovementService.findByDeposit(nameDeposit);
            res.status(200).json(deposit);
        } catch (error) {
            
        }
    }

}

module.exports = productMovementController;