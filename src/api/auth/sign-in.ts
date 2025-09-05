import { implement, ORPCError } from '@orpc/server';
import signIn from '@/contracts/auth/sign-in';
import type { GlobalVariables } from '@/server';
import { APIError } from 'better-auth';

export default implement(signIn)
  .$context<GlobalVariables>()
  .handler(async ({ context, input }) => {
    try {
      const response = await context.auth.api.signInEmail({
        body: input,
      });

      return response;
    } catch (err) {
      if (err instanceof APIError) {
        if (err.status === 'UNAUTHORIZED')
          throw new ORPCError('UNAUTHORIZED', { message: err.message });
      }
      throw err;
    }
  });
