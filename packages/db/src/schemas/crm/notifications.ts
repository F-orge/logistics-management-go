import { fieldConfig } from '@autoform/zod';
import { z } from 'zod';

export const NotificationSchema = z
  .object({
    id: z.uuid({ message: 'Invalid UUID format for ID' }),
    userId: z
      .string({ message: 'User ID must be a string' })
      .min(1, { message: 'User ID is required' })
      .max(255, { message: 'User ID must be at most 255 characters' })
      .check(
        fieldConfig({
          label: 'User ID',
          description: 'The ID of the user who receives the notification.',
        }),
      ),
    message: z
      .string({ message: 'Message must be a string' })
      .min(1, { message: 'Message is required' })
      .max(1024, { message: 'Message must be at most 1024 characters' })
      .check(
        fieldConfig({
          label: 'Message',
          description: 'The content of the notification message.',
        }),
      ),
    link: z
      .string({ message: 'Link must be a string' })
      .url({ message: 'Invalid URL format for link' })
      .min(1, { message: 'Link is required' })
      .max(1024, { message: 'Link must be at most 1024 characters' })
      .check(
        fieldConfig({
          label: 'Link',
          description: 'A URL link associated with the notification.',
        }),
      )
      .optional()
      .nullable(),
    isRead: z
      .boolean({ message: 'Is read must be a boolean' })
      .check(
        fieldConfig({
          label: 'Is Read',
          description: 'Indicates whether the notification has been read.',
        }),
      )
      .optional()
      .nullable(),
    createdAt: z
      .date({ message: 'Invalid ISO datetime format for creation date' })
      .optional()
      .nullable(),
    updatedAt: z
      .date({ message: 'Invalid ISO datetime format for update date' })
      .optional()
      .nullable(),
  })
  .strict();

export type CrmNotification = z.infer<typeof NotificationSchema>;

export const NotificationInsertSchema = NotificationSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const NotificationUpdateSchema =
  NotificationInsertSchema.partial();
