import { graphql } from "@/lib/graphql/client";

export const getContact = graphql(`
  query GetContact($id: UUID!) {
    crm {
      contact(id: $id) {
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

export const getContacts = graphql(`
  query GetContacts($limit: Int!, $page: Int!) {
    crm {
      contacts(limit: $limit, page: $page) {
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
