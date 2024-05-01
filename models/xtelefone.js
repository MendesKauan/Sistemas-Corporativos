// ./models/user.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const XTelefone = sequelize.define('XTelefone', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        number: {
            type: Sequelize.STRING,

        },
    
        
    });

    //associação com user
    XTelefone.associate = (models) => {
        XTelefone.belongsTo(sequelize.models.User, {
            foreinKey: 'userId',
            as: 'User'
        });
    };
    return XTelefone;
}


