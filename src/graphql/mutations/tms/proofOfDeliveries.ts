import { graphql } from "@/lib/graphql/client";

// ============================================================================
// PROOF OF DELIVERY MUTATIONS
// ============================================================================

/**
 * Creates a new proof of delivery record.
 * @param payload The input data for creating the proof of delivery.
 */
export const createProofOfDelivery = graphql(`
  mutation CreateTmsProofOfDelivery($payload: CreateTmsProofOfDeliveryInput!) {
    tms {
      createProofOfDelivery(payload: $payload) {
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
 * Updates an existing proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param payload The input data for updating the proof of delivery.
 */
export const updateProofOfDelivery = graphql(`
  mutation UpdateTmsProofOfDelivery($id: UUID!, $payload: CreateTmsProofOfDeliveryInput!) {
    tms {
      updateProofOfDelivery(id: $id, payload: $payload) {
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
 * Removes a proof of delivery record by its ID.
 * @param id The UUID of the proof of delivery record to remove.
 */
export const removeProofOfDelivery = graphql(`
  mutation RemoveTmsProofOfDelivery($id: UUID!) {
    tms {
      removeProofOfDelivery(id: $id)
    }
  }
`);
