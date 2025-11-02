import { graphql } from "../generated/gql";

export const CreateDmsProofOfDeliveryMutation = graphql(`
  mutation CreateDmsProofOfDelivery(
    $dmsProofOfDelivery: CreateDmsProofOfDeliveryInput!
  ) {
    dms {
      createDmsProofOfDelivery(value: $dmsProofOfDelivery) {
        id
        type
        recipientName
        timestamp
        filePath
        signatureData
        verificationCode
        latitude
        longitude
        createdAt
        updatedAt
        deliveryTask {
          id
          recipientName
          deliveryAddress
          status
        }
      }
    }
  }
`);

// export const UpdateDmsProofOfDeliveryMutation = graphql(`
//   mutation UpdateDmsProofOfDelivery(
//     $id: ID!
//     $dmsProofOfDelivery: UpdateDmsProofOfDeliveryInput!
//   ) {
//     dms {
//       updateDmsProofOfDelivery(id: $id, value: $dmsProofOfDelivery) {
//         id
//       }
//     }
//   }
// `);

// export const RemoveDmsProofOfDeliveryMutation = graphql(`
//   mutation RemoveDmsProofOfDelivery($id: ID!) {
//     dms {
//       removeDmsProofOfDelivery(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);

export const TableProofOfDeliveryQuery = graphql(`
  query TableProofOfDelivery(
    $page: Int
    $perPage: Int
    $search: String
    $type: ProofOfDeliveryType
  ) {
    dms {
      dmsProofOfDeliveries(
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
        recipientName
        signatureData
        timestamp
        type
        updatedAt
        verificationCode
        deliveryTask {
          package {
            id
            packageNumber
            packageType
            requiresSignature
            trackingNumber
            warehouse {
              id
              address
              city
              country
            }
          }
          actualArrivalTime
          deliveryInstructions
          deliveryAddress
          failureReason
          recipientName
          recipientPhone
          status
        }
      }
    }
  }
`);

export const SearchDmsProofOfDeliveriesQuery = graphql(`
  query SearchDmsProofOfDeliveries($search: String!) {
    dms {
      dmsProofOfDeliveries(page: 1, perPage: 10, search: $search) {
        value: id
        label: recipientName
      }
    }
  }
`);

export const AnalyticsDmsProofOfDeliveriesQuery = graphql(`
  query AnalyticsProofOfDeliveries($from: Date, $to: Date) {
    dms {
      dmsProofOfDeliveries(from: $from, to: $to) {
        type
      }
    }
  }
`);
