import { graphql } from "../../generated/gql";

export const CreateReturnItemMutation = graphql(`
  mutation CreateReturnItem($returnItem: CreateReturnItemInput!) {
    wms {
      createReturnItem(value: $returnItem) {
        id
      }
    }
  }
`);

export const UpdateReturnItemMutation = graphql(`
  mutation UpdateReturnItem($id: ID!, $returnItem: UpdateReturnItemInput!) {
    wms {
      updateReturnItem(id: $id, value: $returnItem) {
        id
      }
    }
  }
`);

export const RemoveReturnItemMutation = graphql(`
  mutation RemoveReturnItem($id: ID!) {
    wms {
      removeReturnItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
