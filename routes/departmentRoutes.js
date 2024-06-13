const departmentService =  require('../services/departmentService');
const departmentController = require('../controllers/departmentController');
const productMovementService = require('../services/productMovementService');
const proposalsService = require('../services/proposalsService');
const purchasesService = require('../services/purchasesService');
const billsToPayService = require('../services/billsToPayService');
const movementBillsToPayService = require('../services/movementBillsToPayService');
const db = require('../models');

var express = require('express');
var router = express.Router();

const ProductMovementService = new productMovementService(db.ProductMovement, db.Product, db.Deposit);
const ProposalsService = new proposalsService(db.Proposals, db.Supplier, db.Product, db.User);
const PurchasesService = new purchasesService(db.Purchases);
const MovementBillsToPayService = new movementBillsToPayService(db.movementBillsToPay);
const BillsToPayService = new billsToPayService(db.BillsToPay, MovementBillsToPayService);


const DepartmentService = new departmentService(db.Department, db.CostCenter, ProductMovementService, ProposalsService, db.Proposals, db.Product, PurchasesService, BillsToPayService, db.BillsToPay);

const DepartmentController = new departmentController(DepartmentService);

router.post('/createDepartment', function(req, res) {
    DepartmentController.create(req, res);
});

router.post('/materialRequisition', function(req, res) {
    DepartmentController.materialRequisition(req, res);
});

router.get('/buyMaterial', function(req,res) {
    DepartmentController.buyMaterial(req, res);
});



module.exports = router;