import { graphql } from "../generated/gql";

export const CreateCarrierMutation = graphql(`
  mutation CreateCarrier($carrier: CreateCarrierInput!) {
    tms {
      createCarrier(value: $carrier) {
        id
      }
    }
  }
`);

export const UpdateCarrierMutation = graphql(`
  mutation UpdateCarrier($id: ID!, $carrier: UpdateCarrierInput!) {
    tms {
      updateCarrier(id: $id, value: $carrier) {
        id
      }
    }
  }
`);

export const RemoveCarrierMutation = graphql(`
  mutation RemoveCarrier($id: ID!) {
    tms {
      removeCarrier(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
