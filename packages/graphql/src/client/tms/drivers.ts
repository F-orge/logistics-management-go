import { graphql } from "../generated/gql";

export const CreateDriverMutation = graphql(`
  mutation CreateDriver($driver: CreateDriverInput!) {
    tms {
      createDriver(value: $driver) {
        id
      }
    }
  }
`);

export const UpdateDriverMutation = graphql(`
  mutation UpdateDriver($id: ID!, $driver: UpdateDriverInput!) {
    tms {
      updateDriver(id: $id, value: $driver) {
        id
      }
    }
  }
`);

export const RemoveDriverMutation = graphql(`
  mutation RemoveDriver($id: ID!) {
    tms {
      removeDriver(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableDriverQuery = graphql(`
  query TableDriver(
    $page: Int
    $perPage: Int
    $search: String
    $status: DriverStatus
  ) {
    tms {
      drivers(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        contactPhone
        createdAt
        id
        licenseExpiryDate
        licenseNumber
        status
        updatedAt
        user {
          email
          id
          image
          name
        }
      }
    }
  }
`);
