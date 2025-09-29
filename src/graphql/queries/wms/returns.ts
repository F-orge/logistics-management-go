import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single return item by its ID.
 */
export const getReturnItem = graphql(`
  query GetReturnItem($id: UUID!) {
    wms {
      returnItem(id: $id) {
        id
        returnNumber
        status
        reason
        createdAt
        updatedAt
        salesOrder {
          id
          orderNumber
        }
        client {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of returns with pagination.
 */
export const getReturns = graphql(`
  query GetReturns($limit: Int!, $page: Int!) {
    wms {
      returns(limit: $limit, page: $page) {
        id
        returnNumber
        status
        reason
        createdAt
        updatedAt
        salesOrder {
          id
          orderNumber
        }
        client {
          id
          name
        }
      }
    }
  }
`);
