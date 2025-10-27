import { graphql } from "../generated/gql";

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

// export const RemoveGeofenceMutation = graphql(`
//   mutation RemoveGeofence($id: ID!) {
//     tms {
//       removeGeofence(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);

export const TableGeofenceQuery = graphql(`
  query TableGeofence($page: Int, $perPage: Int, $search: String) {
    tms {
      geofences(page: $page, perPage: $perPage, search: $search) {
        createdAt
        id
        latitude
        longitude
        name
        updatedAt
        events {
          eventType
          id
          timestamp
          vehicle {
            model
            vin
            year
            registrationNumber
            make
            id
          }
        }
      }
    }
  }
`);

export const SearchGeofencesQuery = graphql(`
  query SearchGeofences($search: String!) {
    tms {
      geofences(search: $search, page: 1, perPage: 10) {
        value: id
        label: name
      }
    }
  }
`);
