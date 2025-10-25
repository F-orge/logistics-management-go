import { graphql } from "../generated/gql";

export const CreateCarrierMutation = graphql(`
  mutation CreateCarrier($carrier: CreateCarrierInput!) {
    tms {
      createCarrier(value: $carrier) {
        id
      }
    }
  }
`);

export const UpdateCarrierMutation = graphql(`
  mutation UpdateCarrier($id: ID!, $carrier: UpdateCarrierInput!) {
    tms {
      updateCarrier(id: $id, value: $carrier) {
        id
      }
    }
  }
`);

export const RemoveCarrierMutation = graphql(`
  mutation RemoveCarrier($id: ID!) {
    tms {
      removeCarrier(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableCarrierQuery = graphql(`
  query TableCarrierQuery($page: Int, $perPage: Int, $search: String) {
    tms {
      carriers(page: $page, perPage: $perPage, search: $search) {
        contactEmail
        contactPerson
        contactPhone
        createdAt
        id
        name
        servicesOffered
        updatedAt
        partnerInvoices {
          invoiceNumber
          invoiceDate
          status
          totalAmount
          items {
            amount
            id
            shipmentLeg {
              status
              shipment {
                trackingNumber
                carrier
                createdAt
                id
                status
                warehouseId
              }
            }
          }
        }
        rates {
          destination
          id
          origin
          rate
          serviceType
          unit
        }
      }
    }
  }
`);
