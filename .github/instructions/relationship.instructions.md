# Relationship Resolver Instructions for GraphQL Entities

## Overview
This document describes the process and conventions for adding relationship resolvers to entity modules in the `graphql-crm` domain, following the pattern established in this conversation. These instructions ensure consistency, clarity, and maintainability when exposing entity relationships in your GraphQL schema.

## Folder Structure
- Custom resolver logic should be placed in `services/graphql-crm/src/entities/<entity>.rs`.
- Do NOT place custom logic in the `_generated` folder, as it will be overwritten by code generation.
- Documentation for this process should be placed in `.github/instructions/relationship.instructions.md`.


## Step-by-Step Instructions

### 1. Check for Relationships
- Open the `_generated/<entity>.rs` file.
- Only consider entities with a non-empty `Relation` enum and a `RelationTrait` implementation that does not simply panic (i.e., defines actual relationships). If the `Relation` enum is empty or the `RelationTrait` implementation panics, do not implement relationship resolvers for that entity.
- Review the `Relation` enum and `RelationTrait` implementation to identify if the entity has any relationships.
- If there are no relationships, do nothing.
- If relationships exist, proceed to the next steps.
- Additionally, check for the presence of a `#[ComplexObject]` implementation in the entity file (e.g., `entities/<entity>.rs`). If present, relationships have been established for that entity.

### 2. Ensure #[graphql(complex)] Macro
- In the entity's `Model` struct, check for the presence of the `#[graphql(complex)]` macro.
- If it does not exist, add it to enable complex resolvers for the entity.

### 3. Add #[ComplexObject] Implementation
- In `entities/<entity>.rs`, implement a `#[ComplexObject]` for the entity's `Model` struct. Place this implementation below the struct and other impls, not at the top of the file, to maintain clarity and convention.
- Import `sea_orm::prelude::*` in the entity file to ensure all necessary traits are available for relationship resolvers.
- For each relation:
  - **has_many**: Add a method returning `Vec<RelatedModel>`. Name the method in plural form (e.g., `contacts`, `leads`).
  - **belongs_to**: Add a method returning either `Option<RelatedModel>` (if the foreign key is nullable) or `RelatedModel` (if not nullable). Name the method after the field, not the entity (e.g., `owner` for `owner_id`, `company` for `company_id`).

### 4. Method Naming Conventions
- Use plural names for methods returning multiple records.
- Use singular names for methods returning a single record.
- For `belongs_to` relations, use the field name (e.g., `owner`, `company`) instead of the entity name.

### 5. Resolver Implementation Pattern
- For `has_many`:
  ```rust
  async fn contacts(&self, ctx: &Context<'_>) -> async_graphql::Result<Vec<contacts::Model>> {
      let db = ctx.data::<DatabaseConnection>()?;
      let results = contacts::Entity::find()
          .filter(contacts::Column::<ForeignKey>.eq(self.id))
          .all(db)
          .await
          .unwrap_or_default();
      Ok(results)
  }
  ```
- For `belongs_to` (nullable):
  ```rust
  async fn company(&self, ctx: &Context<'_>) -> async_graphql::Result<Option<companies::Model>> {
      let db = ctx.data::<DatabaseConnection>()?;
      if let Some(company_id) = self.company_id {
          let result = companies::Entity::find_by_id(company_id).one(db).await?;
          Ok(result)
      } else {
          Ok(None)
      }
  }
  ```
- For `belongs_to` (not nullable):
  ```rust
  async fn owner(&self, ctx: &Context<'_>) -> async_graphql::Result<user::Model> {
      let db = ctx.data::<DatabaseConnection>()?;
      let result = user::Entity::find_by_id(self.owner_id).one(db).await?;
      match result {
          Some(model) => Ok(model),
          None => Err(async_graphql::Error::new("Owner not found")),
      }
  }
  ```

### 6. Column Verification
- Always verify the correct foreign key column by checking the `Column` enum and its usage in the relation definition.
- For example, in the `leads` entity, the correct column for the contact relation is `ConvertedContactId`, not `ContactId`.

### 7. Async/Await Pattern
- Use `.await` for all async database calls.
- Avoid blocking calls or using `block_on`.

### 8. Example: contacts.rs
See `services/graphql-crm/src/entities/contacts.rs` for a complete example following these conventions.

## Summary
By following these steps and conventions, you ensure that relationship resolvers are:
- Placed in the correct file
- Named consistently and meaningfully
- Implemented with correct async patterns
- Safe from codegen overwrites
- Enabled for complex resolvers via the `#[graphql(complex)]` macro

Replicate this process for all entities in the domain to maintain a robust and clear GraphQL API.
