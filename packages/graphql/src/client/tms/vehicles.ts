import { graphql } from "../generated/gql";

export const CreateVehicleMutation = graphql(`
  mutation CreateVehicle($vehicle: CreateVehicleInput!) {
    tms {
      createVehicle(value: $vehicle) {
        id
        registrationNumber
        make
        model
        year
        vin
        capacityWeight
        capacityVolume
        currentMileage
        lastMaintenanceDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateVehicleMutation = graphql(`
  mutation UpdateVehicle($id: ID!, $vehicle: UpdateVehicleInput!) {
    tms {
      updateVehicle(id: $id, value: $vehicle) {
        id
        registrationNumber
        make
        model
        year
        vin
        capacityWeight
        capacityVolume
        currentMileage
        lastMaintenanceDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveVehicleMutation = graphql(`
  mutation RemoveVehicle($id: ID!) {
    tms {
      removeVehicle(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableVehicleQuery = graphql(`
  query TableVehicle(
    $page: Int
    $perPage: Int
    $search: String
    $status: VehicleStatus
  ) {
    tms {
      vehicles(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
      ) {
        capacityVolume
        capacityWeight
        createdAt
        currentMileage
        id
        lastMaintenanceDate
        make
        model
        registrationNumber
        status
        updatedAt
        vin
        year
        maintenances {
          cost
          createdAt
          id
          notes
          serviceDate
          serviceType
          updatedAt
        }
      }
    }
  }
`);

export const SearchVehiclesQuery = graphql(`
  query SearchVehicles($search: String!) {
    tms {
      vehicles(search: $search, page: 1, perPage: 10) {
        value: id
        label: registrationNumber
      }
    }
  }
`);

export const AnalyticsVehiclesQuery = graphql(`
  query AnalyticsVehicles($from: Date, $to: Date) {
    tms {
      vehicles(from: $from, to: $to) {
        capacityVolume
        capacityWeight
        currentMileage
        status
      }
    }
  }
`);
