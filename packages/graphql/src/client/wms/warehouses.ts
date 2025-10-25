import { graphql } from "../generated/gql";

export const CreateWarehouseMutation = graphql(`
  mutation CreateWarehouse($warehouse: CreateWarehouseInput!) {
    wms {
      createWarehouse(value: $warehouse) {
        id
      }
    }
  }
`);

export const UpdateWarehouseMutation = graphql(`
  mutation UpdateWarehouse($id: ID!, $warehouse: UpdateWarehouseInput!) {
    wms {
      updateWarehouse(id: $id, value: $warehouse) {
        id
      }
    }
  }
`);

export const RemoveWarehouseMutation = graphql(`
  mutation RemoveWarehouse($id: ID!) {
    wms {
      removeWarehouse(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableWarehouseQuery = graphql(`
  query TableWarehouse($page: Int, $perPage: Int, $search: String) {
    wms {
      warehouses(page: $page, perPage: $perPage, search: $search) {
        address
        city
        contactEmail
        contactPerson
        contactPhone
        country
        createdAt
        id
        isActive
        name
        postalCode
        state
        timezone
        updatedAt
        tasks {
          instructions
          id
          notes
          priority
          taskNumber
          type
          user {
            email
            id
            image
            name
          }
        }
        locations {
          barcode
          id
          isActive
          isPickable
          isReceivable
          level
          maxPallets
          maxVolume
          maxWeight
          name
          path
          type
          xCoordinate
          yCoordinate
          zCoordinate
          hazmatApproved
        }
        inboundShipments {
          status
          updatedAt
          warehouseId
          items {
            discrepancyNotes
            discrepancyQuantity
            expectedQuantity
            id
            createdAt
            receivedQuantity
            updatedAt
            product {
              barcode
              costPrice
              description
              id
              name
              sku
              status
            }
            inboundShipment {
              status
              id
              expectedArrivalDate
              updatedAt
              actualArrivalDate
              client {
                city
                country
                id
                industry
                name
                phoneNumber
              }
            }
          }
        }
      }
    }
  }
`);
