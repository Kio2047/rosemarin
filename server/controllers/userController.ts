import bcrypt from "bcryptjs";
import { Request, Response } from "express";

/* import '../types/request'; */
import UserModel from "../models/User";

const createUser = async (req: Request, res: Response) => {
  try {
    const {name, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10);

    const isPresent = await UserModel.findOne({ where: { email } });
    if (!isPresent) {
      const user = await UserModel.create({
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
    let result = await UserModel.findOne({ where: { email } });
    //Get the actual values:
    const user = result?.dataValues;

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

/* const profileUser = async (req: Request, res: Response) => {
  try {
    res.status(200).json(req.user);
  } catch (err) {
    res.status(500);
    console.log(err);
  }
}; */

const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((e) => {
    if (e) res.status(500).send("Something went wrong");
    else {
      res.clearCookie("sid");
      res.sendStatus(200);
    }
  });
};

export default { createUser, loginUser, logoutUser };
