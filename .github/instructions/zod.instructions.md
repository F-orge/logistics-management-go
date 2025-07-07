---
applyTo: 'src/db/schemas/*.ts'
---

# Zod Schema Best Practices and Standards

## Core Principles

### 1. Schema Design Philosophy
- **Explicit over implicit**: Always be explicit about data types and constraints
- **Fail fast**: Design schemas to catch errors early in the validation pipeline
- **Composable**: Create reusable schema components that can be combined
- **Self-documenting**: Use descriptive names and comments for complex validations

### 2. Naming Conventions
- Use `PascalCase` for schema constants: `UserSchema`, `CompanySchema`
- Use `camelCase` for schema properties: `firstName`, `createdAt`
- Prefix with `z` for raw Zod schemas: `zUser`, `zCompany`
- Use descriptive suffixes for variants: `UserCreateSchema`, `UserUpdateSchema`

### 3. Mandatory Requirements
- **Error Messages**: Every validation rule must include a clear, user-friendly error message
- **Descriptions**: Every field must have a `.describe()` with a clear explanation of the field's purpose
- **String Max Length**: All string fields must have a maximum length constraint for security and database compatibility
- **Validation Context**: Error messages should provide context about what went wrong and how to fix it
- **Nullable Fields**: If a field is nullable, you may also add `.optional()` to allow the field to be omitted from the input object. This is especially useful for PATCH/update operations or when the field is not always present in API payloads.

### 4. Field Documentation Standards
```typescript
// ✅ Required pattern for all fields
fieldName: z.string()
  .min(1, "Field name is required")           // Clear error message
  .max(255, "Field name cannot exceed 255 characters")  // Mandatory max length
  .trim()                                     // Data cleaning
  .describe("Purpose and usage of this field") // Mandatory description
```

## Schema Structure Best Practices

### 1. Basic Schema Definition
```typescript
// ✅ Good: Explicit, well-structured with error messages and descriptions
export const UserSchema = z.object({
  id: z.string()
    .uuid("Invalid user ID format")
    .describe("Unique identifier for the user"),
  
  email: z.string()
    .min(1, "Email is required")
    .max(255, "Email cannot exceed 255 characters")
    .email("Invalid email format")
    .toLowerCase()
    .describe("User's email address for authentication and communication"),
  
  firstName: z.string()
    .min(1, "First name is required")
    .max(100, "First name cannot exceed 100 characters")
    .trim()
    .describe("User's first name for identification"),
  
  lastName: z.string()
    .min(1, "Last name is required")
    .max(100, "Last name cannot exceed 100 characters")
    .trim()
    .describe("User's last name for identification"),
  
  age: z.number()
    .int("Age must be a whole number")
    .min(0, "Age cannot be negative")
    .max(120, "Age cannot exceed 120 years")
    .describe("User's age in years"),
  
  isActive: z.boolean()
    .default(true)
    .describe("Whether the user account is active and can access the system"),
  
  createdAt: z.date()
    .describe("Timestamp when the user account was created"),
  
  updatedAt: z.date()
    .describe("Timestamp when the user account was last updated")
});

// ❌ Avoid: Vague, no constraints, no error messages, no descriptions
export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  age: z.number()
});
```

### 2. String Validations
```typescript
// Email validation
email: z.string()
  .min(1, "Email is required")
  .max(255, "Email cannot exceed 255 characters")
  .email("Invalid email format")
  .toLowerCase()
  .trim()
  .describe("User's email address for authentication")

// Phone number validation
phone: z.string()
  .min(1, "Phone number is required")
  .max(20, "Phone number cannot exceed 20 characters")
  .regex(/^\+?[\d\s-()]+$/, "Invalid phone format - only numbers, spaces, hyphens, and parentheses allowed")
  .describe("Contact phone number in international format")

// Password validation
password: z.string()
  .min(8, "Password must be at least 8 characters")
  .max(128, "Password cannot exceed 128 characters")
  .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number")
  .describe("User's password for account security")

// URL validation
website: z.string()
  .max(500, "Website URL cannot exceed 500 characters")
  .url("Invalid URL format")
  .optional()
  .describe("Company or personal website URL")

// Enum-like string validation
status: z.enum(['active', 'inactive', 'pending'], {
  errorMap: () => ({ message: "Status must be active, inactive, or pending" })
}).describe("Current status of the record")

// Custom string validation
slug: z.string()
  .min(1, "Slug is required")
  .max(100, "Slug cannot exceed 100 characters")
  .regex(/^[a-z0-9-]+$/, "Slug must contain only lowercase letters, numbers, and hyphens")
  .describe("URL-friendly identifier for the resource")

// Text area / long text
description: z.string()
  .max(2000, "Description cannot exceed 2000 characters")
  .optional()
  .describe("Detailed description or notes about the item")

// Name fields
name: z.string()
  .min(1, "Name is required")
  .max(255, "Name cannot exceed 255 characters")
  .trim()
  .describe("Display name for the item")
```

