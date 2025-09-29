import { graphql } from "@/lib/graphql/client";

export const createContact = graphql(`
  mutation CreateContact($payload: CreateContactInput!) {
    crm {
      createContact(payload: $payload) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactName = graphql(`
  mutation UpdateContactName($id: UUID!, $name: String!) {
    crm {
      updateContactName(id: $id, name: $name) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const removeContact = graphql(`
  mutation RemoveContact($id: UUID!) {
    crm {
      removeContact(id: $id)
    }
  }
`);
