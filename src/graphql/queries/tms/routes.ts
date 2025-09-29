import { graphql } from "@/lib/graphql/client";

// ============================================================================
// ROUTE OPERATIONS
// ============================================================================

/**
 * Fetches a single route by its ID.
 * @param id The UUID of the route.
 */
export const getRoute = graphql(`
  query GetRoute($id: UUID!) {
    tms {
      route(id: $id) {
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
 * Fetches a paginated list of routes.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getRoutes = graphql(`
  query GetRoutes($limit: Int!, $page: Int!) {
    tms {
      routes(limit: $limit, page: $page) {
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
