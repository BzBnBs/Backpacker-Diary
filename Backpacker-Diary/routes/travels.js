const express = require('express');
const Travel = require('../models/travel');

const router  = express.Router();


router.get('/', (req, res, next) => {

    Travel.find({}, (err, travels) => {

      if (err) { return next(err) }
      console.log('travels', travels)
      res.render('travels/index', { travels });

      console.log("viaje realizado")
    });
  });

router.get('/new', (req, res, next) => {
  res.render('travels/new');
});



router.post('/', (req, res, next) => {
  // Take the params, and translate them into a new object
  const travelInfo = {
      place: req.body.place,
      title: req.body.title,
      date: req.body.date,
      imageUrl: req.body.imageUrl,
      description: req.body.description
  };
  
  // Create a new Product with the params

  const newTravel = new Travel(travelInfo);
  // Save the product to the DB
  newTravel.save( (err) => {
    if (err) { return next(err) }
    // redirect to the list of products if it saves
    return res.redirect('/travels');
  });
});


module.exports = router;