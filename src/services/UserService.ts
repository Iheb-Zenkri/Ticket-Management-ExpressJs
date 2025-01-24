import { CreateUserDTO, UpdateUserDTO, UserDTO, UserWithAssociations } from '../interfaces/UserInterface';
import bcrypt from 'bcryptjs';
import db from "../db/models/index"
import User from '../db/models/user';


export class UserService {
// Create a new user
  static async createUser(data: CreateUserDTO): Promise<User> {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await db.User.create({ ...data, password: hashedPassword });
  }

// Update user details
  static async updateUser(userId: number, data: UpdateUserDTO): Promise<UserDTO | null> {
    const user = await db.User.findByPk(userId,{
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }
    await user.update(data);
    
    const role = await db.Role.findByPk(user.roleId);
    return {
      name: user.name,
      email: user.email,
      role: role.name,
    };
  }

// Get user with associations
  static async getUserWithAssociations(userId: number): Promise<UserWithAssociations | null> {
    const user = await db.User.findByPk(userId, {
      attributes: { exclude: ['password'] },
      include: [{ model: db.Role }, { model: db.Team }],
    });

    if (!user) return null;

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role.name,
      teams: user.teams,
    };
  }

// Delete a user
  static async deleteUser(userId: number): Promise<void> {
    const user = await db.User.findByPk(userId,{
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    await user.destroy();
  }

// Assign role to user
  static async assignRole(userId: number, roleId: number): Promise<UserDTO | null> {
    const user = await db.User.findByPk(userId,{
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const role = await db.Role.findByPk(roleId);
    if (!role) {
      throw new Error('Role not found');
    }
    user.roleId = roleId;
    await user.save();
    return {
      name: user.name,
      email: user.email,
      role: role.name,
    };
  }

// Add user to team
  static async addToTeam(userId: number, teamId: number): Promise<UserDTO | null> {
    const user = await db.User.findByPk(userId,{
      attributes: { exclude: ['password'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    const team = await db.Team.findByPk(teamId);
    if (!team) {
      throw new Error('Team not found');
    }
    await user.$add('teams', teamId);
    
    const role = await db.Role.findByPk(user.roleId);
    return {
      name: user.name,
      email: user.email,
      role: role.name,
    };
  }

// Simple authentication method (login)
  static async authenticateUser(email: string, password: string): Promise<User | null> {
    const user = await db.User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }
    return user;
  }

}
