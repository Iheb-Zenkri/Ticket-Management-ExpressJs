import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbconfig'; 
interface TeamUserAttributes {
  teamId: number;
  userId: number;
}

interface TeamUserCreationAttributes extends Optional<TeamUserAttributes, 'teamId' | 'userId'> {}

class TeamUser extends Model<TeamUserAttributes, TeamUserCreationAttributes> implements TeamUserAttributes {
  public teamId!: number;
  public userId!: number;
}

// Initialize the TeamUser model
TeamUser.init(
  {
    teamId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'TeamUser',
    tableName: 'TeamUsers'
  }
);

export default TeamUser;
