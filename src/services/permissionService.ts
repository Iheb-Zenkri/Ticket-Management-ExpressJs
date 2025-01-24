import db from '../db/models/index'
import Permission from '../db/models/permission';


export class PermissionService {
  // Create a new permission
  static async createPermission(name: string, description?: string): Promise<Permission> {
    const permission = await db.Permission.create({ name, description });
    return permission;
  }

  // Get all permissions
  static async getPermissions(): Promise<Permission[]> {
    return db.Permission.findAll();
  }

  // Update an existing permission
  static async updatePermission(id: number, updates: Partial<Permission>): Promise<Permission> {
    const permission = await db.Permission.findByPk(id);

    if (!permission) {
      throw new Error('Permission not found');
    }

    await permission.update(updates);
    return permission;
  }

  // Delete a permission
  static async deletePermission(id: number): Promise<void> {
    const permission = await db.Permission.findByPk(id);

    if (!permission) {
      throw new Error('Permission not found');
    }

    await db.RolePermission.destroy({ where: { id } });

    await permission.destroy();
  }

    static async userHasPermission(userId: number, permissionName: string, modelId?: number): Promise<boolean> {
      try {
      const user = await db.User.findByPk(userId, {
        include: [
          {
            model: db.Role,
            required: true,
          },
        ],
      });


      if (!user) {
          throw new Error('User not found');
      }
      const roleId = user.roleId ;

      const role = await db.Role.findByPk(roleId, {
        include: [
            {
                model: db.RolePermission,
                include: [
                    {
                        model: db.Permission, 
                    },
                ],
            },
        ],
    });

    if (!role) {
      throw new Error('Role not found');
    }

    const permissions = role.rolePermissions.map((rolePermission : any) => rolePermission.permission);

    if (!permissions) {
        throw new Error('Permissions not found for the role');
    }

    const hasPermission = permissions.some((permission: Permission) => permission.name === permissionName);

    if (modelId && hasPermission) {
        return true;
    }

    return hasPermission;
    } catch (error) {
      throw new Error(`Permission check failed: ${error}`);
    }
  }
}
