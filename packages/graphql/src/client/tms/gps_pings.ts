import { graphql } from "../generated/gql";

export const CreateGpsPingMutation = graphql(`
  mutation CreateGpsPing($gpsPing: CreateGpsPingInput!) {
    tms {
      createGpsPing(value: $gpsPing) {
        id
        vehicle {
          id
          registrationNumber
          model
          make
          year
          vin
          status
        }
        latitude
        longitude
        timestamp
      }
    }
  }
`);

export const UpdateGpsPingMutation = graphql(`
  mutation UpdateGpsPing($id: ID!, $gpsPing: UpdateGpsPingInput!) {
    tms {
      updateGpsPing(id: $id, value: $gpsPing) {
        id
        vehicle {
          id
          registrationNumber
          model
          make
          year
          vin
          status
        }
        latitude
        longitude
        timestamp
      }
    }
  }
`);

// export const RemoveGpsPingMutation = graphql(`
//   mutation RemoveGpsPing($id: ID!) {
//     tms {
//       removeGpsPing(id: $id) {
//         success
//         numDeletedRows
//       }
//     }
//   }
// `);

export const TableGpsPingQuery = graphql(`
  query TableGpsPing($page: Int, $perPage: Int) {
    tms {
      gpsPings(page: $page, perPage: $perPage) {
        id
        latitude
        longitude
        timestamp
        vehicle {
          year
          vin
          registrationNumber
          model
          make
          status
          id
        }
      }
    }
  }
`);
