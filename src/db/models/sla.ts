import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript';
import Ticket from './ticket';

export enum Priority {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  URGENT = 'Urgent',
}

@Table
class SLA extends Model {
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.INTEGER })
  public id!: number;

  @Column({ 
    allowNull: false, 
    type: DataType.ENUM(...Object.values(Priority)) // Sequelize ENUM with allowed values from the Priority enum
  })
  public priority!: Priority;

  @Column({ allowNull: false, type: DataType.DATE })
  public timeToRespond!: number;

  @Column({ allowNull: false, type: DataType.DATE })
  public timeToResolve!: number;

  @HasMany(() => Ticket, { foreignKey: 'slaId' })
  public tickets!: Ticket[];
}

export default SLA;
