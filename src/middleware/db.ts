import { createMiddleware } from '@tanstack/react-start';
import { db } from '@/db';

export const dbMiddleware = (dbClient: typeof db) =>
  createMiddleware().server(({ next }) => {
    return next({ context: { db: dbClient } });
  });
