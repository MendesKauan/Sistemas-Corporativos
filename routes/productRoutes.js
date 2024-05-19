const productService = require('../services/productService');
const productController = require('../controllers/productController');
const db = require('../models');
const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const ProductService = new productService(db.Product);
const ProductController = new productController(ProductService);

router.post('/newProduct', verifyToken, function(req, res) {
    ProductController.create(req, res);
});

router.post('/update', function(req, res) {
    ProductController.update(req, res);
});

router.get('/getAllProduct', function(req, res) {
    ProductController.getAllProduct(req, res);
})

router.get('/productById', function(req, res) {
    ProductController.getProductById(req, res);
});


module.exports = router;
 