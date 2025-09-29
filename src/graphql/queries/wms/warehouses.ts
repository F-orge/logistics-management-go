import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single warehouse by its ID.
 */
export const getWarehouse = graphql(`
  query GetWarehouse($id: UUID!) {
    wms {
      warehouse(id: $id) {
        id
        name
        address
        city
        state
        postalCode
        country
        timezone
        contactPerson
        contactEmail
        contactPhone
        isActive
        createdAt
        updatedAt
        locations {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of warehouses with pagination.
 */
export const getWarehouses = graphql(`
  query GetWarehouses($limit: Int!, $page: Int!) {
    wms {
      warehouses(limit: $limit, page: $page) {
        id
        name
        address
        city
        state
        postalCode
        country
        timezone
        contactPerson
        contactEmail
        contactPhone
        isActive
        createdAt
        updatedAt
        locations {
          id
          name
        }
      }
    }
  }
`);
