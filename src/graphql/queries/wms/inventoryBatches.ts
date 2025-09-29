import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single inventory batch by its ID.
 */
export const getInventoryBatch = graphql(`
  query GetInventoryBatch($id: UUID!) {
    wms {
      inventoryBatch(id: $id) {
        id
        batchNumber
        expirationDate
        createdAt
        updatedAt
        product {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of inventory batches with pagination.
 */
export const getInventoryBatches = graphql(`
  query GetInventoryBatches($limit: Int!, $page: Int!) {
    wms {
      inventoryBatches(limit: $limit, page: $page) {
        id
        batchNumber
        expirationDate
        createdAt
        updatedAt
        product {
          id
          name
        }
      }
    }
  }
`);
