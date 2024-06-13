// ./controller/departmentController.js
const CustomError = require("../Errors/CustomError");

class departmentController {

    constructor(departmentService) {
        this.departmentService = departmentService;
    }

    async create(req, res) {
        const {name, codeCostCenter, balanceCostCenter} = req.body;

        try {

            const newDepartment = await this.departmentService.create(name, codeCostCenter, balanceCostCenter);
            res.status(200).json(newDepartment);
            
        } catch (error) {
            
        }
    }

    async materialRequisition(req, res) {
        const {nameDeposit, nameProduct, quantityOutput, date} = req.body;

        try {
            const newMaterialRequisition = await this.departmentService.materialRequisition(nameDeposit, nameProduct, quantityOutput, date);
            res.status(200).json(newMaterialRequisition);
            
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.status).json({ message: error.message });
            } 
        }
    }

    async buyMaterial(req, res){
        const {nameProduct, quantity, nameDeposit, installment, expirationDate} = req.body;

        try {
            const newBuyMaterial = await this.departmentService.buyMaterial(nameProduct, nameDeposit, quantity, installment, expirationDate);
            res.status(200).json(newBuyMaterial);
        } catch (error) {
            
        }
    }
}

module.exports = departmentController;