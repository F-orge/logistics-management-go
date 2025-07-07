import { z } from "zod/v4";

/**
 * Base schema for CrmLinks table
 * Represents the complete database structure
 */
export const CrmLinksBaseSchema = z.object({
  id: z.string()
    .uuid("Invalid link ID format")
    .describe("Unique identifier for the link"),
  companyId: z.string()
    .uuid("Invalid company ID format")
    .nullable()
    .optional()
    .describe("ID of the company associated with this link"),
  contactId: z.string()
    .uuid("Invalid contact ID format")
    .nullable()
    .optional()
    .describe("ID of the contact associated with this link"),
  link: z.string()
    .min(1, "Link is required")
    .max(500, "Link cannot exceed 500 characters")
    .url("Invalid URL format")
    .describe("URL for the link"),
  description: z.string()
    .max(2000, "Description cannot exceed 2000 characters")
    .nullable()
    .optional()
    .describe("Description of the link"),
  created: z.coerce.date()
    .describe("Timestamp when the link was created"),
  updated: z.coerce.date()
    .describe("Timestamp when the link was last updated"),
  deleted: z.boolean()
    .nullable()
    .optional()
    .default(null)
    .describe("Whether the link has been soft deleted"),
});

/**
 * Schema for inserting new links
 * Omits all Generated<T> fields
 */
export const CrmLinksInsertSchema = CrmLinksBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  deleted: true,
});

/**
 * Schema for updating existing links
 * All fields are optional, but omit ID since it's a primary key
 */
export const CrmLinksUpdateSchema = CrmLinksInsertSchema.partial();

export type CrmLinksBase = z.infer<typeof CrmLinksBaseSchema>;
export type CrmLinksInsert = z.infer<typeof CrmLinksInsertSchema>;
export type CrmLinksUpdate = z.infer<typeof CrmLinksUpdateSchema>;
