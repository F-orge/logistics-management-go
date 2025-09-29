import { graphql } from "@/lib/graphql/client";

// ============================================================================
// CUSTOMER TRACKING LINK MUTATIONS
// ============================================================================

/**
 * Creates a new customer tracking link.
 * @param payload The input data for creating the customer tracking link.
 */
export const createCustomerTrackingLink = graphql(`
  mutation CreateCustomerTrackingLink($payload: CreateCustomerTrackingLinkInput!) {
    dms {
      createCustomerTrackingLink(payload: $payload) {
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
 * Updates the delivery task ID of a customer tracking link.
 * @param id The UUID of the customer tracking link to update.
 * @param deliveryTaskId The new delivery task ID.
 */
export const updateCustomerTrackingLinkDeliveryTaskId = graphql(`
  mutation UpdateCustomerTrackingLinkDeliveryTaskId($id: UUID!, $deliveryTaskId: UUID!) {
    dms {
      updateCustomerTrackingLinkDeliveryTaskId(id: $id, deliveryTaskId: $deliveryTaskId) {
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
 * Updates the tracking token of a customer tracking link.
 * @param id The UUID of the customer tracking link to update.
 * @param trackingToken The new tracking token.
 */
export const updateCustomerTrackingLinkTrackingToken = graphql(`
  mutation UpdateCustomerTrackingLinkTrackingToken($id: UUID!, $trackingToken: String!) {
    dms {
      updateCustomerTrackingLinkTrackingToken(id: $id, trackingToken: $trackingToken) {
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
 * Updates the active status of a customer tracking link.
 * @param id The UUID of the customer tracking link to update.
 * @param isActive The new active status.
 */
export const updateCustomerTrackingLinkIsActive = graphql(`
  mutation UpdateCustomerTrackingLinkIsActive($id: UUID!, $isActive: Boolean) {
    dms {
      updateCustomerTrackingLinkIsActive(id: $id, isActive: $isActive) {
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
 * Updates the access count of a customer tracking link.
 * @param id The UUID of the customer tracking link to update.
 * @param accessCount The new access count.
 */
export const updateCustomerTrackingLinkAccessCount = graphql(`
  mutation UpdateCustomerTrackingLinkAccessCount($id: UUID!, $accessCount: Int) {
    dms {
      updateCustomerTrackingLinkAccessCount(id: $id, accessCount: $accessCount) {
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
 * Updates the last accessed at timestamp of a customer tracking link.
 * @param id The UUID of the customer tracking link to update.
 * @param lastAccessedAt The new last accessed at timestamp.
 */
export const updateCustomerTrackingLinkLastAccessedAt = graphql(`
  mutation UpdateCustomerTrackingLinkLastAccessedAt($id: UUID!, $lastAccessedAt: DateTime) {
    dms {
      updateCustomerTrackingLinkLastAccessedAt(id: $id, lastAccessedAt: $lastAccessedAt) {
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
 * Updates the expiration timestamp of a customer tracking link.
 * @param id The UUID of the customer tracking link to update.
 * @param expiresAt The new expiration timestamp.
 */
export const updateCustomerTrackingLinkExpiresAt = graphql(`
  mutation UpdateCustomerTrackingLinkExpiresAt($id: UUID!, $expiresAt: DateTime) {
    dms {
      updateCustomerTrackingLinkExpiresAt(id: $id, expiresAt: $expiresAt) {
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
 * Removes a customer tracking link by its ID.
 * @param id The UUID of the customer tracking link to remove.
 */
export const removeCustomerTrackingLink = graphql(`
  mutation RemoveCustomerTrackingLink($id: UUID!) {
    dms {
      removeCustomerTrackingLink(id: $id)
    }
  }
`);
