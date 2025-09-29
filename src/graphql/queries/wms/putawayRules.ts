import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single putaway rule by its ID.
 */
export const getPutawayRule = graphql(`
  query GetPutawayRule($id: UUID!) {
    wms {
      putawayRule(id: $id) {
        id
        locationType
        priority
        minQuantity
        maxQuantity
        weightThreshold
        volumeThreshold
        requiresTemperatureControl
        requiresHazmatApproval
        isActive
        createdAt
        updatedAt
        product {
          id
          name
        }
        client {
          id
          name
        }
        warehouse {
          id
          name
        }
        preferredLocation {
          id
          name
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of putaway rules with pagination.
 */
export const getPutawayRules = graphql(`
  query GetPutawayRules($limit: Int!, $page: Int!) {
    wms {
      putawayRules(limit: $limit, page: $page) {
        id
        locationType
        priority
        minQuantity
        maxQuantity
        weightThreshold
        volumeThreshold
        requiresTemperatureControl
        requiresHazmatApproval
        isActive
        createdAt
        updatedAt
        product {
          id
          name
        }
        client {
          id
          name
        }
        warehouse {
          id
          name
        }
        preferredLocation {
          id
          name
        }
      }
    }
  }
`);
