import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes/index'; 
import sequelize from './db/config/dbconfig';
import bodyParser from 'body-parser';

dotenv.config(); 

const app = express();

app.use(cors()); 
app.use(bodyParser.json({ limit: '50mb', type: 'application/json' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use('/', router);

sequelize.sync({ force: false, alter: false })
  .then(() => {
    console.log('Database synced');
  })
  .catch((error) => {
    console.error('Error syncing the database:', error);
  });



const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

