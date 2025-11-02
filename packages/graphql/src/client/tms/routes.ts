import { graphql } from "../generated/gql";

export const CreateRouteMutation = graphql(`
  mutation CreateRoute($route: CreateRouteInput!) {
    tms {
      createRoute(value: $route) {
        id
        trip {
          id
          status
        }
        optimizedRouteData
        totalDistance
        totalDuration
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateRouteMutation = graphql(`
  mutation UpdateRoute($id: ID!, $route: UpdateRouteInput!) {
    tms {
      updateRoute(id: $id, value: $route) {
        id
        trip {
          id
          status
        }
        optimizedRouteData
        totalDistance
        totalDuration
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveRouteMutation = graphql(`
  mutation RemoveRoute($id: ID!) {
    tms {
      removeRoute(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableRouteQuery = graphql(`
  query TableRoute($page: Int, $perPage: Int, $search: String) {
    tms {
      routes(page: $page, perPage: $perPage, search: $search) {
        optimizedRouteData
        totalDistance
        totalDuration
        id
        trip {
          startLocation
          endTime
          endLocation
          createdAt
          startTime
          status
          updatedAt
          driver {
            user {
              email
              id
              image
              name
            }
            licenseNumber
            contactPhone
            id
          }
        }
      }
    }
  }
`);

export const AnalyticsRoutesQuery = graphql(`
  query AnalyticsRoutes($from: Date, $to: Date) {
    tms {
      routes(from: $from, to: $to) {
        totalDistance
        totalDuration
      }
    }
  }
`);
