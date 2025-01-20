import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config/dbconfig'; 
import Ticket from './ticket';

interface SLAAttributes {
  id: number;
  priority: string;
  timeToRespond: number;
  timeToResolve: number;
}

interface SLACreationAttributes extends Optional<SLAAttributes, 'id'> {}

class SLA extends Model<SLAAttributes, SLACreationAttributes> implements SLAAttributes {
  public id!: number;
  public priority!: string;
  public timeToRespond!: number;
  public timeToResolve!: number;

  public static associations: {
    tickets: Association<SLA, Ticket>;
  };

  static associate(models: any) {
    SLA.hasMany(models.Ticket, { foreignKey: 'slaId' });
  }
}


SLA.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, 
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    timeToRespond: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    timeToResolve: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'SLA',
  }
);

export default SLA;
