import { graphql } from "@/lib/graphql/client";

// ============================================================================
// PROOF OF DELIVERY MUTATIONS
// ============================================================================

/**
 * Creates a new proof of delivery record.
 * @param payload The input data for creating the proof of delivery.
 */
export const createProofOfDelivery = graphql(`
  mutation CreateProofOfDelivery($payload: CreateDmsProofOfDeliveryInput!) {
    dms {
      createProofOfDelivery(payload: $payload) {
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
 * Updates the delivery task ID of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param deliveryTaskId The new delivery task ID.
 */
export const updateProofOfDeliveryDeliveryTaskId = graphql(`
  mutation UpdateProofOfDeliveryDeliveryTaskId($id: UUID!, $deliveryTaskId: UUID!) {
    dms {
      updateProofOfDeliveryDeliveryTaskId(id: $id, deliveryTaskId: $deliveryTaskId) {
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
 * Updates the type of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param type The new proof of delivery type.
 */
export const updateProofOfDeliveryType = graphql(`
  mutation UpdateProofOfDeliveryType($id: UUID!, $type: ProofOfDeliveryTypeEnum!) {
    dms {
      updateProofOfDeliveryType(id: $id, type: $type) {
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
 * Updates the file path of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param filePath The new file path.
 */
export const updateProofOfDeliveryFilePath = graphql(`
  mutation UpdateProofOfDeliveryFilePath($id: UUID!, $filePath: String) {
    dms {
      updateProofOfDeliveryFilePath(id: $id, filePath: $filePath) {
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
 * Updates the signature data of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param signatureData The new signature data.
 */
export const updateProofOfDeliverySignatureData = graphql(`
  mutation UpdateProofOfDeliverySignatureData($id: UUID!, $signatureData: String) {
    dms {
      updateProofOfDeliverySignatureData(id: $id, signatureData: $signatureData) {
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
 * Updates the recipient name of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param recipientName The new recipient name.
 */
export const updateProofOfDeliveryRecipientName = graphql(`
  mutation UpdateProofOfDeliveryRecipientName($id: UUID!, $recipientName: String) {
    dms {
      updateProofOfDeliveryRecipientName(id: $id, recipientName: $recipientName) {
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
 * Updates the verification code of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param verificationCode The new verification code.
 */
export const updateProofOfDeliveryVerificationCode = graphql(`
  mutation UpdateProofOfDeliveryVerificationCode($id: UUID!, $verificationCode: String) {
    dms {
      updateProofOfDeliveryVerificationCode(id: $id, verificationCode: $verificationCode) {
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
 * Updates the latitude of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param latitude The new latitude.
 */
export const updateProofOfDeliveryLatitude = graphql(`
  mutation UpdateProofOfDeliveryLatitude($id: UUID!, $latitude: Float) {
    dms {
      updateProofOfDeliveryLatitude(id: $id, latitude: $latitude) {
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
 * Updates the longitude of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param longitude The new longitude.
 */
export const updateProofOfDeliveryLongitude = graphql(`
  mutation UpdateProofOfDeliveryLongitude($id: UUID!, $longitude: Float) {
    dms {
      updateProofOfDeliveryLongitude(id: $id, longitude: $longitude) {
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
 * Updates the timestamp of a proof of delivery record.
 * @param id The UUID of the proof of delivery record to update.
 * @param timestamp The new timestamp.
 */
export const updateProofOfDeliveryTimestamp = graphql(`
  mutation UpdateProofOfDeliveryTimestamp($id: UUID!, $timestamp: DateTime) {
    dms {
      updateProofOfDeliveryTimestamp(id: $id, timestamp: $timestamp) {
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
 * Removes a proof of delivery record by its ID.
 * @param id The UUID of the proof of delivery record to remove.
 */
export const removeProofOfDelivery = graphql(`
  mutation RemoveProofOfDelivery($id: UUID!) {
    dms {
      removeProofOfDelivery(id: $id)
    }
  }
`);
