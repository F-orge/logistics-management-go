import { graphql } from "../generated/gql";

export const CreateCarrierRateMutation = graphql(`
  mutation CreateCarrierRate($carrierRate: CreateCarrierRateInput!) {
    tms {
      createCarrierRate(value: $carrierRate) {
        id
      }
    }
  }
`);

export const UpdateCarrierRateMutation = graphql(`
  mutation UpdateCarrierRate($id: ID!, $carrierRate: UpdateCarrierRateInput!) {
    tms {
      updateCarrierRate(id: $id, value: $carrierRate) {
        id
      }
    }
  }
`);

export const RemoveCarrierRateMutation = graphql(`
  mutation RemoveCarrierRate($id: ID!) {
    tms {
      removeCarrierRate(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
