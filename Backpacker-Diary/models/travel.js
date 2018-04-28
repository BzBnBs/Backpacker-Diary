const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const TravelSchema = new Schema({
  place : String,
  title : String,
  date : Date,
  // imageUrl : String,
  description : String,
  picture: {
    pic_path: { type: String },
    pic_name: { type: String },
  },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
});

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;
