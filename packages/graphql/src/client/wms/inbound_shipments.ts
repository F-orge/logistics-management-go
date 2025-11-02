import { graphql } from "../generated/gql";

export const CreateInboundShipmentMutation = graphql(`
  mutation CreateInboundShipment(
    $inboundShipment: CreateInboundShipmentInput!
  ) {
    wms {
      createInboundShipment(value: $inboundShipment) {
        id
        warehouseId
        status
        expectedArrivalDate
        actualArrivalDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

export const UpdateInboundShipmentMutation = graphql(`
  mutation UpdateInboundShipment(
    $id: ID!
    $inboundShipment: UpdateInboundShipmentInput!
  ) {
    wms {
      updateInboundShipment(id: $id, value: $inboundShipment) {
        id
        warehouseId
        status
        expectedArrivalDate
        actualArrivalDate
        createdAt
        updatedAt
        client {
          id
          name
        }
      }
    }
  }
`);

export const RemoveInboundShipmentMutation = graphql(`
  mutation RemoveInboundShipment($id: ID!) {
    wms {
      removeInboundShipment(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableInboundShipmentQuery = graphql(`
  query TableInboundShipment(
    $page: Int
    $perPage: Int
    $status: InboundShipmentStatus
  ) {
    wms {
      inboundShipments(page: $page, perPage: $perPage, status: $status) {
        actualArrivalDate
        createdAt
        expectedArrivalDate
        id
        status
        updatedAt
        client {
          name
          industry
          phoneNumber
          country
          website
        }
      }
    }
  }
`);

export const AnalyticsInboundShipmentsQuery = graphql(`
  query AnalyticsInboundShipments($from: Date, $to: Date) {
    wms {
      inboundShipments(from: $from, to: $to) {
        status
      }
    }
  }
`);
