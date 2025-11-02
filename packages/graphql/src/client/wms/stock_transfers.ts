import { graphql } from "../generated/gql";

export const CreateStockTransferMutation = graphql(`
  mutation CreateStockTransfer($stockTransfer: CreateStockTransferInput!) {
    wms {
      createStockTransfer(value: $stockTransfer) {
        id
        quantity
        status
        createdAt
        updatedAt
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
        quantity
        status
        createdAt
        updatedAt
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

export const AnalyticsStockTransfersQuery = graphql(`
  query AnalyticsStockTransfers($from: Date, $to: Date) {
    wms {
      stockTransfers(from: $from, to: $to) {
        quantity
        status
      }
    }
  }
`);
