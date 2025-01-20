import fs from 'fs';
import path from 'path';
import { Sequelize, DataTypes, ModelStatic } from 'sequelize';
import DbConfig from '../config/dbconfig'; 

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const db: { [key: string]: ModelStatic<any> | Sequelize | typeof Sequelize } = {};

let sequelize: Sequelize = DbConfig; 


fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      file.slice(-3) === '.ts' && 
      file.indexOf('.test.ts') === -1 
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file)).default(sequelize, DataTypes);
    db[model.name] = model;
  });

  Object.keys(db).forEach((modelName) => {
    const model = db[modelName];
    if (model && typeof model === 'object' && 'associate' in model) {
      (model as any).associate(db);
    }
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
