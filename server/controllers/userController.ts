import bcrypt from "bcryptjs";
import { Request, Response } from "express";

import Model from '../models/queries/userQueries'

async function createUser (req: Request, res: Response) {
  try {
    const {name, email, password} = req.body
    const hashedPassword = bcrypt.hashSync(password, 10);

    if (await Model.shouldCreateUser(email)) {
      const newUser = await Model.createUser({name, email, password: hashedPassword})
      req.session.sid = newUser.id;

      console.log('userController, createUser successful 🟢'); 
      res.status(201).send('Success')
    } else {
      res.status(400).send("Account already exists.");
    }
  } catch (error) {
    console.log('userController, createUser error 🔴: ', error);
    res.status(500).send({ message: "Due to error user have not been saved" });
  }
};

async function loginUser (req: Request, res: Response) {
  try {
    const {email, password} = req.body
    const user = await Model.findUser(email);

    if (user) {
      if (passwordsMatch(password, user.password)) {
        req.session.sid = user.id;

        console.log('userController, loginUser successful 🟢')        
        res.status(200).json(user);
      } else {
        console.log('userController, Invalid password 🔴');
        res.status(401).send("invalid password");
      }
    } else {
      console.log('userController, User does not exist 🔴');
      res.status(401).send("User does not exist");
    }
  } catch (error) {
    console.log('userController, loginUser error: 🔴', error);
    res.status(500);
  }
};

function logoutUser (req: Request, res: Response) {
  req.session.destroy((error) => {
    if (error) {
      console.log('userController, logoutUser error 🔴: ', error)
      res.status(500).send("Session error");
    }
    else {
      res.clearCookie("sid");
      res.sendStatus(200);
    }
  });
};

function passwordsMatch(password: string, hash: string){
  return bcrypt.compareSync(password, hash);
}

export default { createUser, loginUser, logoutUser };
