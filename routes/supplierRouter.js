const db = require('../models');
var express = require('express');
var router = express.Router();

const supplierService = require('../services/supplierService');
const supplierController = require('../controllers/supplierController');

const SupplierService = new supplierService(db.Supplier);
const SupplierController = new supplierController(SupplierService);

router.post('/newSupplier', function(req, res) {
    SupplierController.create(req, res);
});


module.exports = router;