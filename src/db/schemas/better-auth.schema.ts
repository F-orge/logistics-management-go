import { createInsertSchema, createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { user } from './better-auth.sql';

export const emailSignUpSchema = createInsertSchema(user, {
  image: z.url().optional(),
})
  .pick({ email: true, name: true, image: true })
  .extend({
    password: z
      .string()
      .min(8, 'password is too short')
      .max(128, 'password exceeds character limit'),
  });

export const emailSignInSchema = emailSignUpSchema
  .pick({
    email: true,
    password: true,
  })
  .extend({ rememberMe: z.boolean().optional().default(true) });

export const userSchema = createSelectSchema(user, {
  image: (schema) => schema.optional(),
});
