const express = require('express');
const router = express.Router();
const   validateCredentials = require("../middlewares/validatecredentials");
const users = require("../controllers/users");
const fs = require("fs");
/* GET home page. */
router.post('/write', validateCredentials, users.adduser );
router.get('/all',users.getuser);

router.get('/latest',users.getlatest);

// router.get('/all');

router.get('/:id([0-9]+)',users.getone);

module.exports = router;
