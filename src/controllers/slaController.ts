import { Response } from 'express';
import { SLAService } from '../services/slaService';  // Adjust the import path based on your project structure

export class SLAController {
  // Create a new SLA
  static async createSLA(req: any, res: Response): Promise<void> {
    try {
      const data = req.body;
      const sla = await SLAService.createSLA(data);
      res.status(201).json(sla);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  // Get all SLAs or filter based on query parameters
  static async getSLAs(req: any, res: Response): Promise<void> {
    try {
      const filter = req.query as { priority?: string; timeToRespond?: string; timeToResolve?: string };
      const slas = await SLAService.getSLAs({
        priority: filter.priority as any,  // Type casting as needed
        timeToRespond: filter.timeToRespond ? parseInt(filter.timeToRespond) : undefined,
        timeToResolve: filter.timeToResolve ? parseInt(filter.timeToResolve) : undefined,
      });
      res.status(200).json(slas);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  // Get SLA by ID
  static async getSLAById(req: any, res: Response): Promise<void> {
    try {
      const slaId = parseInt(req.params.id);
      const sla = await SLAService.getSLAById(slaId);
      if (!sla) {
        res.status(404).json({ message: 'SLA not found' });
      }
      res.status(200).json(sla);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  // Update an SLA by ID
  static async updateSLA(req: any, res: Response): Promise<void> {
    try {
      const slaId = parseInt(req.params.id);
      const updates = req.body;
      const updatedSLA = await SLAService.updateSLA(slaId, updates);
      res.status(200).json(updatedSLA);
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }

  // Delete an SLA by ID
  static async deleteSLA(req: any, res: Response): Promise<void> {
    try {
      const slaId = parseInt(req.params.id);
      await SLAService.deleteSLA(slaId);
      res.status(204).send();  // No content, successfully deleted
    } catch (error) {
        if(error instanceof Error)
            res.status(500).json({ error: error.message });
    }
  }
}
