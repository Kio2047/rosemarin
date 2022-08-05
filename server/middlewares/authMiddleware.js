const User = require("../models/User.js");

const authMiddleware = async (req, res, next) => {
  try {
    const uid = req.session.sid;
    console.log("Session in auth: ", req.session);

    if (uid) {
      req.user = await User.findByPk(uid);
      console.log("Req user in auth: ", req.user);
      next();
    } else {
      res.status(403);
      res.send("Not authorized");
    }
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
};

module.exports = authMiddleware;
