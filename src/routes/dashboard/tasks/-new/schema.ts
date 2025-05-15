import * as z from 'zod';

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export interface ActionResponse<T = any> {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof T]?: string[];
  };
  inputs?: T;
}

export const formSchema = z.object({
  title: z.string(),
  description: z.string().optional(),
  status: z.string().min(1),
  assignees: z
    .array(z.string())
    .nonempty('Please at least one item')
    .optional(),
  department: z.string().min(1),
  priority: z.string().min(1),
  due_date: z.coerce.date().optional(),
  tags: z.string().min(1).optional(),
  related_shipment: z.string().min(1).optional(),
  related_order: z.string().min(1).optional(),
});
