import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import User from './user';
import SLA from './sla';

@Table({ tableName: 'Tickets' }) // Define the table name explicitly
class Ticket extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  public id!: number;

  @Column(DataType.STRING)
  public title!: string;

  @Column(DataType.TEXT)
  public description!: string;

  @Column(DataType.STRING)
  public status!: string;

  @Column(DataType.STRING)
  public priority!: string;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public createdBy!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public assignedTo!: number;

  @ForeignKey(() => SLA)
  @Column(DataType.INTEGER)
  public slaId!: number
  
  @Column(DataType.DATE)
  public dueDate!: Date;

  // Associations
  @BelongsTo(() => User, { foreignKey: 'createdBy', as: 'creator' })
  public creator!: User;

  @BelongsTo(() => User, { foreignKey: 'assignedTo', as: 'assignee' })
  public assignee!: User;

  @BelongsTo(() => SLA, { foreignKey: 'slaId' })
  public sla!: SLA;
}

export default Ticket;
