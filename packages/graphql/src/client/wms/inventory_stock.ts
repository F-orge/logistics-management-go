import { graphql } from "../generated/gql";

export const CreateInventoryStockMutation = graphql(`
  mutation CreateInventoryStock($inventoryStock: CreateInventoryStockInput!) {
    wms {
      createInventoryStock(value: $inventoryStock) {
        id
      }
    }
  }
`);

export const UpdateInventoryStockMutation = graphql(`
  mutation UpdateInventoryStock(
    $id: ID!
    $inventoryStock: UpdateInventoryStockInput!
  ) {
    wms {
      updateInventoryStock(id: $id, value: $inventoryStock) {
        id
      }
    }
  }
`);

export const RemoveInventoryStockMutation = graphql(`
  mutation RemoveInventoryStock($id: ID!) {
    wms {
      removeInventoryStock(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
