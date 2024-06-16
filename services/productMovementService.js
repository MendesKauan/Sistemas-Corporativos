
const CustomError = require("../Errors/CustomError");

class productMovementService {

    constructor(productMovementModel, productModel, depositModel) {
        this.productMovementModel = productMovementModel;
        this.productModel = productModel;
        this.depositModel = depositModel;
    }

    async getCurrentQuantity(productId, depositId) {
        const lastMovement = await this.productMovementModel.findOne({
            where: {
                IdProduct: productId,
                IdDeposit: depositId
            },
            order: [['date', 'DESC']]
        });
    
        return lastMovement ? lastMovement.currentQuantity : 0;

    }

    async createInput(nameDeposit, nameProduct, subtypeMovement, quantityInput, unitPrice, date) {
        try {

            const product = await this.productModel.findOne({ where: { name: nameProduct } });

            if (product == null) { throw new CustomError("Produto não encontrado", 404); }

            const deposit = await this.depositModel.findOne({ where: { name: nameDeposit } });

            if (deposit == null) { throw new CustomError("Depósito não encontrado", 404); }

            
            const typeMovement = "entrada";

            let currentQuantity = await this.getCurrentQuantity(product.id, deposit.id);

            if(quantityInput <= 0) { 
                throw new CustomError("Não pode gravar valores iguais ou menores que zero", 404); 
            }
            
            currentQuantity += quantityInput;

            const newMovementInput = await this.productMovementModel.create(
                {
                    IdProduct: product.id,
                    IdDeposit: deposit.id,
                    typeMovement: typeMovement,
                    subtypeMovement: subtypeMovement,
                    currentQuantity: currentQuantity,
                    quantityInputOutput: quantityInput,
                    unitPrice: unitPrice,
                    date: date
                }
            );

            return newMovementInput? newMovementInput : null;



        } catch (error) {
        
        }
    }

    async createOutput(nameDeposit, nameProduct, subtypeMovement, quantityOutput, date) {
        try {
            const product  = await this.productModel.findOne({ where: { name: nameProduct } });

            if (product == null) { throw new CustomError("Produto não encontrado", 404); }

            const deposit = await this.depositModel.findOne({ where: { name: nameDeposit } });

            if (deposit == null) { throw new CustomError("Depósito não encontrado", 404); }

            let currentQuantity = 0;
            const typeMovement = "saida";

            const lastMovement = await this.productMovementModel.findOne({
                where: {
                    IdProduct: product.id
                },
                order: [['date', 'DESC']]
            });

            if (lastMovement) { currentQuantity = lastMovement.currentQuantity; }

            if (quantityOutput <= 0) { throw new CustomError("Não pode retirar valores menores ou iguais a zero", 404); }

            if(quantityOutput > lastMovement.currentQuantity) { throw new CustomError("Não pode retirar valores maiores que a quantidade atual", 404); }

            if(lastMovement.currentQuantity === 0) { throw new CustomError("Produto sem estoque", 400); };
            
            currentQuantity -= quantityOutput;

            const newMovementOutput = await this.productMovementModel.create(
                {
                    IdProduct: product.id,
                    IdDeposit: deposit.id,
                    typeMovement: typeMovement,
                    subtypeMovement: subtypeMovement,
                    currentQuantity: currentQuantity,
                    quantityInputOutput: quantityOutput,
                    unitPrice: lastMovement.unitPrice,
                    date: date
                }
            );

            return newMovementOutput? newMovementOutput : null;


        } catch (error) {
            
        }
    }

    async findByProduct(nameProduct) {
        const IDproduct  = await this.productModel.findOne({
            where: {
                name: nameProduct
            }
        });

        const product = await this.productMovementModel.findOne({
            where: {
                IdProduct: IDproduct.id
            },
        });

        return product;
    }

    async findByDeposit(nameDeposit) {
        const IDdeposit = await this.depositModel.findOne({
                where: {
                    name: nameDeposit
                }
        });

        const deposit = await this.productMovementModel.findOne({
            where: {
                IdDeposit: IDdeposit.id
            },
        });

        return deposit;
    }

}

module.exports = productMovementService;
