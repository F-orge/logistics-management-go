import { graphql } from "../generated/gql";

export const CreateCarrierMutation = graphql(`
  mutation CreateCarrier($carrier: CreateCarrierInput!) {
    tms {
      createCarrier(value: $carrier) {
        id
        name
        contactPerson
        contactEmail
        contactPhone
        servicesOffered
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateCarrierMutation = graphql(`
  mutation UpdateCarrier($id: ID!, $carrier: UpdateCarrierInput!) {
    tms {
      updateCarrier(id: $id, value: $carrier) {
        id
        name
        contactPerson
        contactEmail
        contactPhone
        servicesOffered
        createdAt
        updatedAt
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

export const SearchCarriersQuery = graphql(`
  query SearchCarriers($search: String!) {
    tms {
      carriers(search: $search, page: 1, perPage: 10) {
        value: id
        label: name
      }
    }
  }
`);
