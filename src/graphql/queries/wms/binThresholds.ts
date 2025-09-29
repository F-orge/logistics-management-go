import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single bin threshold by its ID.
 */
export const getBinThreshold = graphql(`
  query GetBinThreshold($id: UUID!) {
    wms {
      binThreshold(id: $id) {
        id
        minQuantity
        maxQuantity
        reorderQuantity
        alertThreshold
        isActive
        createdAt
        updatedAt
        location {
          id
          name
        }
        product {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of bin thresholds with pagination.
 */
export const getBinThresholds = graphql(`
  query GetBinThresholds($limit: Int!, $page: Int!) {
    wms {
      binThresholds(limit: $limit, page: $page) {
        id
        minQuantity
        maxQuantity
        reorderQuantity
        alertThreshold
        isActive
        createdAt
        updatedAt
        location {
          id
          name
        }
        product {
          id
          name
        }
      }
    }
  }
`);
