
# GraphQL Resolver Generation Instructions

This guide documents the process for generating and integrating GraphQL resolvers for SeaORM entities in the `graphql-crm` and `graphql-ims` domains, based on the established pattern in this project. The IMS domain supports batch resolver creation and explicit module registration.

## 1. Entity Analysis
- For each entity in `services/graphql-crm/src/entities/`, identify:
  - The entity struct (e.g., `contacts::Entity`)
  - The model struct (e.g., `contacts::Model`)
  - The primary key type (usually `Uuid`)
  - The input types for mutations (e.g., `InsertContact`, `UpdateContact`)


## 2. Resolver File Creation
- For each entity, create a resolver file in `services/<domain>/src/queries/` named `<entity>.rs`.
- Implement two traits from `graphql_core::traits`:
  - `GraphqlQuery<Model, PrimaryKey>` for queries
  - `GraphqlMutation<Model, PrimaryKey, Insert, Update>` for mutations
- Use the following structure:

```rust
use async_graphql::Object;
use graphql_core::traits::{GraphqlMutation, GraphqlQuery};
use sea_orm::{ActiveModelTrait, ActiveValue::Set, DatabaseConnection, EntityTrait, IntoActiveModel, ModelTrait, TransactionTrait};
use uuid::Uuid;
use crate::entities::{_generated::<entity>, <entity>::{Insert<Entity>, Update<Entity>}};

#[Object(name = "<Entities>")]
impl graphql_core::traits::GraphqlQuery<<entity>::Model, Uuid> for <entity>::Entity {
    #[graphql(name = "<entities>")]
    async fn list(&self, ctx: &async_graphql::Context<'_>) -> async_graphql::Result<Vec<<entity>::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let items = <entity>::Entity::find().all(db).await.unwrap_or_default();
        Ok(items)
    }
    #[graphql(name = "<entity>")]
    async fn view(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<Option<<entity>::Model>> {
        let db = ctx.data::<DatabaseConnection>()?;
        let item = <entity>::Entity::find_by_id(id).one(db).await?;
        Ok(item)
    }
}

#[derive(Debug, Default)]
pub struct Mutations;

#[Object(name = "Crm<Entity>Mutations")]
impl graphql_core::traits::GraphqlMutation<<entity>::Model, Uuid, Insert<Entity>, Update<Entity>> for Mutations {
    #[graphql(name = "create<Entity>")]
    async fn create(&self, ctx: &async_graphql::Context<'_>, value: Insert<Entity>) -> async_graphql::Result<<entity>::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let active_model = value.into_active_model();
        let new_item = active_model.insert(&trx).await?;
        _ = trx.commit().await?;
        Ok(new_item)
    }
    #[graphql(name = "update<Entity>")]
    async fn update(&self, ctx: &async_graphql::Context<'_>, id: Uuid, value: Update<Entity>) -> async_graphql::Result<<entity>::Model> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let mut active_model = value.into_active_model();
        active_model.id = Set(id);
        let updated_item = active_model.update(&trx).await?;
        _ = trx.commit().await?;
        Ok(updated_item)
    }
    #[graphql(name = "delete<Entity>")]
    async fn delete(&self, ctx: &async_graphql::Context<'_>, id: Uuid) -> async_graphql::Result<bool> {
        let db = ctx.data::<DatabaseConnection>()?;
        let trx = db.begin().await?;
        let item = <entity>::Entity::find_by_id(id).one(&trx).await?.ok_or(async_graphql::Error::new("Unable to find <entity>"))?;
        let result = item.delete(&trx).await?;
        _ = trx.commit().await?;
        if result.rows_affected != 1 {
            return Err(async_graphql::Error::new("Unable to delete <entity>"));
        }
        Ok(true)
    }
}
```


## 3. Module Registration
- Add each new resolver module to `services/<domain>/src/queries/mod.rs`:
  ```rust
  pub mod <entity>;
  ```
- For batch creation, export all new resolvers in a single update to `mod.rs`.


## 4. GraphQL Root Registration
- Update `services/<domain>/src/lib.rs`:
  - Add each entity to the `Query` struct:
    ```rust
    pub struct Query(
        entities::_generated::<entity>::Entity,
        // ...other entities
    );
    ```
  - Add each mutation struct to the `Mutation` struct:
    ```rust
    pub struct Mutation(
        queries::<entity>::Mutations,
        // ...other mutations
    );
    ```
- For batch creation, update the `Query` and `Mutation` structs to include all new entities and mutations in a single edit.

## 5. Enum Integration
- For SeaORM enums, ensure they derive `async_graphql::Enum` for GraphQL compatibility:
  ```rust
  #[derive(Debug, Clone, Copy, PartialEq, Eq, EnumIter, DeriveActiveEnum, async_graphql::Enum)]
  ```


## 6. Testing & Validation
- After integration, test the GraphQL API to ensure all queries and mutations work as expected for each entity.

---

### IMS Domain Example (2025-09-14)

Recent updates for the IMS domain:
- Entities are scanned and missing resolvers are identified.
- Resolver files are created in batches for efficiency.
- Each new resolver is exported in `services/graphql-ims/src/queries/mod.rs`.
- The root `Query` and `Mutation` structs in `services/graphql-ims/src/lib.rs` are updated to include all new entities and mutations, following the pattern:
  ```rust
  #[derive(Debug, Default, MergedObject)]
  #[graphql(name = "ImsQueries")]
  pub struct Query(
      entities::_generated::inbound_shipment_items::Entity,
      entities::_generated::inbound_shipments::Entity,
      entities::_generated::inventory_adjustments::Entity,
      entities::_generated::inventory_batches::Entity,
      // ...other entities
  );

  #[derive(Debug, Default, MergedObject)]
  #[graphql(name = "ImsMutations")]
  pub struct Mutation(
      queries::inbound_shipment_items::Mutations,
      queries::inbound_shipments::Mutations,
      queries::inventory_adjustments::Mutations,
      queries::inventory_batches::Mutations,
      // ...other mutations
  );
  ```

This ensures all resolvers are registered and available in the GraphQL schema. Batch updates are recommended for large sets of entities.

---

This process is repeatable for any new entity added to the CRM domain. Follow the above steps to ensure consistency and maintainability.
