import { graphql } from "@/lib/graphql/client";

// ============================================================================
// SURCHARGE OPERATIONS
// ============================================================================

/**
 * Fetches a single surcharge by its ID.
 * @param id The UUID of the surcharge.
 */
export const getSurcharge = graphql(`
  query GetSurcharge($id: UUID!) {
    billing {
      surcharge(id: $id) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Fetches a paginated list of surcharges.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getSurcharges = graphql(`
  query GetSurcharges($limit: Int!, $page: Int!) {
    billing {
      surcharges(limit: $limit, page: $page) {
        id
        name
        type
        amount
        calculationMethod
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
      }
    }
  }
`);
