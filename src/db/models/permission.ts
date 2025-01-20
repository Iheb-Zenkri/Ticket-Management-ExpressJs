import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import RolePermission from './rolePermission';

@Table({ tableName: 'Permissions' })
class Permission extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  public id!: number;

  @Column({ type: DataType.STRING, allowNull: false, unique: true })
  public name!: string;

  @Column({ type: DataType.STRING, allowNull: true })
  public description!: string;

  @HasMany(() => RolePermission, { foreignKey: 'permissionId' })
  public rolePermissions!: RolePermission[];
}

export default Permission;
