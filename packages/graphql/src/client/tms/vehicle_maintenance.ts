import { graphql } from "../generated/gql";

export const CreateVehicleMaintenanceMutation = graphql(`
  mutation CreateVehicleMaintenance(
    $id: ID!
    $vehicleMaintenance: CreateVehicleMaintenanceInput!
  ) {
    tms {
      addVehicleMaintenance(id: $id, value: $vehicleMaintenance) {
        id
        vehicle {
          id
          registrationNumber
          make
          model
        }
        serviceDate
        serviceType
        cost
        notes
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateVehicleMaintenanceMutation = graphql(`
  mutation UpdateVehicleMaintenance(
    $id: ID!
    $vehicleMaintenance: UpdateVehicleMaintenanceInput!
  ) {
    tms {
      updateVehicleMaintenance(id: $id, value: $vehicleMaintenance) {
        id
        vehicle {
          id
          registrationNumber
          make
          model
        }
        serviceDate
        serviceType
        cost
        notes
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveVehicleMaintenanceMutation = graphql(`
  mutation RemoveVehicleMaintenance($id: ID!) {
    tms {
      removeVehicleMaintenance(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
