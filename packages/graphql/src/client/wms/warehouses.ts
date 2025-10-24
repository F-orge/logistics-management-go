import { graphql } from "../generated/gql";

export const CreateWarehouseMutation = graphql(`
  mutation CreateWarehouse($warehouse: CreateWarehouseInput!) {
    wms {
      createWarehouse(value: $warehouse) {
        id
      }
    }
  }
`);

export const UpdateWarehouseMutation = graphql(`
  mutation UpdateWarehouse($id: ID!, $warehouse: UpdateWarehouseInput!) {
    wms {
      updateWarehouse(id: $id, value: $warehouse) {
        id
      }
    }
  }
`);

export const RemoveWarehouseMutation = graphql(`
  mutation RemoveWarehouse($id: ID!) {
    wms {
      removeWarehouse(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
