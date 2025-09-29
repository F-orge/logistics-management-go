import { graphql } from "@/lib/graphql/client";

/**
 * Creates a new pick batch.
 * Requires a CreatePickBatchInput payload.
 */
export const createPickBatch = graphql(`
  mutation CreatePickBatch($payload: CreatePickBatchInput!) {
    wms {
      createPickBatch(payload: $payload) {
        id
        batchNumber
        status
        strategy
        priority
        waveId
        zoneRestrictions
        estimatedDuration
        actualDuration
        totalItems
        completedItems
        startedAt
        completedAt
        createdAt
        updatedAt
        warehouse {
          id
          name
        }
        assignedUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the status of a pick batch.
 * Requires the ID of the pick batch and the new status.
 */
export const updatePickBatchStatus = graphql(`
  mutation UpdatePickBatchStatus($id: UUID!, $status: PickBatchStatusEnum!) {
    wms {
      updatePickBatchStatus(id: $id, status: $status) {
        id
        batchNumber
        status
        strategy
        priority
        waveId
        zoneRestrictions
        estimatedDuration
        actualDuration
        totalItems
        completedItems
        startedAt
        completedAt
        createdAt
        updatedAt
        warehouse {
          id
          name
        }
        assignedUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a pick batch by its ID.
 */
export const removePickBatch = graphql(`
  mutation RemovePickBatch($id: UUID!) {
    wms {
      removePickBatch(id: $id)
    }
  }
`);
