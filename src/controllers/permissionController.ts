// controllers/PermissionController.ts
import { Response } from 'express';
import { PermissionService } from '../services/permissionService';

export class PermissionController {
  // Create permission
  static async createPermission(req: any, res: Response) {
    try {
      const { name, description } = req.body;
      const permission = await PermissionService.createPermission(name, description);
      res.status(201).json({ permission });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }

  // Get all permissions
  static async getPermissions(req: any, res: Response) {
    try {
      const permissions = await PermissionService.getPermissions();
      res.status(200).json({ permissions });
    } catch (error) {
      res.status(400).json({ message: error });
    }
  }
  
  // Update permission
  static async updatePermission(req: any, res: Response) {
    try {
      const { id } = req.params;
      const updates = req.body;

      const updatedPermission = await PermissionService.updatePermission(Number(id), updates);
      res.status(200).json(updatedPermission);
    } catch (error) {
      if(error instanceof Error)
      res.status(400).json({ message: error.message });
    }
  }

  // Delete permission
  static async deletePermission(req: any, res: Response) {
    try {
      const { id } = req.params;

      await PermissionService.deletePermission(Number(id));
      res.status(200).json({ message: 'Permission deleted successfully' });
    } catch (error) {
      if(error instanceof Error)
        res.status(400).json({ message: error.message });
    }
    
  }
}
