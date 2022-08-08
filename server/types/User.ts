import { Model, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// We recommend you declare an interface for the attributes, for stricter typechecking

export default interface User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
    // Some fields are optional when calling User.create() or User.build()
    id?: CreationOptional<number>;
    name: string;
    email: string;
    password: string;
    dataValues?: User;
}