const express = require('express');
const Travel = require('../models/travel');

const router  = express.Router();


router.get('/', (req, res, next) => {

    Travel.find({}, (err, travels) => {

      if (err) { return next(err) }

      res.render('travels/index', {

        travels : travels
       
      });
      console.log("viaje realizado")
    });
  });



module.exports = router;