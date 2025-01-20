import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';
import User from './user'; 

@Table({ tableName: 'Roles' }) // Define the table name explicitly
class Role extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  public id!: number;
  
  @Column(DataType.STRING)
  public name!: string;

  @HasMany(() => User, { foreignKey: 'roleId' })
  public users!: User[];
}

export default Role;
