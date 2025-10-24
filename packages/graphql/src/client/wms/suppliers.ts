import { graphql } from "../../generated/gql";

export const CreateSupplierMutation = graphql(`
  mutation CreateSupplier($supplier: CreateSupplierInput!) {
    wms {
      createSupplier(value: $supplier) {
        id
      }
    }
  }
`);

export const UpdateSupplierMutation = graphql(`
  mutation UpdateSupplier($id: ID!, $supplier: UpdateSupplierInput!) {
    wms {
      updateSupplier(id: $id, value: $supplier) {
        id
      }
    }
  }
`);

export const RemoveSupplierMutation = graphql(`
  mutation RemoveSupplier($id: ID!) {
    wms {
      removeSupplier(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
