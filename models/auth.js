var mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

var Schema = mongoose.Schema;

var userShema = new Schema({
  email: String,
  password: String,
  name: String,
  isAdmin: Boolean
});

//encriptar la pass
userShema.methods.encryptPassword = async password => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

//validate password
userShema.methods.validatePassword = function(password) {
  return bcrypt.compare(password, this.password); //comparamos y devolvemos un true o false
};

module.exports = mongoose.model("User", userShema);
