import { graphql } from "@/lib/graphql/client";

// ============================================================================
// TASK EVENT MUTATIONS
// ============================================================================

/**
 * Creates a new task event record.
 * @param payload The input data for creating the task event.
 */
export const createTaskEvent = graphql(`
  mutation CreateTaskEvent($payload: CreateTaskEventInput!) {
    dms {
      createTaskEvent(payload: $payload) {
        id
        status
        reason
        notes
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);

/**
 * Updates the delivery task ID of a task event record.
 * @param id The UUID of the task event record to update.
 * @param deliveryTaskId The new delivery task ID.
 */
export const updateTaskEventDeliveryTaskId = graphql(`
  mutation UpdateTaskEventDeliveryTaskId($id: UUID!, $deliveryTaskId: UUID!) {
    dms {
      updateTaskEventDeliveryTaskId(id: $id, deliveryTaskId: $deliveryTaskId) {
        id
        status
        reason
        notes
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);

/**
 * Updates the status of a task event record.
 * @param id The UUID of the task event record to update.
 * @param status The new status.
 */
export const updateTaskEventStatus = graphql(`
  mutation UpdateTaskEventStatus($id: UUID!, $status: TaskEventStatusEnum!) {
    dms {
      updateTaskEventStatus(id: $id, status: $status) {
        id
        status
        reason
        notes
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);

/**
 * Updates the reason of a task event record.
 * @param id The UUID of the task event record to update.
 * @param reason The new reason.
 */
export const updateTaskEventReason = graphql(`
  mutation UpdateTaskEventReason($id: UUID!, $reason: String) {
    dms {
      updateTaskEventReason(id: $id, reason: $reason) {
        id
        status
        reason
        notes
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);

/**
 * Updates the notes of a task event record.
 * @param id The UUID of the task event record to update.
 * @param notes The new notes.
 */
export const updateTaskEventNotes = graphql(`
  mutation UpdateTaskEventNotes($id: UUID!, $notes: String) {
    dms {
      updateTaskEventNotes(id: $id, notes: $notes) {
        id
        status
        reason
        notes
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);

/**
 * Updates the latitude of a task event record.
 * @param id The UUID of the task event record to update.
 * @param latitude The new latitude.
 */
export const updateTaskEventLatitude = graphql(`
  mutation UpdateTaskEventLatitude($id: UUID!, $latitude: Float) {
    dms {
      updateTaskEventLatitude(id: $id, latitude: $latitude) {
        id
        status
        reason
        notes
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);

/**
 * Updates the longitude of a task event record.
 * @param id The UUID of the task event record to update.
 * @param longitude The new longitude.
 */
export const updateTaskEventLongitude = graphql(`
  mutation UpdateTaskEventLongitude($id: UUID!, $longitude: Float) {
    dms {
      updateTaskEventLongitude(id: $id, longitude: $longitude) {
        id
        status
        reason
        notes
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);

/**
 * Updates the timestamp of a task event record.
 * @param id The UUID of the task event record to update.
 * @param timestamp The new timestamp.
 */
export const updateTaskEventTimestamp = graphql(`
  mutation UpdateTaskEventTimestamp($id: UUID!, $timestamp: DateTime) {
    dms {
      updateTaskEventTimestamp(id: $id, timestamp: $timestamp) {
        id
        status
        reason
        notes
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);

/**
 * Removes a task event record by its ID.
 * @param id The UUID of the task event record to remove.
 */
export const removeTaskEvent = graphql(`
  mutation RemoveTaskEvent($id: UUID!) {
    dms {
      removeTaskEvent(id: $id)
    }
  }
`);
