// services/clientService.js

class clientService {
    
    constructor(clientModel) {
        this.clientModel = clientModel;
    }

    async create(name, CPF) {
        try {

            const newClient = await this.clientModel.create (
                {
                    name : name,
                    CPF : CPF
                }
            );
            
            return newClient ? newClient  : null;

        } catch (error) {
            
        }
    }

}

module.exports = clientService;