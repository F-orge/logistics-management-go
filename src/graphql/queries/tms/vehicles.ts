import { graphql } from "@/lib/graphql/client";

// ============================================================================
// VEHICLE OPERATIONS
// ============================================================================

/**
 * Fetches a single vehicle by its ID.
 * @param id The UUID of the vehicle.
 */
export const getVehicle = graphql(`
  query GetVehicle($id: UUID!) {
    tms {
      vehicle(id: $id) {
        id
        registrationNumber
        model
        capacityVolume
        capacityWeight
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Fetches a paginated list of vehicles.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getVehicles = graphql(`
  query GetVehicles($limit: Int!, $page: Int!) {
    tms {
      vehicles(limit: $limit, page: $page) {
        id
        registrationNumber
        model
        capacityVolume
        capacityWeight
        status
        createdAt
        updatedAt
      }
    }
  }
`);