### 3. Number Validations
```typescript
// Integer constraints
age: z.number()
  .int("Age must be a whole number")
  .min(0, "Age cannot be negative")
  .max(120, "Age cannot exceed 120 years")
  .describe("Person's age in years")

// Decimal precision
price: z.number()
  .min(0, "Price cannot be negative")
  .max(999999.99, "Price cannot exceed $999,999.99")
  .multipleOf(0.01, "Price must have at most 2 decimal places")
  .describe("Item price in USD")

// Positive numbers
quantity: z.number()
  .int("Quantity must be a whole number")
  .positive("Quantity must be greater than 0")
  .max(10000, "Quantity cannot exceed 10,000")
  .describe("Number of items in stock")

// Port numbers
port: z.number()
  .int("Port must be a whole number")
  .min(1, "Port must be at least 1")
  .max(65535, "Port cannot exceed 65535")
  .describe("Network port number for connection")

// Percentage
percentage: z.number()
  .min(0, "Percentage cannot be negative")
  .max(100, "Percentage cannot exceed 100")
  .describe("Percentage value between 0 and 100")

// Weight (in grams)
weight: z.number()
  .positive("Weight must be greater than 0")
  .max(50000, "Weight cannot exceed 50kg")
  .describe("Weight in grams")
```

### 4. Date Validations
```typescript
// Basic date
createdAt: z.date()
  .describe("Timestamp when the record was created")

// Date with constraints
birthDate: z.date()
  .max(new Date(), "Birth date cannot be in the future")
  .min(new Date(1900, 0, 1), "Birth date cannot be before 1900")
  .describe("Person's date of birth")

// Date from string (for API inputs)
scheduledDate: z.string()
  .min(1, "Scheduled date is required")
  .max(50, "Date string cannot exceed 50 characters")
  .datetime("Invalid date format - use ISO 8601 format")
  .pipe(z.coerce.date())
  .describe("Scheduled date and time for the event")

// Date range validation
dateRange: z.object({
  startDate: z.date()
    .describe("Start date of the period"),
  endDate: z.date()
    .describe("End date of the period")
}).refine(
  (data) => data.endDate > data.startDate,
  { 
    message: "End date must be after start date", 
    path: ["endDate"] 
  }
)

// Optional date
completedAt: z.date()
  .optional()
  .describe("Timestamp when the task was completed")

// Nullable date
lastLogin: z.date()
  .nullable()
  .optional() // Allows the field to be omitted entirely
  .describe("Timestamp of the user's last login")
```

### 5. Array Validations
```typescript
// Basic array with constraints
tags: z.array(z.string()).min(1).max(10)

// Array of objects
items: z.array(ItemSchema).min(1)

// Unique array elements
categories: z.array(z.string()).refine(
  (arr) => new Set(arr).size === arr.length,
  { message: "Categories must be unique" }
)

// Non-empty array
requiredItems: z.array(z.string()).nonempty("At least one item is required")
```

### 6. Object Validations
```typescript
// Nested objects
address: z.object({
  street: z.string()
    .min(1, "Street address is required")
    .max(255, "Street address cannot exceed 255 characters")
    .trim()
    .describe("Street address including number and name"),
  
  city: z.string()
    .min(1, "City is required")
    .max(100, "City name cannot exceed 100 characters")
    .trim()
    .describe("City name"),
  
  state: z.string()
    .length(2, "State code must be exactly 2 characters")
    .regex(/^[A-Z]{2}$/, "State code must be uppercase letters")
    .describe("Two-letter state code"),
  
  zipCode: z.string()
    .min(5, "ZIP code must be at least 5 characters")
    .max(10, "ZIP code cannot exceed 10 characters")
    .regex(/^\d{5}(-\d{4})?$/, "Invalid ZIP code format")
    .describe("ZIP or postal code")
}).describe("Complete mailing address")

// Partial updates
UserUpdateSchema = UserSchema.partial()

// Pick specific fields
UserPublicSchema = UserSchema.pick({
  id: true,
  firstName: true,
  lastName: true
})

// Omit sensitive fields
UserResponseSchema = UserSchema.omit({
  password: true,
  passwordHash: true
})
```

## Advanced Patterns

### 1. Conditional Validation
```typescript
export const OrderSchema = z.object({
  type: z.enum(['standard', 'express', 'overnight']),
  deliveryDate: z.date().optional(),
  items: z.array(ItemSchema)
}).refine(
  (data) => {
    if (data.type === 'express' || data.type === 'overnight') {
      return data.deliveryDate !== undefined;
    }
    return true;
  },
  {
    message: "Delivery date is required for express and overnight orders",
    path: ["deliveryDate"]
  }
);
```

### 2. Custom Validators
```typescript
// Custom UUID validator
const uuidSchema = z.string().refine(
  (val) => /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(val),
  { message: "Invalid UUID format" }
);

// Custom business logic validator
const businessHoursSchema = z.object({
  openTime: z.string().regex(/^\d{2}:\d{2}$/),
  closeTime: z.string().regex(/^\d{2}:\d{2}$/)
}).refine(
  (data) => {
    const open = parseInt(data.openTime.replace(':', ''));
    const close = parseInt(data.closeTime.replace(':', ''));
    return close > open;
  },
  { message: "Close time must be after open time" }
);
```

