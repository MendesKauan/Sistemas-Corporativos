const productMovementService = require('../services/productMovementService');
const productMovementController = require('../controllers/productMovementController');
const db = require('../models');

// const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const ProductMovementService = new productMovementService(db.ProductMovement, db.Product, db.Deposit);
const ProductMovementController = new productMovementController(ProductMovementService);

router.post('/newProductMovement', function(req, res) {
    ProductMovementController.create(req, res);
});

module.exports = router;