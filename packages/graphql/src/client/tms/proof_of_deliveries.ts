import { graphql } from "../../generated/gql";

export const CreateProofOfDeliveryMutation = graphql(`
  mutation CreateProofOfDelivery($proofOfDelivery: CreateProofOfDeliveryInput!) {
    tms {
      createProofOfDelivery(value: $proofOfDelivery) {
        id
      }
    }
  }
`);

export const UpdateProofOfDeliveryMutation = graphql(`
  mutation UpdateProofOfDelivery($id: ID!, $proofOfDelivery: UpdateProofOfDeliveryInput!) {
    tms {
      updateProofOfDelivery(id: $id, value: $proofOfDelivery) {
        id
      }
    }
  }
`);

export const RemoveProofOfDeliveryMutation = graphql(`
  mutation RemoveProofOfDelivery($id: ID!) {
    tms {
      removeProofOfDelivery(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
