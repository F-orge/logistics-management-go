import { graphql } from "../generated/gql";

export const CreateProofOfDeliveryMutation = graphql(`
  mutation CreateProofOfDelivery(
    $proofOfDelivery: CreateProofOfDeliveryInput!
  ) {
    tms {
      createProofOfDelivery(value: $proofOfDelivery) {
        id
      }
    }
  }
`);

export const UpdateProofOfDeliveryMutation = graphql(`
  mutation UpdateProofOfDelivery(
    $id: ID!
    $proofOfDelivery: UpdateProofOfDeliveryInput!
  ) {
    tms {
      updateProofOfDelivery(id: $id, value: $proofOfDelivery) {
        id
      }
    }
  }
`);

export const RemoveProofOfDeliveryMutation = graphql(`
  mutation RemoveProofOfDelivery($id: ID!) {
    tms {
      removeProofOfDelivery(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableTmsProofOfDeliveryQuery = graphql(`
  query TableTmsProofOfDelivery(
    $page: Int
    $perPage: Int
    $search: String
    $type: ProofType
  ) {
    tms {
      proofOfDeliveries(
        page: $page
        perPage: $perPage
        search: $search
        type: $type
      ) {
        createdAt
        filePath
        id
        latitude
        longitude
        timestamp
        type
        updatedAt
        tripStop {
          actualArrivalTime
          actualDepartureTime
          address
          status
          id
          shipment {
            trackingNumber
            status
            carrier
            id
          }
          trip {
            endLocation
            startLocation
            status
            vehicle {
              registrationNumber
              vin
              year
              make
              model
              gpsPings {
                latitude
                longitude
                timestamp
                id
              }
            }
          }
        }
      }
    }
  }
`);

export const SearchProofOfDeliveriesQuery = graphql(`
  query SearchProofOfDeliveries($search: String!) {
    tms {
      proofOfDeliveries(search: $search, page: 1, perPage: 10) {
        value: id
        label: filePath
      }
    }
  }
`);