### 3. Schema Composition
```typescript
// Base schemas
const TimestampSchema = z.object({
  createdAt: z.date(),
  updatedAt: z.date()
});

const AuditSchema = z.object({
  createdBy: z.string().uuid(),
  updatedBy: z.string().uuid()
});

// Composed schema
export const CompanySchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1).max(255),
  email: z.string().email(),
  phone: z.string().optional()
}).merge(TimestampSchema).merge(AuditSchema);
```

### 4. Schema Variants
```typescript
// Base schema
const BaseUserSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email()
});

// Creation variant (no ID, timestamps)
export const UserCreateSchema = BaseUserSchema.extend({
  password: z.string().min(8)
});

// Update variant (partial, no password)
export const UserUpdateSchema = BaseUserSchema.partial();

// Response variant (with ID, timestamps, no password)
export const UserResponseSchema = BaseUserSchema.extend({
  id: z.string().uuid(),
  createdAt: z.date(),
  updatedAt: z.date()
});
```

## Error Handling Best Practices

### 1. Custom Error Messages
```typescript
export const ProductSchema = z.object({
  name: z.string()
    .min(1, "Product name is required")
    .max(255, "Product name must be less than 255 characters"),
  price: z.number()
    .min(0, "Price cannot be negative")
    .max(999999.99, "Price cannot exceed $999,999.99"),
  category: z.enum(['electronics', 'clothing', 'books'], {
    errorMap: () => ({ message: "Category must be electronics, clothing, or books" })
  })
});
```

### 2. Path-Specific Errors
```typescript
export const AddressSchema = z.object({
  street: z.string().min(1),
  city: z.string().min(1),
  state: z.string().length(2),
  zipCode: z.string().regex(/^\d{5}$/)
}).refine(
  (data) => data.state.toUpperCase() === data.state,
  {
    message: "State must be uppercase",
    path: ["state"]
  }
);
```

## Performance Optimization

### 1. Schema Caching
```typescript
// Cache compiled schemas
const schemaCache = new Map<string, z.ZodSchema>();

export function getCachedSchema(key: string, schemaFactory: () => z.ZodSchema) {
  if (!schemaCache.has(key)) {
    schemaCache.set(key, schemaFactory());
  }
  return schemaCache.get(key)!;
}
```

### 2. Lazy Evaluation
```typescript
// Use lazy for recursive schemas
export const CategorySchema: z.ZodSchema = z.lazy(() => z.object({
  id: z.string().uuid(),
  name: z.string(),
  parentId: z.string().uuid().optional(),
  children: z.array(CategorySchema).optional()
}));
```

## Type Safety and Integration

### 1. Type Inference
```typescript
// Infer types from schemas
export type User = z.infer<typeof UserSchema>;
export type UserCreate = z.infer<typeof UserCreateSchema>;
export type UserUpdate = z.infer<typeof UserUpdateSchema>;

// Use branded types for IDs
export const UserIdSchema = z.string().uuid().brand<'UserId'>();
export type UserId = z.infer<typeof UserIdSchema>;
```

### 2. Kysely Database Integration

#### Schema Structure Pattern
Always follow this hierarchy for database schemas:
```
BaseSchema (full database representation)
├── InsertSchema (for creating new records - omits generated fields)
└── UpdateSchema (for updating existing records - makes InsertSchema fields optional)
```

**Important**: UpdateSchema should use `InsertSchema.partial()` without additional `.omit()` calls, since the InsertSchema already omits the ID field.

