# How to Convert SQL to GraphQL Schema

This guide provides a step-by-step process for converting SQL table definitions into a GraphQL schema, based on a real-world example of creating a CRM schema.

## 1. Analyze the SQL `CREATE TABLE` Statement

Begin by examining the SQL `CREATE TABLE` statement for the table you want to convert. Identify the column names, data types, and any constraints or relationships (e.g., foreign keys).

**Example:**

```sql
-- Companies
CREATE TABLE crm.companies(
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    name varchar(255) NOT NULL,
    street varchar(255),
    city varchar(255),
    state varchar(255),
    postal_code varchar(20),
    country varchar(100),
    phone_number varchar(20),
    industry varchar(100),
    website varchar(255),
    annual_revenue numeric(15, 2),
    owner_id text REFERENCES "user"(id),
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
);
```

## 2. Map SQL Columns to GraphQL Types

Translate the SQL data types to their corresponding GraphQL scalar types. Here's a general mapping:

| SQL Data Type      | GraphQL Scalar Type |
| ------------------ | ------------------- |
| `uuid`             | `ID`                |
| `varchar`, `text`  | `String`            |
| `integer`, `bigint`| `Int`               |
| `numeric`, `real`  | `Float`             |
| `boolean`          | `Boolean`           |
| `date`, `timestamp`| `String`            |

For foreign keys, you'll create a relationship to another GraphQL type.

## 3. Create a GraphQL File for Each Table

Organize your schema by creating a separate GraphQL file for each table. This makes the schema easier to manage and navigate.

**Example:**

```
/src/schema/crm/companies/schema.graphql
```

## 4. Define the GraphQL Type

In the new file, define the GraphQL type for the table. Use the mapped types from the previous step.

**Example:**

```graphql
type Companies {
  id: ID!
  name: String!
  street: String
  city: String
  state: String
  postalCode: String
  country: String
  phoneNumber: String
  industry: String
  website: String
  annualRevenue: Float
  owner: User
  createdAt: String
  updatedAt: String
}
```

## 5. Define Enums

If your SQL table uses `enum` types, define them in your GraphQL schema. It's a good practice to use `SCREAMING_SNAKE_CASE` for enum values.

**Example:**

```graphql
enum LeadStatus {
  NEW
  CONTACTED
  QUALIFIED
  UNQUALIFIED
  CONVERTED
}
```

## 6. Create Queries

Define queries to fetch data. At a minimum, create queries to fetch a single record by its ID and a list of all records.

**Example:**

```graphql
extend type CrmQuery {
  companies(page: Int, perPage: Int): [Companies!]!
  company(id: ID!): Companies!
}
```

## 7. Create Input Types

Create input types for creating and updating records. This provides a clear and structured way to pass data to mutations.

**Example:**

```graphql
input CreateCompanyInput {
  name: String!
  street: String
  city: String
  state: String
  postalCode: String
  country: String
  phoneNumber: String
  industry: String
  website: String
  annualRevenue: Float
  ownerId: ID
}

input UpdateCompanyInput {
  name: String
  street: String
  city: String
  state: String
  postalCode: String
  country: String
  phoneNumber: String
  industry: String
  website: String
  annualRevenue: Float
  ownerId: ID
}
```

## 8. Create Mutations

Define mutations for creating, updating, and deleting records.

**Example:**

```graphql
extend type CrmMutation {
  createCompany(value: CreateCompanyInput!): Companies!
  updateCompany(id: ID!, value: UpdateCompanyInput): Companies!
  removeCompany(id: ID!): DeleteResult!
}
```

## 9. Handle Relationships

For foreign key relationships, define a field in your GraphQL type that references the related GraphQL type.

**Example:**

The `owner_id` in the `companies` table references the `user` table. In the `Companies` type, we have an `owner` field that references the `User` type.

```graphql
type Companies {
  # ...
  owner: User
}
```

## 10. Handle Join Tables

For many-to-many relationships that use a join table, create a new GraphQL type for the join table itself.

**Example:**

The `opportunity_products` table is a join table between `opportunities` and `products`.

```graphql
type OpportunityProducts {
  opportunity: Opportunities!
  product: Products!
  quantity: Int!
}
```

## 11. Add Join Table to Parent Table

To represent the many-to-many relationship, add a field to the parent table that is a list of the join table type.

**Example:**

In the `Opportunities` type, add a `products` field that is a list of `OpportunityProducts`.

```graphql
type Opportunities {
  # ...
  products: [OpportunityProducts!]
}
```

## 12. Refactor Field Names

To make your schema more concise and readable, you can refactor field names to remove prefixes that are already present in the parent table's name.

**Example:**

In the `Invoices` type, the `invoiceItems` field was renamed to `items`.

```graphql
type Invoices {
  # ...
  items: [InvoiceItems!]
}
```
