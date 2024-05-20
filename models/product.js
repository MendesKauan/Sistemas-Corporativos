// ./models/product.js

const Sequelize = require('sequelize');

module.exports = (sequelize) => {

    const Product = sequelize.define('Product', {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
            allownull: false
        },
        active: {
            type: Sequelize.BOOLEAN,
            allownull: false
        }
    });

    // Product.associate = (models) => {
    //     Product.hasMany(models.ProductMovement, { foreignKey: 'IdProduct' });
    // }

    return Product;
}