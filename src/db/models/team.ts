import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config/dbconfig'; 
import User from './user'; 

interface TeamAttributes {
  id: number;
  name: string;
}

interface TeamCreationAttributes extends Optional<TeamAttributes, 'id'> {}

class Team extends Model<TeamAttributes, TeamCreationAttributes> implements TeamAttributes {
  public id!: number;
  public name!: string;

  public static associations: {
    users: Association<Team, User>;
  };

  // Define associations here
  static associate(models: any) {
    Team.belongsToMany(models.User, {
      through: 'TeamUser',
      foreignKey: 'teamId',
      otherKey: 'userId',
    });
  }
}

Team.init(
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
  },
  {
    sequelize,
    modelName: 'Team',
  }
);

export default Team;
