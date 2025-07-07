import { z } from "zod";
import type { CrmDeals } from "../types";

/**
 * Base schema for CrmDeals table
 * Represents the complete database structure
 */
export const CrmDealsBaseSchema = z.object({
  id: z.string()
    .uuid("Invalid deal ID format")
    .describe("Unique identifier for the deal"),
  name: z.string()
    .min(1, "Deal name is required")
    .max(255, "Deal name cannot exceed 255 characters")
    .trim()
    .describe("Name or title of the deal"),
  amount: z.coerce.number()
    .min(0, "Deal amount cannot be negative")
    .max(999999999.99, "Deal amount cannot exceed $999,999,999.99")
    .multipleOf(0.01, "Deal amount must have at most 2 decimal places")
    .describe("Total value of the deal in USD"),
  status: z.enum(["open", "won", "lost"], {
    errorMap: () => ({ message: "Status must be open, won, or lost" }),
  }).describe("Current status of the deal"),
  companyId: z.string()
    .uuid("Invalid company ID format")
    .nullable()
    .optional()
    .describe("ID of the company associated with this deal"),
  contactId: z.string()
    .uuid("Invalid contact ID format")
    .nullable()
    .optional()
    .describe("ID of the primary contact for this deal"),
  created: z.coerce.date()
    .describe("Timestamp when the deal was created"),
  updated: z.coerce.date()
    .describe("Timestamp when the deal was last updated"),
  deleted: z.boolean()
    .nullable()
    .optional()
    .default(null)
    .describe("Whether the deal has been soft deleted"),
});

/**
 * Schema for inserting new deals
 * Omits all Generated<T> fields
 */
export const CrmDealsInsertSchema = CrmDealsBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  deleted: true,
});

/**
 * Schema for updating existing deals
 * All fields are optional, but omit ID since it's a primary key
 */
export const CrmDealsUpdateSchema = CrmDealsInsertSchema.partial();

export type CrmDealsBase = z.infer<typeof CrmDealsBaseSchema>;
export type CrmDealsInsert = z.infer<typeof CrmDealsInsertSchema>;
export type CrmDealsUpdate = z.infer<typeof CrmDealsUpdateSchema>;
