import { graphql } from "../../generated/gql";

export const CreateExpenseMutation = graphql(`
  mutation CreateExpense($expense: CreateExpenseInput!) {
    tms {
      createExpense(value: $expense) {
        id
      }
    }
  }
`);

export const UpdateExpenseMutation = graphql(`
  mutation UpdateExpense($id: ID!, $expense: UpdateExpenseInput!) {
    tms {
      updateExpense(id: $id, value: $expense) {
        id
      }
    }
  }
`);

export const RemoveExpenseMutation = graphql(`
  mutation RemoveExpense($id: ID!) {
    tms {
      removeExpense(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
