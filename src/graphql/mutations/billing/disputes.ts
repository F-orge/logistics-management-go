import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DISPUTE MUTATIONS
// ============================================================================

/**
 * Creates a new billing dispute.
 * @param payload The input data for creating the dispute.
 */
export const createDispute = graphql(`
  mutation CreateDispute($payload: CreateDisputeInput!) {
    billing {
      createDispute(payload: $payload) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the invoice line item ID of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param lineItemId The new invoice line item ID.
 */
export const updateDisputeLineItemId = graphql(`
  mutation UpdateDisputeLineItemId($id: UUID!, $lineItemId: UUID!) {
    billing {
      updateDisputeLineItemId(id: $id, lineItemId: $lineItemId) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the client ID of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param clientId The new client ID.
 */
export const updateDisputeClientId = graphql(`
  mutation UpdateDisputeClientId($id: UUID!, $clientId: UUID!) {
    billing {
      updateDisputeClientId(id: $id, clientId: $clientId) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the reason of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param reason The new reason.
 */
export const updateDisputeReason = graphql(`
  mutation UpdateDisputeReason($id: UUID!, $reason: String!) {
    billing {
      updateDisputeReason(id: $id, reason: $reason) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the status of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param status The new status.
 */
export const updateDisputeStatus = graphql(`
  mutation UpdateDisputeStatus($id: UUID!, $status: DisputeStatusEnum!) {
    billing {
      updateDisputeStatus(id: $id, status: $status) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the disputed amount of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param disputedAmount The new disputed amount.
 */
export const updateDisputeDisputedAmount = graphql(`
  mutation UpdateDisputeDisputedAmount($id: UUID!, $disputedAmount: Float) {
    billing {
      updateDisputeDisputedAmount(id: $id, disputedAmount: $disputedAmount) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the resolution notes of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param resolutionNotes The new resolution notes.
 */
export const updateDisputeResolutionNotes = graphql(`
  mutation UpdateDisputeResolutionNotes($id: UUID!, $resolutionNotes: String) {
    billing {
      updateDisputeResolutionNotes(id: $id, resolutionNotes: $resolutionNotes) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the submitted at timestamp of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param submittedAt The new submitted at timestamp.
 */
export const updateDisputeSubmittedAt = graphql(`
  mutation UpdateDisputeSubmittedAt($id: UUID!, $submittedAt: DateTime) {
    billing {
      updateDisputeSubmittedAt(id: $id, submittedAt: $submittedAt) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the resolved at timestamp of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param resolvedAt The new resolved at timestamp.
 */
export const updateDisputeResolvedAt = graphql(`
  mutation UpdateDisputeResolvedAt($id: UUID!, $resolvedAt: DateTime) {
    billing {
      updateDisputeResolvedAt(id: $id, resolvedAt: $resolvedAt) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the resolved by user ID of a billing dispute.
 * @param id The UUID of the dispute to update.
 * @param resolvedByUserId The new resolved by user ID.
 */
export const updateDisputeResolvedByUserId = graphql(`
  mutation UpdateDisputeResolvedByUserId($id: UUID!, $resolvedByUserId: UUID) {
    billing {
      updateDisputeResolvedByUserId(id: $id, resolvedByUserId: $resolvedByUserId) {
        id
        reason
        status
        disputedAmount
        resolutionNotes
        submittedAt
        resolvedAt
        createdAt
        updatedAt
        invoiceLineItem {
          id
          description
        }
        client {
          id
          name
        }
        resolvedBy {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a billing dispute by its ID.
 * @param id The UUID of the dispute to remove.
 */
export const removeDispute = graphql(`
  mutation RemoveDispute($id: UUID!) {
    billing {
      removeDispute(id: $id)
    }
  }
`);
