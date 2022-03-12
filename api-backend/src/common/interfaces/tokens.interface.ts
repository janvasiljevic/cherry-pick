import { User, UserType } from '@prisma/client';

export interface IUATPayload {
  email: string;
  sub: string;
  type: UserType;
}

export interface IUAT extends IUATPayload {
  iat: number;
  exp: number;
}

export interface IRTPayload {
  type: UserType;
  sub: string;
}

export interface ExtractedUAT {
  email: string;
  sub: string;
  type: UserType;
}

export interface RequestWithUAT extends Request {
  user: ExtractedUAT;
}

export interface RequestWithUser extends Request {
  user: User;
}