#### Handling Database Types
```typescript
import { z } from 'zod';
import type { AuthUsers } from '../types';

/**
 * Base schema representing the full database table structure
 * This should match the Kysely-generated types exactly
 */
export const AuthUsersBaseSchema = z.object({
  /** Primary key - generated by database */
  id: z.string()
    .uuid("Invalid user ID format")
    .describe("Unique identifier for the user account"),
  
  /** User's email address */
  email: z.string()
    .min(1, "Email is required")
    .max(255, "Email cannot exceed 255 characters")
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .describe("User's email address for authentication and communication"),
  
  /** User's full name */
  name: z.string()
    .min(1, "Name is required")
    .max(255, "Name cannot exceed 255 characters")
    .trim()
    .describe("User's full display name"),
  
  /** Hashed password */
  password: z.string()
    .min(1, "Password is required")
    .max(255, "Password hash cannot exceed 255 characters")
    .describe("Hashed password for authentication"),
  
  /** Phone number - optional */
  phone: z.string()
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^\+?[\d\s-()]+$/, "Invalid phone format")
    .nullable()
    .describe("Contact phone number in international format"),
  
  /** Profile picture URL - optional */
  profilePictureUrl: z.string()
    .max(500, "Profile picture URL cannot exceed 500 characters")
    .url("Invalid URL format")
    .nullable()
    .describe("URL to the user's profile picture"),
  
  /** Account status */
  status: z.string()
    .max(50, "Status cannot exceed 50 characters")
    .default('active')
    .describe("Current status of the user account"),
  
  /** Email verification status */
  emailVerified: z.boolean()
    .default(false)
    .describe("Whether the user's email address has been verified"),
  
  /** Admin privileges */
  isAdmin: z.boolean()
    .default(false)
    .describe("Whether the user has administrative privileges"),
  
  /** Last login timestamp */
  lastLogin: z.coerce.date()
    .nullable()
    .describe("Timestamp of the user's last login"),
  
  /** Record creation timestamp */
  created: z.coerce.date()
    .describe("Timestamp when the user account was created"),
  
  /** Record update timestamp */
  updated: z.coerce.date()
    .describe("Timestamp when the user account was last updated"),
  
  /** Soft delete flag */
  deleted: z.boolean()
    .nullable()
    .default(null)
    .describe("Whether the user account has been soft deleted"),
  
  /** Soft delete timestamp */
  deletedAt: z.coerce.date()
    .nullable()
    .describe("Timestamp when the user account was soft deleted")
});

/**
 * Schema for inserting new records
 * Omits Generated<T> fields and auto-managed fields
 */
export const AuthUsersInsertSchema = AuthUsersBaseSchema.omit({
  id: true,           // Generated by database
  created: true,      // Auto-managed timestamp
  updated: true,      // Auto-managed timestamp
  emailVerified: true, // Has default value
  isAdmin: true,      // Has default value
  status: true,       // Has default value
  deleted: true,      // Has default value
  deletedAt: true     // Managed by soft delete logic
}).extend({
  // Override fields that should accept string input but coerce to proper types
  lastLogin: z.string()
    .max(50, "Date string cannot exceed 50 characters")
    .datetime("Invalid date format - use ISO 8601 format")
    .pipe(z.coerce.date())
    .nullable()
    .optional()
    .describe("Last login date as ISO string")
});

/**
 * Schema for updating existing records
 * All fields are optional. Only omit ID if it exists in the base schema.
 * Since InsertSchema already omits ID, don't omit it again.
 */
export const AuthUsersUpdateSchema = AuthUsersInsertSchema.partial();
```

#### Coercion Best Practices
```typescript
// ✅ Good: Use coerce for date/time fields that come as strings
created: z.coerce.date()
lastLogin: z.string().datetime().pipe(z.coerce.date()).nullable()

// ✅ Good: Use coerce for numeric fields from form inputs
age: z.coerce.number().int().min(0).max(120)
price: z.coerce.number().min(0).multipleOf(0.01)

// ✅ Good: Use coerce for boolean fields from form inputs
isActive: z.coerce.boolean()
emailVerified: z.coerce.boolean().default(false)

// ❌ Avoid: Don't coerce UUID strings - they should be validated as-is
id: z.string().uuid() // Not z.coerce.string().uuid()
```

#### Generated Fields Handling
```typescript
// Always omit Generated<T> fields from Insert schemas
export const CrmCompaniesInsertSchema = CrmCompaniesBaseSchema.omit({
  id: true,      // Generated<string>
  created: true, // Generated<Timestamp>
  updated: true, // Generated<Timestamp>
  deleted: true, // Generated<boolean | null>
  status: true   // Generated<string | null> with default
});

// For Update schemas, all fields should be optional
// Since InsertSchema already omits ID, don't omit it again
export const CrmCompaniesUpdateSchema = CrmCompaniesInsertSchema.partial();
```

#### Complex Database Types
```typescript
// Handle Numeric type (from PostgreSQL)
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
  
  status: z.enum(['open', 'won', 'lost'], {
    errorMap: () => ({ message: "Status must be open, won, or lost" })
  }).describe("Current status of the deal"),
  
  companyId: z.string()
    .uuid("Invalid company ID format")
    .nullable()
    .describe("ID of the company associated with this deal"),
  
  contactId: z.string()
    .uuid("Invalid contact ID format")
    .nullable()
    .describe("ID of the primary contact for this deal"),
  
  created: z.coerce.date()
    .describe("Timestamp when the deal was created"),
  
  updated: z.coerce.date()
    .describe("Timestamp when the deal was last updated"),
  
  deleted: z.boolean()
    .nullable()
    .default(null)
    .describe("Whether the deal has been soft deleted")
});

export const CrmDealsInsertSchema = CrmDealsBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  deleted: true
});

export const CrmDealsUpdateSchema = CrmDealsInsertSchema.partial();
```

