// controllers/billsToReceiveController.js
const CustomError = require("../Errors/CustomError");

class billsToReceiveController {

    constructor(billsToReceiveServices) {
        this.billsToReceiveServices = billsToReceiveServices;
    }

    async receiveBill(req, res) {
        const {NF, clientCPF} = req.body;
        
        try {
            const bills = await this.billsToReceiveServices.receiveBill(NF, clientCPF);
            res.status(200).json(bills);
        } catch (error) {
            
        }
    }

    async cancelBill(req, res) {
        const {NF} = req.body;
        
        try {
            const billsToCancel = await this.billsToReceiveServices.cancelBill(NF);
            res.status(200).json(billsToCancel);
        } catch (error) {
            
        }
    }
}

module.exports = billsToReceiveController;