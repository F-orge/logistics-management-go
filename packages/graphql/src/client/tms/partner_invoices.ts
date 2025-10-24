import { graphql } from "../../generated/gql";

export const CreatePartnerInvoiceMutation = graphql(`
  mutation CreatePartnerInvoice($partnerInvoice: CreatePartnerInvoiceInput!) {
    tms {
      createPartnerInvoice(value: $partnerInvoice) {
        id
      }
    }
  }
`);

export const UpdatePartnerInvoiceMutation = graphql(`
  mutation UpdatePartnerInvoice($id: ID!, $partnerInvoice: UpdatePartnerInvoiceInput!) {
    tms {
      updatePartnerInvoice(id: $id, value: $partnerInvoice) {
        id
      }
    }
  }
`);

export const RemovePartnerInvoiceMutation = graphql(`
  mutation RemovePartnerInvoice($id: ID!) {
    tms {
      removePartnerInvoice(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
