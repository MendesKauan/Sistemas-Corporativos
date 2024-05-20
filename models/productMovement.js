// ./models/productMovement.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const ProductMovement = sequelize.define('ProductMovement', {
        IdMovement: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        IdProduct: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Product',
                key: 'id'
            }
        },
        IdDeposit: {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'Deposit',
                key: 'id'
            }
        },
        typeMovement: {
            type: Sequelize.ENUM('entrada', 'saida'),
            allowNull: false
        },
        subtypeMovement: {
            type: Sequelize.STRING,
            allowNull: false
        },
        amount: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        date: {
            type: Sequelize.DATE,
            allowNull: false
        }
    });

    // ProductMovement.associate = (models) => {
    //     ProductMovement.belongsTo(models.Deposit, { foreignKey: 'IdDeposit' });
    //     ProductMovement.belongsTo(models.Product, { foreignKey: 'IdProduct' });
    // }

    return ProductMovement;
}


