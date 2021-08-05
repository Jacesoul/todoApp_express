const express = require('express');
const router  = express.Router();

const todoRauter = require('./TodoRauter')
const bodyParser = require('body-parser')

router.use('/todo', todoRauter) 

module.exports = router