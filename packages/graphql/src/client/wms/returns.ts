import { graphql } from "../../generated/gql";

export const CreateReturnMutation = graphql(`
  mutation CreateReturn($return: CreateReturnInput!) {
    wms {
      createReturn(value: $return) {
        id
      }
    }
  }
`);

export const UpdateReturnMutation = graphql(`
  mutation UpdateReturn($id: ID!, $return: UpdateReturnInput!) {
    wms {
      updateReturn(id: $id, value: $return) {
        id
      }
    }
  }
`);

export const RemoveReturnMutation = graphql(`
  mutation RemoveReturn($id: ID!) {
    wms {
      removeReturn(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
