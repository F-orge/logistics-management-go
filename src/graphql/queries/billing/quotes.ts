import { graphql } from "@/lib/graphql/client";

// ============================================================================
// QUOTE OPERATIONS
// ============================================================================

/**
 * Fetches a single quote by its ID.
 * @param id The UUID of the quote.
 */
export const getQuote = graphql(`
  query GetQuote($id: UUID!) {
    billing {
      quote(id: $id) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Fetches a paginated list of quotes.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getQuotes = graphql(`
  query GetQuotes($limit: Int!, $page: Int!) {
    billing {
      quotes(limit: $limit, page: $page) {
        id
        originDetails
        destinationDetails
        weight
        length
        width
        height
        volume
        quotedPrice
        serviceLevel
        expiresAt
        status
        quoteNumber
        notes
        createdAt
        updatedAt
        client {
          id
          name
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);
