import { graphql } from "../generated/gql";

export const CreateReturnMutation = graphql(`
  mutation CreateReturn($return: CreateReturnInput!) {
    wms {
      createReturn(value: $return) {
        id
      }
    }
  }
`);

export const UpdateReturnMutation = graphql(`
  mutation UpdateReturn($id: ID!, $return: UpdateReturnInput!) {
    wms {
      updateReturn(id: $id, value: $return) {
        id
      }
    }
  }
`);

export const RemoveReturnMutation = graphql(`
  mutation RemoveReturn($id: ID!) {
    wms {
      removeReturn(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableReturnQuery = graphql(`
  query TableReturnQuery(
    $page: Int
    $perPage: Int
    $status: ReturnStatus
    $search: String
  ) {
    wms {
      returns(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        createdAt
        id
        reason
        returnNumber
        status
        updatedAt
        client {
          name
          phoneNumber
          industry
          country
          city
          website
        }
        salesOrder {
          orderNumber
          shippingAddress
          status
          updatedAt
          id
        }
        items {
          condition
          id
          quantityExpected
          quantityReceived
          quantityVariance
          product {
            barcode
            costPrice
            description
            id
            name
            sku
            status
          }
        }
      }
    }
  }
`);

export const SearchReturnsQuery = graphql(`
  query SearchReturns($search: String!) {
    wms {
      returns(search: $search, page: 1, perPage: 10) {
        value: id
        label: returnNumber
      }
    }
  }
`);

export const AnalyticsReturnsQuery = graphql(`
  query AnalyticsReturns($from: Date, $to: Date) {
    wms {
      returns(from: $from, to: $to) {
        status
      }
    }
  }
`);
