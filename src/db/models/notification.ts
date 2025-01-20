import { Table, Column, Model, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import User from './user';
import Ticket from './ticket';

@Table({ tableName: 'Notifications' })
class Notification extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ allowNull: false, type: DataType.STRING })
  public message!: string;

  @ForeignKey(() => User)
  @Column({ allowNull: false, type: DataType.INTEGER })
  public userId!: number;

  @ForeignKey(() => Ticket)
  @Column({ allowNull: false, type: DataType.INTEGER })
  public ticketId!: number;

  @Column({ allowNull: false, type: DataType.BOOLEAN, defaultValue: false })
  public isRead!: boolean;

  @BelongsTo(() => User)
  public user!: User;

  @BelongsTo(() => Ticket)
  public ticket!: Ticket;
}

export default Notification;
