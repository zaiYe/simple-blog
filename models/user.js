const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  userName: {type: String, require: true},
  email: String,
  password: String,
  created_at: {type: Date, default: Date.now},
  update_at: {type: Date, default: Date.now}
});

module.exports = mongoose.model('User', userSchema);

