import { auth } from '@/lib/auth';
import { AllRoles } from '@/lib/permissions';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

export const authCreateUser = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      email: z.email(),
      password: z.string(),
      name: z.string(),
      role: z.union([z.array(AllRoles), AllRoles]).optional(),
      data: z.record(z.string(), z.string()),
    }),
  )
  .handler(async ({ data }) => auth.api.createUser({ body: data }));

export const authListUsers = createServerFn({ method: 'GET' })
  .inputValidator(
    z.object({
      query: z
        .object({
          searchValue: z.string().optional(),
          searchField: z.enum(['email', 'name']).optional(),
          searchOperator: z
            .enum(['contains', 'starts_with', 'ends_with'])
            .optional(),
          limit: z.union([z.string(), z.number()]).optional(),
          offset: z.union([z.string(), z.number()]).optional(),
          sortBy: z.string().optional(),
          sortDirection: z.enum(['asc', 'desc']).optional(),
          filterField: z.string().optional(),
          filterValue: z
            .union([z.string(), z.number(), z.boolean()])
            .optional(),
          filterOperator: z
            .enum(['eq', 'ne', 'lt', 'lte', 'gt', 'gte'])
            .optional(),
        })
        .optional(),
    }),
  )
  .handler(async ({ data }) => auth.api.listUsers({ query: data.query || {} }));

export const authSetRole = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string(),
      role: z.union([AllRoles, z.array(AllRoles)]),
    }),
  )
  .handler(async ({ data }) => auth.api.setRole({ body: data, headers: {} }));

export const authSetUserPassword = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      newPassword: z.string(),
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => auth.api.setUserPassword({ body: data }));

export const authAdminUpdateUser = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string(),
      data: z.record(z.string(), z.any()),
    }),
  )
  .handler(async ({ data }) => auth.api.adminUpdateUser({ body: data }));

export const authBanUser = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string(),
      banReason: z.string().optional(),
      banExpiresIn: z.number().optional(),
    }),
  )
  .handler(async ({ data }) => auth.api.banUser({ body: data }));

export const authUnbanUser = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => auth.api.unbanUser({ body: data }));

export const authListUserSessions = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => auth.api.listUserSessions({ body: data }));

export const authRevokeUserSession = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      sessionToken: z.string(),
    }),
  )
  .handler(async ({ data }) => auth.api.revokeUserSession({ body: data }));

export const authRevokeUserSessions = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => auth.api.revokeUserSessions({ body: data }));

export const authImpersonateUser = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => auth.api.impersonateUser({ body: data }));

export const authStopImpersonating = createServerFn({ method: 'POST' }).handler(
  async () => auth.api.stopImpersonating({ headers: {} }),
);

export const authRemoveUser = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string(),
    }),
  )
  .handler(async ({ data }) => auth.api.removeUser({ body: data }));

export const authUserHasPermission = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      userId: z.string().optional(),
      role: AllRoles.optional(),
      permission: z.record(z.string(), z.array(z.string())),
    }),
  )
  .handler(async ({ data }) =>
    auth.api.userHasPermission({ body: data, headers: {} }),
  );
