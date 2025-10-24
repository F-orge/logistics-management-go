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
