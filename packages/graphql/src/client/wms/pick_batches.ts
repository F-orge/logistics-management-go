import { graphql } from "../generated/gql";

export const CreatePickBatchMutation = graphql(`
  mutation CreatePickBatch($pickBatch: CreatePickBatchInput!) {
    wms {
      createPickBatch(value: $pickBatch) {
        id
      }
    }
  }
`);

export const UpdatePickBatchMutation = graphql(`
  mutation UpdatePickBatch($id: ID!, $pickBatch: UpdatePickBatchInput!) {
    wms {
      updatePickBatch(id: $id, value: $pickBatch) {
        id
      }
    }
  }
`);

export const RemovePickBatchMutation = graphql(`
  mutation RemovePickBatch($id: ID!) {
    wms {
      removePickBatch(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
