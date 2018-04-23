var express = require('express');
var router = express.Router();
const Travel = require('../models/travel');

/* GET home page. */

router.get('/', (req, res, next) => {
  Travel.find({}, (err, travels) => {
    if (err) { return next(err) }
    res.render('index', { travels });
  });
});


module.exports = router;
