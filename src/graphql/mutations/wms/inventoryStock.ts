import { graphql } from "@/lib/graphql/client";

/**
 * Creates a new inventory stock record.
 * Requires a CreateInventoryStockInput payload.
 */
export const createInventoryStock = graphql(`
  mutation CreateInventoryStock($payload: CreateInventoryStockInput!) {
    wms {
      createInventoryStock(payload: $payload) {
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
 * Updates the quantity of an inventory stock record.
 * Requires the ID of the inventory stock and the new quantity.
 */
export const updateInventoryStockQuantity = graphql(`
  mutation UpdateInventoryStockQuantity($id: UUID!, $quantity: Int!) {
    wms {
      updateInventoryStockQuantity(id: $id, quantity: $quantity) {
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
 * Removes an inventory stock record by its ID.
 */
export const removeInventoryStock = graphql(`
  mutation RemoveInventoryStock($id: UUID!) {
    wms {
      removeInventoryStock(id: $id)
    }
  }
`);
