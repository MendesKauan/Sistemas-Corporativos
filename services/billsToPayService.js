// services/billsToPayService.js

class billsToPayService {
    
    constructor(billsToPayModel, movementBillsToPayService) {
        this.billsToPayModel = billsToPayModel;
        this.movementBillsToPayService = movementBillsToPayService;
    }

    async create(totalPurchaseValue, installment, NF, IdPurchase, status, expirationDate) {
        try {
            const newbillsToPay = this.billsToPayModel.create(
                {
                    totalPurchaseValue : totalPurchaseValue,
                    installment : installment,
                    NF : NF,
                    IdPurchase : IdPurchase,
                    status : status,
                    expirationDate : expirationDate
                }
            );


            const typeMovement = "abertura";
            const billsToPay = this.billsToPayModel.findOne({ where: {NF : NF} });          
            await this.movementBillsToPayService.create(billsToPay.id, typeMovement, totalPurchaseValue, 0, 0);

            return newbillsToPay ? newbillsToPay : null;

        } catch (error) {
            console.error("Error creating bills to pay:", error);
            throw error;
        }
    }

}

module.exports = billsToPayService;