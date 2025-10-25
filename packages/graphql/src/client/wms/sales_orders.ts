import { graphql } from "../generated/gql";

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

export const TableSalesOrderQuery = graphql(`
  query TableSalesOrder(
    $page: Int
    $perPage: Int
    $search: String
    $status: SalesOrderStatus
  ) {
    wms {
      salesOrders(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        createdAt
        id
        orderNumber
        shippingAddress
        status
        updatedAt
        items {
          id
          quantityOrdered
          updatedAt
          product {
            barcode
            id
            description
            name
            sku
            status
          }
        }
      }
    }
  }
`);

export const SearchSalesOrdersQuery = graphql(`
  query SearchSalesOrders($search: String!) {
    wms {
      salesOrders(search: $search, page: 1, perPage: 10) {
        value: id
        label: orderNumber
      }
    }
  }
`);
