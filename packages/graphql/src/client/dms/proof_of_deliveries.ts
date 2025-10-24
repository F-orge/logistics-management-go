import { graphql } from "../generated/gql";

export const CreateDmsProofOfDeliveryMutation = graphql(`
  mutation CreateDmsProofOfDelivery(
    $dmsProofOfDelivery: CreateDmsProofOfDeliveryInput!
  ) {
    dms {
      createDmsProofOfDelivery(value: $dmsProofOfDelivery) {
        id
      }
    }
  }
`);

export const UpdateDmsProofOfDeliveryMutation = graphql(`
  mutation UpdateDmsProofOfDelivery(
    $id: ID!
    $dmsProofOfDelivery: UpdateDmsProofOfDeliveryInput!
  ) {
    dms {
      updateDmsProofOfDelivery(id: $id, value: $dmsProofOfDelivery) {
        id
      }
    }
  }
`);

export const RemoveDmsProofOfDeliveryMutation = graphql(`
  mutation RemoveDmsProofOfDelivery($id: ID!) {
    dms {
      removeDmsProofOfDelivery(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
