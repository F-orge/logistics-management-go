import { graphql } from "../generated/gql";

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
  mutation UpdatePartnerInvoice(
    $id: ID!
    $partnerInvoice: UpdatePartnerInvoiceInput!
  ) {
    tms {
      updatePartnerInvoice(id: $id, value: $partnerInvoice) {
        id
      }
    }
  }
`);

// export const RemovePartnerInvoiceMutation = graphql(`
//   mutation RemovePartnerInvoice($id: ID!) {
//     tms {
//       removePartnerInvoice(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);

export const TablePartnerInvoice = graphql(`
  query TablePartnerInvoice(
    $page: Int
    $perPage: Int
    $search: String
    $status: PartnerInvoiceStatus
  ) {
    tms {
      partnerInvoices(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        createdAt
        id
        invoiceDate
        invoiceNumber
        status
        totalAmount
        updatedAt
        items {
          amount
          id
          shipmentLeg {
            startLocation
            endLocation
            shipment {
              trackingNumber
              carrier
            }
          }
        }
      }
    }
  }
`);

export const SearchPartnerInvoicesQuery = graphql(`
  query SearchPartnerInvoices($search: String!) {
    tms {
      partnerInvoices(search: $search, page: 1, perPage: 10) {
        value: id
        label: invoiceNumber
      }
    }
  }
`);

export const AnalyticsPartnerInvoicesQuery = graphql(`
  query AnalyticsPartnerInvoices($from: Date, $to: Date) {
    tms {
      partnerInvoices(from: $from, to: $to) {
        totalAmount
        status
      }
    }
  }
`);
