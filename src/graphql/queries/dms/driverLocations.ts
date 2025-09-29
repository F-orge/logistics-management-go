import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DRIVER LOCATION OPERATIONS
// ============================================================================

/**
 * Fetches a single driver location by its ID.
 * @param id The UUID of the driver location.
 */
export const getDriverLocation = graphql(`
  query GetDriverLocation($id: UUID!) {
    dms {
      driverLocation(id: $id) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
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
 * Fetches a paginated list of driver locations.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getDriverLocations = graphql(`
  query GetDriverLocations($limit: Int!, $page: Int!) {
    dms {
      driverLocations(limit: $limit, page: $page) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
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
