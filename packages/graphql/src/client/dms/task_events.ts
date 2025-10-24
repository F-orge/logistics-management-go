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
