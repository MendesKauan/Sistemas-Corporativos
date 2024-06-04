// services/supplierService.js

class supplierService {
    
    constructor(supplierModel) {
        this.supplierModel = supplierModel;
    }

    async create(name, company) {
        try {
            const newSupplier = await this.supplierModel.create (
                {
                    name : name,
                    company : company,
                }
            )
            
            return newSupplier ? newSupplier  : null;

        } catch (error) {
            
        }
    }

}

module.exports = supplierService;