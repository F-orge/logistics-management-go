import { graphql } from "../generated/gql";

export const CreateAccountTransactionMutation = graphql(`
  mutation CreateAccountTransaction(
    $accountTransaction: CreateAccountTransactionInput!
  ) {
    billing {
      createAccountTransaction(value: $accountTransaction) {
        id
      }
    }
  }
`);

export const UpdateAccountTransactionMutation = graphql(`
  mutation UpdateAccountTransaction(
    $id: ID!
    $accountTransaction: UpdateAccountTransactionInput!
  ) {
    billing {
      updateAccountTransaction(id: $id, value: $accountTransaction) {
        id
      }
    }
  }
`);

export const RemoveAccountTransactionMutation = graphql(`
  mutation RemoveAccountTransaction($id: ID!) {
    billing {
      removeAccountTransaction(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
