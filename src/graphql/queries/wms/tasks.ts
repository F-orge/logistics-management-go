import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single task by its ID.
 */
export const getTask = graphql(`
  query GetTask($id: UUID!) {
    wms {
      task(id: $id) {
        id
        taskNumber
        type
        status
        priority
        sourceEntityId
        sourceEntityType
        estimatedDuration
        actualDuration
        instructions
        notes
        startTime
        endTime
        durationSeconds
        createdAt
        updatedAt
        warehouse {
          id
          name
        }
        user {
          id
          name
        }
        pickBatch {
          id
          batchNumber
        }
        items {
          id
          quantityRequired
          quantityCompleted
          quantityRemaining
          status
          lotNumber
          serialNumbers
          expiryDate
          notes
          completedAt
          product {
            id
            name
          }
          batch {
            id
            batchNumber
          }
          sourceLocation {
            id
            name
          }
          destinationLocation {
            id
            name
          }
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of tasks with pagination.
 */
export const getTasks = graphql(`
  query GetTasks($limit: Int!, $page: Int!) {
    wms {
      tasks(limit: $limit, page: $page) {
        id
        taskNumber
        type
        status
        priority
        sourceEntityId
        sourceEntityType
        estimatedDuration
        actualDuration
        instructions
        notes
        startTime
        endTime
        durationSeconds
        createdAt
        updatedAt
        warehouse {
          id
          name
        }
        user {
          id
          name
        }
        pickBatch {
          id
          batchNumber
        }
        items {
          id
          quantityRequired
          quantityCompleted
          quantityRemaining
          status
          lotNumber
          serialNumbers
          expiryDate
          notes
          completedAt
          product {
            id
            name
          }
          batch {
            id
            batchNumber
          }
          sourceLocation {
            id
            name
          }
          destinationLocation {
            id
            name
          }
        }
      }
    }
  }
`);
