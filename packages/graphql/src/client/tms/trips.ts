import { graphql } from "../generated/gql";

export const CreateTripMutation = graphql(`
  mutation CreateTrip($trip: CreateTripInput!) {
    tms {
      createTrip(value: $trip) {
        id
      }
    }
  }
`);

export const UpdateTripMutation = graphql(`
  mutation UpdateTrip($id: ID!, $trip: UpdateTripInput!) {
    tms {
      updateTrip(id: $id, value: $trip) {
        id
      }
    }
  }
`);

export const RemoveTripMutation = graphql(`
  mutation RemoveTrip($id: ID!) {
    tms {
      removeTrip(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableTripQuery = graphql(`
  query TableTrip(
    $page: Int
    $perPage: Int
    $search: String
    $status: TripStatus
  ) {
    tms {
      trips(page: $page, perPage: $perPage, search: $search, status: $status) {
        createdAt
        endLocation
        endTime
        id
        startLocation
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
          status
        }
        vehicle {
          vin
          year
          registrationNumber
          model
          make
          status
        }
      }
    }
  }
`);

export const SearchTripsQuery = graphql(`
  query SearchTrips($search: String!) {
    tms {
      trips(search: $search, page: 1, perPage: 10) {
        value: id
        label: startLocation
      }
    }
  }
`);
