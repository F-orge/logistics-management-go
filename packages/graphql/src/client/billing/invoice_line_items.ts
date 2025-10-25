import { graphql } from "../generated/gql";

export const CreateInvoiceLineItemMutation = graphql(`
  mutation CreateInvoiceLineItem(
    $invoiceLineItem: CreateInvoiceLineItemInput!
  ) {
    billing {
      createInvoiceLineItem(value: $invoiceLineItem) {
        id
      }
    }
  }
`);

export const UpdateInvoiceLineItemMutation = graphql(`
  mutation UpdateInvoiceLineItem(
    $id: ID!
    $invoiceLineItem: UpdateInvoiceLineItemInput!
  ) {
    billing {
      updateInvoiceLineItem(id: $id, value: $invoiceLineItem) {
        id
      }
    }
  }
`);

export const RemoveInvoiceLineItemMutation = graphql(`
  mutation RemoveInvoiceLineItem($id: ID!) {
    billing {
      removeInvoiceLineItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const AnalyticsInvoiceLineItemsQuery = graphql(`
  query AnalyticsInvoiceLineItems($from: Date, $to: Date) {
    billing {
      invoiceLineItems(from: $from, to: $to) {
        quantity
        unitPrice
        totalPrice
        taxRate
        taxAmount
        discountRate
        discountAmount
        lineTotal
      }
    }
  }
`);
