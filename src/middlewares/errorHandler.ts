import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

export const errorHandler = (
  err: any,  
  req: Request,
  res: Response,
  next: NextFunction 
): void => {  
  console.error(err.stack);

  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error',
  });
};
