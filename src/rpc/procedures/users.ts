import { z } from 'zod';
import { authenticatedProcedures, router } from '../.';
import { TRPCError } from '@trpc/server';

export const userRouter = router({
  me: authenticatedProcedures.query(async ({ ctx }) => {
    const { db, claims } = ctx;
    const currentUser = await db
      .selectFrom('auth.users')
      .select([
        'auth.users.email',
        'auth.users.name',
        'auth.users.id',
        'auth.users.created',
        'auth.users.updated',
      ])
      .where('auth.users.id', '=', claims.sub)
      .executeTakeFirst();

    if (!currentUser) throw new TRPCError({ code: 'NOT_FOUND' });

    return currentUser;
  }),
  search: authenticatedProcedures
    .input(z.object({ name: z.string() }))
    .query(async ({ ctx, input }) => {
      const { db } = ctx;
      const { name } = input;

      const users = await db
        .selectFrom('auth.users')
        .select([
          'auth.users.email',
          'auth.users.name',
          'auth.users.id',
          'auth.users.created',
          'auth.users.updated',
        ])
        .where('auth.users.name', 'like', `%${name}%`)
        .execute();

      return users;
    }),
  updatePassword: authenticatedProcedures
    .input(
      z.object({
        oldPassword: z.string(),
        newPassword: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, claims } = ctx;
      const { oldPassword, newPassword } = input;

      const updatedUser = await db
        .updateTable('auth.users')
        .set('password', newPassword)
        .where('id', '=', claims.sub)
        .where('password', '=', oldPassword)
        .returning([
          'auth.users.email',
          'auth.users.name',
          'auth.users.id',
          'auth.users.created',
          'auth.users.updated',
        ])
        .executeTakeFirst();

      if (!updatedUser) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }

      return updatedUser;
    }),
  updateEmail: authenticatedProcedures
    .input(
      z.object({
        oldEmail: z.string().email(),
        newEmail: z.string().email(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const { db, claims } = ctx;
      const { oldEmail, newEmail } = input;

      const updatedUser = await db
        .updateTable('auth.users')
        .set({ email: newEmail })
        .where('id', '=', claims.sub)
        .where('email', '=', oldEmail)
        .returning([
          'auth.users.email',
          'auth.users.name',
          'auth.users.id',
          'auth.users.created',
          'auth.users.updated',
        ])
        .executeTakeFirst();

      if (!updatedUser) {
        throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR' });
      }

      return updatedUser;
    }),
  delete: authenticatedProcedures.mutation(async ({ ctx }) => {
    const { db, claims } = ctx;

    const deletedUser = await db
      .deleteFrom('auth.users')
      .where('id', '=', claims.sub)
      .executeTakeFirst();

    return deletedUser;
  }),
});
