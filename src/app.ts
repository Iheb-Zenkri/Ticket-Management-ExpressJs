import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import { rateLimiter } from './middlewares/rateLimit';
import router from './routes/index'; 

dotenv.config(); 

const app = express();

app.use(cors()); 
app.use(express.json()); 
app.use(morgan('dev')); 
app.use(rateLimiter);

app.use('/', router);


export default app;
