'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
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
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    roleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};