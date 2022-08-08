import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

export default interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // Some fields are optional when calling User.create() or User.build()
    id?: CreationOptional<number>;
    name: string;
    email: string;
    password: string;
    dataValues?: User;
}