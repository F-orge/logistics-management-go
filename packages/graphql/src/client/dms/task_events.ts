import { graphql } from "../generated/gql";

export const CreateTaskEventMutation = graphql(`
  mutation CreateTaskEvent($taskEvent: CreateTaskEventInput!) {
    dms {
      createTaskEvent(value: $taskEvent) {
        id
      }
    }
  }
`);

export const UpdateTaskEventMutation = graphql(`
  mutation UpdateTaskEvent($id: ID!, $taskEvent: UpdateTaskEventInput!) {
    dms {
      updateTaskEvent(id: $id, value: $taskEvent) {
        id
      }
    }
  }
`);

export const RemoveTaskEventMutation = graphql(`
  mutation RemoveTaskEvent($id: ID!) {
    dms {
      removeTaskEvent(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableTaskEventQuery = graphql(`
  query TableTaskEvent(
    $page: Int
    $perPage: Int
    $search: String
    $status: TaskEventStatus
  ) {
    dms {
      taskEvents(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        createdAt
        id
        latitude
        longitude
        notes
        reason
        status
        timestamp
        updatedAt
        deliveryTask {
          id
          recipientName
          recipientPhone
          deliveryInstructions
          deliveryAddress
          status
          package {
            id
            trackingNumber
            packageNumber
            packageType
          }
        }
      }
    }
  }
`);
