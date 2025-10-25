import { graphql } from "../generated/gql";

export const CreateAccountingSyncLogMutation = graphql(`
  mutation CreateAccountingSyncLog(
    $accountingSyncLog: CreateAccountingSyncLogInput!
  ) {
    billing {
      createAccountingSyncLog(value: $accountingSyncLog) {
        id
      }
    }
  }
`);

export const UpdateAccountingSyncLogMutation = graphql(`
  mutation UpdateAccountingSyncLog(
    $id: ID!
    $accountingSyncLog: UpdateAccountingSyncLogInput!
  ) {
    billing {
      updateAccountingSyncLog(id: $id, value: $accountingSyncLog) {
        id
      }
    }
  }
`);

export const RemoveAccountingSyncLogMutation = graphql(`
  mutation RemoveAccountingSyncLog($id: ID!) {
    billing {
      removeAccountingSyncLog(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const AccountingSyncLogsQuery = graphql(`
  query AccountingSyncLogs(
    $page: Int
    $perPage: Int
    $search: String
    $status: SyncStatus
  ) {
    billing {
      accountingSyncLogs(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        createdAt
        errorMessage
        externalId
        externalSystem
        id
        lastSyncAt
        nextRetryAt
        recordId
        recordType
        requestPayload
        responsePayload
        retryCount
        status
        updatedAt
      }
    }
  }
`);
