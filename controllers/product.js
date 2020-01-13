const Product = require("../models/product");
const { Category } = require("../models/category");

var controller = {
  createProduct: async function(req, res) {
    if (!req.user.isAdmin) return res.status(403).send("You need permissions");
    const { name, price, categoryId, image } = req.body;
    if (categoryId === "") return res.status(400).send("Select a category");
    const category = await Category.findById(categoryId);
    if (!category) return res.status(400).send("Invalid category.");

    const product = new Product({
      name,
      price,
      category: {
        _id: category._id,
        name: category.name
      },
      image
    });
    await product.save();

    res.send(product);
  },

  getProducts: async function(req, res) {
    const products = await Product.find();
    res.send(products);
  },

  getProduct: async function(req, res) {
    const { id } = req.params;

    Product.findById(id, (err, product) => {
      if (err)
        return res
          .status(404)
          .send("The product with the given ID was not found");
      return res.status(200).send(product);
    });
  },

  updateProduct: async function(req, res) {
    const { id } = req.params;
    const update = req.body;
    const category = await Category.findById(update.categoryId);

    if (!category) return res.status(404).send("invalid category");

    const product = await Product.findByIdAndUpdate(id, update, { new: true });

    if (!product)
      return res
        .status(404)
        .send("The product with the given ID was not found");
    return res.status(200).send(product);
  },

  deleteProduct: async function(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByIdAndRemove(id);
      return res.status(200).send(product);
    } catch (error) {
      return res
        .status(404)
        .send("The product with the given ID was not found");
    }
  }
};

module.exports = controller;
