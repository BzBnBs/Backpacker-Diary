const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TravelSchema = new Schema({
  place : String,
  title : String,
  date : Date,
  imageUrl : String,
  description : String,
});

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;
