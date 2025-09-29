import { graphql } from "@/lib/graphql/client";

// ============================================================================
// INVOICE MUTATIONS
// ============================================================================

/**
 * Creates a new billing invoice.
 * @param payload The input data for creating the invoice.
 */
export const createInvoice = graphql(`
  mutation CreateBillingInvoice($payload: CreateBillingInvoiceInput!) {
    billing {
      createInvoice(payload: $payload) {
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
 * Updates the client ID of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param clientId The new client ID.
 */
export const updateInvoiceClientId = graphql(`
  mutation UpdateBillingInvoiceClientId($id: UUID!, $clientId: UUID!) {
    billing {
      updateInvoiceClientId(id: $id, clientId: $clientId) {
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
 * Updates the quote ID of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param quoteId The new quote ID.
 */
export const updateInvoiceQuoteId = graphql(`
  mutation UpdateBillingInvoiceQuoteId($id: UUID!, $quoteId: UUID) {
    billing {
      updateInvoiceQuoteId(id: $id, quoteId: $quoteId) {
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
 * Updates the invoice number of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param invoiceNumber The new invoice number.
 */
export const updateInvoiceInvoiceNumber = graphql(`
  mutation UpdateBillingInvoiceInvoiceNumber($id: UUID!, $invoiceNumber: String!) {
    billing {
      updateInvoiceInvoiceNumber(id: $id, invoiceNumber: $invoiceNumber) {
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
 * Updates the status of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param status The new status.
 */
export const updateInvoiceStatus = graphql(`
  mutation UpdateBillingInvoiceStatus($id: UUID!, $status: InvoiceStatusEnum!) {
    billing {
      updateInvoiceStatus(id: $id, status: $status) {
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
 * Updates the issue date of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param issueDate The new issue date.
 */
export const updateInvoiceIssueDate = graphql(`
  mutation UpdateBillingInvoiceIssueDate($id: UUID!, $issueDate: NaiveDate!) {
    billing {
      updateInvoiceIssueDate(id: $id, issueDate: $issueDate) {
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
 * Updates the due date of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param dueDate The new due date.
 */
export const updateInvoiceDueDate = graphql(`
  mutation UpdateBillingInvoiceDueDate($id: UUID!, $dueDate: NaiveDate!) {
    billing {
      updateInvoiceDueDate(id: $id, dueDate: $dueDate) {
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
 * Updates the total amount of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param totalAmount The new total amount.
 */
export const updateInvoiceTotalAmount = graphql(`
  mutation UpdateBillingInvoiceTotalAmount($id: UUID!, $totalAmount: Float!) {
    billing {
      updateInvoiceTotalAmount(id: $id, totalAmount: $totalAmount) {
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
 * Updates the amount paid of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param amountPaid The new amount paid.
 */
export const updateInvoiceAmountPaid = graphql(`
  mutation UpdateBillingInvoiceAmountPaid($id: UUID!, $amountPaid: Float!) {
    billing {
      updateInvoiceAmountPaid(id: $id, amountPaid: $amountPaid) {
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
 * Updates the currency of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param currency The new currency.
 */
export const updateInvoiceCurrency = graphql(`
  mutation UpdateBillingInvoiceCurrency($id: UUID!, $currency: String!) {
    billing {
      updateInvoiceCurrency(id: $id, currency: $currency) {
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
 * Updates the tax amount of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param taxAmount The new tax amount.
 */
export const updateInvoiceTaxAmount = graphql(`
  mutation UpdateBillingInvoiceTaxAmount($id: UUID!, $taxAmount: Float!) {
    billing {
      updateInvoiceTaxAmount(id: $id, taxAmount: $taxAmount) {
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
 * Updates the discount amount of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param discountAmount The new discount amount.
 */
export const updateInvoiceDiscountAmount = graphql(`
  mutation UpdateBillingInvoiceDiscountAmount($id: UUID!, $discountAmount: Float!) {
    billing {
      updateInvoiceDiscountAmount(id: $id, discountAmount: $discountAmount) {
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
 * Updates the subtotal of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param subtotal The new subtotal.
 */
export const updateInvoiceSubtotal = graphql(`
  mutation UpdateBillingInvoiceSubtotal($id: UUID!, $subtotal: Float!) {
    billing {
      updateInvoiceSubtotal(id: $id, subtotal: $subtotal) {
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
 * Updates the payment terms of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param paymentTerms The new payment terms.
 */
export const updateInvoicePaymentTerms = graphql(`
  mutation UpdateBillingInvoicePaymentTerms($id: UUID!, $paymentTerms: String) {
    billing {
      updateInvoicePaymentTerms(id: $id, paymentTerms: $paymentTerms) {
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
 * Updates the notes of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param notes The new notes.
 */
export const updateInvoiceNotes = graphql(`
  mutation UpdateBillingInvoiceNotes($id: UUID!, $notes: String) {
    billing {
      updateInvoiceNotes(id: $id, notes: $notes) {
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
 * Updates the sent at timestamp of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param sentAt The new sent at timestamp.
 */
export const updateInvoiceSentAt = graphql(`
  mutation UpdateBillingInvoiceSentAt($id: UUID!, $sentAt: DateTime) {
    billing {
      updateInvoiceSentAt(id: $id, sentAt: $sentAt) {
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
 * Updates the paid at timestamp of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param paidAt The new paid at timestamp.
 */
export const updateInvoicePaidAt = graphql(`
  mutation UpdateBillingInvoicePaidAt($id: UUID!, $paidAt: DateTime) {
    billing {
      updateInvoicePaidAt(id: $id, paidAt: $paidAt) {
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
 * Updates the created by user ID of a billing invoice.
 * @param id The UUID of the invoice to update.
 * @param createdByUserId The new created by user ID.
 */
export const updateInvoiceCreatedByUserId = graphql(`
  mutation UpdateBillingInvoiceCreatedByUserId($id: UUID!, $createdByUserId: UUID) {
    billing {
      updateInvoiceCreatedByUserId(id: $id, createdByUserId: $createdByUserId) {
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
 * Removes a billing invoice by its ID.
 * @param id The UUID of the invoice to remove.
 */
export const removeInvoice = graphql(`
  mutation RemoveBillingInvoice($id: UUID!) {
    billing {
      removeInvoice(id: $id)
    }
  }
`);

/**
 * Adds a new invoice line item to a billing invoice.
 * @param invoiceId The UUID of the invoice to add the line item to.
 * @param payload The input data for creating the invoice line item.
 */
export const addInvoiceLineItem = graphql(`
  mutation AddBillingInvoiceLineItem($invoiceId: UUID!, $payload: CreateBillingInvoiceLineItemInput!) {
    billing {
      addInvoiceLineItem(invoiceId: $invoiceId, payload: $payload) {
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
 * Updates the product ID of a billing invoice line item.
 * @param id The UUID of the invoice line item to update.
 * @param productId The new product ID.
 */
export const updateInvoiceLineItemProductId = graphql(`
  mutation UpdateBillingInvoiceLineItemProductId($id: UUID!, $productId: UUID!) {
    billing {
      updateInvoiceLineItemProductId(id: $id, productId: $productId) {
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
 * Updates the source record ID of a billing invoice line item.
 * @param id The UUID of the invoice line item to update.
 * @param sourceRecordId The new source record ID.
 */
export const updateInvoiceLineItemSourceRecordId = graphql(`
  mutation UpdateBillingInvoiceLineItemSourceRecordId($id: UUID!, $sourceRecordId: UUID) {
    billing {
      updateInvoiceLineItemSourceRecordId(id: $id, sourceRecordId: $sourceRecordId) {
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
 * Updates the source record type of a billing invoice line item.
 * @param id The UUID of the invoice line item to update.
 * @param sourceRecordType The new source record type.
 */
export const updateInvoiceLineItemSourceRecordType = graphql(`
  mutation UpdateBillingInvoiceLineItemSourceRecordType($id: UUID!, $sourceRecordType: String) {
    billing {
      updateInvoiceLineItemSourceRecordType(id: $id, sourceRecordType: $sourceRecordType) {
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
 * Updates the description of a billing invoice line item.
 * @param id The UUID of the invoice line item to update.
 * @param description The new description.
 */
export const updateInvoiceLineItemDescription = graphql(`
  mutation UpdateBillingInvoiceLineItemDescription($id: UUID!, $description: String!) {
    billing {
      updateInvoiceLineItemDescription(id: $id, description: $description) {
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
 * Updates the quantity of a billing invoice line item.
 * @param id The UUID of the invoice line item to update.
 * @param quantity The new quantity.
 */
export const updateInvoiceLineItemQuantity = graphql(`
  mutation UpdateBillingInvoiceLineItemQuantity($id: UUID!, $quantity: Float!) {
    billing {
      updateInvoiceLineItemQuantity(id: $id, quantity: $quantity) {
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
 * Updates the unit price of a billing invoice line item.
 * @param id The UUID of the invoice line item to update.
 * @param unitPrice The new unit price.
 */
export const updateInvoiceLineItemUnitPrice = graphql(`
  mutation UpdateBillingInvoiceLineItemUnitPrice($id: UUID!, $unitPrice: Float!) {
    billing {
      updateInvoiceLineItemUnitPrice(id: $id, unitPrice: $unitPrice) {
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
 * Updates the tax rate of a billing invoice line item.
 * @param id The UUID of the invoice line item to update.
 * @param taxRate The new tax rate.
 */
export const updateInvoiceLineItemTaxRate = graphql(`
  mutation UpdateBillingInvoiceLineItemTaxRate($id: UUID!, $taxRate: Float) {
    billing {
      updateInvoiceLineItemTaxRate(id: $id, taxRate: $taxRate) {
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
 * Updates the discount rate of a billing invoice line item.
 * @param id The UUID of the invoice line item to update.
 * @param discountRate The new discount rate.
 */
export const updateInvoiceLineItemDiscountRate = graphql(`
  mutation UpdateBillingInvoiceLineItemDiscountRate($id: UUID!, $discountRate: Float) {
    billing {
      updateInvoiceLineItemDiscountRate(id: $id, discountRate: $discountRate) {
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
 * Removes a billing invoice line item by its ID.
 * @param id The UUID of the invoice line item to remove.
 */
export const removeInvoiceLineItem = graphql(`
  mutation RemoveBillingInvoiceLineItem($id: UUID!) {
    billing {
      removeInvoiceLineItem(id: $id) {
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
