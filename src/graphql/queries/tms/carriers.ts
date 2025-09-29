import { graphql } from "@/lib/graphql/client";

// ============================================================================
// CARRIER OPERATIONS
// ============================================================================

/**
 * Fetches a single carrier by its ID.
 * @param id The UUID of the carrier.
 */
export const getCarrier = graphql(`
  query GetCarrier($id: UUID!) {
    tms {
      carrier(id: $id) {
        id
        name
        contactDetails
        servicesOffered
        createdAt
        updatedAt
        rates(limit: 10, page: 1) {
          id
          serviceType
          origin
          destination
          rate
          unit
        }
      }
    }
  }
`);

/**
 * Fetches a paginated list of carriers.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getCarriers = graphql(`
  query GetCarriers($limit: Int!, $page: Int!) {
    tms {
      carriers(limit: $limit, page: $page) {
        id
        name
        contactDetails
        servicesOffered
        createdAt
        updatedAt
        rates(limit: 10, page: 1) {
          id
          serviceType
          origin
          destination
          rate
          unit
        }
      }
    }
  }
`);
