const User = require("../models/auth");
const jwt = require("jsonwebtoken");
const secretKey = "mysecretkey";

var controller = {
  register: async function(req, res) {
    const { name, email, password } = req.body;
    const user = new User({
      name,
      email,
      password,
      isAdmin: false
    });

    const exist = await User.find({ email: email });

    if (exist.length) {
      return res.status(400).send("User already exist");
    }

    user.password = await user.encryptPassword(user.password);
    await user.save();
    const token = jwt.sign(
      { name: user.name, email: user.email, isAdmin: user.isAdmin },
      secretKey
    );

    return res.status(200).send({ token });
  },

  login: async function(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    //si no existe
    if (!user) return res.status(405).send("The email does not exist");

    const validatePassword = await user.validatePassword(password);
    //si devuelve false
    if (!validatePassword) {
      return res.status(401).send("Password is incorrect");
    }

    //si existe
    const token = jwt.sign(
      {
        id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin
      },
      secretKey
    );
    return res.status(200).send({ token });
  },

  getUser: async function(req, res) {
    const { token } = req.body;
    //var Token = token.replace(/['"]+/g,'')

    try {
      var user = jwt.verify(token, secretKey);
      return res.send(user);
    } catch (error) {
      return res.status(400).send("invalid token");
    }
  }
};

module.exports = controller;
