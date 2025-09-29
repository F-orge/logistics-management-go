import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DRIVER OPERATIONS
// ============================================================================

/**
 * Fetches a single driver by its ID.
 * @param id The UUID of the driver.
 */
export const getDriver = graphql(`
  query GetDriver($id: UUID!) {
    tms {
      driver(id: $id) {
        id
        licenseNumber
        licenseExpiryDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Fetches a paginated list of drivers.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getDrivers = graphql(`
  query GetDrivers($limit: Int!, $page: Int!) {
    tms {
      drivers(limit: $limit, page: $page) {
        id
        licenseNumber
        licenseExpiryDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);