#### Timestamp Handling
```typescript
// For API inputs (strings) that need to become dates
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
    .describe("Detailed description of the task"),
  
  status: z.enum(['pending', 'in-progress', 'completed'], {
    errorMap: () => ({ message: "Status must be pending, in-progress, or completed" })
  }).default('pending')
    .describe("Current status of the task"),
  
  dueDate: z.coerce.date()
    .nullable()
    .describe("Due date for task completion"),
  
  companyId: z.string()
    .uuid("Invalid company ID format")
    .nullable()
    .describe("ID of the company this task is associated with"),
  
  contactId: z.string()
    .uuid("Invalid contact ID format")
    .nullable()
    .describe("ID of the contact this task is associated with"),
  
  created: z.coerce.date()
    .describe("Timestamp when the task was created"),
  
  updated: z.coerce.date()
    .describe("Timestamp when the task was last updated"),
  
  deleted: z.boolean()
    .nullable()
    .default(null)
    .describe("Whether the task has been soft deleted")
});

export const CrmTasksInsertSchema = CrmTasksBaseSchema.omit({
  id: true,
  created: true,
  updated: true,
  deleted: true,
  status: true // Has default value
}).extend({
  // Allow string input for dates in API
  dueDate: z.string()
    .max(50, "Date string cannot exceed 50 characters")
    .datetime("Invalid date format - use ISO 8601 format")
    .pipe(z.coerce.date())
    .nullable()
    .optional()
    .describe("Due date as ISO string")
});

export const CrmTasksUpdateSchema = CrmTasksInsertSchema.partial();
```

#### Complete Example Pattern
```typescript
// File: src/db/schemas/crmCompanies.schema.ts
import { z } from 'zod';
import type { CrmCompanies } from '../types';

/**
 * Base schema for CRM Companies table
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
    .describe("Legal name of the company"),
  
  email: z.string()
    .min(1, "Email is required")
    .max(255, "Email cannot exceed 255 characters")
    .email("Invalid email format")
    .toLowerCase()
    .trim()
    .describe("Primary email address for the company"),
  
  phone: z.string()
    .min(1, "Phone number is required")
    .max(20, "Phone number cannot exceed 20 characters")
    .regex(/^\+?[\d\s-()]+$/, "Invalid phone format")
    .describe("Primary phone number for the company"),
  
  address: z.string()
    .min(1, "Address is required")
    .max(500, "Address cannot exceed 500 characters")
    .trim()
    .describe("Physical address of the company"),
  
  billingAddress: z.string()
    .max(500, "Billing address cannot exceed 500 characters")
    .trim()
    .nullable()
    .describe("Billing address if different from physical address"),
  
  websiteUrl: z.string()
    .max(500, "Website URL cannot exceed 500 characters")
    .url("Invalid URL format")
    .nullable()
    .describe("Company website URL"),
  
  industry: z.string()
    .max(100, "Industry cannot exceed 100 characters")
    .nullable()
    .describe("Industry or sector the company operates in"),
  
  taxId: z.string()
    .max(50, "Tax ID cannot exceed 50 characters")
    .nullable()
    .describe("Tax identification number"),
  
  notes: z.string()
    .max(2000, "Notes cannot exceed 2000 characters")
    .nullable()
    .describe("Additional notes or comments about the company"),
  
  status: z.string()
    .max(50, "Status cannot exceed 50 characters")
    .nullable()
    .default(null)
    .describe("Current status of the company relationship"),
  
  created: z.coerce.date()
    .describe("Timestamp when the company was created"),
  
  updated: z.coerce.date()
    .describe("Timestamp when the company was last updated"),
  
  deleted: z.boolean()
    .nullable()
    .default(null)
    .describe("Whether the company has been soft deleted")
});

/**
 * Schema for inserting new companies
 * Omits all Generated<T> fields
 */
export const CrmCompaniesInsertSchema = CrmCompaniesBaseSchema.omit({
  id: true,      // Generated by database
  created: true, // Auto-managed
  updated: true, // Auto-managed
  deleted: true, // Auto-managed
  status: true   // Has default value
});

/**
 * Schema for updating existing companies
 * All fields are optional. Since InsertSchema already omits ID, don't omit it again.
 */
export const CrmCompaniesUpdateSchema = CrmCompaniesInsertSchema.partial();

// Type exports for use in application
export type CrmCompaniesBase = z.infer<typeof CrmCompaniesBaseSchema>;
export type CrmCompaniesInsert = z.infer<typeof CrmCompaniesInsertSchema>;
export type CrmCompaniesUpdate = z.infer<typeof CrmCompaniesUpdateSchema>;
```

#### Schema Naming Convention for Kysely
```typescript
// File: src/db/schemas/[tableName].schema.ts

// Base schema (full table representation)
export const [TableName]BaseSchema = z.object({...});

// Insert schema (for new records)
export const [TableName]InsertSchema = [TableName]BaseSchema.omit({...});

// Update schema (for existing records)
// Since InsertSchema already omits ID, don't omit it again
export const [TableName]UpdateSchema = [TableName]InsertSchema.partial();

// Examples:
// src/db/schemas/authUsers.schema.ts
// src/db/schemas/crmCompanies.schema.ts
// src/db/schemas/crmContacts.schema.ts
```

### 3. UpdateSchema Pattern (Critical)
**IMPORTANT**: When creating UpdateSchema from InsertSchema, use only `.partial()` without additional `.omit()` calls:

