
const CustomError = require("../Errors/CustomError");

class productMovementService {

    constructor(productMovementModel, productModel, depositModel) {
        this.productMovementModel = productMovementModel;
        this.productModel = productModel;
        this.depositModel = depositModel;
    }

    async create(nameDeposit, nameProduct, typeMovement, subtypeMovement, quantityInputOutput, unitPrice, date) {
        try {

            const product  = await this.productModel.findOne({
                where: {
                    name: nameProduct
                }
            });

            if (product == null) {
                throw new CustomError("Produto não encontrado", 404);
            }

            const deposit = await this.depositModel.findOne({
                where: {
                    name: nameDeposit
                }
            });

            if (deposit == null) {
                throw new CustomError("Depósito não encontrado", 404);
            }

            let currentQuantity = 0;
            const lastMovement = await this.productMovementModel.findOne({
                where: {
                    IdProduct: product.id
                },
                order: [['date', 'DESC']]
            });

            if (lastMovement) {
                currentQuantity = lastMovement.currentQuantity;
            }

            if(subtypeMovement === 'compra') {
                
                if(quantityInputOutput <= 0) { throw new CustomError("Não pode gravar valores iguais ou menores que zero", 404); }
                if(typeMovement != 'entrada') { throw new CustomError("tipo de entrada invalida", 404); }

                currentQuantity += quantityInputOutput;
            }
            else if (subtypeMovement === 'venda') {

                if(quantityInputOutput > lastMovement.currentQuantity) { throw new CustomError("Não pode retirar valores maiores que a quantidade atual", 404); }
                if(typeMovement != 'saida') { throw new CustomError("tipo de saida invalida", 404); }

                currentQuantity -= quantityInputOutput;
            }

            const newMovement = await this.productMovementModel.create(
                {
                    IdProduct: product.id,
                    IdDeposit: deposit.id,
                    typeMovement: typeMovement,
                    subtypeMovement: subtypeMovement,
                    currentQuantity: currentQuantity,
                    quantityInputOutput: quantityInputOutput,
                    unitPrice: unitPrice,
                    date: date
                }
            );

            return newMovement? newMovement : null;



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
