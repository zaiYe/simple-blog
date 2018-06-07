const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
  auth: {type: String, default: '无名氏'},
  title: String,
  content: String,
  created_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('Post', postSchema);

