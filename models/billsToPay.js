// models/billsToPay.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const BillsToPay = sequelize.define('BillsToPay', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        Idbuyer: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        IdProduct: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        totalAmount: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        unitPrice: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        purchaseStatus: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    BillsToPay.associate = (models) => {
        
    }

    return BillsToPay;
}


