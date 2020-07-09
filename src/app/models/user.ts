// Only for Lint could be erase
// eslint-disable-next-line no-unused-vars
// import {Sequelize, DataTypes} from "sequelize";

// const UserModel = (sequelize: Sequelize, dataTypes: typeof DataTypes) => {
//   const User = sequelize.define('User', {
//     name: dataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//   });

//   return User;
// };

// export default UserModel;

import {Instance, Sequelize, Model, DataTypes} from 'sequelize';
import {SequelizeAttributes} from 'sequelize';


export interface UserAttributes {
  id?: number;
  name: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface UserInstance extends Instance<UserAttributes>, UserAttributes { }

const UserFactory = (sequelize: Sequelize): Model<UserInstance, UserAttributes> => {
  const attributes: SequelizeAttributes<UserAttributes> = {
    name: {
      type: DataTypes.STRING,
    },
  };

  const User = sequelize.define<UserInstance, UserAttributes>('User', attributes);

  return User;
};

export default UserFactory;
