import { graphql } from "@/lib/graphql/client";

// ============================================================================
// ROUTE MUTATIONS
// ============================================================================

/**
 * Creates a new route.
 * @param payload The input data for creating the route.
 */
export const createRoute = graphql(`
  mutation CreateRoute($payload: CreateRouteInput!) {
    tms {
      createRoute(payload: $payload) {
        id
        optimizedRouteData
        totalDistance
        totalDuration
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing route.
 * @param id The UUID of the route to update.
 * @param payload The input data for updating the route.
 */
export const updateRoute = graphql(`
  mutation UpdateRoute($id: UUID!, $payload: CreateRouteInput!) {
    tms {
      updateRoute(id: $id, payload: $payload) {
        id
        optimizedRouteData
        totalDistance
        totalDuration
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a route by its ID.
 * @param id The UUID of the route to remove.
 */
export const removeRoute = graphql(`
  mutation RemoveRoute($id: UUID!) {
    tms {
      removeRoute(id: $id)
    }
  }
`);
