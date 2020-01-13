var mongoose = require("mongoose");
const { categorySchema } = require("./category");
var Schema = mongoose.Schema;

var productSchema = new Schema({
  name: String,
  price: Number,
  category: categorySchema,
  image: String
});

module.exports = mongoose.model("Product", productSchema);
