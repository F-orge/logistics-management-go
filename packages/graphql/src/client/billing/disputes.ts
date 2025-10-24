import { graphql } from "../../generated/gql";

export const CreateDisputeMutation = graphql(`
  mutation CreateDispute($dispute: CreateDisputeInput!) {
    billing {
      createDispute(value: $dispute) {
        id
      }
    }
  }
`);

export const UpdateDisputeMutation = graphql(`
  mutation UpdateDispute($id: ID!, $dispute: UpdateDisputeInput!) {
    billing {
      updateDispute(id: $id, value: $dispute) {
        id
      }
    }
  }
`);

export const RemoveDisputeMutation = graphql(`
  mutation RemoveDispute($id: ID!) {
    billing {
      removeDispute(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
