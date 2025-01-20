
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const DbConfig = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql', 
  port: Number(process.env.DB_PORT) || 3306,
});

DbConfig.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default DbConfig;
