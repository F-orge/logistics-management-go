import { graphql } from "@/lib/graphql/client";

// ============================================================================
// RATE CARD OPERATIONS
// ============================================================================

/**
 * Fetches a single rate card by its ID.
 * @param id The UUID of the rate card.
 */
export const getRateCard = graphql(`
  query GetRateCard($id: UUID!) {
    billing {
      rateCard(id: $id) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Fetches a paginated list of rate cards.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getRateCards = graphql(`
  query GetRateCards($limit: Int!, $page: Int!) {
    billing {
      rateCards(limit: $limit, page: $page) {
        id
        name
        serviceType
        isActive
        validFrom
        validTo
        description
        createdAt
        updatedAt
        createdByUser {
          id
          name
        }
      }
    }
  }
`);
