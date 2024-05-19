// ../services/depositService

class depositService {
    constructor(depositModel) {
        this.DepositModel = depositModel;
    }

    async create(name, active) {
        try {
            const newDeposit = await this.DepositModel.create(
                {
                    name: name,
                    active: active
                }
            )

            return newDeposit ? newDeposit : null;
            
        } catch (error) {
            
        }
    }

    async update(id, updates) {
        try {
            const deposit = await this.DepositModel.findOne({
                where: {
                    id: id
                }
            });

            await deposit.update(updates);
            return deposit;
            
        } catch (error) {
            
        }
    }

    async getAllDeposit() {
        try {
            const AllDeposits = this.DepositModel.findAll();

            return AllDeposits ? AllDeposits : null;

        } catch (error) {
            throw error;
        }
    }

    async getDepositById(DepositId) {
        try {
            const DepositById = this.DepositModel.findOne({
                where: {
                    id: DepositId
                }
            })

            return DepositById ? DepositById : null;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = depositService;
