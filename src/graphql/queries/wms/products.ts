import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single product by its ID.
 */
export const getProduct = graphql(`
  query GetWmsProduct($id: UUID!) {
    wms {
      product(id: $id) {
        id
        name
        sku
        barcode
        description
        costPrice
        length
        width
        height
        volume
        weight
        status
        createdAt
        updatedAt
        supplier {
          id
          name
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
 * Query to fetch a list of products with pagination.
 */
export const getProducts = graphql(`
  query GetWmsProducts($limit: Int!, $page: Int!) {
    wms {
      products(limit: $limit, page: $page) {
        id
        name
        sku
        barcode
        description
        costPrice
        length
        width
        height
        volume
        weight
        status
        createdAt
        updatedAt
        supplier {
          id
          name
        }
        client {
          id
          name
        }
      }
    }
  }
`);
