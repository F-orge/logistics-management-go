import { graphql } from "../../generated/gql";

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
