import { createServerFn } from '@tanstack/react-start';
import z from 'zod';
import { auth } from '@/lib/auth';
import { requestMiddleware } from '@/middleware/request';

export const AuthSignUpInput = z.object({
  name: z.string(),
  email: z.email(),
  password: z.string().min(8).max(128),
  image: z.url().optional(),
  callbackURL: z.url().optional(),
});

export const authSignUpEmail = createServerFn({ method: 'POST' })
  .inputValidator(AuthSignUpInput)
  .handler(async ({ data }) => auth.api.signUpEmail({ body: data }));

export const authSignInEmail = createServerFn({ method: 'POST' })
  .middleware([requestMiddleware])
  .inputValidator(
    z.object({
      email: z.email(),
      password: z.string(),
      rememberMe: z.boolean().optional(),
      callbackURL: z.url().optional(),
    }),
  )
  .handler(async ({ data, context }) =>
    auth.api.signInEmail({ body: data, headers: context.request.headers }),
  );

export const authSignOut = createServerFn({ method: 'POST' })
  .middleware([requestMiddleware])
  .handler(async ({ context }) =>
    auth.api.signOut({ headers: context.request.headers }),
  );

export const authRequestPasswordReset = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      email: z.email(),
      redirectTo: z.url().optional(),
    }),
  )
  .handler(async ({ data }) => auth.api.requestPasswordReset({ body: data }));

export const authResetPassword = createServerFn({ method: 'POST' })
  .inputValidator(
    z.object({
      newPassword: z.string().min(8).max(128),
      token: z.string(),
    }),
  )
  .handler(async ({ data }) => auth.api.resetPassword({ body: data }));

export const authChangePassword = createServerFn({ method: 'POST' })
  .middleware([requestMiddleware])
  .inputValidator(
    z.object({
      newPassword: z.string().min(8).max(128),
      currentPassword: z.string(),
      revokeOtherSessions: z.boolean().optional(),
    }),
  )
  .handler(async ({ data, context }) =>
    auth.api.changePassword({ body: data, headers: context.request.headers }),
  );
