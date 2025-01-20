import { Sequelize, DataTypes, Model, Optional, Association } from 'sequelize';
import sequelize from '../config/dbconfig';
import Role from './role'; 
import Ticket from './ticket';
import Team from './team';

interface UserAttributes {
  id: number;
  name: string;
  email: string;
  password: string;
  roleId: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public roleId!: number;

  public static associations: {
    role: Association<User, Role>;
    createdTickets: Association<User, Ticket>;
    assignedTickets: Association<User, Ticket>;
    teams: Association<User, Team>;
  };

  static associate(models: any) {
    User.belongsTo(models.Role, { foreignKey: 'roleId' });
    User.hasMany(models.Ticket, { foreignKey: 'createdBy', as: 'createdTickets' });
    User.hasMany(models.Ticket, { foreignKey: 'assignedTo', as: 'assignedTickets' });
    User.belongsToMany(models.Team, {
      through: 'TeamUser',
      foreignKey: 'userId',
      otherKey: 'teamId',
    });
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    roleId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
  }
);

export default User;
