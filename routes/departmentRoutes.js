const departmentService =  require('../services/departmentService');
const departmentController = require('../controllers/departmentController');
const db = require('../models');

var express = require('express');
var router = express.Router();

const DepartmentService = new departmentService(db.Department, db.CostCenter);
const DepartmentController = new departmentController(DepartmentService);

router.post('/createDepartment', function(req, res) {
    DepartmentController.create(req, res);
});








module.exports = router;