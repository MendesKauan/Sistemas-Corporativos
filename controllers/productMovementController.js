// ./controller/productMovementController.js


const CustomError = require("../Errors/CustomError");

class productMovementController {

    constructor(productMovementService) {
        this.productMovementService = productMovementService;
    }

    async createInput(req, res) {
        const {nameDeposit, nameProduct, subtypeMovement, quantityInput, unitPrice, date} = req.body;
        try {

         const newMovementInput = await this.productMovementService.createInput(nameDeposit, nameProduct, subtypeMovement, quantityInput, unitPrice, date);
         res.status(200).json(newMovementInput);
            
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.status).json({ message: error.message });
            } 
        }
    }

    async createOutput(req, res) {
        const {nameDeposit, nameProduct, subtypeMovement, quantityOutput, date} = req.body;
        try {
            
            const newMovementOutput = await this.productMovementService.createOutput(nameDeposit, nameProduct, subtypeMovement, quantityOutput, date);
            res.status(200).json(newMovementOutput);

        } catch (error) {
            
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