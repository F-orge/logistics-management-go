import { graphql } from "../generated/gql";

export const CreateBillingInvoiceMutation = graphql(`
  mutation CreateBillingInvoice($billingInvoice: CreateBillingInvoiceInput!) {
    billing {
      createBillingInvoice(value: $billingInvoice) {
        id
      }
    }
  }
`);

export const UpdateBillingInvoiceMutation = graphql(`
  mutation UpdateBillingInvoice(
    $id: ID!
    $billingInvoice: UpdateBillingInvoiceInput!
  ) {
    billing {
      updateBillingInvoice(id: $id, value: $billingInvoice) {
        id
      }
    }
  }
`);

export const RemoveBillingInvoiceMutation = graphql(`
  mutation RemoveBillingInvoice($id: ID!) {
    billing {
      removeBillingInvoice(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableBillingInvoiceQuery = graphql(`
  query TableBillingInvoice(
    $page: Int
    $perPage: Int
    $search: String
    $status: BillingInvoiceStatus
  ) {
    billing {
      billingInvoices(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        amountOutstanding
        amountPaid
        createdAt
        currency
        discountAmount
        dueDate
        id
        invoiceNumber
        issueDate
        notes
        paidAt
        paymentTerms
        sentAt
        status
        subtotal
        taxAmount
        totalAmount
        updatedAt
        lineItems {
          description
          discountAmount
          discountRate
          id
          quantity
          taxAmount
          lineTotal
          sourceRecordId
          sourceRecordType
          taxRate
          totalPrice
          unitPrice
          updatedAt
        }
      }
    }
  }
`);

export const SearchBillingInvoicesQuery = graphql(`
  query SearchBillingInvoices($search: String!) {
    billing {
      billingInvoices(search: $search, page: 1, perPage: 10) {
        value: id
        label: invoiceNumber
      }
    }
  }
`);

export const AnalyticsBillingInvoicesQuery = graphql(`
  query AnalyticsBillingInvoices($from: Date, $to: Date) {
    billing {
      billingInvoices(from: $from, to: $to) {
        totalAmount
        amountPaid
        amountOutstanding
        taxAmount
        discountAmount
        subtotal
        status
      }
    }
  }
`);
