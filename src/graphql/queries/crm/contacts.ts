import { graphql } from "@/lib/graphql/client";

export const getContact = graphql(`
  query GetContact($id: UUID!) {
    crm {
      contact(id: $id) {
        id
        name
        email
        phoneNumber
        jobTitle
        createdAt
        updatedAt
        owner {
          id
          name
        }
        company {
          id
          name
        }
      }
    }
  }
`);

export const getContacts = graphql(`
  query GetContacts($limit: Int!, $page: Int!) {
    crm {
      contacts(limit: $limit, page: $page) {
        id
        name
        email
        phoneNumber
        jobTitle
        createdAt
        updatedAt
        owner {
          id
          name
        }
        company {
          id
          name
        }
      }
    }
  }
`);