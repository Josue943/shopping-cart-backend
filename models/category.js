var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var categorySchema = new Schema({
  name: String
});

const Category = mongoose.model("Category", categorySchema);

exports.categorySchema = categorySchema;
exports.Category = Category;

//module.exports = mongoose.model('Category',categorySchema)
