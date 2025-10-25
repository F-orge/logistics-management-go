import { graphql } from "../generated/gql";

export const CreatePickBatchMutation = graphql(`
  mutation CreatePickBatch($pickBatch: CreatePickBatchInput!) {
    wms {
      createPickBatch(value: $pickBatch) {
        id
      }
    }
  }
`);

export const UpdatePickBatchMutation = graphql(`
  mutation UpdatePickBatch($id: ID!, $pickBatch: UpdatePickBatchInput!) {
    wms {
      updatePickBatch(id: $id, value: $pickBatch) {
        id
      }
    }
  }
`);

export const RemovePickBatchMutation = graphql(`
  mutation RemovePickBatch($id: ID!) {
    wms {
      removePickBatch(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TablePickBatchQuery = graphql(`
  query TablePickBatch(
    $page: Int
    $perPage: Int
    $search: String
    $status: PickBatchStatus
    $strategy: PickStrategy
  ) {
    wms {
      pickBatches(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
        strategy: $strategy
      ) {
        actualDuration
        batchNumber
        completedAt
        completedItems
        createdAt
        estimatedDuration
        id
        priority
        startedAt
        status
        strategy
        totalItems
        updatedAt
        waveId
        zoneRestrictions
        items {
          id
          estimatedPickTime
          actualPickTime
          orderPriority
          salesOrder {
            status
            shippingAddress
            orderNumber
          }
        }
      }
    }
  }
`);

export const SearchPickBatchesQuery = graphql(`
  query SearchPickBatches($search: String!) {
    wms {
      pickBatches(search: $search, page: 1, perPage: 10) {
        value: id
        label: batchNumber
      }
    }
  }
`);

export const AnalyticsPickBatchesQuery = graphql(`
  query AnalyticsPickBatches($from: Date, $to: Date) {
    wms {
      pickBatches(from: $from, to: $to) {
        priority
        estimatedDuration
        actualDuration
        totalItems
        completedItems
        status
        strategy
      }
    }
  }
`);
