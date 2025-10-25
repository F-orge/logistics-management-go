import { graphql } from "../generated/gql";

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

export const TablePackageQuery = graphql(`
  query TablePackage($page: Int, $perPage: Int, $search: String) {
    wms {
      packages(page: $page, perPage: $perPage, search: $search) {
        carrier
        createdAt
        height
        id
        insuranceValue
        isFragile
        isHazmat
        length
        packageNumber
        packageType
        packedAt
        requiresSignature
        serviceLevel
        shippedAt
        trackingNumber
        updatedAt
        volume
        weight
        width
        items {
          lotNumber
          quantity
          product {
            barcode
            costPrice
            name
            sku
            status
          }
          serialNumbers
          totalWeight
          unitWeight
        }
      }
    }
  }
`);

export const SearchPackagesQuery = graphql(`
  query SearchPackages($search: String!) {
    wms {
      packages(search: $search, page: 1, perPage: 10) {
        value: id
        label: packageNumber
      }
    }
  }
`);

export const AnalyticsPackagesQuery = graphql(`
  query AnalyticsPackages($from: Date, $to: Date) {
    wms {
      packages(from: $from, to: $to) {
        weight
        length
        width
        height
        volume
        insuranceValue
      }
    }
  }
`);
