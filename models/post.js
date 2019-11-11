const mongoose = require('mongoose');
const Schema = mongoose.Schema;

  var PostSchema = new Schema({
    title: String,
    body: String,
    date: { type: Date, default: Date.now }
  });

module.exports = mongoose.model('Post', PostSchema);