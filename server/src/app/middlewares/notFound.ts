import { NextFunction, Request, Response } from 'express';
import httpStatus from 'http-status';

const notFound = ( err: any, req: Request, res: Response, next: NextFunction) => {
  return res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'API Not Found !!',
    error: err.message,
  });
};

export default notFound;