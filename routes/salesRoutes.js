const productMovementService = require('../services/productMovementService');
const salesService = require('../services/salesService');
const salesController = require('../controllers/salesController');

const db = require('../models');
var express = require('express');
var router = express.Router();

const ProductMovementModel = new productMovementService(db.ProductMovement, db.Product, db.Deposit);
const SalesService = new salesService(db.Sales, db.SaleDetails, db.Client, ProductMovementModel, db.Deposit);
const SalesController = new salesController(SalesService);

router.post('/newSale', function(req, res) {
    SalesController.create(req, res);
});


module.exports = router;