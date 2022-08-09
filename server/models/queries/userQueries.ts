import { UserType } from "../types/User";
import User from "../User";

async function findUser(email: string) {
  const user = await User.findOne({where: {email}})
  return user?.dataValues;
}

async function shouldCreateUser(email: string) {
  const user = await findUser(email);
  if (user) return false
  return true;
}

async function createUser(user: UserType) {
  const newUser = await User.create({
    ...user
  })
  return newUser
}

export default {findUser, shouldCreateUser, createUser}