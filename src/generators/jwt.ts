import jwt, { JwtPayload } from 'jsonwebtoken';
import { objToTokenizeType } from '../types';

export const generateToken = (
  objToTokenize: objToTokenizeType,
  expiresIn: string,
) => jwt.sign({ ...objToTokenize }, 'secret', { expiresIn });

export const generateRefreshToken = (objToTokenize: objToTokenizeType) =>
  jwt.sign({ ...objToTokenize }, 'secret');

export const decodeToken = (token: string): string | JwtPayload =>
  jwt.verify(token, 'JWT_SECRET');
