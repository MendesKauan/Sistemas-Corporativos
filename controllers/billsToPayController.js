// controllers/billsToPayController.js
const CustomError = require("../Errors/CustomError");

class billsToPayController {

    constructor(billsToPayService) {
        this.billsToPayService = billsToPayService;
    }

    async payBill(req, res) {
        const {NF, nameDepartment} = req.body;

        try {
            const bills = await this.billsToPayService.payBill(NF, nameDepartment);
            res.status(200).json(bills);
            
        } catch (error) {
            
        }
    }

    async cancelBill(req, res) {
        const { NF } = req.body;

        try {
            const billsToCancel = await this.billsToPayService.cancelBill(NF);
            res.status(200).json(billsToCancel);
            
        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = billsToPayController;