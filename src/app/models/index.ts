// This is used to import all other models to sequelize

import {readdirSync} from 'fs';
import {basename as _basename, join} from 'path';

import Sequelize, {DataTypes} from 'sequelize';

const basename = _basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../../config/database.js')[env];

const db = {sequelize: Sequelize, Sequelize};

const sequelize = new Sequelize(process.env[config.use_env_variable], config);

/* It will read all model files and write to an object.
   The model name will be the file name. */
readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js' || file.slice(-3) === '.ts');
  })
  .forEach((file) => {
    const model = require(join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

// Associates name with model
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
