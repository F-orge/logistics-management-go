import { graphql } from "../generated/gql";

export const CreateCarrierRateMutation = graphql(`
  mutation CreateCarrierRate($carrierRate: CreateCarrierRateInput!) {
    tms {
      createCarrierRate(value: $carrierRate) {
        id
        carrier {
          id
          name
          contactEmail
          contactPhone
        }
        serviceType
        origin
        destination
        rate
        unit
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateCarrierRateMutation = graphql(`
  mutation UpdateCarrierRate($id: ID!, $carrierRate: UpdateCarrierRateInput!) {
    tms {
      updateCarrierRate(id: $id, value: $carrierRate) {
        id
        carrier {
          id
          name
          contactEmail
          contactPhone
        }
        serviceType
        origin
        destination
        rate
        unit
        createdAt
        updatedAt
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
