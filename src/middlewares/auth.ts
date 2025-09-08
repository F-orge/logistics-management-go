import { ORPCError, os } from '@orpc/server';

export const requireAuth = os
  .$context<GlobalVariables>()
  .middleware(async ({ context, next }) => {
    // check if session and user is not null
    if (!context.user || !context.session) {
      throw new ORPCError('UNAUTHORIZED', {
        message: 'Authentication required',
      });
    }

    return await next({ context });
  });

// todo: apply organization plugin and rbac for the system
