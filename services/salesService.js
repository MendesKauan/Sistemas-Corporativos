// services/salesService.js

class salesService {
    
    constructor(saleModel, saleDetailsModel, clientModel, productMovementService, depositModel) {
        this.saleModel = saleModel;
        this.saleDetailsModel = saleDetailsModel; 
        this.clientModel = clientModel;
        this.depositModel = depositModel; 
        this.productMovementService = productMovementService;

    }

    async create(nameProduct, amount, clientCPF) {
        try {
            const client = await this.clientModel.findOne({ where: { CPF: clientCPF }});
            if(!client) { throw new error('Cliente não encontrado')}

            const product = await this.productMovementService.findByProduct(nameProduct);
            if(!product) { throw new error('Produto não encontrado')}

            await this.productMovementService.createOutput()


    

        } catch (error) {
            
        }
    }

}

module.exports = salesService;