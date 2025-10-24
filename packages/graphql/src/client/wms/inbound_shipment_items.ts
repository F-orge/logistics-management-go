import { graphql } from "../../generated/gql";

export const CreateInboundShipmentItemMutation = graphql(`
  mutation CreateInboundShipmentItem($inboundShipmentItem: CreateInboundShipmentItemInput!) {
    wms {
      createInboundShipmentItem(value: $inboundShipmentItem) {
        id
      }
    }
  }
`);

export const UpdateInboundShipmentItemMutation = graphql(`
  mutation UpdateInboundShipmentItem($id: ID!, $inboundShipmentItem: UpdateInboundShipmentItemInput!) {
    wms {
      updateInboundShipmentItem(id: $id, value: $inboundShipmentItem) {
        id
      }
    }
  }
`);

export const RemoveInboundShipmentItemMutation = graphql(`
  mutation RemoveInboundShipmentItem($id: ID!) {
    wms {
      removeInboundShipmentItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
