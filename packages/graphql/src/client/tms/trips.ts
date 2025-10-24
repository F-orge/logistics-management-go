import { graphql } from "../../generated/gql";

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
