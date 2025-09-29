import { graphql } from "@/lib/graphql/client";

// ============================================================================
// CLIENT ACCOUNT OPERATIONS
// ============================================================================

/**
 * Fetches a single client account by its ID.
 * @param id The UUID of the client account.
 */
export const getClientAccount = graphql(`
  query GetClientAccount($id: UUID!) {
    billing {
      clientAccount(id: $id) {
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
 * Fetches a paginated list of client accounts.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getClientAccounts = graphql(`
  query GetClientAccounts($limit: Int!, $page: Int!) {
    billing {
      clientAccounts(limit: $limit, page: $page) {
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
