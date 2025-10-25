import { graphql } from "../generated/gql";

export const CreateNotificationMutation = graphql(`
  mutation CreateNotification($notification: CreateNotificationInput!) {
    crm {
      createNotification(value: $notification) {
        id
      }
    }
  }
`);

export const UpdateNotificationMutation = graphql(`
  mutation UpdateNotification(
    $id: ID!
    $notification: UpdateNotificationInput!
  ) {
    crm {
      updateNotification(id: $id, value: $notification) {
        id
      }
    }
  }
`);

export const RemoveNotificationMutation = graphql(`
  mutation RemoveNotification($id: ID!) {
    crm {
      removeNotification(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableNotificationQuery = graphql(`
  query TableNotification($page: Int, $perPage: Int, $search: String) {
    crm {
      notifications(page: $page, perPage: $perPage, search: $search) {
        createdAt
        id
        isRead
        link
        message
        updatedAt
        user {
          email
          id
          image
          name
        }
      }
    }
  }
`);
