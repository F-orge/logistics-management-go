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

export const TableContactQuery = graphql(`
  query TableContact($page: Int, $perPage: Int, $search: String) {
    crm {
      contacts(page: $page, perPage: $perPage, search: $search) {
        createdAt
        email
        id
        jobTitle
        name
        phoneNumber
        updatedAt
        owner {
          id
          email
          image
          name
        }
        company {
          id
          phoneNumber
          name
          industry
          website
        }
      }
    }
  }
`);

export const SearchContactsQuery = graphql(`
  query SearchContacts($search: String!) {
    crm {
      contacts(page: 1, perPage: 10, search: $search) {
        value: id
        label: name
      }
    }
  }
`);
