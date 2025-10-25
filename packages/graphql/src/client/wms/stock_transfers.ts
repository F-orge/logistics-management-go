import { graphql } from "../generated/gql";

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
  mutation UpdateStockTransfer(
    $id: ID!
    $stockTransfer: UpdateStockTransferInput!
  ) {
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

export const TableStockTransferQuery = graphql(`
  query TableStockTransfer(
    $page: Int
    $perPage: Int
    $status: StockTransferStatus
  ) {
    wms {
      stockTransfers(page: $page, perPage: $perPage, status: $status) {
        createdAt
        id
        quantity
        status
        updatedAt
        destinationWarehouse {
          address
          city
          country
          id
          name
          timezone
          isActive
        }
        product {
          barcode
          costPrice
          name
          height
          sku
          status
        }
        sourceWarehouse {
          address
          country
          isActive
          name
          city
          id
          timezone
        }
      }
    }
  }
`);
