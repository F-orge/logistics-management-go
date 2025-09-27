import { graphql } from "@/lib/graphql/client";

export const getProduct = graphql(`
  query GetProduct($id: UUID!) {
    crm {
      product(id: $id) {
        id
        name
        description
        price
        sku
        type
        createdAt
        updatedAt
      }
    }
  }
`);

export const getProducts = graphql(`
  query GetProducts($limit: Int!, $page: Int!) {
    crm {
      products(limit: $limit, page: $page) {
        id
        name
        description
        price
        sku
        type
        createdAt
        updatedAt
      }
    }
  }
`);
