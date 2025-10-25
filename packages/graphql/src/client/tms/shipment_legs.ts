import { graphql } from "../generated/gql";

export const CreateShipmentLegMutation = graphql(`
  mutation CreateShipmentLeg($shipmentLeg: CreateShipmentLegInput!) {
    tms {
      createShipmentLeg(value: $shipmentLeg) {
        id
      }
    }
  }
`);

export const UpdateShipmentLegMutation = graphql(`
  mutation UpdateShipmentLeg($id: ID!, $shipmentLeg: UpdateShipmentLegInput!) {
    tms {
      updateShipmentLeg(id: $id, value: $shipmentLeg) {
        id
      }
    }
  }
`);

export const RemoveShipmentLegMutation = graphql(`
  mutation RemoveShipmentLeg($id: ID!) {
    tms {
      removeShipmentLeg(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableShipmentLegQuery = graphql(`
  query TableShipmentLegQuery(
    $page: Int
    $perPage: Int
    $search: String
    $status: ShipmentLegStatus
  ) {
    tms {
      shipmentLegs(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        createdAt
        endLocation
        id
        legSequence
        startLocation
        status
        updatedAt
        shipment {
          trackingNumber
          carrier
          status
        }
        partnerInvoiceItems {
          amount
          id
        }
        events {
          location
          statusMessage
          eventTimestamp
          id
        }
      }
    }
  }
`);
