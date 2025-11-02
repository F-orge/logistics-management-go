import { graphql } from "../generated/gql";

export const CreateDeliveryRouteMutation = graphql(`
  mutation CreateDeliveryRoute($deliveryRoute: CreateDeliveryRouteInput!) {
    dms {
      createDeliveryRoute(value: $deliveryRoute) {
        id
        routeDate
        status
        totalDistanceKm
        estimatedDurationMinutes
        createdAt
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

export const UpdateDeliveryRouteMutation = graphql(`
  mutation UpdateDeliveryRoute(
    $id: ID!
    $deliveryRoute: UpdateDeliveryRouteInput!
  ) {
    dms {
      updateDeliveryRoute(id: $id, value: $deliveryRoute) {
        id
        routeDate
        status
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        startedAt
        completedAt
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
        tasks {
          id
          recipientName
          deliveryAddress
          status
        }
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

export const SearchDeliveryRoutesQuery = graphql(`
  query SearchDeliveryRoutes($search: String!) {
    dms {
      deliveryRoutes(page: 1, perPage: 10, search: $search) {
        value: id
        label: routeDate
      }
    }
  }
`);

export const AnalyticsDeliveryRoutesQuery = graphql(`
  query AnalyticsDeliveryRoutes($from: Date, $to: Date) {
    dms {
      deliveryRoutes(from: $from, to: $to) {
        totalDistanceKm
        estimatedDurationMinutes
        actualDurationMinutes
        status
      }
    }
  }
`);