```typescript
// ✅ Correct: InsertSchema already omits ID, so just make fields optional
export const UserUpdateSchema = UserInsertSchema.partial();

// ❌ Incorrect: This will cause errors since ID is already omitted from InsertSchema
export const UserUpdateSchema = UserInsertSchema.partial().omit({ id: true });
```

**Why this matters**: The InsertSchema already removes the `id` field from the BaseSchema. Trying to omit `id` again from the UpdateSchema will cause a TypeScript error since the field doesn't exist in the InsertSchema.

## Common Patterns for Logistics Domain

### 1. Logistics-Specific Validations
```typescript
// Weight validation
weight: z.number().positive().max(50000) // Max 50kg

// Dimensions validation
dimensions: z.object({
  length: z.number().positive().max(1000), // Max 1000cm
  width: z.number().positive().max(1000),
  height: z.number().positive().max(1000)
})

// Tracking number validation
trackingNumber: z.string().regex(/^[A-Z]{2}\d{9}[A-Z]{2}$/)

// Vehicle license plate
licensePlate: z.string().regex(/^[A-Z0-9]{1,8}$/)
```

### 2. Business Rules
```typescript
export const ShipmentSchema = z.object({
  weight: z.number().positive(),
  dimensions: DimensionsSchema,
  value: z.number().positive(),
  isFragile: z.boolean(),
  requiresSignature: z.boolean()
}).refine(
  (data) => {
    // High-value items require signature
    if (data.value > 1000) {
      return data.requiresSignature;
    }
    return true;
  },
  {
    message: "Items over $1000 require signature confirmation",
    path: ["requiresSignature"]
  }
);
```

## Testing Schemas

### 1. Schema Testing Best Practices with Bun

#### File Organization
- **Schema Location**: `src/db/schemas/<name>.schema.ts`
- **Test Location**: `tests/db/schemas/<name>.schema.test.ts`
- **Naming Convention**: Use descriptive names like `authUsers.schema.ts`, `crmCompanies.schema.ts`

**Critical Testing Rule**: Always place schema tests in the `tests/db/schemas/` folder to maintain consistency with the project structure.

