import { Table, Column, Model, ForeignKey, DataType, BelongsTo } from 'sequelize-typescript';
import User from './user';
import Team from './team';

@Table({ tableName: 'TeamUsers' })
class TeamUser extends Model {
  @ForeignKey(() => Team)
  @Column(DataType.INTEGER)
  public teamId!: number;

  @ForeignKey(() => User)
  @Column(DataType.INTEGER)
  public userId!: number;

  // Define associations here
  @BelongsTo(() => User, { foreignKey: 'userId' })
  public user!: User;

  @BelongsTo(() => Team, { foreignKey: 'teamId' })
  public team!: Team;
}

export default TeamUser;
