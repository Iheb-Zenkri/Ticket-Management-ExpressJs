import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/db.config.js';

class Role extends Model {
    static associate(models) {
      Role.hasMany(models.User, { foreignKey: 'roleId' });
    }
  }

Role.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
});
  
export default Role;
