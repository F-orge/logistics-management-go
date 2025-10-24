import { graphql } from "../generated/gql";

export const CreateDeliveryTaskMutation = graphql(`
  mutation CreateDeliveryTask($deliveryTask: CreateDeliveryTaskInput!) {
    dms {
      createDeliveryTask(value: $deliveryTask) {
        id
      }
    }
  }
`);

export const UpdateDeliveryTaskMutation = graphql(`
  mutation UpdateDeliveryTask(
    $id: ID!
    $deliveryTask: UpdateDeliveryTaskInput!
  ) {
    dms {
      updateDeliveryTask(id: $id, value: $deliveryTask) {
        id
      }
    }
  }
`);

export const RemoveDeliveryTaskMutation = graphql(`
  mutation RemoveDeliveryTask($id: ID!) {
    dms {
      removeDeliveryTask(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
