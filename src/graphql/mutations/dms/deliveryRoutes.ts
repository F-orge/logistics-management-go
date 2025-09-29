import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DELIVERY ROUTE MUTATIONS
// ============================================================================

/**
 * Creates a new delivery route.
 * @param payload The input data for creating the delivery route.
 */
export const createDeliveryRoute = graphql(`
  mutation CreateDeliveryRoute($payload: CreateDeliveryRouteInput!) {
    dms {
      createDeliveryRoute(payload: $payload) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the driver ID of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param driverId The new driver ID.
 */
export const updateDeliveryRouteDriverId = graphql(`
  mutation UpdateDeliveryRouteDriverId($id: UUID!, $driverId: UUID!) {
    dms {
      updateDeliveryRouteDriverId(id: $id, driverId: $driverId) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the route date of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param routeDate The new route date.
 */
export const updateDeliveryRouteRouteDate = graphql(`
  mutation UpdateDeliveryRouteRouteDate($id: UUID!, $routeDate: NaiveDate!) {
    dms {
      updateDeliveryRouteRouteDate(id: $id, routeDate: $routeDate) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the status of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param status The new status.
 */
export const updateDeliveryRouteStatus = graphql(`
  mutation UpdateDeliveryRouteStatus($id: UUID!, $status: DeliveryRouteStatusEnum) {
    dms {
      updateDeliveryRouteStatus(id: $id, status: $status) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the optimized route data of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param optimizedRouteData The new optimized route data.
 */
export const updateDeliveryRouteOptimizedRouteData = graphql(`
  mutation UpdateDeliveryRouteOptimizedRouteData($id: UUID!, $optimizedRouteData: String) {
    dms {
      updateDeliveryRouteOptimizedRouteData(id: $id, optimizedRouteData: $optimizedRouteData) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the total distance in kilometers of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param totalDistanceKm The new total distance in kilometers.
 */
export const updateDeliveryRouteTotalDistanceKm = graphql(`
  mutation UpdateDeliveryRouteTotalDistanceKm($id: UUID!, $totalDistanceKm: Float) {
    dms {
      updateDeliveryRouteTotalDistanceKm(id: $id, totalDistanceKm: $totalDistanceKm) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the estimated duration in minutes of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param estimatedDurationMinutes The new estimated duration in minutes.
 */
export const updateDeliveryRouteEstimatedDurationMinutes = graphql(`
  mutation UpdateDeliveryRouteEstimatedDurationMinutes($id: UUID!, $estimatedDurationMinutes: Int) {
    dms {
      updateDeliveryRouteEstimatedDurationMinutes(id: $id, estimatedDurationMinutes: $estimatedDurationMinutes) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the actual duration in minutes of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param actualDurationMinutes The new actual duration in minutes.
 */
export const updateDeliveryRouteActualDurationMinutes = graphql(`
  mutation UpdateDeliveryRouteActualDurationMinutes($id: UUID!, $actualDurationMinutes: Int) {
    dms {
      updateDeliveryRouteActualDurationMinutes(id: $id, actualDurationMinutes: $actualDurationMinutes) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the started at timestamp of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param startedAt The new started at timestamp.
 */
export const updateDeliveryRouteStartedAt = graphql(`
  mutation UpdateDeliveryRouteStartedAt($id: UUID!, $startedAt: DateTime) {
    dms {
      updateDeliveryRouteStartedAt(id: $id, startedAt: $startedAt) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the completed at timestamp of a delivery route.
 * @param id The UUID of the delivery route to update.
 * @param completedAt The new completed at timestamp.
 */
export const updateDeliveryRouteCompletedAt = graphql(`
  mutation UpdateDeliveryRouteCompletedAt($id: UUID!, $completedAt: DateTime) {
    dms {
      updateDeliveryRouteCompletedAt(id: $id, completedAt: $completedAt) {
        id
        routeDate
        status
        optimizedRouteData
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Removes a delivery route by its ID.
 * @param id The UUID of the delivery route to remove.
 */
export const removeDeliveryRoute = graphql(`
  mutation RemoveDeliveryRoute($id: UUID!) {
    dms {
      removeDeliveryRoute(id: $id)
    }
  }
`);
