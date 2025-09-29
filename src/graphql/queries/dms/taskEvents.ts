import { graphql } from "@/lib/graphql/client";

// ============================================================================
// TASK EVENT OPERATIONS
// ============================================================================

/**
 * Fetches a single task event by its ID.
 * @param id The UUID of the task event.
 */
export const getTaskEvent = graphql(`
  query GetTaskEvent($id: UUID!) {
    dms {
      taskEvent(id: $id) {
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
 * Fetches a paginated list of task events.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getTaskEvents = graphql(`
  query GetTaskEvents($limit: Int!, $page: Int!) {
    dms {
      taskEvents(limit: $limit, page: $page) {
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
