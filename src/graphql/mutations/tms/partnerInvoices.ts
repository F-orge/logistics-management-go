import { graphql } from "@/lib/graphql/client";

// ============================================================================
// PARTNER INVOICE MUTATIONS
// ============================================================================

/**
 * Creates a new partner invoice.
 * @param payload The input data for creating the partner invoice.
 */
export const createPartnerInvoice = graphql(`
  mutation CreatePartnerInvoice($payload: CreatePartnerInvoiceInput!) {
    tms {
      createPartnerInvoice(payload: $payload) {
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
 * Updates an existing partner invoice.
 * @param id The UUID of the partner invoice to update.
 * @param payload The input data for updating the partner invoice.
 */
export const updatePartnerInvoice = graphql(`
  mutation UpdatePartnerInvoice($id: UUID!, $payload: CreatePartnerInvoiceInput!) {
    tms {
      updatePartnerInvoice(id: $id, payload: $payload) {
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
 * Removes a partner invoice by its ID.
 * @param id The UUID of the partner invoice to remove.
 */
export const removePartnerInvoice = graphql(`
  mutation RemovePartnerInvoice($id: UUID!) {
    tms {
      removePartnerInvoice(id: $id)
    }
  }
`);

/**
 * Adds a new partner invoice item to a partner invoice.
 * @param partnerInvoiceId The UUID of the partner invoice to add the item to.
 * @param payload The input data for creating the partner invoice item.
 */
export const addPartnerInvoiceItem = graphql(`
  mutation AddPartnerInvoiceItem($partnerInvoiceId: UUID!, $payload: CreatePartnerInvoiceItemInput!) {
    tms {
      addPartnerInvoiceItem(partnerInvoiceId: $partnerInvoiceId, payload: $payload) {
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
 * Updates an existing partner invoice item.
 * @param id The UUID of the partner invoice item to update.
 * @param payload The input data for updating the partner invoice item.
 */
export const updatePartnerInvoiceItem = graphql(`
  mutation UpdatePartnerInvoiceItem($id: UUID!, $payload: CreatePartnerInvoiceItemInput!) {
    tms {
      updatePartnerInvoiceItem(id: $id, payload: $payload) {
        id
        amount
      }
    }
  }
`);

/**
 * Removes a partner invoice item by its ID.
 * @param id The UUID of the partner invoice item to remove.
 */
export const removePartnerInvoiceItem = graphql(`
  mutation RemovePartnerInvoiceItem($id: UUID!) {
    tms {
      removePartnerInvoiceItem(id: $id)
    }
  }
`);
