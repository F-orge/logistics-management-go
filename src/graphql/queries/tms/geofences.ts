import { graphql } from "@/lib/graphql/client";

// ============================================================================
// GEOFENCE OPERATIONS
// ============================================================================

/**
 * Fetches a single geofence by its ID.
 * @param id The UUID of the geofence.
 */
export const getGeofence = graphql(`
  query GetGeofence($id: UUID!) {
    tms {
      geofence(id: $id) {
        id
        name
        coordinates
        createdAt
        updatedAt
        events(limit: 10, page: 1) {
          id
          eventType
          timestamp
        }
      }
    }
  }
`);

/**
 * Fetches a paginated list of geofences.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getGeofences = graphql(`
  query GetGeofences($limit: Int!, $page: Int!) {
    tms {
      geofences(limit: $limit, page: $page) {
        id
        name
        coordinates
        createdAt
        updatedAt
        events(limit: 10, page: 1) {
          id
          eventType
          timestamp
        }
      }
    }
  }
`);
