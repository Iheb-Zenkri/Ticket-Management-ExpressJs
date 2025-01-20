import { Table, Column, Model, BelongsToMany, DataType } from 'sequelize-typescript';
import User from './user';
import TeamUser from './teamuser';

@Table({ tableName: 'Teams' }) 
class Team extends Model {
  addUsers(arg0: User[]) {
    throw new Error('Method not implemented.');
  }
  getUsers() {
    throw new Error('Method not implemented.');
  }
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  public id!: number;

  @Column(DataType.STRING)
  public name!: string;

  @BelongsToMany(() => User, () => TeamUser)
  public users!: User[];
}

export default Team;
