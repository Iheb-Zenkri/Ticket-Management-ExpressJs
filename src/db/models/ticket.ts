import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config/dbconfig'; 
import User from './user'; 
import SLA from './sla'; 

// Define the attributes for the Ticket model
interface TicketAttributes {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: string;
  createdBy: number;
  assignedTo: number;
  dueDate: Date;
}

interface TicketCreationAttributes extends Optional<TicketAttributes, 'id'> {}

class Ticket extends Model<TicketAttributes, TicketCreationAttributes> implements TicketAttributes {
  public id!: number;
  public title!: string;
  public description!: string;
  public status!: string;
  public priority!: string;
  public createdBy!: number;
  public assignedTo!: number;
  public dueDate!: Date;

  // The `associations` property will be populated by Sequelize
  public static associations: {
    creator: Association<Ticket, User>;
    assignee: Association<Ticket, User>;
    sla: Association<Ticket, SLA>;
  };

  // Define associations here
  static associate(models: any) {
    Ticket.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
    Ticket.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignee' });
    Ticket.belongsTo(models.SLA, { foreignKey: 'slaId' });
  }
}

// Initialize the Ticket model
Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },  
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    priority: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Ticket',
  }
);

export default Ticket;
