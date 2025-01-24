import { CreateTeamDTO, UpdateTeamDTO, TeamWithAssociations } from '../interfaces/teamInterface';
import db from '../db/models/index'; 

export class TeamService {
  // Create a new team
  static async createTeam(data: CreateTeamDTO): Promise<void> {
    await db.Team.create(data);
  }

  // Get all teams with optional user associations
  static async getAllTeams(includeUsers: boolean = false): Promise<TeamWithAssociations[]> {
    const teams = await db.Team.findAll({
      include: includeUsers ? [{ model: db.User }] : [],
    });

    return teams.map((team : any) => ({
      id: team.id,
      name: team.name,
      users: team.users,
    }));
  }

  // Get a specific team by ID, optionally including users
  static async getTeamById(teamId: number, includeUsers: boolean = false): Promise<TeamWithAssociations | null> {
    const team = await db.Team.findByPk(teamId, {
      include: includeUsers ? [{ model: db.User }] : [],
    });

    if (!team) return null;

    return {
      id: team.id,
      name: team.name,
      users: team.users,
    };
  }

  // Update a team by ID
  static async updateTeam(teamId: number, data: UpdateTeamDTO): Promise<void> {
    const team = await db.Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    await team.update(data);  // Directly updating the team without returning it
  }

  // Delete a team by ID
  static async deleteTeam(teamId: number): Promise<void> {
    const team = await db.Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    await team.destroy();  // Deleting the team
  }

  // Add a user to a team
  static async addUserToTeam(teamId: number, userId: number): Promise<void> {
    const team = await db.Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    const user = await db.User.findByPk(userId,{
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await team.$add('users', userId);
  }

  // Remove a user from a team
  static async removeUserFromTeam(teamId: number, userId: number): Promise<void> {
    const team = await db.Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    const user = await db.User.findByPk(userId,{
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await team.$remove('users', userId);  // Removing the user from the team
  }
}
