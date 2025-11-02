import { graphql } from "../generated/gql";

export const CreateInventoryAdjustmentMutation = graphql(`
  mutation CreateInventoryAdjustment(
    $inventoryAdjustment: CreateInventoryAdjustmentInput!
  ) {
    wms {
      createInventoryAdjustment(value: $inventoryAdjustment) {
        id
        warehouseId
        quantityChange
        reason
        notes
        createdAt
        updatedAt
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
        warehouseId
        quantityChange
        reason
        notes
        createdAt
        updatedAt
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

export const TableInventoryAdjustmentQuery = graphql(`
  query TableInventoryAdjustment(
    $page: Int
    $perPage: Int
    $reason: InventoryAdjustmentReason
    $search: String
  ) {
    wms {
      inventoryAdjustments(
        page: $page
        perPage: $perPage
        reason: $reason
        search: $search
      ) {
        createdAt
        id
        notes
        quantityChange
        reason
        updatedAt
        warehouseId
        user {
          email
          id
          image
          name
        }
        product {
          barcode
          description
          id
          name
          sku
          status
        }
      }
    }
  }
`);

export const SearchInventoryAdjustmentsQuery = graphql(`
  query SearchInventoryAdjustments($search: String!) {
    wms {
      inventoryAdjustments(search: $search, page: 1, perPage: 10) {
        value: id
        label: notes
      }
    }
  }
`);

export const AnalyticsInventoryAdjustmentsQuery = graphql(`
  query AnalyticsInventoryAdjustments($from: Date, $to: Date) {
    wms {
      inventoryAdjustments(from: $from, to: $to) {
        quantityChange
        reason
      }
    }
  }
`);
