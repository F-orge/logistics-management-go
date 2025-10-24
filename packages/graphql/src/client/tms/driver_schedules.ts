import { graphql } from "../generated/gql";

export const CreateDriverScheduleMutation = graphql(`
  mutation CreateDriverSchedule($driverSchedule: CreateDriverScheduleInput!) {
    tms {
      createDriverSchedule(value: $driverSchedule) {
        id
      }
    }
  }
`);

export const UpdateDriverScheduleMutation = graphql(`
  mutation UpdateDriverSchedule(
    $id: ID!
    $driverSchedule: UpdateDriverScheduleInput!
  ) {
    tms {
      updateDriverSchedule(id: $id, value: $driverSchedule) {
        id
      }
    }
  }
`);

export const RemoveDriverScheduleMutation = graphql(`
  mutation RemoveDriverSchedule($id: ID!) {
    tms {
      removeDriverSchedule(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
