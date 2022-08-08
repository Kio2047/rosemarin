import User from './User'
import {Request} from 'express'

declare module 'express' {
  export interface Request{
    user?: User,
    image?: any
  }
} 


/* export interface ExReq extends Request {
  user?: User,
  image?: any,
} */