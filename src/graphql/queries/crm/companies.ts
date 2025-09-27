import { graphql } from "@/lib/graphql/client";

export const getCompany = graphql(`
  query GetCompany($id: UUID!) {
    crm {
      company(id: $id) {
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

export const getCompanies = graphql(`
  query GetCompanies($limit: Int!, $page: Int!) {
    crm {
      companies(limit: $limit, page: $page) {
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
