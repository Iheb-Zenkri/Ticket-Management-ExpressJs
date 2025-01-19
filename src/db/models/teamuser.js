'use strict';
import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class TeamUser extends Model {}
  TeamUser.init({
    teamId: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'TeamUser',
  });
  return TeamUser;
};