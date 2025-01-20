import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { rateLimiter } from './middlewares/rateLimit';
import router from './routes/index'; 
import sequelize from './db/config/dbconfig';

dotenv.config(); 

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); 
app.use(rateLimiter);

sequelize.sync({ force: false, alter: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });

app.use('/', router);


export default app;
