import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DELIVERY TASK OPERATIONS
// ============================================================================

/**
 * Fetches a single delivery task by its ID.
 * @param id The UUID of the delivery task.
 */
export const getDeliveryTask = graphql(`
  query GetDeliveryTask($id: UUID!) {
    dms {
      deliveryTask(id: $id) {
        id
        routeSequence
        deliveryAddress
        recipientName
        recipientPhone
        deliveryInstructions
        estimatedArrivalTime
        actualArrivalTime
        deliveryTime
        status
        failureReason
        attemptCount
        createdAt
        updatedAt
        package {
          id
          packageNumber
        }
        deliveryRoute {
          id
          routeDate
        }
      }
    }
  }
`);

/**
 * Fetches a paginated list of delivery tasks.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getDeliveryTasks = graphql(`
  query GetDeliveryTasks($limit: Int!, $page: Int!) {
    dms {
      deliveryTasks(limit: $limit, page: $page) {
        id
        routeSequence
        deliveryAddress
        recipientName
        recipientPhone
        deliveryInstructions
        estimatedArrivalTime
        actualArrivalTime
        deliveryTime
        status
        failureReason
        attemptCount
        createdAt
        updatedAt
        package {
          id
          packageNumber
        }
        deliveryRoute {
          id
          routeDate
        }
      }
    }
  }
`);
