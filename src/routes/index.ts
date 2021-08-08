const express = require('express');
const router  = express.Router();

const todoRauter = require('./TodoRauter')
const tagRauter = require('./TagRauter')
const bodyParser = require('body-parser')

router.use('/todo', todoRauter) 
router.use('/tag', tagRauter) 

module.exports = router