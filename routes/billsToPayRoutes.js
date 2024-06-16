const billsToPayService = require('../services/billsToPayService');
const movementBillsToPayService = require('../services/movementBillsToPayService');

const billsToPayController = require('../controllers/billsToPayController');

const db = require('../models');
var express = require('express');
var router = express.Router();

const MovementBillsToPayService = new movementBillsToPayService(db.movementBillsToPay);
const BillsToPayService = new billsToPayService(db.BillsToPay, db.Department, db.CostCenter, MovementBillsToPayService);
const BillsToPayController = new billsToPayController(BillsToPayService);

router.post('/payBill', function(req, res) {
    BillsToPayController.payBill(req, res);
});

router.post('/cancelBill', function(req, res) {
    BillsToPayController.cancelBill(req, res);
});


module.exports = router;