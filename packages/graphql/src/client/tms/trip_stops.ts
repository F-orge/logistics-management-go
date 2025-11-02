import { graphql } from "../generated/gql";

export const CreateTripStopMutation = graphql(`
  mutation CreateTripStop($tripStop: CreateTripStopInput!) {
    tms {
      createTripStop(value: $tripStop) {
        id
        trip {
          id
          status
        }
        shipment {
          id
          status
        }
        sequence
        address
        status
        estimatedArrivalTime
        estimatedDepartureTime
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateTripStopMutation = graphql(`
  mutation UpdateTripStop($id: ID!, $tripStop: UpdateTripStopInput!) {
    tms {
      updateTripStop(id: $id, value: $tripStop) {
        id
        trip {
          id
          status
        }
        shipment {
          id
          status
        }
        sequence
        address
        status
        estimatedArrivalTime
        estimatedDepartureTime
        actualArrivalTime
        actualDepartureTime
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveTripStopMutation = graphql(`
  mutation RemoveTripStop($id: ID!) {
    tms {
      removeTripStop(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
