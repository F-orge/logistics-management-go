import { graphql } from "@/lib/graphql/client";

/**
 * Adds an item to an existing package.
 * Requires the package ID and a CreatePackageItemInput payload.
 */
export const addPackageItem = graphql(`
  mutation AddPackageItem($packageId: UUID!, $payload: CreatePackageItemInput!) {
    wms {
      addPackageItem(packageId: $packageId, payload: $payload) {
        id
        quantity
        lotNumber
        serialNumbers
        expiryDate
        unitWeight
        totalWeight
        createdAt
        updatedAt
        package {
          id
          packageNumber
        }
        product {
          id
          name
        }
        batch {
          id
          batchNumber
        }
      }
    }
  }
`);

/**
 * Updates the quantity of a package item.
 * Requires the ID of the package item and the new quantity.
 */
export const updatePackageItemQuantity = graphql(`
  mutation UpdatePackageItemQuantity($id: UUID!, $quantity: Int!) {
    wms {
      updatePackageItemQuantity(id: $id, quantity: $quantity) {
        id
        quantity
        lotNumber
        serialNumbers
        expiryDate
        unitWeight
        totalWeight
        createdAt
        updatedAt
        package {
          id
          packageNumber
        }
        product {
          id
          name
        }
        batch {
          id
          batchNumber
        }
      }
    }
  }
`);

/**
 * Removes a package item by its ID.
 */
export const removePackageItem = graphql(`
  mutation RemovePackageItem($id: UUID!) {
    wms {
      removePackageItem(id: $id)
    }
  }
`);
