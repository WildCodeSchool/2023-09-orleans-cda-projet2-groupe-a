import type { Request as ExpressRequest } from 'express';

export * from './database';
export * from './auth';

export interface Request extends ExpressRequest {
  userId?: number;
}
