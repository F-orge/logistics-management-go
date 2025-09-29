import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single stock transfer by its ID.
 */
export const getStockTransfer = graphql(`
  query GetStockTransfer($id: UUID!) {
    wms {
      stockTransfer(id: $id) {
        id
        quantity
        status
        createdAt
        updatedAt
        product {
          id
          name
        }
        sourceWarehouse {
          id
          name
        }
        destinationWarehouse {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of stock transfers with pagination.
 */
export const getStockTransfers = graphql(`
  query GetStockTransfers($limit: Int!, $page: Int!) {
    wms {
      stockTransfers(limit: $limit, page: $page) {
        id
        quantity
        status
        createdAt
        updatedAt
        product {
          id
          name
        }
        sourceWarehouse {
          id
          name
        }
        destinationWarehouse {
          id
          name
        }
      }
    }
  }
`);
