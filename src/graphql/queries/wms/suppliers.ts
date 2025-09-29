import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single supplier by its ID.
 */
export const getSupplier = graphql(`
  query GetSupplier($id: UUID!) {
    wms {
      supplier(id: $id) {
        id
        name
        contactPerson
        email
        phoneNumber
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Query to fetch a list of suppliers with pagination.
 */
export const getSuppliers = graphql(`
  query GetSuppliers($limit: Int!, $page: Int!) {
    wms {
      suppliers(limit: $limit, page: $page) {
        id
        name
        contactPerson
        email
        phoneNumber
        createdAt
        updatedAt
      }
    }
  }
`);
