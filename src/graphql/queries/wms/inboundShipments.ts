import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single inbound shipment by its ID.
 */
export const getInboundShipment = graphql(`
  query GetInboundShipment($id: UUID!) {
    wms {
      inboundShipment(id: $id) {
        id
        status
        expectedArrivalDate
        actualArrivalDate
        createdAt
        updatedAt
        client {
          id
          name
        }
        warehouse {
          id
          name
        }
        items {
          id
          expectedQuantity
          receivedQuantity
          discrepancyQuantity
          discrepancyNotes
          product {
            id
            name
          }
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of inbound shipments with pagination.
 */
export const getInboundShipments = graphql(`
  query GetInboundShipments($limit: Int!, $page: Int!) {
    wms {
      inboundShipments(limit: $limit, page: $page) {
        id
        status
        expectedArrivalDate
        actualArrivalDate
        createdAt
        updatedAt
        client {
          id
          name
        }
        warehouse {
          id
          name
        }
        items {
          id
          expectedQuantity
          receivedQuantity
          discrepancyQuantity
          discrepancyNotes
          product {
            id
            name
          }
        }
      }
    }
  }
`);
