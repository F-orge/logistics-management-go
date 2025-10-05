import { z } from 'zod';

export const crmNotificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  message: z.string(),
  link: z.string().nullable(),
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
