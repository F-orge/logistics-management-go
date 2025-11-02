import { graphql } from "../generated/gql";

export const CreateGeofenceEventMutation = graphql(`
  mutation CreateGeofenceEvent($geofenceEvent: CreateGeofenceEventInput!) {
    tms {
      createGeofenceEvent(value: $geofenceEvent) {
        id
        vehicle {
          id
          registrationNumber
          model
          make
          status
        }
        geofence {
          id
          name
          latitude
          longitude
        }
        eventType
        timestamp
      }
    }
  }
`);

export const UpdateGeofenceEventMutation = graphql(`
  mutation UpdateGeofenceEvent(
    $id: ID!
    $geofenceEvent: UpdateGeofenceEventInput!
  ) {
    tms {
      updateGeofenceEvent(id: $id, value: $geofenceEvent) {
        id
        vehicle {
          id
          registrationNumber
          model
          make
          status
        }
        geofence {
          id
          name
          latitude
          longitude
        }
        eventType
        timestamp
      }
    }
  }
`);

// export const RemoveGeofenceEventMutation = graphql(`
//   mutation RemoveGeofenceEvent($id: ID!) {
//     tms {
//       removeGeofenceEvent(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);
