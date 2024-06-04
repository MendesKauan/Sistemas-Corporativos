// services/departmentService.js

class departmentService {
    
    constructor(departmentModel, costCenterModel, productMovementService, proposalsService, proposalsModel, productModel, purchasesService) {
        this.departmentModel = departmentModel;
        this.costCenterModel = costCenterModel;
        this.proposalsModel = proposalsModel;
        this.productModel = productModel;

        this.productMovementService = productMovementService;
        this.proposalsService = proposalsService;
        this.purchasesService = purchasesService;
    }

    async create(name, codeCostCenter, balanceCostCenter) {

        try {
            const newCostCenter = await this.costCenterModel.create(
                {
                    code: codeCostCenter,
                    balance: balanceCostCenter
                }
            );

            const newDepartment = await this.departmentModel.create(
                {
                    name: name,
                    IdCostCenter: newCostCenter.id
                }
            );

            return newDepartment ? newDepartment : null
            
        } catch (error) {
            
        }

    }

    async materialRequisition(nameDeposit, nameProduct, quantityOutput, date) {
        try {
            const subtypeMovement = "transferencia";
            const newMaterialRequisition = await this.productMovementService.createOutput(nameDeposit, nameProduct, subtypeMovement, quantityOutput, date);

            return newMaterialRequisition ? newMaterialRequisition : null
            
        } catch (error) {
            if (error instanceof CustomError) {
                res.status(error.status).json({ message: error.message });
            } 
        }
    }

    async buyMaterial(nameProduct, quantity) {
        try {

            const product = await this.productModel.findOne({ where: { name: nameProduct } });
            const proposals = await this.proposalsModel.findAll({where: { idProduct: product.id }});

            let bestOffer = proposals[0];

            for(const proposal of proposals) {
                if(proposal.proposedPrice < bestOffer.proposedPrice) { bestOffer = proposal; }
            } 

            let totalPurchaseValue = quantity * bestOffer.proposedPrice;
            const purchaseStatus = "Pendente";

            let NF = () => Math.floor(Math.random() * (4000 - 1000 + 1)) + 1000;
            
            await this.purchasesService.create(bestOffer.IdSupplier, bestOffer.id, bestOffer.buyer, bestOffer.IdProduct, quantity, bestOffer.proposedPrice, purchaseStatus);
            
            
        } catch (error) {
            
        }
    }
}

module.exports = departmentService;