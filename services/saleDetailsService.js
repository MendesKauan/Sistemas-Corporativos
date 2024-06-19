// services/saleDetailsService.js

class saleDetailsService {
    
    constructor(saleDetailsModel) {
        this.saleDetailsModel = saleDetailsModel;
    }

    async create(idSale, idProduct, soldAmount, unitPrice) {
        try {
            
            const newSaleDetail = await this.saleDetailsModel.create({
                idSale : idSale, 
                idProduct : idProduct, 
                soldAmount : soldAmount, 
                unitPrice : unitPrice
            }); 

            return newSaleDetail ? newSaleDetail : null

        } catch (error) {
            
        }
    }

}

module.exports = saleDetailsService;