import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single outbound shipment by its ID.
 */
export const getOutboundShipment = graphql(`
  query GetOutboundShipment($id: UUID!) {
    wms {
      outboundShipment(id: $id) {
        id
        status
        trackingNumber
        carrier
        createdAt
        updatedAt
        warehouse {
          id
          name
        }
        salesOrder {
          id
          orderNumber
        }
        items {
          id
          quantityShipped
          product {
            id
            name
          }
          salesOrderItem {
            id
            quantityOrdered
          }
          batch {
            id
            batchNumber
          }
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of outbound shipments with pagination.
 */
export const getOutboundShipments = graphql(`
  query GetOutboundShipments($limit: Int!, $page: Int!) {
    wms {
      outboundShipments(limit: $limit, page: $page) {
        id
        status
        trackingNumber
        carrier
        createdAt
        updatedAt
        warehouse {
          id
          name
        }
        salesOrder {
          id
          orderNumber
        }
        items {
          id
          quantityShipped
          product {
            id
            name
          }
          salesOrderItem {
            id
            quantityOrdered
          }
          batch {
            id
            batchNumber
          }
        }
      }
    }
  }
`);
