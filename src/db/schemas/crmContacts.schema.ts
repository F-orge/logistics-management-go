import { z } from "zod";
import type { CrmContacts } from "../types";

/**
 * Base schema for CrmContacts table
 * Represents the complete database structure
 */
export const CrmContactsBaseSchema = z.object({
  id: z.string()
    .uuid("Invalid contact ID format")
    .describe("Unique identifier for the contact"),
  name: z.string()
    .min(1, "Contact name is required")
    .max(255, "Contact name cannot exceed 255 characters")
    .trim()
    .describe("Full name of the contact"),
  email: z.string()
    .min(1, "Email is required")
    .max(255, "Email cannot exceed 255 characters")
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .describe("Contact's email address"),
  phone: z.string()
    .min(1, "Phone number is required")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^\+?[\d\s-()]+$/, "Invalid phone format")
    .trim()
    .describe("Contact phone number in international format"),
  address: z.string()
    .max(255, "Address cannot exceed 255 characters")
    .nullable()
    .optional()
    .describe("Physical address of the contact"),
  birthday: z.string()
    .max(50, "Birthday string cannot exceed 50 characters")
    .nullable()
    .optional()
    .describe("Birthday of the contact (ISO 8601 string)"),
  companyId: z.string()
    .uuid("Invalid company ID format")
    .nullable()
    .optional()
    .describe("ID of the company this contact is associated with"),
  position: z.string()
    .max(100, "Position cannot exceed 100 characters")
    .nullable()
    .optional()
    .describe("Job position or title of the contact"),
  created: z.coerce.date()
    .describe("Timestamp when the contact was created"),
  updated: z.coerce.date()
    .describe("Timestamp when the contact was last updated"),
  deleted: z.boolean()
    .nullable()
    .default(null)
    .describe("Whether the contact has been soft deleted"),
});

/**
 * Schema for inserting new contacts
 * Omits all Generated<T> fields
 */
export const CrmContactsInsertSchema = CrmContactsBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  deleted: true,
});

/**
 * Schema for updating existing contacts
 * All fields are optional, but omit ID since it's a primary key
 */
export const CrmContactsUpdateSchema = CrmContactsInsertSchema.partial();

export type CrmContactsBase = z.infer<typeof CrmContactsBaseSchema>;
export type CrmContactsInsert = z.infer<typeof CrmContactsInsertSchema>;
export type CrmContactsUpdate = z.infer<typeof CrmContactsUpdateSchema>;
