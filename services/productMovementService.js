
class productMovementService {

    constructor(productMovementModel, productModel, depositModel) {
        this.productMovementModel = productMovementModel;
        this.productModel = productModel;
        this.depositModel = depositModel;
    }

    async create(nameDeposit, nameProduct, typeMovement, subtypeMovement, amount, unitPrice, date) {
        try {

            const idProduct = await this.productModel.findOne({
                where: {
                    name: nameProduct
                }
            });

            const idDeposit = await this.depositModel.findOne({
                where: {
                    name: nameDeposit
                }
            });

            const newMovement = await this.productMovementModel.create(
                {
                    IdProduct: idProduct.id,
                    IdDeposit: idDeposit.id,
                    typeMovement: typeMovement,
                    subtypeMovement: subtypeMovement,
                    amount: amount,
                    unitPrice: unitPrice,
                    date: date
                }
            );

            return newMovement ? newMovement : null


        } catch (error) {
            throw error
        }
    }

}

module.exports = productMovementService;
