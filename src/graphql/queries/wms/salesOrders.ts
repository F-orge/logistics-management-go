import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single sales order by its ID.
 */
export const getSalesOrder = graphql(`
  query GetSalesOrder($id: UUID!) {
    wms {
      salesOrder(id: $id) {
        id
        orderNumber
        status
        shippingAddress
        createdAt
        updatedAt
        client {
          id
          name
        }
        opportunities {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of sales orders with pagination.
 */
export const getSalesOrders = graphql(`
  query GetSalesOrders($limit: Int!, $page: Int!) {
    wms {
      salesOrders(limit: $limit, page: $page) {
        id
        orderNumber
        status
        shippingAddress
        createdAt
        updatedAt
        client {
          id
          name
        }
        opportunities {
          id
          name
        }
      }
    }
  }
`);
