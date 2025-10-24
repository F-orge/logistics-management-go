import { graphql } from "../../generated/gql";

export const CreateCreditNoteMutation = graphql(`
  mutation CreateCreditNote($creditNote: CreateCreditNoteInput!) {
    billing {
      createCreditNote(value: $creditNote) {
        id
      }
    }
  }
`);

export const UpdateCreditNoteMutation = graphql(`
  mutation UpdateCreditNote($id: ID!, $creditNote: UpdateCreditNoteInput!) {
    billing {
      updateCreditNote(id: $id, value: $creditNote) {
        id
      }
    }
  }
`);

export const RemoveCreditNoteMutation = graphql(`
  mutation RemoveCreditNote($id: ID!) {
    billing {
      removeCreditNote(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
