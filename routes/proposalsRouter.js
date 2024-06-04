const db = require('../models');
var express = require('express');
var router = express.Router();

const proposalsService = require('../services/proposalsService');
const proposalsController = require('../controllers/proposalsController');

const ProposalsService = new proposalsService(db.Proposals, db.Supplier, db.Product, db.User);
const ProposalsController = new proposalsController(ProposalsService);

router.post('/newProposals', function(req, res) {
    ProposalsController.create(req, res);
});


module.exports = router;