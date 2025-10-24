import { graphql } from "../generated/gql";

export const CreateBillingInvoiceMutation = graphql(`
  mutation CreateBillingInvoice($billingInvoice: CreateBillingInvoiceInput!) {
    billing {
      createBillingInvoice(value: $billingInvoice) {
        id
      }
    }
  }
`);

export const UpdateBillingInvoiceMutation = graphql(`
  mutation UpdateBillingInvoice(
    $id: ID!
    $billingInvoice: UpdateBillingInvoiceInput!
  ) {
    billing {
      updateBillingInvoice(id: $id, value: $billingInvoice) {
        id
      }
    }
  }
`);

export const RemoveBillingInvoiceMutation = graphql(`
  mutation RemoveBillingInvoice($id: ID!) {
    billing {
      removeBillingInvoice(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
