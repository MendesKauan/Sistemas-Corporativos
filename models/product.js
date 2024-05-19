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

    return Product;
}