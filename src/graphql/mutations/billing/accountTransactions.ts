import { graphql } from "@/lib/graphql/client";

// ============================================================================
// ACCOUNT TRANSACTION MUTATIONS
// ============================================================================

/**
 * Creates a new account transaction.
 * @param payload The input data for creating the account transaction.
 */
export const createAccountTransaction = graphql(`
  mutation CreateAccountTransaction($payload: CreateAccountTransactionInput!) {
    billing {
      createAccountTransaction(payload: $payload) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the client account ID of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param clientAccountId The new client account ID.
 */
export const updateAccountTransactionClientAccountId = graphql(`
  mutation UpdateAccountTransactionClientAccountId($id: UUID!, $clientAccountId: UUID!) {
    billing {
      updateAccountTransactionClientAccountId(id: $id, clientAccountId: $clientAccountId) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the type of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param type The new transaction type.
 */
export const updateAccountTransactionType = graphql(`
  mutation UpdateAccountTransactionType($id: UUID!, $type: TransactionTypeEnum!) {
    billing {
      updateAccountTransactionType(id: $id, type: $type) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the amount of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param amount The new amount.
 */
export const updateAccountTransactionAmount = graphql(`
  mutation UpdateAccountTransactionAmount($id: UUID!, $amount: Float!) {
    billing {
      updateAccountTransactionAmount(id: $id, amount: $amount) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the running balance of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param runningBalance The new running balance.
 */
export const updateAccountTransactionRunningBalance = graphql(`
  mutation UpdateAccountTransactionRunningBalance($id: UUID!, $runningBalance: Float) {
    billing {
      updateAccountTransactionRunningBalance(id: $id, runningBalance: $runningBalance) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the source record ID of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param sourceRecordId The new source record ID.
 */
export const updateAccountTransactionSourceRecordId = graphql(`
  mutation UpdateAccountTransactionSourceRecordId($id: UUID!, $sourceRecordId: UUID) {
    billing {
      updateAccountTransactionSourceRecordId(id: $id, sourceRecordId: $sourceRecordId) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the source record type of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param sourceRecordType The new source record type.
 */
export const updateAccountTransactionSourceRecordType = graphql(`
  mutation UpdateAccountTransactionSourceRecordType($id: UUID!, $sourceRecordType: String) {
    billing {
      updateAccountTransactionSourceRecordType(id: $id, sourceRecordType: $sourceRecordType) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the description of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param description The new description.
 */
export const updateAccountTransactionDescription = graphql(`
  mutation UpdateAccountTransactionDescription($id: UUID!, $description: String) {
    billing {
      updateAccountTransactionDescription(id: $id, description: $description) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the reference number of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param referenceNumber The new reference number.
 */
export const updateAccountTransactionReferenceNumber = graphql(`
  mutation UpdateAccountTransactionReferenceNumber($id: UUID!, $referenceNumber: String) {
    billing {
      updateAccountTransactionReferenceNumber(id: $id, referenceNumber: $referenceNumber) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the transaction date of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param transactionDate The new transaction date.
 */
export const updateAccountTransactionTransactionDate = graphql(`
  mutation UpdateAccountTransactionTransactionDate($id: UUID!, $transactionDate: DateTime) {
    billing {
      updateAccountTransactionTransactionDate(id: $id, transactionDate: $transactionDate) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the processed by user ID of an account transaction.
 * @param id The UUID of the account transaction to update.
 * @param processedByUserId The new processed by user ID.
 */
export const updateAccountTransactionProcessedByUserId = graphql(`
  mutation UpdateAccountTransactionProcessedByUserId($id: UUID!, $processedByUserId: UUID) {
    billing {
      updateAccountTransactionProcessedByUserId(id: $id, processedByUserId: $processedByUserId) {
        id
        type
        amount
        runningBalance
        sourceRecordType
        description
        referenceNumber
        transactionDate
        createdAt
        updatedAt
        clientAccount {
          id
          walletBalance
        }
        processedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes an account transaction by its ID.
 * @param id The UUID of the account transaction to remove.
 */
export const removeAccountTransaction = graphql(`
  mutation RemoveAccountTransaction($id: UUID!) {
    billing {
      removeAccountTransaction(id: $id)
    }
  }
`);
