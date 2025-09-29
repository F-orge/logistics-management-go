import { graphql } from "@/lib/graphql/client";

// ============================================================================
// EXPENSE MUTATIONS
// ============================================================================

/**
 * Creates a new expense record.
 * @param payload The input data for creating the expense.
 */
export const createExpense = graphql(`
  mutation CreateExpense($payload: CreateExpenseInput!) {
    tms {
      createExpense(payload: $payload) {
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
 * Updates an existing expense record.
 * @param id The UUID of the expense to update.
 * @param payload The input data for updating the expense.
 */
export const updateExpense = graphql(`
  mutation UpdateExpense($id: UUID!, $payload: CreateExpenseInput!) {
    tms {
      updateExpense(id: $id, payload: $payload) {
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
 * Removes an expense record by its ID.
 * @param id The UUID of the expense to remove.
 */
export const removeExpense = graphql(`
  mutation RemoveExpense($id: UUID!) {
    tms {
      removeExpense(id: $id)
    }
  }
`);
