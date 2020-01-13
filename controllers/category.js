const { Category } = require("../models/category");

var controller = {
  createCategory: async function(req, res) {
    const { name } = req.body;

    if (!name) return res.status(404).send("Name is required");
    const category = new Category({ name });

    await category.save();
    res.send(category);
  },

  getCategories: async function(req, res) {
    const categories = await Category.find();
    res.send(categories);
  }
};

module.exports = controller;
