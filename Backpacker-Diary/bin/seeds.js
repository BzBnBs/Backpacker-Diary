// bin/seeds.js

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/backpacker-diaries')
  .then(() => console.log('MongoDb connected...'))
  .catch(err => console.log(err));



const Travel = require('../models/travel');

const travels = [
    {
        place : 'Amsterdam',
        title : 'Party and drinks',
        date : 'Sun Dec 08 07:15:44 UTC 2013',
        imageUrl : 'http://i.imgur.com/XtpFrW7.jpg',
        description : 'Me divertí mucho, fue una experiencia increible, en la que conocí mucha gente.',
    },

    {
        place : 'London',
        title : 'All Museums',
        date : 'Mon Dec 09 10:25:44 UTC 2013',
        imageUrl : 'http://i.imgur.com/5ICGeY0.jpg',
        description : 'La gente de Londres era muy callada y no paraba de llover.',
    },

    {
        place : 'Paris',
        title : 'City and love',
        date : 'Wed Dec 11 18:15:44 UTC 2013',
        imageUrl : 'http://media.gq.com/photos/57c6f39209f7003c4afd2c4d/3:2/w_800/drink_gallery5.546e2142f4c6.jpg',
        description : 'Una ciudad llena de minumentos en la que se respiraba el amor en aire.',
    },

];


function insertData() {
    travels.forEach((trav) => {
        Travel.create(trav, (err, doc) => {
            if (err) {
                console.log(err);
            } else {
                console.log('documento insertado')
            }
        })

    });
}

insertData();

// Travel.create(travels, (err, docs) => {
//     if (err) {
//       throw err;
//     }
  
//     docs.forEach((travel) => {
//       console.log(travel.title)
//     });
//     mongoose.connection.close();
//   });