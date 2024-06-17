const clientService = require('../services/clientService');
const clientController = require('../controllers/clientController');

const db = require('../models');
var express = require('express');
var router = express.Router();

const ClientService = new clientService(db.Client);
const ClientController = new clientController(ClientService);

router.post('/newClient', function(req, res) {
    ClientController.create(req, res);
});


module.exports = router;