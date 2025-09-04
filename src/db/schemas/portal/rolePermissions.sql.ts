// Drizzle ORM schema for portal_role_permissions
import { uuid } from 'drizzle-orm/pg-core';
import { portalSchema } from './index';

export const rolePermissions = portalSchema.table('role_permissions', {
  roleId: uuid('role_id').notNull(), // FK to roles
  permissionId: uuid('permission_id').notNull(), // FK to permissions
});
