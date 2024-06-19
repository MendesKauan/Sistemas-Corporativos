const productMovementService = require('../services/productMovementService');
const saleDetailsServices = require('../services/saleDetailsService');

const salesService = require('../services/salesService');
const salesController = require('../controllers/salesController');

const db = require('../models');
var express = require('express');
var router = express.Router();

const SaleDetailsServices =  new saleDetailsServices(db.SaleDetails);
const ProductMovementModel = new productMovementService(db.ProductMovement, db.Product, db.Deposit);
const SalesService = new salesService(db.Sales, SaleDetailsServices, db.Client, ProductMovementModel, db.Deposit, db.Product);
const SalesController = new salesController(SalesService);

router.post('/newSale', function(req, res) {
    SalesController.create(req, res);
});


module.exports = router;