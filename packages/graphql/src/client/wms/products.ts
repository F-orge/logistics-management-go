import { graphql } from "../generated/gql";

export const CreateWmsProductMutation = graphql(`
  mutation CreateWmsProduct($wmsProduct: CreateWmsProductInput!) {
    wms {
      createWmsProduct(value: $wmsProduct) {
        id
      }
    }
  }
`);

export const UpdateWmsProductMutation = graphql(`
  mutation UpdateWmsProduct($id: ID!, $wmsProduct: UpdateWmsProductInput!) {
    wms {
      updateWmsProduct(id: $id, value: $wmsProduct) {
        id
      }
    }
  }
`);

export const RemoveWmsProductMutation = graphql(`
  mutation RemoveWmsProduct($id: ID!) {
    wms {
      removeWmsProduct(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableWmsProductQuery = graphql(`
  query TableWmsProduct(
    $page: Int
    $perPage: Int
    $search: String
    $status: ProductStatus
  ) {
    wms {
      wmsProducts(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        barcode
        costPrice
        createdAt
        height
        description
        id
        length
        name
        sku
        status
        updatedAt
        volume
        weight
        width
        supplier {
          contactPerson
          email
          name
          phoneNumber
        }
      }
    }
  }
`);

export const SearchWmsProductsQuery = graphql(`
  query SearchWmsProducts($search: String!) {
    wms {
      wmsProducts(search: $search, page: 1, perPage: 10) {
        value: id
        label: name
      }
    }
  }
`);
