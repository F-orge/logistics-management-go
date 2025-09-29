import { graphql } from "@/lib/graphql/client";

// ============================================================================
// CLIENT ACCOUNT MUTATIONS
// ============================================================================

/**
 * Creates a new client account.
 * @param payload The input data for creating the client account.
 */
export const createClientAccount = graphql(`
  mutation CreateClientAccount($payload: CreateClientAccountInput!) {
    billing {
      createClientAccount(payload: $payload) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the client ID of a client account.
 * @param id The UUID of the client account to update.
 * @param clientId The new client ID.
 */
export const updateClientAccountClientId = graphql(`
  mutation UpdateClientAccountClientId($id: UUID!, $clientId: UUID!) {
    billing {
      updateClientAccountClientId(id: $id, clientId: $clientId) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the credit limit of a client account.
 * @param id The UUID of the client account to update.
 * @param creditLimit The new credit limit.
 */
export const updateClientAccountCreditLimit = graphql(`
  mutation UpdateClientAccountCreditLimit($id: UUID!, $creditLimit: Float) {
    billing {
      updateClientAccountCreditLimit(id: $id, creditLimit: $creditLimit) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the available credit of a client account.
 * @param id The UUID of the client account to update.
 * @param availableCredit The new available credit.
 */
export const updateClientAccountAvailableCredit = graphql(`
  mutation UpdateClientAccountAvailableCredit($id: UUID!, $availableCredit: Float) {
    billing {
      updateClientAccountAvailableCredit(id: $id, availableCredit: $availableCredit) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the wallet balance of a client account.
 * @param id The UUID of the client account to update.
 * @param walletBalance The new wallet balance.
 */
export const updateClientAccountWalletBalance = graphql(`
  mutation UpdateClientAccountWalletBalance($id: UUID!, $walletBalance: Float) {
    billing {
      updateClientAccountWalletBalance(id: $id, walletBalance: $walletBalance) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the currency of a client account.
 * @param id The UUID of the client account to update.
 * @param currency The new currency.
 */
export const updateClientAccountCurrency = graphql(`
  mutation UpdateClientAccountCurrency($id: UUID!, $currency: String) {
    billing {
      updateClientAccountCurrency(id: $id, currency: $currency) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the payment terms days of a client account.
 * @param id The UUID of the client account to update.
 * @param paymentTermsDays The new payment terms days.
 */
export const updateClientAccountPaymentTermsDays = graphql(`
  mutation UpdateClientAccountPaymentTermsDays($id: UUID!, $paymentTermsDays: Int) {
    billing {
      updateClientAccountPaymentTermsDays(id: $id, paymentTermsDays: $paymentTermsDays) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the credit approval status of a client account.
 * @param id The UUID of the client account to update.
 * @param isCreditApproved The new credit approval status.
 */
export const updateClientAccountIsCreditApproved = graphql(`
  mutation UpdateClientAccountIsCreditApproved($id: UUID!, $isCreditApproved: Boolean) {
    billing {
      updateClientAccountIsCreditApproved(id: $id, isCreditApproved: $isCreditApproved) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the last payment date of a client account.
 * @param id The UUID of the client account to update.
 * @param lastPaymentDate The new last payment date.
 */
export const updateClientAccountLastPaymentDate = graphql(`
  mutation UpdateClientAccountLastPaymentDate($id: UUID!, $lastPaymentDate: NaiveDate) {
    billing {
      updateClientAccountLastPaymentDate(id: $id, lastPaymentDate: $lastPaymentDate) {
        id
        creditLimit
        availableCredit
        walletBalance
        currency
        paymentTermsDays
        isCreditApproved
        lastPaymentDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a client account by its ID.
 * @param id The UUID of the client account to remove.
 */
export const removeClientAccount = graphql(`
  mutation RemoveClientAccount($id: UUID!) {
    billing {
      removeClientAccount(id: $id)
    }
  }
`);
