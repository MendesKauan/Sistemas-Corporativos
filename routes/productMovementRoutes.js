const productMovementService = require('../services/productMovementService');
const productMovementController = require('../controllers/productMovementController');
const db = require('../models');

// const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const ProductMovementService = new productMovementService(db.ProductMovement, db.Product, db.Deposit);
const ProductMovementController = new productMovementController(ProductMovementService);

router.post('/newProductMovement', function(req, res) {
    ProductMovementController.createInput(req, res);
});

router.post('/outputProductMovement', function(req, res) {
    ProductMovementController.createOutput(req, res);
});

router.get('/findByProduct', function(req,res){
    ProductMovementController.findByProduct(req, res);
});

router.get('/findByDeposit', function(req,res){
    ProductMovementController.findByDeposit(req, res);
});

module.exports = router;