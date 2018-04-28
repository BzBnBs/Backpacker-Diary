const express = require('express');
const Travel = require('../models/travel');
const router  = express.Router();
const multer = require('multer');
const upload = multer({ dest: './public/uploads/' });

//Visualizar formulario para crear un travel nuevo
router.get('/new', (req, res, next) => {
  res.render('travels/new');
});

//Enviar formulario rellenado de un travel nuevo
router.post('/', upload.single('photo'), (req, res, next) => {
  
  // Take the params, and translate them into a new object
  const travelInfo = {
      place: req.body.place,
      title: req.body.title,
      date: req.body.date,
      imageUrl: req.body.imageUrl,
      description: req.body.description,
      picture: {
        pic_path: `../uploads/${req.file.filename}`,
        pic_name: `${req.file.originalname}.jpg`,
      },
      // pic_path: `/uploads/${req.file.filename}`,
      // pic_name: req.file.originalname
  };
  console.log("travelInfo");
  // Create a new Travel with the params

  const newTravel = new Travel(travelInfo);
  
  // Save the travel to the DB
  newTravel.save( (err) => {
    if (err) { return next(err) }
    // redirect to the list of travels if it saves
    return res.redirect('/');
  });
});


router.get('/search', (req, res, next) => {
  const searchId = req.query.searchTerm;
  
  Travel.find({ place: searchId }, (err, travels) => {
    if (err) { return next(err); }
    res.render('travels/search', { travels });
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


router.post('/:id', upload.single('photo'), (req, res, next) => {
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
      description: req.body.description,
      picture: {
        pic_path: `../uploads/${req.file.filename}`,
        pic_name: `${req.file.originalname}.jpg`,
    },
  };
  
  Travel.findByIdAndUpdate(travelId, updates, (err, travel) => {
    if (err){ return next(err); }
    return res.redirect(`/travels/${travelId}`);
  });
});


router.post('/:id/delete', (req, res, next) => {
  const id = req.params.id;

  Travel.findByIdAndRemove(id, (err, travel) => {
    if (err){ return next(err); }
    return res.redirect('/');
  });

});


module.exports = router;