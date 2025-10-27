import { graphql } from "../generated/gql";

// export const CreatePartnerInvoiceItemMutation = graphql(`
//   mutation CreatePartnerInvoiceItem(
//     $partnerInvoiceItem: CreatePartnerInvoiceItemInput!
//   ) {
//     tms {
//       createPartnerInvoiceItem(value: $partnerInvoiceItem) {
//         id
//       }
//     }
//   }
// `);

export const UpdatePartnerInvoiceItemMutation = graphql(`
  mutation UpdatePartnerInvoiceItem(
    $id: ID!
    $partnerInvoiceItem: UpdatePartnerInvoiceItemInput!
  ) {
    tms {
      updatePartnerInvoiceItem(id: $id, value: $partnerInvoiceItem) {
        id
      }
    }
  }
`);

export const RemovePartnerInvoiceItemMutation = graphql(`
  mutation RemovePartnerInvoiceItem($id: ID!) {
    tms {
      removePartnerInvoiceItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
