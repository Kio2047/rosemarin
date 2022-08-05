const User = require("../models/User");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const pass = req.body.password;
    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(pass, salt);

    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      const result = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: password,
      });
      req.session.sid = result.id;
      console.log("Here is the req.session: ", req.session);
      res.status(201).send("Success");
    } else {
      res.status(400).send("Account already exists.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Due to error user have not been saved" });
  }
};

const loginUser = async (req, res) => {
  try {
    const pass = req.body.password;
    let user = await User.findOne({ where: { email: req.body.email } });
    user = user.dataValues;
    console.log("Here is the user ", user.dataValues);

    if (user) {
      if (bcrypt.compareSync(pass, user.password)) {
        console.log("Here is the user in loginUser: ", user);
        req.session.sid = user.id;
        console.log("Login session: ", req.session);
        res.status(200);
        res.send(user);
      } else {
        res.status(401);
        res.send("invalid password");
      }
    } else {
      res.status(401);
      res.send("User does not exist");
    }
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};

const profileUser = async (req, res) => {
  try {
    res.status(200).send(req.user);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};

const logoutUser = (req, res) => {
  req.session.destroy((e) => {
    if (e) res.status(500).send("Something went wrong");
    else {
      res.clearCookie("sid");
      res.sendStatus(200);
    }
  });
};

module.exports = { createUser, loginUser, profileUser, logoutUser };
