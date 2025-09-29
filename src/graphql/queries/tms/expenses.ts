import { graphql } from "@/lib/graphql/client";

// ============================================================================
// EXPENSE OPERATIONS
// ============================================================================

/**
 * Fetches a single expense by its ID.
 * @param id The UUID of the expense.
 */
export const getExpense = graphql(`
  query GetExpense($id: UUID!) {
    tms {
      expense(id: $id) {
        id
        type
        amount
        currency
        receiptUrl
        fuelQuantity
        odometerReading
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Fetches a paginated list of expenses.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getExpenses = graphql(`
  query GetExpenses($limit: Int!, $page: Int!) {
    tms {
      expenses(limit: $limit, page: $page) {
        id
        type
        amount
        currency
        receiptUrl
        fuelQuantity
        odometerReading
        status
        createdAt
        updatedAt
      }
    }
  }
`);
