import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DELIVERY TASK MUTATIONS
// ============================================================================

/**
 * Creates a new delivery task.
 * @param payload The input data for creating the delivery task.
 */
export const createDeliveryTask = graphql(`
  mutation CreateDeliveryTask($payload: CreateDeliveryTaskInput!) {
    dms {
      createDeliveryTask(payload: $payload) {
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
 * Updates the package ID of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param packageId The new package ID.
 */
export const updateDeliveryTaskPackageId = graphql(`
  mutation UpdateDeliveryTaskPackageId($id: UUID!, $packageId: UUID!) {
    dms {
      updateDeliveryTaskPackageId(id: $id, packageId: $packageId) {
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
 * Updates the delivery route ID of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param deliveryRouteId The new delivery route ID.
 */
export const updateDeliveryTaskDeliveryRouteId = graphql(`
  mutation UpdateDeliveryTaskDeliveryRouteId($id: UUID!, $deliveryRouteId: UUID!) {
    dms {
      updateDeliveryTaskDeliveryRouteId(id: $id, deliveryRouteId: $deliveryRouteId) {
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
 * Updates the route sequence of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param routeSequence The new route sequence.
 */
export const updateDeliveryTaskRouteSequence = graphql(`
  mutation UpdateDeliveryTaskRouteSequence($id: UUID!, $routeSequence: Int!) {
    dms {
      updateDeliveryTaskRouteSequence(id: $id, routeSequence: $routeSequence) {
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
 * Updates the delivery address of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param deliveryAddress The new delivery address.
 */
export const updateDeliveryTaskDeliveryAddress = graphql(`
  mutation UpdateDeliveryTaskDeliveryAddress($id: UUID!, $deliveryAddress: String!) {
    dms {
      updateDeliveryTaskDeliveryAddress(id: $id, deliveryAddress: $deliveryAddress) {
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
 * Updates the recipient name of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param recipientName The new recipient name.
 */
export const updateDeliveryTaskRecipientName = graphql(`
  mutation UpdateDeliveryTaskRecipientName($id: UUID!, $recipientName: String) {
    dms {
      updateDeliveryTaskRecipientName(id: $id, recipientName: $recipientName) {
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
 * Updates the recipient phone number of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param recipientPhone The new recipient phone number.
 */
export const updateDeliveryTaskRecipientPhone = graphql(`
  mutation UpdateDeliveryTaskRecipientPhone($id: UUID!, $recipientPhone: String) {
    dms {
      updateDeliveryTaskRecipientPhone(id: $id, recipientPhone: $recipientPhone) {
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
 * Updates the delivery instructions of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param deliveryInstructions The new delivery instructions.
 */
export const updateDeliveryTaskDeliveryInstructions = graphql(`
  mutation UpdateDeliveryTaskDeliveryInstructions($id: UUID!, $deliveryInstructions: String) {
    dms {
      updateDeliveryTaskDeliveryInstructions(id: $id, deliveryInstructions: $deliveryInstructions) {
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
 * Updates the estimated arrival time of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param estimatedArrivalTime The new estimated arrival time.
 */
export const updateDeliveryTaskEstimatedArrivalTime = graphql(`
  mutation UpdateDeliveryTaskEstimatedArrivalTime($id: UUID!, $estimatedArrivalTime: DateTime) {
    dms {
      updateDeliveryTaskEstimatedArrivalTime(id: $id, estimatedArrivalTime: $estimatedArrivalTime) {
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
 * Updates the actual arrival time of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param actualArrivalTime The new actual arrival time.
 */
export const updateDeliveryTaskActualArrivalTime = graphql(`
  mutation UpdateDeliveryTaskActualArrivalTime($id: UUID!, $actualArrivalTime: DateTime) {
    dms {
      updateDeliveryTaskActualArrivalTime(id: $id, actualArrivalTime: $actualArrivalTime) {
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
 * Updates the delivery time of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param deliveryTime The new delivery time.
 */
export const updateDeliveryTaskDeliveryTime = graphql(`
  mutation UpdateDeliveryTaskDeliveryTime($id: UUID!, $deliveryTime: DateTime) {
    dms {
      updateDeliveryTaskDeliveryTime(id: $id, deliveryTime: $deliveryTime) {
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
 * Updates the status of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param status The new status.
 */
export const updateDeliveryTaskStatus = graphql(`
  mutation UpdateDeliveryTaskStatus($id: UUID!, $status: DeliveryTaskStatusEnum) {
    dms {
      updateDeliveryTaskStatus(id: $id, status: $status) {
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
 * Updates the failure reason of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param failureReason The new failure reason.
 */
export const updateDeliveryTaskFailureReason = graphql(`
  mutation UpdateDeliveryTaskFailureReason($id: UUID!, $failureReason: DeliveryFailureReasonEnum) {
    dms {
      updateDeliveryTaskFailureReason(id: $id, failureReason: $failureReason) {
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
 * Updates the attempt count of a delivery task.
 * @param id The UUID of the delivery task to update.
 * @param attemptCount The new attempt count.
 */
export const updateDeliveryTaskAttemptCount = graphql(`
  mutation UpdateDeliveryTaskAttemptCount($id: UUID!, $attemptCount: Int) {
    dms {
      updateDeliveryTaskAttemptCount(id: $id, attemptCount: $attemptCount) {
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
 * Removes a delivery task by its ID.
 * @param id The UUID of the delivery task to remove.
 */
export const removeDeliveryTask = graphql(`
  mutation RemoveDeliveryTask($id: UUID!) {
    dms {
      removeDeliveryTask(id: $id)
    }
  }
`);
