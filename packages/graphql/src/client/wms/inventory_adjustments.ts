import { graphql } from "../generated/gql";

export const CreateInventoryAdjustmentMutation = graphql(`
  mutation CreateInventoryAdjustment(
    $inventoryAdjustment: CreateInventoryAdjustmentInput!
  ) {
    wms {
      createInventoryAdjustment(value: $inventoryAdjustment) {
        id
      }
    }
  }
`);

export const UpdateInventoryAdjustmentMutation = graphql(`
  mutation UpdateInventoryAdjustment(
    $id: ID!
    $inventoryAdjustment: UpdateInventoryAdjustmentInput!
  ) {
    wms {
      updateInventoryAdjustment(id: $id, value: $inventoryAdjustment) {
        id
      }
    }
  }
`);

export const RemoveInventoryAdjustmentMutation = graphql(`
  mutation RemoveInventoryAdjustment($id: ID!) {
    wms {
      removeInventoryAdjustment(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
