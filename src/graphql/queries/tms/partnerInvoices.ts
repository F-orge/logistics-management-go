import { graphql } from "@/lib/graphql/client";

// ============================================================================
// PARTNER INVOICE OPERATIONS
// ============================================================================

/**
 * Fetches a single partner invoice by its ID.
 * @param id The UUID of the partner invoice.
 */
export const getPartnerInvoice = graphql(`
  query GetPartnerInvoice($id: UUID!) {
    tms {
      partnerInvoice(id: $id) {
        id
        invoiceNumber
        invoiceDate
        totalAmount
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Fetches a paginated list of partner invoices.
 * @param limit The maximum number of items to return.
 * @param page The page number to retrieve.
 */
export const getPartnerInvoices = graphql(`
  query GetPartnerInvoices($limit: Int!, $page: Int!) {
    tms {
      partnerInvoices(limit: $limit, page: $page) {
        id
        invoiceNumber
        invoiceDate
        totalAmount
        status
        createdAt
        updatedAt
      }
    }
  }
`);
