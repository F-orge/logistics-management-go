import { graphql } from "../generated/gql";

export const CreateDeliveryRouteMutation = graphql(`
  mutation CreateDeliveryRoute($deliveryRoute: CreateDeliveryRouteInput!) {
    dms {
      createDeliveryRoute(value: $deliveryRoute) {
        id
      }
    }
  }
`);

export const UpdateDeliveryRouteMutation = graphql(`
  mutation UpdateDeliveryRoute(
    $id: ID!
    $deliveryRoute: UpdateDeliveryRouteInput!
  ) {
    dms {
      updateDeliveryRoute(id: $id, value: $deliveryRoute) {
        id
      }
    }
  }
`);

export const RemoveDeliveryRouteMutation = graphql(`
  mutation RemoveDeliveryRoute($id: ID!) {
    dms {
      removeDeliveryRoute(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
