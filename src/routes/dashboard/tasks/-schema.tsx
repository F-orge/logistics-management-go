import { z } from 'zod';

export const querySchema = z.object({
  page: z.number().optional().default(1),
  limit: z.number().max(10).optional().default(10),
  filter: z.string().optional(),
  id: z.string().optional(),
  viewTaskDialog: z.boolean().optional(),
  newTaskDialog: z.boolean().optional(),
  editTaskDialog: z.boolean().optional(),
  deleteTaskDialog: z.boolean().optional(),
  assignTaskDialog: z.boolean().optional(),
});
