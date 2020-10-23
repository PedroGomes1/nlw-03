import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '../config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function EnsureAuthenticate (
  request: Request,
  response: Response,
  next: NextFunction
) {

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    return response.status(400).json({error: 'JWT is required'})
  }

  const [ , token] = authHeader.split(' ');

  try {
    
    const decoded = verify(token, authConfig.jwt.secret);

    const { sub } = decoded as ITokenPayload;

    request.user = {
      id: sub
    }

    return next();

  } catch (error) {
    return response.status(400).json({error: 'JWT Invalid'})
  }
}
