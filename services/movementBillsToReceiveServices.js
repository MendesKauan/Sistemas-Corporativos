// services/movementBillsToReiceveServices.js
const moment = require('moment');

class movementBillsToReceiveServices {
    
    constructor(movementBillsToReceiveModel) {
        this.movementBillsToReceiveModel = movementBillsToReceiveModel;
    }

    async create(idTitle, typeMovement, movementValue, valueFine, valueInterest) {
        try {
            const dateMovement = moment().format('YYYY-MM-DD');

            const movementBillsToReceiveServices = this.movementBillsToReceiveServices.create(
                {
                    idTitle : idTitle,
                    dateMovement : dateMovement,
                    typeMovement : typeMovement,
                    movementValue : movementValue,
                    valueFine : valueFine,
                    valueInterest : valueInterest
                }
            );
            return movementBillsToReceiveServices ? movementBillsToReceiveServices : null;

        } catch (error) {
          
        }
    }

}

module.exports = movementBillsToReceiveServices;