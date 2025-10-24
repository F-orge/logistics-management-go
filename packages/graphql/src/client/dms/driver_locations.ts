import { graphql } from "../generated/gql";

export const CreateDriverLocationMutation = graphql(`
  mutation CreateDriverLocation($driverLocation: CreateDriverLocationInput!) {
    dms {
      createDriverLocation(value: $driverLocation) {
        id
      }
    }
  }
`);

export const UpdateDriverLocationMutation = graphql(`
  mutation UpdateDriverLocation(
    $id: ID!
    $driverLocation: UpdateDriverLocationInput!
  ) {
    dms {
      updateDriverLocation(id: $id, value: $driverLocation) {
        id
      }
    }
  }
`);

export const RemoveDriverLocationMutation = graphql(`
  mutation RemoveDriverLocation($id: ID!) {
    dms {
      removeDriverLocation(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
