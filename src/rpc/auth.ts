import { publicProcedures, router } from '.';

export const authRouter = router({
  login: publicProcedures.mutation(async (ctx) => {
    return 'login';
  }),
});
