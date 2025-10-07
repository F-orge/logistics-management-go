import { z } from 'zod';

export const crmNotificationSchema = z.object({
  id: z.uuid({ message: 'Invalid UUID format for ID' }),
  userId: z
    .string({ message: 'User ID must be a string' })
    .min(1, { message: 'User ID is required' })
    .max(255, { message: 'User ID must be at most 255 characters' }),
  message: z
    .string({ message: 'Message must be a string' })
    .min(1, { message: 'Message is required' })
    .max(1024, { message: 'Message must be at most 1024 characters' }),
  link: z
    .string({ message: 'Link must be a string' })
    .url({ message: 'Invalid URL format for link' })
    .min(1, { message: 'Link is required' })
    .max(1024, { message: 'Link must be at most 1024 characters' })
    .optional(),
  isRead: z.boolean({ message: 'Is read must be a boolean' }).optional(),
  createdAt: z
    .date({ message: 'Invalid ISO datetime format for creation date' })
    .optional(),
  updatedAt: z
    .date({ message: 'Invalid ISO datetime format for update date' })
    .optional(),
}).strict();

export type CrmNotification = z.infer<typeof crmNotificationSchema>;

export const crmNotificationInsertSchema = crmNotificationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const crmNotificationUpdateSchema =
  crmNotificationInsertSchema.partial();
