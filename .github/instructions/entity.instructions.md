# CRM Entity Generation Instructions

This document describes the conventions and workflow for generating entity files for the CRM domain in this repository. Follow these steps to ensure consistency and correctness.

## 1. Extract Fields from _generated Files

 - When creating fields in Insert/Update structs, always use the exact field type as written in the Model struct. This is required because the Model struct also uses Serde for serialization/deserialization.

## 2. Entity File Structure

For each entity, create a file in `services/graphql-crm/src/entities/` named after the entity (e.g., `contacts.rs`). Each file should contain:

### Insert Struct
- Named `Insert<Entity>` (e.g., `InsertContact`).
- Contains all fields from the Model except `id` and auto-generated timestamp fields (`created_at`, `updated_at`).
- Do not include `created_at` or `updated_at` in Insert/Update structs unless explicitly required for manual override.

### Update Struct
- Named `Update<Entity>` (e.g., `UpdateContact`).
- For non-nullable fields, use `Option<T>`.
- For nullable fields, use `Option<Option<T>>`.
- For enum fields, use the same pattern as above.

### IntoActiveModel Implementations
- Implement `IntoActiveModel<entity::ActiveModel>` for both Insert and Update structs.
- For Insert: set each field using `Set(value)`.
- For Update: set each field using `map(Set).unwrap_or(NotSet)`.

## 3. Enum Handling
- Import enums from `sea_orm_active_enums.rs` as needed.
- Use the exact enum type for fields in Insert/Update structs.

## 4. Batch Creation and Importing
- Entities should be created in batches for efficiency.
- After creating new entity files, update `mod.rs` in the `entities` folder to import the new modules.
- Example:
  ```rust
  pub mod contacts;
  pub mod leads;
  pub mod notifications;
  // ...
  ```

## 5. Special Notes
- Always use the field types and names from the `_generated` Model struct.
- Do not include the `id` field in Insert/Update structs unless explicitly required.
- Do not include `created_at` or `updated_at` in Insert/Update structs unless explicitly required for manual override. These fields are auto-generated and managed by the database.
- For fields named `type`, use `r#type` in Rust code.
- If the Model uses a field with a reserved Rust keyword, use raw identifiers (e.g., `r#type`).

## 6. Example

Given the following Model:
```rust
pub struct Model {
    pub id: Uuid,
    pub name: String,
    pub status: Option<CaseStatus>,
    pub created_at: Option<DateTimeWithTimeZone>,
}
```
The entity file should contain:
```rust
#[derive(Debug, Clone, InputObject)]
pub struct InsertEntity {
    pub name: String,
    pub status: Option<CaseStatus>,
}

#[derive(Debug, Clone, InputObject)]
pub struct UpdateEntity {
    pub name: Option<String>,
    pub status: Option<Option<CaseStatus>>,
}
```
And the appropriate `IntoActiveModel` implementations.

## 7. Workflow Summary
1. Read the Model struct from the `_generated` file.
2. Create Insert/Update structs in the entity file, matching field types and nullability.
3. Implement `IntoActiveModel` for both structs.
4. Import enums as needed.
5. Update `mod.rs` to include the new entity module.
6. Repeat for all entities in batches.

---

For questions or clarifications, refer to this document or review previous entity files for examples.
