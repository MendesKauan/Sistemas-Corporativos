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

     async purchasesFindOne(IdPurchase) {
        try {
            const purchase = await this.purchasesModel.findOne(
            {
                where: {
                    id: IdPurchase
                }
            }
         );

         return purchase ? purchase : null;

        } catch (error) {
            
        }
     } 

}

module.exports = purchasesService;