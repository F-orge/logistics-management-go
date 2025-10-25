import { graphql } from "../generated/gql";

export const CreateBinThresholdMutation = graphql(`
  mutation CreateBinThreshold($binThreshold: CreateBinThresholdInput!) {
    wms {
      createBinThreshold(value: $binThreshold) {
        id
      }
    }
  }
`);

export const UpdateBinThresholdMutation = graphql(`
  mutation UpdateBinThreshold(
    $id: ID!
    $binThreshold: UpdateBinThresholdInput!
  ) {
    wms {
      updateBinThreshold(id: $id, value: $binThreshold) {
        id
      }
    }
  }
`);

export const RemoveBinThresholdMutation = graphql(`
  mutation RemoveBinThreshold($id: ID!) {
    wms {
      removeBinThreshold(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableBinThresholdQuery = graphql(`
  query TableBinThreshold($page: Int, $perPage: Int) {
    wms {
      binThresholds(page: $page, perPage: $perPage) {
        alertThreshold
        createdAt
        id
        isActive
        maxQuantity
        minQuantity
        reorderQuantity
        updatedAt
        product {
          name
          description
          id
          sku
          status
          barcode
        }
      }
    }
  }
`);

export const AnalyticsBinThresholdsQuery = graphql(`
  query AnalyticsBinThresholds($from: Date, $to: Date) {
    wms {
      binThresholds(from: $from, to: $to) {
        minQuantity
        maxQuantity
        reorderQuantity
        alertThreshold
      }
    }
  }
`);
