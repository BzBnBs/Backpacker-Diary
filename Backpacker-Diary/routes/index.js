var express = require('express');
const Travel = require('../models/travel');
var router = express.Router();
const Travel = require('../models/travel');


router.get('/', (req, res, next) => {

  Travel.find({}, (err, travels) => {

    if (err) { return next(err) }
    console.log('travels', travels)
    res.render('index', { travels });

  });
});

router.get('/new', (req, res, next) => {
  res.render('travels/new');
});


module.exports = router;
