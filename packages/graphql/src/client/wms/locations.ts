import { graphql } from "../generated/gql";

export const CreateLocationMutation = graphql(`
  mutation CreateLocation($location: CreateLocationInput!) {
    wms {
      createLocation(value: $location) {
        id
      }
    }
  }
`);

export const UpdateLocationMutation = graphql(`
  mutation UpdateLocation($id: ID!, $location: UpdateLocationInput!) {
    wms {
      updateLocation(id: $id, value: $location) {
        id
      }
    }
  }
`);

export const RemoveLocationMutation = graphql(`
  mutation RemoveLocation($id: ID!) {
    wms {
      removeLocation(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
