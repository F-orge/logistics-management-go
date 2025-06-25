import { z } from 'zod';
import { authenticatedProcedures, router } from '.';

export const userRouter = router({
  me: authenticatedProcedures.query(async (ctx) => {}),
  updatePassword: authenticatedProcedures
    .input(z.object({ oldPassword: z.string(), newPassword: z.string() }))
    .mutation(async (ctx) => {}),
});
