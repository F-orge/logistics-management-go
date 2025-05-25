import { z } from 'zod';

export const searchQuerySchema = z.object({
  departmentsPage: z.number().default(1),
  departmentsPerPage: z.number().default(10),
  id: z.string().optional(),
  newDepartment: z.boolean().optional(),
  editDepartment: z.boolean().optional(),
  deleteDepartment: z.boolean().optional(),
});
