import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import Role from './role';
import Permission from './permission';

@Table({ tableName: 'RolePermissions' })
class RolePermission extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  public id!: number;

  @ForeignKey(() => Role)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public roleId!: number;

  @ForeignKey(() => Permission)
  @Column({ type: DataType.INTEGER, allowNull: false })
  public permissionId!: number;

  @BelongsTo(() => Role, { foreignKey: 'roleId' })
  public role!: Role;

  @BelongsTo(() => Permission, { foreignKey: 'permissionId' })
  public permission!: Permission;
}

export default RolePermission;
