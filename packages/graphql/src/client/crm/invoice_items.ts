import { graphql } from "../generated/gql";

export const CreateInvoiceItemMutation = graphql(`
  mutation CreateInvoiceItem($invoiceItem: CreateInvoiceItemInput!) {
    crm {
      createInvoiceItem(value: $invoiceItem) {
        id
      }
    }
  }
`);

export const UpdateInvoiceItemMutation = graphql(`
  mutation UpdateInvoiceItem($id: ID!, $invoiceItem: UpdateInvoiceItemInput!) {
    crm {
      updateInvoiceItem(id: $id, value: $invoiceItem) {
        id
      }
    }
  }
`);

export const RemoveInvoiceItemMutation = graphql(`
  mutation RemoveInvoiceItem($id: ID!) {
    crm {
      removeInvoiceItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
