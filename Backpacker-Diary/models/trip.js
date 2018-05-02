const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TripSchema = new Schema({
  name: String,
  date_start: Date,
  date_end: Date,
  // imageUrl : String,
  travels: [],
  picture: {
    pic_path: { type: String },
    pic_name: { type: String },
  },
}, {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }
  });

const Travel = mongoose.model('Travel', TravelSchema);
module.exports = Travel;
