import { graphql } from "../../generated/gql";

export const CreatePackageMutation = graphql(`
  mutation CreatePackage($package: CreatePackageInput!) {
    wms {
      createPackage(value: $package) {
        id
      }
    }
  }
`);

export const UpdatePackageMutation = graphql(`
  mutation UpdatePackage($id: ID!, $package: UpdatePackageInput!) {
    wms {
      updatePackage(id: $id, value: $package) {
        id
      }
    }
  }
`);

export const RemovePackageMutation = graphql(`
  mutation RemovePackage($id: ID!) {
    wms {
      removePackage(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
