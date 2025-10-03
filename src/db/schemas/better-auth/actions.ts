import { auth } from '@/lib/auth';
import { createServerFn } from '@tanstack/react-start';
import z from 'zod';

export const loginAction = createServerFn({ method: 'POST' })
  .inputValidator(z.object({ email: z.email(), password: z.string() }))
  .handler(async ({ data }) =>
    auth.api.signInEmail({
      body: { email: data.email, password: data.password },
    }),
  );
