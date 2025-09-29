import { graphql } from "@/lib/graphql/client";

export const createCompany = graphql(`
  mutation CreateCompany($payload: CreateCompanyInput!) {
    crm {
      createCompany(payload: $payload) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyName = graphql(`
  mutation UpdateCompanyName($id: UUID!, $name: String!) {
    crm {
      updateCompanyName(id: $id, name: $name) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const removeCompany = graphql(`
  mutation RemoveCompany($id: UUID!) {
    crm {
      removeCompany(id: $id)
    }
  }
`);