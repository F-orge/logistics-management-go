import { z } from 'zod';

export const searchQuerySchema = z.object({
  companiesPage: z.number().default(1),
  companiesPerPage: z.number().default(10),
  newCompany: z.boolean().optional(),
  viewCompany: z.boolean().optional(),
  editCompany: z.boolean().optional(),
  deleteCompany: z.boolean().optional(),
  id: z.string().optional(),
});
