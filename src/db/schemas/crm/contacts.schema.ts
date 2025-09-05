import { createSelectSchema } from 'drizzle-zod';
import { contacts } from './contacts.sql';
import z from 'zod';

export const contactSchema = createSelectSchema(contacts, {
  email: z.email(),
  phoneNumber: z.e164(), // International Phone number format
});

export const insertContactSchema = contactSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateContactSchema = insertContactSchema.partial();
