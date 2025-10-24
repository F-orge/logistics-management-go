import { graphql } from "../../generated/gql";

export const CreateStockTransferMutation = graphql(`
  mutation CreateStockTransfer($stockTransfer: CreateStockTransferInput!) {
    wms {
      createStockTransfer(value: $stockTransfer) {
        id
      }
    }
  }
`);

export const UpdateStockTransferMutation = graphql(`
  mutation UpdateStockTransfer($id: ID!, $stockTransfer: UpdateStockTransferInput!) {
    wms {
      updateStockTransfer(id: $id, value: $stockTransfer) {
        id
      }
    }
  }
`);

export const RemoveStockTransferMutation = graphql(`
  mutation RemoveStockTransfer($id: ID!) {
    wms {
      removeStockTransfer(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
