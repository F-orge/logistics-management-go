import { graphql } from "../../generated/gql";

export const CreateRouteMutation = graphql(`
  mutation CreateRoute($route: CreateRouteInput!) {
    tms {
      createRoute(value: $route) {
        id
      }
    }
  }
`);

export const UpdateRouteMutation = graphql(`
  mutation UpdateRoute($id: ID!, $route: UpdateRouteInput!) {
    tms {
      updateRoute(id: $id, value: $route) {
        id
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
