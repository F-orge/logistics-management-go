import { graphql } from "@/lib/graphql/client";

// ============================================================================
// PROOF OF DELIVERY OPERATIONS
// ============================================================================

/**
 * Fetches a single proof of delivery by its ID.
 * @param id The UUID of the proof of delivery.
 */
export const getProofOfDelivery = graphql(`
  query GetTmsProofOfDelivery($id: UUID!) {
    tms {
      proofOfDelivery(id: $id) {
        id
        type
        filePath
        timestamp
        latitude
        longitude
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Fetches a paginated list of proofs of delivery.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getProofOfDeliveries = graphql(`
  query GetTmsProofOfDeliveries($limit: Int!, $page: Int!) {
    tms {
      proofOfDeliveries(limit: $limit, page: $page) {
        id
        type
        filePath
        timestamp
        latitude
        longitude
        createdAt
        updatedAt
      }
    }
  }
`);
