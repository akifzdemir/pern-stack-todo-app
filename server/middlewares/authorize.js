const jwt = require('jsonwebtoken')
require("dotenv").config({path:__dirname+'/./../../.env'})
module.exports = function(req, res, next) {
   
    const token = req.header("jwt_token");
    if (!token) {
      return res.status(403).json({ msg: "authorization denied" });
    }
   
    try {
      const verify = jwt.verify(token, process.env.jwtSecret);
      req.user = verify.user;
      next();
    } catch (err) {
      res.status(401).json({ msg: "Token is not valid" });
      
    }
  };