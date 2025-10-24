import { graphql } from "../../generated/gql";

export const CreateInventoryBatchMutation = graphql(`
  mutation CreateInventoryBatch($inventoryBatch: CreateInventoryBatchInput!) {
    wms {
      createInventoryBatch(value: $inventoryBatch) {
        id
      }
    }
  }
`);

export const UpdateInventoryBatchMutation = graphql(`
  mutation UpdateInventoryBatch($id: ID!, $inventoryBatch: UpdateInventoryBatchInput!) {
    wms {
      updateInventoryBatch(id: $id, value: $inventoryBatch) {
        id
      }
    }
  }
`);

export const RemoveInventoryBatchMutation = graphql(`
  mutation RemoveInventoryBatch($id: ID!) {
    wms {
      removeInventoryBatch(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
