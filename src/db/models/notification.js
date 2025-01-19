'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Notification extends Model {
    static associate(models) {
      Notification.belongsTo(models.User, { foreignKey: 'userId' });
      Notification.belongsTo(models.Ticket, { foreignKey: 'ticketId' });
    }
  }
  Notification.init({
    message: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    ticketId: DataTypes.INTEGER,
    isRead: DataTypes.BOOLEAN,
    createdAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Notification',
  });
  return Notification;
};