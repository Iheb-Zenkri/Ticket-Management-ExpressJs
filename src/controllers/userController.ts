import { Request, Response } from 'express';
import { UserService } from '../services/userService'; // Assuming your UserService class is in this path
import { CreateUserDTO, UpdateUserDTO } from '../interfaces/UserInterface';
import { generateToken } from '../utils/jwt';

// Controller to create a new user
export class UserController {
  
  // Create user(Sign In)
  static  createUser = async (req : any, res : Response) => {
    try {
      const userData: CreateUserDTO = req.body;
      const newUser = await UserService.createUser(userData);
      res.status(201).json({ user: newUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Update user details
  static async updateUser(req: any, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const updateData: UpdateUserDTO = req.body;
      const updatedUser = await UserService.updateUser(userId, updateData);
      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' ,userId});
      }
      res.status(200).json({ user: updatedUser });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Get user with associations (e.g., role, teams)
  static async getUserWithAssociations(req: any, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      const user = await UserService.getUserWithAssociations(userId);
      if (!user) {
        res.status(404).json({ message: 'User not found' });
      }
      res.status(200).json({ user });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Delete user
  static async deleteUser(req: any, res: Response) {
    try {
      const userId = parseInt(req.params.id, 10);
      await UserService.deleteUser(userId);
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Authenticate user (Login)
  static async authenticateUser(req: any, res: Response) {
    try {
      const { email, password } = req.body;
      const user = await UserService.authenticateUser(email, password);
      // Token expiration
      const expiresIn = req.body.rememberMe ? '30d' : '1h';
      const userId = user!.id ;
      const token = generateToken({ payload: { userId }, expiresIn });
      const username = user?.name ;
      res.json({ userId,username,email,token });
    } catch (error) {
      res.status(401).json({ message: error });
    }
  }
}
