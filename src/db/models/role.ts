import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import User from './user';
import RolePermission from './rolePermission';

@Table({ tableName: 'Roles' })
class Role extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  public id!: number;

  @Column(DataType.STRING)
  public name!: string;

  @HasMany(() => User, { foreignKey: 'roleId' })
  public users!: User[];

  @HasMany(() => RolePermission, { foreignKey: 'roleId' })
  public rolePermissions!: RolePermission[];
}

export default Role;
