// services\costCenterService.js
const CustomError = require("../Errors/CustomError");
class costCenterService {
    
    constructor(costCenterModel) {
        this.costCenterModel = costCenterModel;
    }

    async create(code, balance){
        try {
            if(balance <= 0) { throw new CustomError("Não pode registrar valor igual ou menor que zero", 400)}

            const newCostCenter = this.costCenterModel.create(
                {
                    code: code,
                    balance: balance
                }
            );

            return newCostCenter ? newCostCenter : null

        } catch (error) {
            
        }
    }

    async findById(id) {
        const costCenterId = await this.costCenterModel.findOne({where: {id: id}});
        return costCenterId ? costCenterId : null;
    }

    
}

module.exports = costCenterService;