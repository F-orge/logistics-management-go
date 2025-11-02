import { graphql } from "../generated/gql";

export const CreateReorderPointMutation = graphql(`
  mutation CreateReorderPoint($reorderPoint: CreateReorderPointInput!) {
    wms {
      createReorderPoint(value: $reorderPoint) {
        id
        threshold
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateReorderPointMutation = graphql(`
  mutation UpdateReorderPoint(
    $id: ID!
    $reorderPoint: UpdateReorderPointInput!
  ) {
    wms {
      updateReorderPoint(id: $id, value: $reorderPoint) {
        id
        threshold
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveReorderPointMutation = graphql(`
  mutation RemoveReorderPoint($id: ID!) {
    wms {
      removeReorderPoint(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableReorderPointQuery = graphql(`
  query TableReorderPoint($page: Int, $perPage: Int) {
    wms {
      reorderPoints(page: $page, perPage: $perPage) {
        createdAt
        id
        threshold
        updatedAt
        product {
          barcode
          description
          costPrice
          id
          name
          sku
          status
        }
        warehouse {
          address
          city
          country
          id
          name
        }
      }
    }
  }
`);

export const AnalyticsReorderPointsQuery = graphql(`
  query AnalyticsReorderPoints($from: Date, $to: Date) {
    wms {
      reorderPoints(from: $from, to: $to) {
        threshold
      }
    }
  }
`);
