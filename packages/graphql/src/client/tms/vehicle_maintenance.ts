import { graphql } from "../generated/gql";

export const CreateVehicleMaintenanceMutation = graphql(`
  mutation CreateVehicleMaintenance(
    $vehicleMaintenance: CreateVehicleMaintenanceInput!
  ) {
    tms {
      createVehicleMaintenance(value: $vehicleMaintenance) {
        id
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
