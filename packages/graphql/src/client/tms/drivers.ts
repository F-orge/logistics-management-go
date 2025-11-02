import { graphql } from "../generated/gql";

export const CreateDriverMutation = graphql(`
  mutation CreateDriver($driver: CreateDriverInput!) {
    tms {
      createDriver(value: $driver) {
        id
        user {
          id
          name
          email
          image
        }
        licenseNumber
        licenseExpiryDate
        status
        contactPhone
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateDriverMutation = graphql(`
  mutation UpdateDriver($id: ID!, $driver: UpdateDriverInput!) {
    tms {
      updateDriver(id: $id, value: $driver) {
        id
        user {
          id
          name
          email
          image
        }
        licenseNumber
        licenseExpiryDate
        status
        contactPhone
        createdAt
        updatedAt
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

export const SearchDriversQuery = graphql(`
  query SearchDrivers($search: String!) {
    tms {
      drivers(search: $search, page: 1, perPage: 10) {
        value: id
        label: licenseNumber
      }
    }
  }
`);

export const AnalyticsDriversQuery = graphql(`
  query AnalyticsDrivers($from: Date, $to: Date) {
    tms {
      drivers(from: $from, to: $to) {
        status
      }
    }
  }
`);