#### Test Structure
```typescript
import { describe, it, expect } from 'bun:test';
import { 
  AuthUsersBaseSchema, 
  AuthUsersInsertSchema, 
  AuthUsersUpdateSchema 
} from '../../../src/db/schemas/authUsers.schema';

describe('AuthUsersBaseSchema', () => {
  describe('Valid cases', () => {
    it('should validate correct user data', () => {
      const validUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        phone: '+1-555-123-4567',
        profilePictureUrl: 'https://example.com/avatar.jpg',
        status: 'active',
        emailVerified: true,
        isAdmin: false,
        lastLogin: new Date(),
        created: new Date(),
        updated: new Date(),
        deleted: null,
        deletedAt: null
      };
      
      expect(() => AuthUsersBaseSchema.parse(validUser)).not.toThrow();
    });

    it('should handle nullable fields correctly', () => {
      const userWithNulls = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        phone: null,
        profilePictureUrl: null,
        status: 'active',
        emailVerified: false,
        isAdmin: false,
        lastLogin: null,
        created: new Date(),
        updated: new Date(),
        deleted: null,
        deletedAt: null
      };
      
      expect(() => AuthUsersBaseSchema.parse(userWithNulls)).not.toThrow();
    });

    it('should apply default values correctly', () => {
      const result = AuthUsersBaseSchema.parse({
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        phone: null,
        profilePictureUrl: null,
        // status should default to 'active'
        // emailVerified should default to false
        // isAdmin should default to false
        lastLogin: null,
        created: new Date(),
        updated: new Date(),
        deleted: null, // should default to null
        deletedAt: null
      });
      
      expect(result.status).toBe('active');
      expect(result.emailVerified).toBe(false);
      expect(result.isAdmin).toBe(false);
      expect(result.deleted).toBe(null);
    });
  });

  describe('Invalid cases', () => {
    it('should reject invalid email format', () => {
      const invalidUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'invalid-email',
        name: 'John Doe',
        password: 'hashedPassword123',
        phone: null,
        profilePictureUrl: null,
        status: 'active',
        emailVerified: false,
        isAdmin: false,
        lastLogin: null,
        created: new Date(),
        updated: new Date(),
        deleted: null,
        deletedAt: null
      };
      
      expect(() => AuthUsersBaseSchema.parse(invalidUser)).toThrow();
    });

    it('should reject invalid UUID format', () => {
      const invalidUser = {
        id: 'invalid-uuid',
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        phone: null,
        profilePictureUrl: null,
        status: 'active',
        emailVerified: false,
        isAdmin: false,
        lastLogin: null,
        created: new Date(),
        updated: new Date(),
        deleted: null,
        deletedAt: null
      };
      
      expect(() => AuthUsersBaseSchema.parse(invalidUser)).toThrow();
    });

    it('should reject empty required fields', () => {
      const invalidUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: '',
        name: '',
        password: '',
        phone: null,
        profilePictureUrl: null,
        status: 'active',
        emailVerified: false,
        isAdmin: false,
        lastLogin: null,
        created: new Date(),
        updated: new Date(),
        deleted: null,
        deletedAt: null
      };
      
      expect(() => AuthUsersBaseSchema.parse(invalidUser)).toThrow();
    });

    it('should reject fields exceeding max length', () => {
      const invalidUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        name: 'a'.repeat(256), // Exceeds max length of 255
        password: 'hashedPassword123',
        phone: null,
        profilePictureUrl: null,
        status: 'active',
        emailVerified: false,
        isAdmin: false,
        lastLogin: null,
        created: new Date(),
        updated: new Date(),
        deleted: null,
        deletedAt: null
      };
      
      expect(() => AuthUsersBaseSchema.parse(invalidUser)).toThrow();
    });

    it('should reject invalid phone format', () => {
      const invalidUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        phone: 'invalid-phone-format',
        profilePictureUrl: null,
        status: 'active',
        emailVerified: false,
        isAdmin: false,
        lastLogin: null,
        created: new Date(),
        updated: new Date(),
        deleted: null,
        deletedAt: null
      };
      
      expect(() => AuthUsersBaseSchema.parse(invalidUser)).toThrow();
    });

    it('should reject invalid URL format', () => {
      const invalidUser = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        phone: null,
        profilePictureUrl: 'not-a-valid-url',
        status: 'active',
        emailVerified: false,
        isAdmin: false,
        lastLogin: null,
        created: new Date(),
        updated: new Date(),
        deleted: null,
        deletedAt: null
      };
      
      expect(() => AuthUsersBaseSchema.parse(invalidUser)).toThrow();
    });
  });
});

describe('AuthUsersInsertSchema', () => {
  describe('Valid cases', () => {
    it('should validate correct insert data', () => {
      const validInsert = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        phone: '+1-555-123-4567',
        profilePictureUrl: 'https://example.com/avatar.jpg'
      };
      
      expect(() => AuthUsersInsertSchema.parse(validInsert)).not.toThrow();
    });

    it('should handle optional fields', () => {
      const minimalInsert = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123'
      };
      
      expect(() => AuthUsersInsertSchema.parse(minimalInsert)).not.toThrow();
    });

    it('should handle date string coercion', () => {
      const insertWithDate = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        lastLogin: '2024-01-15T10:30:00Z'
      };
      
      const result = AuthUsersInsertSchema.parse(insertWithDate);
      expect(result.lastLogin).toBeInstanceOf(Date);
    });
  });

  describe('Invalid cases', () => {
    it('should reject when required fields are missing', () => {
      const invalidInsert = {
        email: 'test@example.com'
        // Missing name and password
      };
      
      expect(() => AuthUsersInsertSchema.parse(invalidInsert)).toThrow();
    });

    it('should reject invalid date format', () => {
      const invalidInsert = {
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123',
        lastLogin: 'invalid-date-format'
      };
      
      expect(() => AuthUsersInsertSchema.parse(invalidInsert)).toThrow();
    });

    it('should reject if trying to set generated fields', () => {
      const invalidInsert = {
        id: '123e4567-e89b-12d3-a456-426614174000', // Should be omitted
        email: 'test@example.com',
        name: 'John Doe',
        password: 'hashedPassword123'
      };
      
      // This should not contain id field
      expect(() => AuthUsersInsertSchema.parse(invalidInsert)).toThrow();
    });
  });
});

describe('AuthUsersUpdateSchema', () => {
  describe('Valid cases', () => {
    it('should validate partial update data', () => {
      const validUpdate = {
        email: 'newemail@example.com',
        name: 'John Doe'
      };
      
      expect(() => AuthUsersUpdateSchema.parse(validUpdate)).not.toThrow();
    });

    it('should handle empty update object', () => {
      const emptyUpdate = {};
      
      expect(() => AuthUsersUpdateSchema.parse(emptyUpdate)).not.toThrow();
    });

    it('should handle single field updates', () => {
      const singleFieldUpdate = {
        name: 'New Name Only'
      };
      
      expect(() => AuthUsersUpdateSchema.parse(singleFieldUpdate)).not.toThrow();
    });
  });

  describe('Invalid cases', () => {
    it('should reject invalid field values', () => {
      const invalidUpdate = {
        email: 'invalid-email-format',
        name: 'a'.repeat(256) // Exceeds max length
      };
      
      expect(() => AuthUsersUpdateSchema.parse(invalidUpdate)).toThrow();
    });
  });
});
```

