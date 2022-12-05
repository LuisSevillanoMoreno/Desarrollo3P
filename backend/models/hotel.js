const mongoose = require('mongoose')

const hotelSchema = mongoose.Schema({
  title: {type: String, required: true}, //Mongoose.com
  content: {type: String, required: true},
  imagePath: {type: String, required: true}
});

module.exports = mongoose.model('Hotel', hotelSchema);
