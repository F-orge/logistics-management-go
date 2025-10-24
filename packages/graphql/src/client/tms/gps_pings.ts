import { graphql } from "../../generated/gql";

export const CreateGpsPingMutation = graphql(`
  mutation CreateGpsPing($gpsPing: CreateGpsPingInput!) {
    tms {
      createGpsPing(value: $gpsPing) {
        id
      }
    }
  }
`);

export const UpdateGpsPingMutation = graphql(`
  mutation UpdateGpsPing($id: ID!, $gpsPing: UpdateGpsPingInput!) {
    tms {
      updateGpsPing(id: $id, value: $gpsPing) {
        id
      }
    }
  }
`);

export const RemoveGpsPingMutation = graphql(`
  mutation RemoveGpsPing($id: ID!) {
    tms {
      removeGpsPing(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
