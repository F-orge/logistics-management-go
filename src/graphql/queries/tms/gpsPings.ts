import { graphql } from "@/lib/graphql/client";

// ============================================================================
// GPS PING OPERATIONS
// ============================================================================

/**
 * Fetches a single GPS ping by its ID.
 * @param id The UUID of the GPS ping.
 */
export const getGpsPing = graphql(`
  query GetGpsPing($id: UUID!) {
    tms {
      gpsPing(id: $id) {
        id
        latitude
        longitude
        timestamp
      }
    }
  }
`);

/**
 * Fetches a paginated list of GPS pings.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getGpsPings = graphql(`
  query GetGpsPings($limit: Int!, $page: Int!) {
    tms {
      gpsPings(limit: $limit, page: $page) {
        id
        latitude
        longitude
        timestamp
      }
    }
  }
`);
