
// SERVICE E CONTROLLER

class XXXXXXXXXXXX {
    
    constructor(XXXXXXXXXXXX) {
        this.XXXXXXXXXXXX = XXXXXXXXXXXX;
    }

}

module.exports = XXXXXXXXXXXX;


//-----------------------------------------------------------------------------//


// ROUTER

const db = require('../models');
var express = require('express');
var router = express.Router();

module.exports = router;


//-----------------------------------------------------------------------------//


const supplierService = require('../services/supplierService');
const supplierController = require('../controllers/supplierController');

const SupplierService = new supplierService(db.Supplier);
const SupplierController = new supplierController(SupplierService);

router.post('/newSupplier', function(req, res) {
    SupplierController.create(req, res);
});