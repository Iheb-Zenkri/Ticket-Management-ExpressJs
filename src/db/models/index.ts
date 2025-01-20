import fs from 'fs';
import path from 'path';
import { Sequelize } from 'sequelize-typescript'; 
import sequelize from '../config/dbconfig'; 

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';

const db: { [key: string]: any } = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf('.') !== 0 && 
      file !== basename && 
      (file.endsWith('.ts') || file.endsWith('.js')) && 
      file.indexOf('.test.ts') === -1 
    );
  })
  .forEach((file) => {
    const modelPath = path.join(__dirname, file);
    const model = require(modelPath).default || require(modelPath);

    if (model.name) {
      db[model.name] = model;
    }
  });


  Object.keys(db).forEach((modelName) => {
  const model = db[modelName];
  if (model && typeof model.associate === 'function') {
    model.associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
