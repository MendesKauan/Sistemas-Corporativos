// models/billsToPay.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const BillsToPay = sequelize.define('BillsToPay', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        totalPurchaseValue: {
            type: Sequelize.FLOAT,
            allowNull: false
        },
        purchaseStatus: {
            type: Sequelize.STRING,
            allowNull: false
        },
        installment: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        NF: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        IdPurchase: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        status: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });

    BillsToPay.associate = (models) => {
        BillsToPay.belongsTo(models.BillsToPay, { foreignKey: 'IdPurchase' });
    }

    return BillsToPay;
}


