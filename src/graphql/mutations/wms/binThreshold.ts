import { graphql } from "@/lib/graphql/client";

/**
 * Creates a new bin threshold.
 * Requires a CreateBinThresholdInput payload.
 */
export const createBinThreshold = graphql(`
  mutation CreateBinThreshold($payload: CreateBinThresholdInput!) {
    wms {
      createBinThreshold(payload: $payload) {
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
 * Updates the minimum quantity for a bin threshold.
 * Requires the ID of the bin threshold and the new minimum quantity.
 */
export const updateBinThresholdMinQuantity = graphql(`
  mutation UpdateBinThresholdMinQuantity($id: UUID!, $minQuantity: Int!) {
    wms {
      updateBinThresholdMinQuantity(id: $id, minQuantity: $minQuantity) {
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
 * Removes a bin threshold by its ID.
 */
export const removeBinThreshold = graphql(`
  mutation RemoveBinThreshold($id: UUID!) {
    wms {
      removeBinThreshold(id: $id)
    }
  }
`);
