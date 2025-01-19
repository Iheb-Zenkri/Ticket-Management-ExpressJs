'use strict';
import { Model } from 'sequelize';
export default (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.User, { foreignKey: 'createdBy', as: 'creator' });
      Ticket.belongsTo(models.User, { foreignKey: 'assignedTo', as: 'assignee' });
      Ticket.belongsTo(models.SLA, { foreignKey: 'slaId' });
    }
  }
  Ticket.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING,
    priority: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    assignedTo: DataTypes.INTEGER,
    dueDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};