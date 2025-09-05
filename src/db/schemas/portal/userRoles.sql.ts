// Drizzle ORM schema for portal_user_roles
import { uuid } from 'drizzle-orm/pg-core';
import { portalSchema } from './index';

export const userRoles = portalSchema.table('user_roles', {
  userId: uuid('user_id').notNull(), // FK to users
  roleId: uuid('role_id').notNull(), // FK to roles
});
