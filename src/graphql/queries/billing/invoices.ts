import { graphql } from "@/lib/graphql/client";

// ============================================================================
// INVOICE OPERATIONS
// ============================================================================

/**
 * Fetches a single invoice by its ID.
 * @param id The UUID of the invoice.
 */
export const getInvoice = graphql(`
  query GetBillingInvoice($id: UUID!) {
    billing {
      invoice(id: $id) {
        id
        invoiceNumber
        status
        issueDate
        dueDate
        totalAmount
        amountPaid
        amountOutstanding
        currency
        taxAmount
        discountAmount
        subtotal
        paymentTerms
        notes
        sentAt
        paidAt
        createdAt
        updatedAt
        client {
          id
          name
        }
        quote {
          id
          quotedPrice
        }
        createdBy {
          id
          name
        }
        items {
          id
          description
          quantity
          unitPrice
          lineTotal
        }
      }
    }
  }
`);

/**
 * Fetches a paginated list of invoices.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getInvoices = graphql(`
  query GetBillingInvoices($limit: Int!, $page: Int!) {
    billing {
      invoices(limit: $limit, page: $page) {
        id
        invoiceNumber
        status
        issueDate
        dueDate
        totalAmount
        amountPaid
        amountOutstanding
        currency
        taxAmount
        discountAmount
        subtotal
        paymentTerms
        notes
        sentAt
        paidAt
        createdAt
        updatedAt
        client {
          id
          name
        }
        quote {
          id
          quotedPrice
        }
        createdBy {
          id
          name
        }
        items {
          id
          description
          quantity
          unitPrice
          lineTotal
        }
      }
    }
  }
`);
