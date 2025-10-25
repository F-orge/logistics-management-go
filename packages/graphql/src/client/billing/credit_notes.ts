import { graphql } from "../generated/gql";

export const CreateCreditNoteMutation = graphql(`
  mutation CreateCreditNote($creditNote: CreateCreditNoteInput!) {
    billing {
      createCreditNote(value: $creditNote) {
        id
      }
    }
  }
`);

export const UpdateCreditNoteMutation = graphql(`
  mutation UpdateCreditNote($id: ID!, $creditNote: UpdateCreditNoteInput!) {
    billing {
      updateCreditNote(id: $id, value: $creditNote) {
        id
      }
    }
  }
`);

export const RemoveCreditNoteMutation = graphql(`
  mutation RemoveCreditNote($id: ID!) {
    billing {
      removeCreditNote(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableCreditNoteQuery = graphql(`
  query TableCreditNote($page: Int, $perPage: Int, $search: String) {
    billing {
      creditNotes(page: $page, perPage: $perPage, search: $search) {
        appliedAt
        amount
        createdAt
        createdByUser {
          email
          id
          image
          name
        }
        creditNoteNumber
        currency
        id
        issueDate
        notes
        reason
        updatedAt
        invoice {
          amountPaid
          invoiceNumber
          issueDate
          paidAt
          notes
          sentAt
          status
          subtotal
          taxAmount
          totalAmount
          updatedAt
          paymentTerms
          discountAmount
          dueDate
          currency
        }
        dispute {
          disputedAmount
          id
          reason
          resolutionNotes
          resolvedAt
          status
          submittedAt
        }
      }
    }
  }
`);

export const SearchCreditNotesQuery = graphql(`
  query SearchCreditNotes($search: String!) {
    billing {
      creditNotes(search: $search, page: 1, perPage: 10) {
        value: id
        label: creditNoteNumber
      }
    }
  }
`);

export const AnalyticsCreditNotesQuery = graphql(`
  query AnalyticsCreditNotes($from: Date, $to: Date) {
    billing {
      creditNotes(from: $from, to: $to) {
        amount
      }
    }
  }
`);