import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single reorder point by its ID.
 */
export const getReorderPoint = graphql(`
  query GetReorderPoint($id: UUID!) {
    wms {
      reorderPoint(id: $id) {
        id
        threshold
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Query to fetch a list of reorder points with pagination.
 */
export const getReorderPoints = graphql(`
  query GetReorderPoints($limit: Int!, $page: Int!) {
    wms {
      reorderPoints(limit: $limit, page: $page) {
        id
        threshold
        createdAt
        updatedAt
      }
    }
  }
`);
