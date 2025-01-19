'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class SLA extends Model {
    static associate(models) {
      SLA.hasMany(models.Ticket, { foreignKey: 'slaId' });
    }
  }
  SLA.init({
    priority: DataTypes.STRING,
    timeToRespond: DataTypes.INTEGER,
    timeToResolve: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SLA',
  });
  return SLA;
};