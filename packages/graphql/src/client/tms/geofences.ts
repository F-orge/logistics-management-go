import { graphql } from "../../generated/gql";

export const CreateGeofenceMutation = graphql(`
  mutation CreateGeofence($geofence: CreateGeofenceInput!) {
    tms {
      createGeofence(value: $geofence) {
        id
      }
    }
  }
`);

export const UpdateGeofenceMutation = graphql(`
  mutation UpdateGeofence($id: ID!, $geofence: UpdateGeofenceInput!) {
    tms {
      updateGeofence(id: $id, value: $geofence) {
        id
      }
    }
  }
`);

export const RemoveGeofenceMutation = graphql(`
  mutation RemoveGeofence($id: ID!) {
    tms {
      removeGeofence(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);
