import db from '../db/models/index';
import SLA, { Priority } from '../db/models/sla';
import { Op } from 'sequelize';

interface SLAData {
  priority: Priority;
  timeToRespond: Date;
  timeToResolve: Date;
}

export class SLAService {
  // Create a new SLA
  static async createSLA(data: SLAData): Promise<SLA> {
    return await db.SLA.create(data);
  }

  // Get all SLAs with optional filtering
  static async getSLAs(filter?: Partial<SLAData>): Promise<SLA[]> {
    const whereClause: any = {};

    if (filter?.priority) {
      whereClause.priority = filter.priority;
    }
    if (filter?.timeToRespond) {
      const endOfDay = new Date(filter.timeToRespond);
      endOfDay.setUTCHours(23, 59, 59, 999);
      whereClause.timeToRespond = { [Op.lte]: endOfDay };  
    }
    if (filter?.timeToResolve) {
      const endOfDay = new Date(filter.timeToResolve);
      endOfDay.setUTCHours(23, 59, 59, 999);
      whereClause.timeToResolve = { [Op.lte]: endOfDay };
    }

    return await db.SLA.findAll({ where: whereClause });
  }

  // Get an SLA by ID
  static async getSLAById(slaId: number): Promise<SLA | null> {
    return await db.SLA.findByPk(slaId);
  }

  // Update an SLA
  static async updateSLA(slaId: number, updates: Partial<SLAData>): Promise<SLA | null> {
    const sla = await db.SLA.findByPk(slaId);
    if (!sla) {
      throw new Error('SLA not found');
    }
    await sla.update(updates);
    return sla;
  }

  // Delete an SLA
  static async deleteSLA(slaId: number): Promise<void> {
    const sla = await db.SLA.findByPk(slaId);
    if (!sla) {
      throw new Error('SLA not found');
    }
    await sla.destroy();
  }
}
