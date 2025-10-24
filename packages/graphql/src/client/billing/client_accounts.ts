import { graphql } from "../generated/gql";

export const CreateClientAccountMutation = graphql(`
  mutation CreateClientAccount($clientAccount: CreateClientAccountInput!) {
    billing {
      createClientAccount(value: $clientAccount) {
        id
      }
    }
  }
`);

export const UpdateClientAccountMutation = graphql(`
  mutation UpdateClientAccount(
    $id: ID!
    $clientAccount: UpdateClientAccountInput!
  ) {
    billing {
      updateClientAccount(id: $id, value: $clientAccount) {
        id
      }
    }
  }
`);

export const RemoveClientAccountMutation = graphql(`
  mutation RemoveClientAccount($id: ID!) {
    billing {
      removeClientAccount(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
