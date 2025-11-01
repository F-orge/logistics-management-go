import { graphql } from "../generated/gql";

export const CreateProductMutation = graphql(`
  mutation CreateProduct($product: CreateProductInput!) {
    crm {
      createProduct(value: $product) {
        id
        name
        description
        price
        sku
        type
      }
    }
  }
`);

export const UpdateProductMutation = graphql(`
  mutation UpdateProduct($id: ID!, $product: UpdateProductInput!) {
    crm {
      updateProduct(id: $id, value: $product) {
        id
        name
        description
        price
        sku
        type
      }
    }
  }
`);

export const RemoveProductMutation = graphql(`
  mutation RemoveProduct($id: ID!) {
    crm {
      removeProduct(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableProductQuery = graphql(`
  query TableProduct(
    $page: Int
    $perPage: Int
    $search: String
    $type: ProductType
  ) {
    crm {
      products(page: $page, perPage: $perPage, search: $search, type: $type) {
        createdAt
        description
        id
        name
        price
        sku
        type
        updatedAt
      }
    }
  }
`);

export const SearchProductsQuery = graphql(`
  query SearchProducts($search: String!) {
    crm {
      products(page: 1, perPage: 10, search: $search) {
        value: id
        label: name
      }
    }
  }
`);

export const AnalyticsProductsQuery = graphql(`
  query AnalyticsProducts($from: Date, $to: Date) {
    crm {
      products(from: $from, to: $to) {
        price
      }
    }
  }
`);
