import { graphql } from "@/lib/graphql/client";

/**
 * Creates a new warehouse.
 * Requires a CreateWarehouseInput payload.
 */
export const createWarehouse = graphql(`
  mutation CreateWarehouse($payload: CreateWarehouseInput!) {
    wms {
      createWarehouse(payload: $payload) {
        id
        name
        address
        city
        state
        postalCode
        country
        timezone
        contactPerson
        contactEmail
        contactPhone
        isActive
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the name of a warehouse.
 * Requires the ID of the warehouse and the new name.
 */
export const updateWarehouseName = graphql(`
  mutation UpdateWarehouseName($id: UUID!, $name: String!) {
    wms {
      updateWarehouseName(id: $id, name: $name) {
        id
        name
        address
        city
        state
        postalCode
        country
        timezone
        contactPerson
        contactEmail
        contactPhone
        isActive
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a warehouse by its ID.
 */
export const removeWarehouse = graphql(`
  mutation RemoveWarehouse($id: UUID!) {
    wms {
      removeWarehouse(id: $id)
    }
  }
`);
