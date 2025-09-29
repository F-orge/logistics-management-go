import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DELIVERY ROUTE OPERATIONS
// ============================================================================

/**
 * Fetches a single delivery route by its ID.
 * @param id The UUID of the delivery route.
 */
export const getDeliveryRoute = graphql(`
  query GetDeliveryRoute($id: UUID!) {
    dms {
      deliveryRoute(id: $id) {
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
 * Fetches a paginated list of delivery routes.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getDeliveryRoutes = graphql(`
  query GetDeliveryRoutes($limit: Int!, $page: Int!) {
    dms {
      deliveryRoutes(limit: $limit, page: $page) {
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
