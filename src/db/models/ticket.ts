import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import User from './user';
import SLA from './sla';

export enum TicketStatus {
  OPEN = 'Open',
  IN_PROGRESS = 'In Progress',
  RESOLVED = 'Resolved',
  CLOSED = 'Closed',
  ON_HOLD = 'On Hold',
  CANCELLED = 'Cancelled',
}

@Table({ tableName: 'Tickets' }) 
class Ticket extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  public id!: number;

  @Column(DataType.STRING)
  public title!: string;

  @Column(DataType.TEXT)
  public description!: string;

  @Column({
    type: DataType.ENUM(...Object.values(TicketStatus)),
    allowNull: false,
  })
  public status!: TicketStatus;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public createdBy!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public assignedTo!: number;

  @ForeignKey(() => SLA)
  @Column(DataType.INTEGER)
  public slaId!: number;

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
