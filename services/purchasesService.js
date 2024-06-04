class purchasesService {
    
    constructor(purchasesModel) {
        this.purchasesModel = purchasesModel;
    }

    async create(IdSupplier, IdProposal, Idbuyer, IdProduct, totalAmount, unitPrice, purchaseStatus) {
        try {
            const newPurchase = await this.purchasesModel.create(
                {
                    IdSupplier: IdSupplier,
                    IdProposal: IdProposal, 
                    Idbuyer: Idbuyer, 
                    IdProduct: IdProduct, 
                    totalAmount: totalAmount, 
                    unitPrice: unitPrice, 
                    purchaseStatus: purchaseStatus,
                }
            );

            return newPurchase ? newPurchase : null


        } catch (error) {
            
        }
     }

}

module.exports = purchasesService;