/* eslint-disable @typescript-eslint/no-namespace */
import { NextFunction, Request, Response } from 'express';
import { TRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import httpStatus from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';
import sendResponse from '../utils/sendResponse';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

const auth = (...userRoles: TRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.headers?.authorization?.split(' ')[1];
      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      const decoded = jwt.verify(
        token,
        config.jwt_secret as string,
      ) as JwtPayload;
      const { email, role } = decoded;

      const user = await User.findOne({ email, role });
      if (!user) {
        throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
      }

      if (!userRoles?.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized!');
      }

      req.user = decoded as JwtPayload;
      next();
    } catch (err) {
      sendResponse(res, {
        success: false,
        statusCode: httpStatus.UNAUTHORIZED,
        message: 'You are not authorized!',
        data: '',
      });
    }
  });
};

export default auth;
