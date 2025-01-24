import { Priority } from "../db/models/sla";
import { TicketStatus } from "../db/models/ticket";

export interface TicketData {
    title: string;
    description: string;
    status: TicketStatus;
    createdBy: number;
    assignedTo: number;
    slaId: number;
    dueDate: Date;
  }
  
  export interface TicketFilters {
    status?: TicketStatus;
    createdBy?: number;
    assignedTo?: number;
    slaId?: number;
    dueDate?: Date;
    slaFilters?: {
      priority: Priority;
      timeToRespond: Date;
      timeToResolve: Date;
    }
  }
  
  export interface TicketUpdateData {
    title?: string;
    description?: string;
    status?: TicketStatus;
    assignedTo?: number;
    slaId?: number;
    dueDate?: Date;
  }
  