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
  
  // Create a new Travel with the params

  const newTravel = new Travel(travelInfo);
  // Save the travel to the DB
  newTravel.save( (err) => {
    if (err) { return next(err) }
    // redirect to the list of travels if it saves
    return res.redirect('/travels');
  });
});



router.get('/:id', (req, res, next) => {
  const travelId = req.params.id;
  
  Travel.findById(travelId, (err, travel) => {
    if (err) { return next(err); }
    res.render('travels/trip', { travel });
  });
});


router.get('/:id/edit', (req, res, next) => {
  const travelId = req.params.id;
  
  Travel.findById(travelId, (err, travel) => {
    if (err) { return next(err); }
    res.render('travels/edit', { travel });
  });
});


router.post('/:id', (req, res, next) => {
  const travelId = req.params.id;
  
  /*
   * Create a new object with all of the information from the request body.
   * This correlates directly with the schema of Product
   */
  const updates = {
      place: req.body.place,
      title: req.body.title,
      date: req.body.date,
      imageUrl: req.body.imageUrl,
      description: req.body.description
  };
  
  Travel.findByIdAndUpdate(travelId, updates, (err, travel) => {
    if (err){ return next(err); }
    return res.redirect('/travels');
  });
});


router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Travel.findByIdAndRemove(id, (err, travel) => {
    if (err){ return next(err); }
    return res.redirect('/travels');
  });

});

router.get('/search', (req, res) => {
  let query = req.query.searchTerm;
  
  let queryRegex = new RegExp(query);
  // We use a Regex here to find items that are similar to the search
  // For instance if I searched "Yoga", I would then find the Yoga Mat
  Travel.find({ place: queryRegex }, (err, travels) => {
    if (err) { next(err) }
    res.render('travels/search', { travels });
  });
});


module.exports = router;