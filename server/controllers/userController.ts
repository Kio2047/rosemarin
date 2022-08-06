import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10);

    const isPresent = await User.findOne({ where: { email } });
    if (!isPresent) {
      const user = await User.create({
        name,
        email, 
        password: hashedPassword,
      });
      req.session.sid = user.id;
      res.status(201).send("Success");
    } else {
      res.status(400).send("Account already exists.");
    }
  } catch (err) {
    console.log(err);
    res.status(500).send({ message: "Due to error user have not been saved" });
  }
};

const loginUser = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body
    let user = await User.findOne({ where: { email } });
    //Get the actual values:
    user = user.dataValues;

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        req.session.sid = user.id;
        res.status(200).json(user);
      } else {
        res.status(401).send("invalid password");
      }
    } else {
      res.status(401).send("User does not exist");
    }
  } catch (err) {
    console.log(err);
    res.status(500);
  }
};

const profileUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
};

const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((e) => {
    if (e) res.status(500).send("Something went wrong");
    else {
      res.clearCookie("sid");
      res.sendStatus(200);
    }
  });
};

export default { createUser, loginUser, profileUser, logoutUser };
