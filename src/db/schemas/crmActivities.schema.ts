import { z } from "zod/v4";

/**
 * Base schema for CrmActivities table
 * Represents the complete database structure
 */
export const CrmActivitiesBaseSchema = z.object({
  id: z.string()
    .uuid("Invalid activity ID format")
    .describe("Unique identifier for the activity"),
  companyId: z.string()
    .uuid("Invalid company ID format")
    .nullable()
    .describe("ID of the company associated with this activity"),
  contactId: z.string()
    .uuid("Invalid contact ID format")
    .nullable()
    .describe("ID of the contact associated with this activity"),
  type: z.string()
    .min(1, "Activity type is required")
    .max(100, "Activity type cannot exceed 100 characters")
    .trim()
    .describe("Type of activity (e.g., call, meeting, email)"),
  description: z.string()
    .max(2000, "Description cannot exceed 2000 characters")
    .nullable()
    .describe("Detailed description of the activity"),
  created: z.coerce.date()
    .describe("Timestamp when the activity was created"),
  updated: z.coerce.date()
    .describe("Timestamp when the activity was last updated"),
  deleted: z.boolean()
    .nullable()
    .default(null)
    .describe("Whether the activity has been soft deleted"),
});

/**
 * Schema for inserting new activities
 * Omits all Generated<T> fields
 */
export const CrmActivitiesInsertSchema = CrmActivitiesBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  deleted: true,
});

/**
 * Schema for updating existing activities
 * All fields are optional, but omit ID since it's a primary key
 */
export const CrmActivitiesUpdateSchema = CrmActivitiesInsertSchema.partial();

export type CrmActivitiesBase = z.infer<typeof CrmActivitiesBaseSchema>;
export type CrmActivitiesInsert = z.infer<typeof CrmActivitiesInsertSchema>;
export type CrmActivitiesUpdate = z.infer<typeof CrmActivitiesUpdateSchema>;
