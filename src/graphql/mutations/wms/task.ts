import { graphql } from "@/lib/graphql/client";

/**
 * Creates a new task.
 * Requires a CreateTaskInput payload.
 */
export const createTask = graphql(`
  mutation CreateTask($payload: CreateTaskInput!) {
    wms {
      createTask(payload: $payload) {
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
      }
    }
  }
`);

/**
 * Updates the status of a task.
 * Requires the ID of the task and the new status.
 */
export const updateTaskStatus = graphql(`
  mutation UpdateTaskStatus($id: UUID!, $status: TaskStatusEnum!) {
    wms {
      updateTaskStatus(id: $id, status: $status) {
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
      }
    }
  }
`);

/**
 * Removes a task by its ID.
 */
export const removeTask = graphql(`
  mutation RemoveTask($id: UUID!) {
    wms {
      removeTask(id: $id)
    }
  }
`);
