import { graphql } from "@/lib/graphql/client";

/**
 * Adds an item to an existing task.
 * Requires the task ID and a CreateTaskItemInput payload.
 */
export const addTaskItem = graphql(`
  mutation AddTaskItem($taskId: UUID!, $payload: CreateTaskItemInput!) {
    wms {
      addTaskItem(taskId: $taskId, payload: $payload) {
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
        createdAt
        updatedAt
        task {
          id
          taskNumber
        }
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
`);

/**
 * Updates the status of a task item.
 * Requires the ID of the task item and the new status.
 */
export const updateTaskItemStatus = graphql(`
  mutation UpdateTaskItemStatus($id: UUID!, $status: TaskItemStatusEnum!) {
    wms {
      updateTaskItemStatus(id: $id, status: $status) {
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
        createdAt
        updatedAt
        task {
          id
          taskNumber
        }
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
`);

/**
 * Removes a task item by its ID.
 */
export const removeTaskItem = graphql(`
  mutation RemoveTaskItem($id: UUID!) {
    wms {
      removeTaskItem(id: $id)
    }
  }
`);
