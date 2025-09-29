import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single inventory adjustment by its ID.
 */
export const getInventoryAdjustment = graphql(`
  query GetInventoryAdjustment($id: UUID!) {
    wms {
      inventoryAdjustment(id: $id) {
        id
        quantityChange
        reason
        notes
        createdAt
        updatedAt
        product {
          id
          name
        }
        warehouse {
          id
          name
        }
        user {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of inventory adjustments with pagination.
 */
export const getInventoryAdjustments = graphql(`
  query GetInventoryAdjustments($limit: Int!, $page: Int!) {
    wms {
      inventoryAdjustments(limit: $limit, page: $page) {
        id
        quantityChange
        reason
        notes
        createdAt
        updatedAt
        product {
          id
          name
        }
        warehouse {
          id
          name
        }
        user {
          id
          name
        }
      }
    }
  }
`);
