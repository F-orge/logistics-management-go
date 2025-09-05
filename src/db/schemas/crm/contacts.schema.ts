import { createInsertSchema } from 'drizzle-zod';
import { contacts } from './contacts.sql';
import z from 'zod';

export const insertContactSchema = createInsertSchema(contacts, {
  email: z.email(),
  phoneNumber: z.e164(), // International Phone number format
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const updateContactSchema = insertContactSchema.partial();
