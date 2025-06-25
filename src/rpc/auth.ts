import { z } from 'zod';
import { publicProcedures, router } from '.';

export const authRouter = router({
  login: publicProcedures
    .input(z.object({ email: z.string().email(), password: z.string() }))
    .mutation(async (ctx) => {
      return 'login';
    }),
});
