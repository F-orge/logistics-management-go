import { graphql } from "../generated/gql";

export const CreateProductMutation = graphql(`
  mutation CreateProduct($product: CreateProductInput!) {
    crm {
      createProduct(value: $product) {
        id
      }
    }
  }
`);

export const UpdateProductMutation = graphql(`
  mutation UpdateProduct($id: ID!, $product: UpdateProductInput!) {
    crm {
      updateProduct(id: $id, value: $product) {
        id
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
