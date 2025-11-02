import { graphql } from "../generated/gql";

export const CreateInventoryStockMutation = graphql(`
  mutation CreateInventoryStock($inventoryStock: CreateInventoryStockInput!) {
    wms {
      createInventoryStock(value: $inventoryStock) {
        id
        quantity
        reservedQuantity
        availableQuantity
        status
        lastCountedAt
        lastMovementAt
        createdAt
        updatedAt
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
        quantity
        reservedQuantity
        availableQuantity
        status
        lastCountedAt
        lastMovementAt
        createdAt
        updatedAt
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

export const TableInventoryStockQuery = graphql(`
  query TableInventoryStock(
    $page: Int
    $perPage: Int
    $status: InventoryStockStatus
  ) {
    wms {
      inventoryStocks(page: $page, perPage: $perPage, status: $status) {
        availableQuantity
        createdAt
        id
        lastCountedAt
        lastMovementAt
        quantity
        reservedQuantity
        status
        updatedAt
        product {
          barcode
          costPrice
          description
          id
          name
          status
          sku
          volume
          weight
          width
        }
        location {
          id
          barcode
          isActive
          isPickable
          isReceivable
          level
          name
        }
      }
    }
  }
`);

export const AnalyticsInventoryStockQuery = graphql(`
  query AnalyticsInventoryStock($from: Date, $to: Date) {
    wms {
      inventoryStocks(from: $from, to: $to) {
        quantity
        reservedQuantity
        availableQuantity
        status
      }
    }
  }
`);
