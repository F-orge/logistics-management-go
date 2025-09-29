import { graphql } from "@/lib/graphql/client";

/**
 * Query to fetch a single package by its ID.
 */
export const getPackage = graphql(`
  query GetPackage($id: UUID!) {
    wms {
      package(id: $id) {
        id
        packageNumber
        packageType
        weight
        length
        width
        height
        volume
        trackingNumber
        carrier
        serviceLevel
        packedAt
        shippedAt
        isFragile
        isHazmat
        requiresSignature
        insuranceValue
        createdAt
        updatedAt
        salesOrder {
          id
          orderNumber
        }
        warehouse {
          id
          name
        }
        packedByUser {
          id
          name
        }
        items {
          id
          quantity
          lotNumber
          serialNumbers
          expiryDate
          unitWeight
          totalWeight
          product {
            id
            name
          }
          batch {
            id
            batchNumber
          }
        }
      }
    }
  }
`);

/**
 * Query to fetch a list of packages with pagination.
 */
export const getPackages = graphql(`
  query GetPackages($limit: Int!, $page: Int!) {
    wms {
      packages(limit: $limit, page: $page) {
        id
        packageNumber
        packageType
        weight
        length
        width
        height
        volume
        trackingNumber
        carrier
        serviceLevel
        packedAt
        shippedAt
        isFragile
        isHazmat
        requiresSignature
        insuranceValue
        createdAt
        updatedAt
        salesOrder {
          id
          orderNumber
        }
        warehouse {
          id
          name
        }
        packedByUser {
          id
          name
        }
        items {
          id
          quantity
          lotNumber
          serialNumbers
          expiryDate
          unitWeight
          totalWeight
          product {
            id
            name
          }
          batch {
            id
            batchNumber
          }
        }
      }
    }
  }
`);
