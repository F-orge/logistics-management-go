import { graphql } from "@/lib/graphql/client";

/**
 * Adds an item to an existing pick batch.
 * Requires the pick batch ID and a CreatePickBatchItemInput payload.
 */
export const addPickBatchItem = graphql(`
  mutation AddPickBatchItem($pickBatchId: UUID!, $payload: CreatePickBatchItemInput!) {
    wms {
      addPickBatchItem(pickBatchId: $pickBatchId, payload: $payload) {
        id
        orderPriority
        estimatedPickTime
        actualPickTime
        createdAt
        updatedAt
        pickBatch {
          id
          batchNumber
        }
        salesOrder {
          id
          orderNumber
        }
      }
    }
  }
`);

/**
 * Updates the priority of a pick batch item.
 * Requires the ID of the pick batch item and the new order priority.
 */
export const updatePickBatchItemPriority = graphql(`
  mutation UpdatePickBatchItemPriority($id: UUID!, $orderPriority: Int!) {
    wms {
      updatePickBatchItemPriority(id: $id, orderPriority: $orderPriority) {
        id
        orderPriority
        estimatedPickTime
        actualPickTime
        createdAt
        updatedAt
        pickBatch {
          id
          batchNumber
        }
        salesOrder {
          id
          orderNumber
        }
      }
    }
  }
`);

/**
 * Removes a pick batch item by its ID.
 */
export const removePickBatchItem = graphql(`
  mutation RemovePickBatchItem($id: UUID!) {
    wms {
      removePickBatchItem(id: $id)
    }
  }
`);
