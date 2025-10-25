import { graphql } from "../generated/gql";

export const CreateQuoteMutation = graphql(`
  mutation CreateQuote($quote: CreateQuoteInput!) {
    billing {
      createQuote(value: $quote) {
        id
      }
    }
  }
`);

export const UpdateQuoteMutation = graphql(`
  mutation UpdateQuote($id: ID!, $quote: UpdateQuoteInput!) {
    billing {
      updateQuote(id: $id, value: $quote) {
        id
      }
    }
  }
`);

export const RemoveQuoteMutation = graphql(`
  mutation RemoveQuote($id: ID!) {
    billing {
      removeQuote(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableQuoteQuery = graphql(`
  query TableQuote(
    $page: Int
    $perPage: Int
    $search: String
    $status: QuoteStatus
  ) {
    billing {
      quotes(page: $page, perPage: $perPage, search: $search, status: $status) {
        createdAt
        destinationDetails
        expiresAt
        height
        id
        length
        notes
        originDetails
        quoteNumber
        quotedPrice
        serviceLevel
        status
        updatedAt
        volume
        weight
        width
        createdByUser {
          email
          id
          image
          name
        }
        client {
          city
          country
          id
          industry
          name
          phoneNumber
          website
          billingInvoices {
            amountOutstanding
            amountPaid
            currency
            discountAmount
            dueDate
            invoiceNumber
            issueDate
          }
        }
      }
    }
  }
`);
