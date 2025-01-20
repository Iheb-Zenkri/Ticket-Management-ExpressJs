import { Table, Column, Model, PrimaryKey, AutoIncrement, ForeignKey, BelongsTo, BelongsToMany, HasMany, DataType } from 'sequelize-typescript';
import Role from './role';
import Ticket from './ticket';
import Team from './team';
import TeamUser from './teamuser'; 

@Table({ tableName: 'Users', timestamps: true })
class User extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER) 
  public id!: number;

  @Column(DataType.STRING)
  public name!: string;

  @Column(DataType.STRING)
  public email!: string;

  @Column(DataType.STRING)
  public password!: string;

  @ForeignKey(() => Role)
  @Column(DataType.INTEGER)
  public roleId!: number;

  @BelongsTo(() => Role)
  public role!: Role;

  @HasMany(() => Ticket, { foreignKey: 'createdBy', as: 'createdTickets' })
  public createdTickets!: Ticket[];

  @HasMany(() => Ticket, { foreignKey: 'assignedTo', as: 'assignedTickets' })
  public assignedTickets!: Ticket[];

  @BelongsToMany(() => Team, () => TeamUser) 
  public teams!: Team[];
}

export default User;
