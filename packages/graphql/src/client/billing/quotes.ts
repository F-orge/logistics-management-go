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
