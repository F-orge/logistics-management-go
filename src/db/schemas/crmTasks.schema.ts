import { z } from "zod/v4";

/**
 * Base schema for CrmTasks table
 * Represents the complete database structure
 */
export const CrmTasksBaseSchema = z.object({
  id: z.string()
    .uuid("Invalid task ID format")
    .describe("Unique identifier for the task"),
  title: z.string()
    .min(1, "Task title is required")
    .max(255, "Task title cannot exceed 255 characters")
    .trim()
    .describe("Title or name of the task"),
  description: z.string()
    .max(2000, "Task description cannot exceed 2000 characters")
    .nullable()
    .optional()
    .describe("Detailed description of the task"),
  status: z.enum(["pending", "in-progress", "completed"], {
    error: "Status must be pending, in-progress, or completed",
  }).default("pending")
    .describe("Current status of the task"),
  dueDate: z.coerce.date()
    .nullable()
    .optional()
    .describe("Due date for task completion"),
  companyId: z.string()
    .uuid("Invalid company ID format")
    .nullable()
    .optional()
    .describe("ID of the company this task is associated with"),
  contactId: z.string()
    .uuid("Invalid contact ID format")
    .nullable()
    .optional()
    .describe("ID of the contact this task is associated with"),
  created: z.coerce.date()
    .describe("Timestamp when the task was created"),
  updated: z.coerce.date()
    .describe("Timestamp when the task was last updated"),
  deleted: z.boolean()
    .nullable()
    .optional()
    .default(null)
    .describe("Whether the task has been soft deleted"),
});

/**
 * Schema for inserting new tasks
 * Omits all Generated<T> fields and status (has default)
 */
export const CrmTasksInsertSchema = CrmTasksBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  deleted: true,
  status: true,
}).extend({
  dueDate: z.string()
    .max(50, "Date string cannot exceed 50 characters")
    .datetime("Invalid date format - use ISO 8601 format")
    .pipe(z.coerce.date())
    .nullable()
    .optional()
    .describe("Due date as ISO string"),
});

/**
 * Schema for updating existing tasks
 * All fields are optional, but omit ID since it's a primary key
 */
export const CrmTasksUpdateSchema = CrmTasksInsertSchema.partial();

export type CrmTasksBase = z.infer<typeof CrmTasksBaseSchema>;
export type CrmTasksInsert = z.infer<typeof CrmTasksInsertSchema>;
export type CrmTasksUpdate = z.infer<typeof CrmTasksUpdateSchema>;
