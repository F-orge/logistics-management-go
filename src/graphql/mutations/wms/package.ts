import { graphql } from "@/lib/graphql/client";

/**
 * Creates a new package.
 * Requires a CreatePackageInput payload.
 */
export const createPackage = graphql(`
  mutation CreatePackage($payload: CreatePackageInput!) {
    wms {
      createPackage(payload: $payload) {
        id
        packageNumber
        packageType
        weight
        length
        width
        height
        volume
        trackingNumber
        carrier
        serviceLevel
        packedAt
        shippedAt
        isFragile
        isHazmat
        requiresSignature
        insuranceValue
        createdAt
        updatedAt
        salesOrder {
          id
          orderNumber
        }
        warehouse {
          id
          name
        }
        packedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the tracking number of a package.
 * Requires the ID of the package and the new tracking number.
 */
export const updatePackageTrackingNumber = graphql(`
  mutation UpdatePackageTrackingNumber($id: UUID!, $trackingNumber: String!) {
    wms {
      updatePackageTrackingNumber(id: $id, trackingNumber: $trackingNumber) {
        id
        packageNumber
        packageType
        weight
        length
        width
        height
        volume
        trackingNumber
        carrier
        serviceLevel
        packedAt
        shippedAt
        isFragile
        isHazmat
        requiresSignature
        insuranceValue
        createdAt
        updatedAt
        salesOrder {
          id
          orderNumber
        }
        warehouse {
          id
          name
        }
        packedByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a package by its ID.
 */
export const removePackage = graphql(`
  mutation RemovePackage($id: UUID!) {
    wms {
      removePackage(id: $id)
    }
  }
`);
