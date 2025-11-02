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

export const TableDriverLocationQuery = graphql(`
  query TableDriverLocation($page: Int, $perPage: Int) {
    dms {
      driverLocations(page: $page, perPage: $perPage) {
        accuracy
        altitude
        createdAt
        heading
        id
        latitude
        longitude
        speedKmh
        timestamp
        updatedAt
        driver {
          id
          contactPhone
          licenseExpiryDate
          licenseNumber
          user {
            email
            id
            image
            name
          }
        }
      }
    }
  }
`);

export const AnalyticsDriverLocationsQuery = graphql(`
  query AnalyticsDriverLocations($from: Date, $to: Date) {
    dms {
      driverLocations(from: $from, to: $to) {
        speedKmh
      }
    }
  }
`);
