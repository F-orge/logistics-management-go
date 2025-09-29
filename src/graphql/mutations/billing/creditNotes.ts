import { graphql } from "@/lib/graphql/client";

// ============================================================================
// CREDIT NOTE MUTATIONS
// ============================================================================

/**
 * Creates a new credit note.
 * @param payload The input data for creating the credit note.
 */
export const createCreditNote = graphql(`
  mutation CreateCreditNote($payload: CreateCreditNoteInput!) {
    billing {
      createCreditNote(payload: $payload) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the invoice ID of a credit note.
 * @param id The UUID of the credit note to update.
 * @param invoiceId The new invoice ID.
 */
export const updateCreditNoteInvoiceId = graphql(`
  mutation UpdateCreditNoteInvoiceId($id: UUID!, $invoiceId: UUID!) {
    billing {
      updateCreditNoteInvoiceId(id: $id, invoiceId: $invoiceId) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the dispute ID of a credit note.
 * @param id The UUID of the credit note to update.
 * @param disputeId The new dispute ID.
 */
export const updateCreditNoteDisputeId = graphql(`
  mutation UpdateCreditNoteDisputeId($id: UUID!, $disputeId: UUID) {
    billing {
      updateCreditNoteDisputeId(id: $id, disputeId: $disputeId) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the credit note number of a credit note.
 * @param id The UUID of the credit note to update.
 * @param creditNoteNumber The new credit note number.
 */
export const updateCreditNoteCreditNoteNumber = graphql(`
  mutation UpdateCreditNoteCreditNoteNumber($id: UUID!, $creditNoteNumber: String!) {
    billing {
      updateCreditNoteCreditNoteNumber(id: $id, creditNoteNumber: $creditNoteNumber) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the amount of a credit note.
 * @param id The UUID of the credit note to update.
 * @param amount The new amount.
 */
export const updateCreditNoteAmount = graphql(`
  mutation UpdateCreditNoteAmount($id: UUID!, $amount: Float!) {
    billing {
      updateCreditNoteAmount(id: $id, amount: $amount) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the reason of a credit note.
 * @param id The UUID of the credit note to update.
 * @param reason The new reason.
 */
export const updateCreditNoteReason = graphql(`
  mutation UpdateCreditNoteReason($id: UUID!, $reason: String!) {
    billing {
      updateCreditNoteReason(id: $id, reason: $reason) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the issue date of a credit note.
 * @param id The UUID of the credit note to update.
 * @param issueDate The new issue date.
 */
export const updateCreditNoteIssueDate = graphql(`
  mutation UpdateCreditNoteIssueDate($id: UUID!, $issueDate: NaiveDate!) {
    billing {
      updateCreditNoteIssueDate(id: $id, issueDate: $issueDate) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the applied at timestamp of a credit note.
 * @param id The UUID of the credit note to update.
 * @param appliedAt The new applied at timestamp.
 */
export const updateCreditNoteAppliedAt = graphql(`
  mutation UpdateCreditNoteAppliedAt($id: UUID!, $appliedAt: DateTime) {
    billing {
      updateCreditNoteAppliedAt(id: $id, appliedAt: $appliedAt) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the currency of a credit note.
 * @param id The UUID of the credit note to update.
 * @param currency The new currency.
 */
export const updateCreditNoteCurrency = graphql(`
  mutation UpdateCreditNoteCurrency($id: UUID!, $currency: String) {
    billing {
      updateCreditNoteCurrency(id: $id, currency: $currency) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the notes of a credit note.
 * @param id The UUID of the credit note to update.
 * @param notes The new notes.
 */
export const updateCreditNoteNotes = graphql(`
  mutation UpdateCreditNoteNotes($id: UUID!, $notes: String) {
    billing {
      updateCreditNoteNotes(id: $id, notes: $notes) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Updates the created by user ID of a credit note.
 * @param id The UUID of the credit note to update.
 * @param createdByUserId The new created by user ID.
 */
export const updateCreditNoteCreatedByUserId = graphql(`
  mutation UpdateCreditNoteCreatedByUserId($id: UUID!, $createdByUserId: UUID) {
    billing {
      updateCreditNoteCreatedByUserId(id: $id, createdByUserId: $createdByUserId) {
        id
        creditNoteNumber
        amount
        reason
        issueDate
        appliedAt
        currency
        notes
        createdAt
        updatedAt
        invoice {
          id
          invoiceNumber
        }
        dispute {
          id
          reason
        }
        createdByUser {
          id
          name
        }
      }
    }
  }
`);

/**
 * Removes a credit note by its ID.
 * @param id The UUID of the credit note to remove.
 */
export const removeCreditNote = graphql(`
  mutation RemoveCreditNote($id: UUID!) {
    billing {
      removeCreditNote(id: $id)
    }
  }
`);
