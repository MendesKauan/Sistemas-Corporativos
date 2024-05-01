const userService = require('../services/userService'); //classe
const userController = require('../controllers/userContoroller');
const db = require('../models');
const { verifyToken } = require('../auth/authServices');

var express = require('express');
var router = express.Router();

const UserService = new userService(db.User); //Construção do objeto
const UserContoroller = new userController(UserService);


router.get('/', function(req, res, next) {
  res.send('modulo de usuario está rodando');
});

// rota para criar um novo usuario

router.post('/newUser', function(req, res) {
  UserContoroller.create(req, res);
});

router.get('/getAllUser', function(req, res) {
  UserContoroller.getAllUser(req, res);
})


router.get('/getUserById', verifyToken, function(req, res) {
  UserContoroller.getUserById(req, res);
})

router.post('/login', async (req, res) => {
  UserContoroller.login(req, res);
})

module.exports = router;
