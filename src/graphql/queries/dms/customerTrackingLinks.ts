import { graphql } from "@/lib/graphql/client";

// ============================================================================
// CUSTOMER TRACKING LINK OPERATIONS
// ============================================================================

/**
 * Fetches a single customer tracking link by its ID.
 * @param id The UUID of the customer tracking link.
 */
export const getCustomerTrackingLink = graphql(`
  query GetCustomerTrackingLink($id: UUID!) {
    dms {
      customerTrackingLink(id: $id) {
        id
        trackingToken
        isActive
        accessCount
        lastAccessedAt
        expiresAt
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
          recipientName
        }
      }
    }
  }
`);

/**
 * Fetches a paginated list of customer tracking links.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getCustomerTrackingLinks = graphql(`
  query GetCustomerTrackingLinks($limit: Int!, $page: Int!) {
    dms {
      customerTrackingLinks(limit: $limit, page: $page) {
        id
        trackingToken
        isActive
        accessCount
        lastAccessedAt
        expiresAt
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
          recipientName
        }
      }
    }
  }
`);
