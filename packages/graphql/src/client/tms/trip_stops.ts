import { graphql } from "../generated/gql";

export const CreateTripStopMutation = graphql(`
  mutation CreateTripStop($tripStop: CreateTripStopInput!) {
    tms {
      createTripStop(value: $tripStop) {
        id
      }
    }
  }
`);

export const UpdateTripStopMutation = graphql(`
  mutation UpdateTripStop($id: ID!, $tripStop: UpdateTripStopInput!) {
    tms {
      updateTripStop(id: $id, value: $tripStop) {
        id
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
