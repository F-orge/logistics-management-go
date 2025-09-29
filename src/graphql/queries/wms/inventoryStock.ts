import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single inventory stock item by its ID.
 */
export const getInventoryStockItem = graphql(`
  query GetInventoryStockItem($id: UUID!) {
    wms {
      inventoryStockItem(id: $id) {
        id
        quantity
        reservedQuantity
        availableQuantity
        status
        lastCountedAt
        lastMovementAt
        createdAt
        updatedAt
        location {
          id
          name
        }
        product {
          id
          name
        }
        batch {
          id
          batchNumber
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of inventory stock items with pagination.
 */
export const getInventoryStock = graphql(`
  query GetInventoryStock($limit: Int!, $page: Int!) {
    wms {
      inventoryStock(limit: $limit, page: $page) {
        id
        quantity
        reservedQuantity
        availableQuantity
        status
        lastCountedAt
        lastMovementAt
        createdAt
        updatedAt
        location {
          id
          name
        }
        product {
          id
          name
        }
        batch {
          id
          batchNumber
        }
      }
    }
  }
`);
