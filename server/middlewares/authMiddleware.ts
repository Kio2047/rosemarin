import UserModel from "../models/User";
import {NextFunction, Request, Response} from 'express'
/// <reference> session.d.ts
import * as express from '../models/types/request'
import User from "../models/types/User";

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const UserId = req.session.sid;
    console.log("Session in auth (NEEDS A SID PROP, OTHERWISE 403) ", req.session);

    if (UserId) {
      req.user = (await UserModel.findByPk(UserId)) as User;
      console.log("Req user in auth: ", req.user);
      next();
    } else {
      res.status(403).send("Not authorized");
    }
  } catch (error) {
    console.log(error);
    res.status(401).end();
  }
};

export default authMiddleware;
