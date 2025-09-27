import { graphql } from "@/lib/graphql/client";

export const createProduct = graphql(`
  mutation CreateProduct($payload: CreateProductInput!) {
    crm {
      createProduct(payload: $payload) {
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

export const updateProductName = graphql(`
  mutation UpdateProductName($id: UUID!, $name: String!) {
    crm {
      updateProductName(id: $id, name: $name) {
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

export const updateProductSku = graphql(`
  mutation UpdateProductSku($id: UUID!, $sku: String) {
    crm {
      updateProductSku(id: $id, sku: $sku) {
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

export const updateProductPrice = graphql(`
  mutation UpdateProductPrice($id: UUID!, $price: Decimal!) {
    crm {
      updateProductPrice(id: $id, price: $price) {
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

export const updateProductType = graphql(`
  mutation UpdateProductType($id: UUID!, $type: ProductType) {
    crm {
      updateProductType(id: $id, type: $type) {
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

export const updateProductDescription = graphql(`
  mutation UpdateProductDescription($id: UUID!, $description: String) {
    crm {
      updateProductDescription(id: $id, description: $description) {
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

export const removeProduct = graphql(`
  mutation RemoveProduct($id: UUID!) {
    crm {
      removeProduct(id: $id)
    }
  }
`);
