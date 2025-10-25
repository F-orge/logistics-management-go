import { graphql } from "../generated/gql";

export const CreateTaskMutation = graphql(`
  mutation CreateTask($task: CreateTaskInput!) {
    wms {
      createTask(value: $task) {
        id
      }
    }
  }
`);

export const UpdateTaskMutation = graphql(`
  mutation UpdateTask($id: ID!, $task: UpdateTaskInput!) {
    wms {
      updateTask(id: $id, value: $task) {
        id
      }
    }
  }
`);

export const RemoveTaskMutation = graphql(`
  mutation RemoveTask($id: ID!) {
    wms {
      removeTask(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableTaskQuery = graphql(`
  query TableTask(
    $page: Int
    $perPage: Int
    $search: String
    $status: TaskStatus
    $type: TaskType
  ) {
    wms {
      tasks(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
        type: $type
      ) {
        actualDuration
        createdAt
        durationSeconds
        endTime
        estimatedDuration
        id
        instructions
        notes
        priority
        sourceEntityId
        sourceEntityType
        startTime
        status
        taskNumber
        type
        updatedAt
        user {
          email
          id
          image
          name
        }
        warehouse {
          address
          city
          country
          id
          isActive
          name
          timezone
        }
        items {
          completedAt
          createdAt
          expiryDate
          id
          lotNumber
          notes
          quantityCompleted
          quantityRemaining
          quantityRequired
          serialNumbers
          status
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
          sourceLocation {
            barcode
            hazmatApproved
            id
            path
            name
            type
          }
        }
      }
    }
  }
`);
