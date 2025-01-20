import { Model, DataTypes, Optional, Association } from 'sequelize';
import sequelize from '../config/dbconfig'; 
import User from './user'; 
import Ticket from './ticket';

interface NotificationAttributes {
  id: number;
  message: string;
  userId: number;
  ticketId: number;
  isRead: boolean;
}

interface NotificationCreationAttributes extends Optional<NotificationAttributes, 'id'> {}

class Notification extends Model<NotificationAttributes, NotificationCreationAttributes> implements NotificationAttributes {
  public id!: number;
  public message!: string;
  public userId!: number;
  public ticketId!: number;
  public isRead!: boolean;

  public static associations: {
    user: Association<Notification, User>;
    ticket: Association<Notification, Ticket>;
  };

  static associate(models: any) {
    Notification.belongsTo(models.User, { foreignKey: 'userId' });
    Notification.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
  }
}

Notification.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    ticketId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'Notifications'
  }
);

export default Notification;