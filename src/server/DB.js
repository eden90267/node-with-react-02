const mongoose = require('mongoose');
mongoose.connect(require('../config').dbURL, (err) => {
  if (err) throw err;
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('connect mongo'));

// 用戶註冊
exports.User = mongoose.model('users', new mongoose.Schema({
  account:{type: String, unique: true},
  password: String,
  email: String,
  name: String,
  RegistedDate: String
}));