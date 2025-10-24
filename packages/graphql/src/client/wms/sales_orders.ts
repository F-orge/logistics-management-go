import { graphql } from "../../generated/gql";

export const CreateSalesOrderMutation = graphql(`
  mutation CreateSalesOrder($salesOrder: CreateSalesOrderInput!) {
    wms {
      createSalesOrder(value: $salesOrder) {
        id
      }
    }
  }
`);

export const UpdateSalesOrderMutation = graphql(`
  mutation UpdateSalesOrder($id: ID!, $salesOrder: UpdateSalesOrderInput!) {
    wms {
      updateSalesOrder(id: $id, value: $salesOrder) {
        id
      }
    }
  }
`);

export const RemoveSalesOrderMutation = graphql(`
  mutation RemoveSalesOrder($id: ID!) {
    wms {
      removeSalesOrder(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
