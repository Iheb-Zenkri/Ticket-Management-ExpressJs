// controllers/RoleController.ts
import {  Response } from 'express';
import { RoleService } from '../services/roleService';

export class RoleController {
  // Create role
  static async createRole(req: any, res: Response) {
    try {
      const { name } = req.body;
      const role = await RoleService.createRole(name);
      res.status(201).json({ role });
    } catch (error : unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(400).json({ message: 'An unknown error occurred' });
      }
    }
  }

  // Update role
  static async updateRole(req: any, res: Response) {
    try {
      const roleId = parseInt(req.params.id, 10);
      const { name } = req.body;
      const updatedRole = await RoleService.updateRole(roleId, name);
      if (!updatedRole) {
        res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json({ role: updatedRole });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Get all roles
  static async getRoles(req: any, res: Response) {
    try {
      const roles = await RoleService.getRoles();
      res.status(200).json({ roles });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Assign Permission To Role
  static async assignPermissionToRole(req: any, res: Response) {
    try {
      const { roleId, permissionId } = req.params;

      if (!roleId || !permissionId) {
        res.status(400).json({ message: 'roleId and permissionId are required' });
      }

      const rolePermission = await RoleService.assignPermissionToRole(roleId, permissionId);
      res.status(201).json({ message: 'Permission successfully assigned to role', data: rolePermission });
    } catch (error) {
      if(error instanceof Error)
      res.status(400).json({ message: error.message || 'An error occurred' });
    }
  }
  
  // Get role with permissions
  static async getRoleWithPermissions(req: any, res: Response) {
    try {
      const roleId = parseInt(req.params.id, 10);
      const role = await RoleService.getRoleWithPermissions(roleId);
      if (!role) {
        res.status(404).json({ message: 'Role not found' });
      }
      res.status(200).json({ role });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // delete a role 
  static async deleteRole(req: any, res: Response) {
    try {
      const { roleId } = req.params;

      if (!roleId) {
        res.status(400).json({ message: 'roleId is required' });
      }

      await RoleService.deleteRole(Number(roleId));
      res.status(200).json({ message: 'Role deleted successfully' });
    } catch (error) {
      if(error instanceof Error)
        res.status(400).json({ message: error.message });
    }
  }
}
