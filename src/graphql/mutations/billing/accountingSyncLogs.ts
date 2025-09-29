import { graphql } from "@/lib/graphql/client";

// ============================================================================
// ACCOUNTING SYNC LOG MUTATIONS
// ============================================================================

/**
 * Creates a new accounting sync log.
 * @param payload The input data for creating the accounting sync log.
 */
export const createAccountingSyncLog = graphql(`
  mutation CreateAccountingSyncLog($payload: CreateAccountingSyncLogInput!) {
    billing {
      createAccountingSyncLog(payload: $payload) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the record ID of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param recordId The new record ID.
 */
export const updateAccountingSyncLogRecordId = graphql(`
  mutation UpdateAccountingSyncLogRecordId($id: UUID!, $recordId: UUID!) {
    billing {
      updateAccountingSyncLogRecordId(id: $id, recordId: $recordId) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the record type of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param recordType The new record type.
 */
export const updateAccountingSyncLogRecordType = graphql(`
  mutation UpdateAccountingSyncLogRecordType($id: UUID!, $recordType: String!) {
    billing {
      updateAccountingSyncLogRecordType(id: $id, recordType: $recordType) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the external system of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param externalSystem The new external system.
 */
export const updateAccountingSyncLogExternalSystem = graphql(`
  mutation UpdateAccountingSyncLogExternalSystem($id: UUID!, $externalSystem: String!) {
    billing {
      updateAccountingSyncLogExternalSystem(id: $id, externalSystem: $externalSystem) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the external ID of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param externalId The new external ID.
 */
export const updateAccountingSyncLogExternalId = graphql(`
  mutation UpdateAccountingSyncLogExternalId($id: UUID!, $externalId: String) {
    billing {
      updateAccountingSyncLogExternalId(id: $id, externalId: $externalId) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the status of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param status The new status.
 */
export const updateAccountingSyncLogStatus = graphql(`
  mutation UpdateAccountingSyncLogStatus($id: UUID!, $status: SyncStatusEnum!) {
    billing {
      updateAccountingSyncLogStatus(id: $id, status: $status) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the error message of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param errorMessage The new error message.
 */
export const updateAccountingSyncLogErrorMessage = graphql(`
  mutation UpdateAccountingSyncLogErrorMessage($id: UUID!, $errorMessage: String) {
    billing {
      updateAccountingSyncLogErrorMessage(id: $id, errorMessage: $errorMessage) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the request payload of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param requestPayload The new request payload.
 */
export const updateAccountingSyncLogRequestPayload = graphql(`
  mutation UpdateAccountingSyncLogRequestPayload($id: UUID!, $requestPayload: String) {
    billing {
      updateAccountingSyncLogRequestPayload(id: $id, requestPayload: $requestPayload) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the response payload of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param responsePayload The new response payload.
 */
export const updateAccountingSyncLogResponsePayload = graphql(`
  mutation UpdateAccountingSyncLogResponsePayload($id: UUID!, $responsePayload: String) {
    billing {
      updateAccountingSyncLogResponsePayload(id: $id, responsePayload: $responsePayload) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the last sync at timestamp of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param lastSyncAt The new last sync at timestamp.
 */
export const updateAccountingSyncLogLastSyncAt = graphql(`
  mutation UpdateAccountingSyncLogLastSyncAt($id: UUID!, $lastSyncAt: DateTime) {
    billing {
      updateAccountingSyncLogLastSyncAt(id: $id, lastSyncAt: $lastSyncAt) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the retry count of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param retryCount The new retry count.
 */
export const updateAccountingSyncLogRetryCount = graphql(`
  mutation UpdateAccountingSyncLogRetryCount($id: UUID!, $retryCount: Int) {
    billing {
      updateAccountingSyncLogRetryCount(id: $id, retryCount: $retryCount) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the next retry at timestamp of an accounting sync log.
 * @param id The UUID of the accounting sync log to update.
 * @param nextRetryAt The new next retry at timestamp.
 */
export const updateAccountingSyncLogNextRetryAt = graphql(`
  mutation UpdateAccountingSyncLogNextRetryAt($id: UUID!, $nextRetryAt: DateTime) {
    billing {
      updateAccountingSyncLogNextRetryAt(id: $id, nextRetryAt: $nextRetryAt) {
        id
        recordId
        recordType
        externalSystem
        externalId
        status
        errorMessage
        requestPayload
        responsePayload
        lastSyncAt
        retryCount
        nextRetryAt
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes an accounting sync log by its ID.
 * @param id The UUID of the accounting sync log to remove.
 */
export const removeAccountingSyncLog = graphql(`
  mutation RemoveAccountingSyncLog($id: UUID!) {
    billing {
      removeAccountingSyncLog(id: $id)
    }
  }
`);
