// services/salesService.js
const moment = require('moment');

class salesService {
    
    constructor(saleModel, saleDetailsServices, clientModel, productMovementService, depositModel, productModel) {
        this.saleModel = saleModel;
        this.saleDetailsServices = saleDetailsServices; 
        this.clientModel = clientModel;
        this.depositModel = depositModel;
        this.productModel = productModel;
        this.productMovementService = productMovementService;

    }

    async create(nameProduct, amount, clientCPF) {
        try {
            const client = await this.clientModel.findOne({ where: { CPF: clientCPF }});
            if(!client) { throw new error('Cliente não encontrado')}

            const product = await this.productModel.findOne({ where: { name: nameProduct }});
            if(!product) { throw new error('Produto não encontrado')}

            const deposits = await this.depositModel.findAll();

            const soldAmount = amount;

            for (const deposit of deposits) {
                if (amount <= 0) break;
    
                let currentQuantity = await this.productMovementService.getCurrentQuantity(product.id, deposit.id);
    
                if (currentQuantity > 0) {
                    const quantityToRemove = Math.min(currentQuantity, amount);
    
                    await this.productMovementService.createOutput(deposit.name, product.name, 'venda', quantityToRemove, new Date());
    
                    amount -= quantityToRemove;
                }
            }
    
            if (amount > 0) { throw new Error('Estoque insuficiente para completar a venda'); }

            function generateRandomNumber(min = 100, max = 50000) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            let NF;
            let NFexists;

            do {
                NF = generateRandomNumber();
                NFexists = await this.saleModel.findOne({ where: { NF : NF } });
            } while (NFexists);

            const dateSale = moment().format('YYYY-MM-DD');

            const newSale = await this.saleModel.create(
                {   
                    NF : NF,
                    dateSale: dateSale,
                    idClient: client.id
                }
            );

            const unitPriceProduct = await this.productMovementService.findByProduct(nameProduct);

            await this.saleDetailsServices.create(newSale.id, product.id, soldAmount, unitPriceProduct.unitPrice);

            

            return newSale + newSaleDetail

        } catch (error) {
            
        }
    }

}

module.exports = salesService;