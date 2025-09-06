import { createSelectSchema } from 'drizzle-zod';
import z from 'zod';
import { contacts } from './contacts.sql';

export const contactSchema = createSelectSchema(contacts, {
  email: z.email().optional().nullable(),
  phoneNumber: z.e164().optional().nullable(), // International Phone number format
});

export const insertContactSchema = contactSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateContactSchema = insertContactSchema.partial();
