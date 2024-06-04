// services/proposalsService.js

class proposalsService {
    
    constructor(proposalsModel, supplierModel, productModel, userModel) {
        this.proposalsModel = proposalsModel;
        this.supplierModel = supplierModel;
        this.productModel = productModel;
        this.userModel = userModel;
    }

    async create(nameProduct, nameSupplier, proposedPrice, dateProposals, buyer, expirationDate) {
        try {
            const product = await this.productModel.findOne({ where: { name: nameProduct } });
            if (product == null) { throw new CustomError("Produto não encontrado", 404); }

            const supplier  = await this.supplierModel.findOne({ where: { name: nameSupplier } });
            if (supplier == null) { throw new CustomError("Fornecedor não encontrado", 404); }

            const buyerUser = await this.userModel.findOne({ where: { name: buyer } });
            if (buyerUser == null) { throw new CustomError("Usuario não encontrado", 404); }

            const newProposals = await this.proposalsModel.create (
                {
                    IdProduct : product.id,
                    IdSupplier : supplier.id,
                    proposedPrice : proposedPrice,
                    dateProposals: dateProposals,
                    buyer : buyerUser.id,
                    expirationDate : expirationDate
                }
            )
            
            return newProposals ? newProposals  : null;

        } catch (error) {
            
        }
    }


}

module.exports = proposalsService;