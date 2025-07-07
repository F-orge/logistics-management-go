import { z } from "zod";
import type { CrmCompanies } from "../types";

/**
 * Base schema for CrmCompanies table
 * Represents the complete database structure
 */
export const CrmCompaniesBaseSchema = z.object({
  id: z.string()
    .uuid("Invalid company ID format")
    .describe("Unique identifier for the company"),
  name: z.string()
    .min(1, "Company name is required")
    .max(255, "Company name cannot exceed 255 characters")
    .trim()
    .describe("Name of the company"),
  email: z.string()
    .min(1, "Email is required")
    .max(255, "Email cannot exceed 255 characters")
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .describe("Company's main email address"),
  phone: z.string()
    .min(1, "Phone number is required")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^\+?[\d\s-()]+$/, "Invalid phone format")
    .trim()
    .describe("Contact phone number in international format"),
  address: z.string()
    .min(1, "Address is required")
    .max(255, "Address cannot exceed 255 characters")
    .trim()
    .describe("Physical address of the company"),
  billingAddress: z.string()
    .max(255, "Billing address cannot exceed 255 characters")
    .nullable()
    .optional()
    .describe("Billing address for the company"),
  websiteUrl: z.string()
    .max(500, "Website URL cannot exceed 500 characters")
    .url("Invalid URL format")
    .nullable()
    .optional()
    .describe("Company website URL"),
  industry: z.string()
    .max(100, "Industry cannot exceed 100 characters")
    .nullable()
    .optional()
    .describe("Industry sector of the company"),
  taxId: z.string()
    .max(50, "Tax ID cannot exceed 50 characters")
    .nullable()
    .optional()
    .describe("Tax identification number"),
  notes: z.string()
    .max(2000, "Notes cannot exceed 2000 characters")
    .nullable()
    .optional()
    .describe("Additional notes about the company"),
  status: z.string()
    .max(50, "Status cannot exceed 50 characters")
    .nullable()
    .default("active")
    .describe("Current status of the company"),
  created: z.coerce.date()
    .describe("Timestamp when the company was created"),
  updated: z.coerce.date()
    .describe("Timestamp when the company was last updated"),
  deleted: z.boolean()
    .nullable()
    .default(null)
    .describe("Whether the company has been soft deleted"),
});

/**
 * Schema for inserting new companies
 * Omits all Generated<T> fields
 */
export const CrmCompaniesInsertSchema = CrmCompaniesBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  deleted: true,
  status: true,
});

/**
 * Schema for updating existing companies
 * All fields are optional, but omit ID since it's a primary key
 */
export const CrmCompaniesUpdateSchema = CrmCompaniesInsertSchema.partial();

export type CrmCompaniesBase = z.infer<typeof CrmCompaniesBaseSchema>;
export type CrmCompaniesInsert = z.infer<typeof CrmCompaniesInsertSchema>;
export type CrmCompaniesUpdate = z.infer<typeof CrmCompaniesUpdateSchema>;
