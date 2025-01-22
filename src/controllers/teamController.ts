import { Response } from 'express';
import { TeamService } from '../services/teamService';
import { CreateTeamDTO, UpdateTeamDTO } from '../interfaces/teamInterface';

export class TeamController {
  // Create a new team
  static async createTeam(req: any, res: Response): Promise<void> {
    try {
      const teamData: CreateTeamDTO = req.body;
      await TeamService.createTeam(teamData); 
      res.status(201).json({ message: 'Team created successfully' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Get all teams with optional user associations
  static async getAllTeams(req: any, res: Response): Promise<void> {
    try {
      const includeUsers = req.query.includeUsers === 'true';  // Check query param for users inclusion
      const teams = await TeamService.getAllTeams(includeUsers);
      res.status(200).json({ teams });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Get a team by ID with optional user associations
  static async getTeamById(req: any, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.id, 10);
      const includeUsers = req.query.includeUsers === 'true';  // Check query param for users inclusion
      const team = await TeamService.getTeamById(teamId, includeUsers);
      
      if (!team) {
        res.status(404).json({ message: 'Team not found' });
        return;
      }
      
      res.status(200).json({ team });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Update a team by ID
  static async updateTeam(req: any, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.id, 10);
      const updateData: UpdateTeamDTO = req.body;
      await TeamService.updateTeam(teamId, updateData);  // No return value expected
      res.status(200).json({ message: 'Team updated successfully' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Delete a team by ID
  static async deleteTeam(req: any, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.id, 10);
      await TeamService.deleteTeam(teamId);  // No return value expected
      res.status(200).json({ message: 'Team deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Add a user to a team
  static async addUserToTeam(req: any, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.teamId, 10);
      const userId = parseInt(req.params.userId, 10);
      await TeamService.addUserToTeam(teamId, userId);  // No return value expected
      res.status(200).json({ message: 'User added to team successfully' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Remove a user from a team
  static async removeUserFromTeam(req: any, res: Response): Promise<void> {
    try {
      const teamId = parseInt(req.params.teamId, 10);
      const userId = parseInt(req.params.userId, 10);
      await TeamService.removeUserFromTeam(teamId, userId);  // No return value expected
      res.status(200).json({ message: 'User removed from team successfully' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
}
