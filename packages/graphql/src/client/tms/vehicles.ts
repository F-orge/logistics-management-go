import { graphql } from "../../generated/gql";

export const CreateVehicleMutation = graphql(`
  mutation CreateVehicle($vehicle: CreateVehicleInput!) {
    tms {
      createVehicle(value: $vehicle) {
        id
      }
    }
  }
`);

export const UpdateVehicleMutation = graphql(`
  mutation UpdateVehicle($id: ID!, $vehicle: UpdateVehicleInput!) {
    tms {
      updateVehicle(id: $id, value: $vehicle) {
        id
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
