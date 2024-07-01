const billsToPayService = require('../services/billsToPayService');
const movementBillsToPayService = require('../services/movementBillsToPayService');

const billsToPayController = require('../controllers/billsToPayController');

const db = require('../models');
var express = require('express');
var router = express.Router();
const { verifyToken } = require('../auth/authServices');

const MovementBillsToPayService = new movementBillsToPayService(db.movementBillsToPay);
const BillsToPayService = new billsToPayService(db.BillsToPay, db.Department, db.CostCenter, MovementBillsToPayService);
const BillsToPayController = new billsToPayController(BillsToPayService);

router.post('/payBill', verifyToken, function(req, res) {
    BillsToPayController.payBill(req, res);
});

router.post('/cancelBill', verifyToken, function(req, res) {
    BillsToPayController.cancelBill(req, res);
});

router.post('/findByNF', verifyToken, function(req, res) {
    BillsToPayController.findByNF(req, res);
});

router.post('/findAll', verifyToken, function(req, res) {
    BillsToPayController.findAll(req, res);
});

module.exports = router;