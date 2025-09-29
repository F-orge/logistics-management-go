import { graphql } from "@/lib/graphql/client";

// ============================================================================
// PROOF OF DELIVERY OPERATIONS
// ============================================================================

/**
 * Fetches a single proof of delivery by its ID.
 * @param id The UUID of the proof of delivery.
 */
export const getProofOfDelivery = graphql(`
  query GetDmsProofOfDelivery($id: UUID!) {
    dms {
      proofOfDelivery(id: $id) {
        id
        type
        filePath
        signatureData
        recipientName
        verificationCode
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
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
  query GetDmsProofOfDeliveries($limit: Int!, $page: Int!) {
    dms {
      proofOfDeliveries(limit: $limit, page: $page) {
        id
        type
        filePath
        signatureData
        recipientName
        verificationCode
        latitude
        longitude
        timestamp
        createdAt
        updatedAt
        deliveryTask {
          id
          deliveryAddress
        }
      }
    }
  }
`);