#### Complete Test Suite Template
```typescript
import { describe, it, expect } from 'bun:test';
import { 
  [TableName]BaseSchema, 
  [TableName]InsertSchema, 
  [TableName]UpdateSchema 
} from '../../../src/db/schemas/[tableName].schema';

describe('[TableName]BaseSchema', () => {
  describe('Valid cases', () => {
    it('should validate correct data with all fields', () => {
      // Test with all fields populated
    });

    it('should handle nullable fields correctly', () => {
      // Test with nullable fields set to null
    });

    it('should apply default values correctly', () => {
      // Test that defaults are applied
    });

    it('should handle edge cases for constraints', () => {
      // Test boundary values (min/max lengths, etc.)
    });
  });

  describe('Invalid cases', () => {
    it('should reject invalid formats', () => {
      // Test invalid email, UUID, URL formats
    });

    it('should reject empty required fields', () => {
      // Test empty strings, null values for required fields
    });

    it('should reject fields exceeding constraints', () => {
      // Test max length, min/max values
    });

    it('should reject invalid enum values', () => {
      // Test invalid enum values
    });

    it('should reject invalid regex patterns', () => {
      // Test regex validation failures
    });
  });
});

describe('[TableName]InsertSchema', () => {
  describe('Valid cases', () => {
    it('should validate correct insert data', () => {
      // Test successful insert data
    });

    it('should handle optional fields', () => {
      // Test with minimal required fields
    });

    it('should handle date string coercion', () => {
      // Test date string to Date conversion
    });
  });

  describe('Invalid cases', () => {
    it('should reject when required fields are missing', () => {
      // Test missing required fields
    });

    it('should reject generated fields', () => {
      // Test that generated fields are properly omitted
    });

    it('should reject invalid coercion', () => {
      // Test failed coercion attempts
    });
  });
});

describe('[TableName]UpdateSchema', () => {
  describe('Valid cases', () => {
    it('should validate partial update data', () => {
      // Test partial updates
    });

    it('should handle empty update object', () => {
      // Test empty update
    });

    it('should handle single field updates', () => {
      // Test updating one field at a time
    });
  });

  describe('Invalid cases', () => {
    it('should reject invalid field values', () => {
      // Test invalid values in update
    });
  });
});
```

### 2. Error Message Testing
```typescript
describe('Error Messages', () => {
  it('should provide meaningful error messages', () => {
    try {
      AuthUsersBaseSchema.parse({
        id: 'invalid-uuid',
        email: 'invalid-email',
        name: '',
        password: ''
      });
    } catch (error) {
      expect(error.message).toContain('Invalid user ID format');
      expect(error.message).toContain('Invalid email format');
      expect(error.message).toContain('Name is required');
      expect(error.message).toContain('Password is required');
    }
  });
});
```

### 3. Performance Testing
```typescript
describe('Performance', () => {
  it('should validate large datasets efficiently', () => {
    const largeDataset = Array.from({ length: 1000 }, (_, i) => ({
      id: `123e4567-e89b-12d3-a456-42661417${i.toString().padStart(4, '0')}`,
      email: `test${i}@example.com`,
      name: `Test User ${i}`,
      password: `hashedPassword${i}`,
      phone: null,
      profilePictureUrl: null,
      status: 'active',
      emailVerified: false,
      isAdmin: false,
      lastLogin: null,
      created: new Date(),
      updated: new Date(),
      deleted: null,
      deletedAt: null
    }));

    const start = Date.now();
    largeDataset.forEach(item => {
      AuthUsersBaseSchema.parse(item);
    });
    const end = Date.now();

    expect(end - start).toBeLessThan(1000); // Should complete in under 1 second
  });
});
```

### 4. Test Organization Guidelines
- **Group by schema variant**: Base, Insert, Update schemas
- **Separate valid/invalid cases**: Clear distinction between success and failure tests
- **Test edge cases**: Boundary values, empty strings, null values
- **Test coercion**: Date strings, number strings, boolean strings
- **Test business rules**: Custom validation logic
- **Test error messages**: Ensure meaningful feedback
- **Test performance**: Large datasets, complex validations

### 5. Running Tests
```bash
# Run all schema tests
bun test tests/db/schemas/

# Run specific schema tests
bun test tests/db/schemas/authUsers.schema.test.ts

# Run tests with coverage
bun test --coverage tests/db/schemas/

# Run tests in watch mode
bun test --watch tests/db/schemas/
```

## Documentation Standards

### 1. Schema Documentation
```typescript
/**
 * User schema for the logistics management system
 * 
 * @description Validates user data for authentication and profile management
 * @example
 * ```typescript
 * const user = UserSchema.parse({
 *   id: '123e4567-e89b-12d3-a456-426614174000',
 *   email: 'user@example.com',
 *   firstName: 'John',
 *   lastName: 'Doe'
 * });
 * ```
 */
export const UserSchema = z.object({
  /** Unique identifier for the user */
  id: z.string().uuid(),
  
  /** User's email address - must be valid and unique */
  email: z.string().email().toLowerCase(),
  
  /** User's first name - 1-100 characters */
  firstName: z.string().min(1).max(100),
  
  /** User's last name - 1-100 characters */
  lastName: z.string().min(1).max(100)
});
```

Remember: Always validate at API boundaries, use TypeScript integration, and prioritize clear error messages for better developer experience.