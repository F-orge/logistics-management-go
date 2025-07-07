import { z } from "zod";

/**
 * Base schema for AuthUsers table
 * Represents the complete database structure
 */
export const AuthUsersBaseSchema = z.object({
  id: z.string()
    .uuid("Invalid user ID format")
    .describe("Unique identifier for the user account"),
  email: z.string()
    .min(1, "Email is required")
    .max(255, "Email cannot exceed 255 characters")
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .describe("User's email address for authentication and communication"),
  name: z.string()
    .min(1, "Name is required")
    .max(255, "Name cannot exceed 255 characters")
    .trim()
    .describe("User's full display name"),
  password: z.string()
    .min(1, "Password is required")
    .max(255, "Password hash cannot exceed 255 characters")
    .describe("Hashed password for authentication"),
  phone: z.string()
    .min(1, "Phone number is required")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^[+\d\s\-()]+$/, "Invalid phone format")
    .nullable()
    .describe("Contact phone number in international format"),
  profilePictureUrl: z.string()
    .min(1, "Profile picture URL is required")
    .max(500, "Profile picture URL cannot exceed 500 characters")
    .url("Invalid URL format")
    .nullable()
    .describe("URL to the user's profile picture"),
  status: z.string()
    .min(1, "Status is required")
    .max(50, "Status cannot exceed 50 characters")
    .default("active")
    .describe("Current status of the user account"),
  emailVerified: z.boolean()
    .default(false)
    .describe("Whether the user's email address has been verified"),
  isAdmin: z.boolean()
    .default(false)
    .describe("Whether the user has administrative privileges"),
  lastLogin: z.coerce.date()
    .nullable()
    .describe("Timestamp of the user's last login"),
  created: z.coerce.date()
    .describe("Timestamp when the user account was created"),
  updated: z.coerce.date()
    .describe("Timestamp when the user account was last updated"),
  deleted: z.boolean()
    .nullable()
    .default(null)
    .describe("Whether the user account has been soft deleted"),
  deletedAt: z.coerce.date()
    .nullable()
    .describe("Timestamp when the user account was soft deleted"),
});

/**
 * Schema for inserting new records
 * Omits Generated<T> fields and auto-managed fields
 */
export const AuthUsersInsertSchema = AuthUsersBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  emailVerified: true,
  isAdmin: true,
  status: true,
  deleted: true,
  deletedAt: true,
}).extend({
  lastLogin: z.string()
    .max(50, "Date string cannot exceed 50 characters")
    .datetime("Invalid date format - use ISO 8601 format")
    .pipe(z.coerce.date())
    .nullable()
    .optional()
    .describe("Last login date as ISO string"),
});

/**
 * Schema for updating existing records
 * All fields are optional, but omit ID since it's a primary key
 */
export const AuthUsersUpdateSchema = AuthUsersInsertSchema.partial();

export type AuthUsersBase = z.infer<typeof AuthUsersBaseSchema>;
export type AuthUsersInsert = z.infer<typeof AuthUsersInsertSchema>;
export type AuthUsersUpdate = z.infer<typeof AuthUsersUpdateSchema>;
