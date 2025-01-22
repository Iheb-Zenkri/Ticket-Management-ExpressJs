
import dotenv from 'dotenv';
import User from '../models/user';
import Ticket from '../models/ticket';
import Team from '../models/team';
import TeamUser from '../models/teamuser';
import Role from '../models/role';
import SLA from '../models/sla';
import Notification from '../models/notification';
import { Sequelize } from 'sequelize-typescript';
import Permission from '../models/permission';
import RolePermission from '../models/rolePermission';

dotenv.config();

const sequelize = new Sequelize({
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql', 
  port: Number(process.env.DB_PORT) || 3306,
  models:[User,
    Ticket,
    SLA,
    Team,
    TeamUser,
    Role,
    Permission,
    RolePermission,
    Notification],
});

sequelize.authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

export default sequelize;
