// Centralized IMS schema instance to avoid duplication across files
import { pgSchema } from 'drizzle-orm/pg-core';

export const imsSchema = pgSchema('ims');
