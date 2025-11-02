import { graphql } from "../generated/gql";

export const CreateDeliveryTaskMutation = graphql(`
  mutation CreateDeliveryTask($deliveryTask: CreateDeliveryTaskInput!) {
    dms {
      createDeliveryTask(value: $deliveryTask) {
        id
      }
    }
  }
`);

export const UpdateDeliveryTaskMutation = graphql(`
  mutation UpdateDeliveryTask(
    $id: ID!
    $deliveryTask: UpdateDeliveryTaskInput!
  ) {
    dms {
      updateDeliveryTask(id: $id, value: $deliveryTask) {
        id
      }
    }
  }
`);

// export const RemoveDeliveryTaskMutation = graphql(`
//   mutation RemoveDeliveryTask($id: ID!) {
//     dms {
//       removeDeliveryTask(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);

export const TableDeliveryTaskQuery = graphql(`
  query TableDeliveryTask(
    $page: Int
    $perPage: Int
    $search: String
    $status: DeliveryTaskStatus
    $failureReason: DeliveryFailureReason
  ) {
    dms {
      deliveryTasks(
        failureReason: $failureReason
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        actualArrivalTime
        attemptCount
        createdAt
        deliveryAddress
        deliveryInstructions
        deliveryTime
        estimatedArrivalTime
        failureReason
        id
        recipientName
        recipientPhone
        routeSequence
        status
        updatedAt
        deliveryRoute {
          id
          totalDistanceKm
          optimizedRouteData
          status
          driver {
            id
            user {
              email
              id
              image
              name
            }
            licenseNumber
            status
            contactPhone
          }
        }
        package {
          id
          carrier
          packageNumber
          trackingNumber
          warehouse {
            id
            address
            country
          }
        }
      }
    }
  }
`);

export const SearchDeliveryTasksQuery = graphql(`
  query SearchDeliveryTasks($search: String!) {
    dms {
      deliveryTasks(page: 1, perPage: 10, search: $search) {
        value: id
        label: recipientName
      }
    }
  }
`);

export const AnalyticsDeliveryTasksQuery = graphql(`
  query AnalyticsDeliveryTasks($from: Date, $to: Date) {
    dms {
      deliveryTasks(from: $from, to: $to) {
        attemptCount
        status
        failureReason
      }
    }
  }
`);
