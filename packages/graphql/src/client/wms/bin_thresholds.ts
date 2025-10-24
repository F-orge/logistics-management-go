import { graphql } from "../generated/gql";

export const CreateBinThresholdMutation = graphql(`
  mutation CreateBinThreshold($binThreshold: CreateBinThresholdInput!) {
    wms {
      createBinThreshold(value: $binThreshold) {
        id
      }
    }
  }
`);

export const UpdateBinThresholdMutation = graphql(`
  mutation UpdateBinThreshold(
    $id: ID!
    $binThreshold: UpdateBinThresholdInput!
  ) {
    wms {
      updateBinThreshold(id: $id, value: $binThreshold) {
        id
      }
    }
  }
`);

export const RemoveBinThresholdMutation = graphql(`
  mutation RemoveBinThreshold($id: ID!) {
    wms {
      removeBinThreshold(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
