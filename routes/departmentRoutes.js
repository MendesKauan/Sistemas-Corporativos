const departmentService =  require('../services/departmentService');
const departmentController = require('../controllers/departmentController');
const productMovementService = require('../services/productMovementService');
const proposalsService = require('../services/proposalsService');
const purchasesService = require('../services/purchasesService');
const db = require('../models');

var express = require('express');
var router = express.Router();

const ProductMovementService = new productMovementService(db.ProductMovement, db.Product, db.Deposit);
const ProposalsService = new proposalsService(db.Proposals, db.Supplier, db.Product, db.User)
const PurchasesService = new purchasesService(db.Purchases);

const DepartmentService = new departmentService(db.Department, db.CostCenter, ProductMovementService, ProposalsService, db.Proposals, db.Product, PurchasesService);
const DepartmentController = new departmentController(DepartmentService);

router.post('/createDepartment', function(req, res) {
    DepartmentController.create(req, res);
});

router.post('/materialRequisition', function(req, res) {
    DepartmentController.materialRequisition(req, res);
});

router.get('/menor', function(req,res) {
    DepartmentController.buyMaterial(req, res);
})








module.exports = router;