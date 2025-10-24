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
