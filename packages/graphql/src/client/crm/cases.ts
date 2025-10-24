import { graphql } from "../generated/gql";

export const CreateCaseMutation = graphql(`
  mutation CreateCase($case: CreateCaseInput!) {
    crm {
      createCase(value: $case) {
        id
      }
    }
  }
`);

export const UpdateCaseMutation = graphql(`
  mutation UpdateCase($id: ID!, $case: UpdateCaseInput!) {
    crm {
      updateCase(id: $id, value: $case) {
        id
      }
    }
  }
`);

export const RemoveCaseMutation = graphql(`
  mutation RemoveCase($id: ID!) {
    crm {
      removeCase(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
