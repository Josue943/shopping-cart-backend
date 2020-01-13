const jwt = require("jsonwebtoken");
const secretKey = "mysecretkey";

exports.ensureAuth = function(req, res, next) {
  //revisar
  if (!req.headers.authorization) {
    return res.status(403).send({
      message: "You need permissions to access this content"
    });
  }
  //limpiar los caracteres
  var token = req.headers.authorization.replace(/['"]+/g, "");

  try {
    //comprobamos
    //con esto decodificamos
    var user = jwt.verify(token, secretKey);
  } catch (ex) {
    return res.status(404).send("Invalid token");
  }
  //para pasar a la siguiente
  req.user = user;
  next();
};
