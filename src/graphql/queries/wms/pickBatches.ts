import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single pick batch by its ID.
 */
export const getPickBatch = graphql(`
  query GetPickBatch($id: UUID!) {
    wms {
      pickBatch(id: $id) {
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
        items {
          id
          orderPriority
          estimatedPickTime
          actualPickTime
          salesOrder {
            id
            orderNumber
          }
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of pick batches with pagination.
 */
export const getPickBatches = graphql(`
  query GetPickBatches($limit: Int!, $page: Int!) {
    wms {
      pickBatches(limit: $limit, page: $page) {
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
        items {
          id
          orderPriority
          estimatedPickTime
          actualPickTime
          salesOrder {
            id
            orderNumber
          }
        }
      }
    }
  }
`);
