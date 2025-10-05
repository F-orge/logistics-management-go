import { z } from 'zod';

export const crmNotificationSchema = z.object({
  id: z.uuid(),
  userId: z
    .string()
    .min(1, { error: 'User ID is required' })
    .max(255, { error: 'User ID must be at most 255 characters' }),
  message: z
    .string()
    .min(1, { error: 'Message is required' })
    .max(1024, { error: 'Message must be at most 1024 characters' }),
  link: z
    .url()
    .min(1, { error: 'Link is required' })
    .max(1024, { error: 'Link must be at most 1024 characters' })
    .nullable(),
  isRead: z.boolean().nullable(),
  createdAt: z.iso.datetime().nullable(),
  updatedAt: z.iso.datetime().nullable(),
});

export type CrmNotification = z.infer<typeof crmNotificationSchema>;

export const crmNotificationInsertSchema = crmNotificationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmNotificationUpdateSchema =
  crmNotificationInsertSchema.partial();
