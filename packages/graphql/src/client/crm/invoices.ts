import { graphql } from "../generated/gql";

export const CreateInvoiceMutation = graphql(`
  mutation CreateInvoice($invoice: CreateInvoiceInput!) {
    crm {
      createInvoice(value: $invoice) {
        id
      }
    }
  }
`);

export const UpdateInvoiceMutation = graphql(`
  mutation UpdateInvoice($id: ID!, $invoice: UpdateInvoiceInput!) {
    crm {
      updateInvoice(id: $id, value: $invoice) {
        id
      }
    }
  }
`);

export const RemoveInvoiceMutation = graphql(`
  mutation RemoveInvoice($id: ID!) {
    crm {
      removeInvoice(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableInvoiceQuery = graphql(`
  query TableInvoice(
    $page: Int
    $perPage: Int
    $paymentMethod: CrmInvoicePaymentMethod
    $status: InvoiceStatus
    $search: String
  ) {
    crm {
      invoices(
        page: $page
        paymentMethod: $paymentMethod
        perPage: $perPage
        search: $search
        status: $status
      ) {
        createdAt
        dueDate
        id
        issueDate
        paidAt
        paymentMethod
        sentAt
        status
        total
        updatedAt
        items {
          price
          quantity
          updatedAt
          id
          createdAt
          product {
            name
            price
            type
            sku
            id
            description
          }
        }
        opportunity {
          name
          stage
          id
          expectedCloseDate
          dealValue
        }
      }
    }
  }
`);

export const AnalyticsInvoicesQuery = graphql(`
  query AnalyticsInvoices($from: Date, $to: Date) {
    crm {
      invoices(from: $from, to: $to) {
        total
        status
        paymentMethod
      }
    }
  }
`);
