import { graphql } from "../generated/gql";

export const CreateContactMutation = graphql(`
  mutation CreateContact($contact: CreateContactInput!) {
    crm {
      createContact(value: $contact) {
        id
      }
    }
  }
`);

export const UpdateContactMutation = graphql(`
  mutation UpdateContact($id: ID!, $contact: UpdateContactInput!) {
    crm {
      updateContact(id: $id, value: $contact) {
        id
      }
    }
  }
`);

export const RemoveContactMutation = graphql(`
  mutation RemoveContact($id: ID!) {
    crm {
      removeContact(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
