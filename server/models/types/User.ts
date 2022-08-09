import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    // Some fields are optional when calling User.create() or User.build()
    id?: number;
    name: string;
    email: string;
    password: string;
    dataValues?: UserType;
}


export interface UserType {
    // Some fields are optional when calling User.create() or User.build()
    id?: number;
    name: string;
    email: string;
    password: string;
    dataValues?: UserType;
}