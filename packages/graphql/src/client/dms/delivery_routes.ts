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

export const TableDeliveryRoute = graphql(`
  query TableDelivery(
    $page: Int
    $perPage: Int
    $search: String
    $status: DeliveryRouteStatus
  ) {
    dms {
      deliveryRoutes(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        actualDurationMinutes
        completedAt
        createdAt
        estimatedDurationMinutes
        id
        optimizedRouteData
        routeDate
        startedAt
        status
        totalDistanceKm
        updatedAt
        driver {
          id
          user {
            email
            id
            image
            name
          }
          status
          licenseNumber
          contactPhone
        }
      }
    }
  }
`);
