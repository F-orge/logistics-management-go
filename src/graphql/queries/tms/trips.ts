import { graphql } from "@/lib/graphql/client";

// ============================================================================
// TRIP OPERATIONS
// ============================================================================

/**
 * Fetches a single trip by its ID.
 * @param id The UUID of the trip.
 */
export const getTrip = graphql(`
  query GetTrip($id: UUID!) {
    tms {
      trip(id: $id) {
        id
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Fetches a paginated list of trips.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getTrips = graphql(`
  query GetTrips($limit: Int!, $page: Int!) {
    tms {
      trips(limit: $limit, page: $page) {
        id
        status
        createdAt
        updatedAt
      }
    }
  }
`);
