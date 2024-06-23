const billsToReceiveServices = require('../services/billsToReceiveServices');
const billsToReceiveController = require('../controllers/billsToReceiveController');

const db = require('../models');
var express = require('express');
var router = express.Router();

const BillsToReceiveServices = new billsToReceiveServices(db.BillsToReceive, db.Department, db.CostCenter, db.movementBillsToReiceve);
const BillsToReceiveController = new billsToReceiveController(BillsToReceiveServices);

router.post('/receiveBill', function(req, res) {
    BillsToReceiveController.receiveBill(req, res);
});

router.post('/cancelBill', function(req, res) {
    BillsToReceiveController.cancelBill(req, res);
});


module.exports = router;