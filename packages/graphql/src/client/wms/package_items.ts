import { graphql } from "../../generated/gql";

export const CreatePackageItemMutation = graphql(`
  mutation CreatePackageItem($packageItem: CreatePackageItemInput!) {
    wms {
      createPackageItem(value: $packageItem) {
        id
      }
    }
  }
`);

export const UpdatePackageItemMutation = graphql(`
  mutation UpdatePackageItem($id: ID!, $packageItem: UpdatePackageItemInput!) {
    wms {
      updatePackageItem(id: $id, value: $packageItem) {
        id
      }
    }
  }
`);

export const RemovePackageItemMutation = graphql(`
  mutation RemovePackageItem($id: ID!) {
    wms {
      removePackageItem(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
