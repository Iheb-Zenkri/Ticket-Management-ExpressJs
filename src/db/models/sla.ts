import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Ticket from './ticket';

@Table
class SLA extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ allowNull: false, type: DataType.STRING })
  public priority!: string;

  @Column({ allowNull: false, type: DataType.INTEGER })
  public timeToRespond!: number;

  @Column({ allowNull: false, type: DataType.INTEGER })
  public timeToResolve!: number;

  // Define associations here
  @HasMany(() => Ticket, { foreignKey: 'slaId' })
  public tickets!: Ticket[];
}

export default SLA;
