import { Model, DataTypes, CreationOptional, InferAttributes, InferCreationAttributes } from 'sequelize';

// We recommend you declare an interface for the attributes, for stricter typechecking

export default interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
    // Some fields are optional when calling UserModel.create() or UserModel.build()
    id?: CreationOptional<number>;
    name: string;
    email: string;
    password: string;
}