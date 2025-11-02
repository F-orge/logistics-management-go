import { graphql } from "../generated/gql";

export const CreateOutboundShipmentMutation = graphql(`
  mutation CreateOutboundShipment(
    $outboundShipment: CreateOutboundShipmentInput!
  ) {
    wms {
      createOutboundShipment(value: $outboundShipment) {
        id
      }
    }
  }
`);

export const UpdateOutboundShipmentMutation = graphql(`
  mutation UpdateOutboundShipment(
    $id: ID!
    $outboundShipment: UpdateOutboundShipmentInput!
  ) {
    wms {
      updateOutboundShipment(id: $id, value: $outboundShipment) {
        id
      }
    }
  }
`);

export const RemoveOutboundShipmentMutation = graphql(`
  mutation RemoveOutboundShipment($id: ID!) {
    wms {
      removeOutboundShipment(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableOutboundShipmentQuery = graphql(`
  query TableOutboundShipment(
    $page: Int
    $perPage: Int
    $search: String
    $status: OutboundShipmentStatus
  ) {
    wms {
      outboundShipments(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        carrier
        createdAt
        id
        status
        trackingNumber
        updatedAt
        warehouseId
        salesOrder {
          id
          orderNumber
          shippingAddress
          status
        }
      }
    }
  }
`);

export const SearchOutboundShipmentsQuery = graphql(`
  query SearchOutboundShipments($search: String!) {
    wms {
      outboundShipments(search: $search, page: 1, perPage: 10) {
        value: id
        label: trackingNumber
      }
    }
  }
`);

export const AnalyticsOutboundShipmentsQuery = graphql(`
  query AnalyticsOutboundShipments($from: Date, $to: Date) {
    wms {
      outboundShipments(from: $from, to: $to) {
        status
      }
    }
  }
`);
