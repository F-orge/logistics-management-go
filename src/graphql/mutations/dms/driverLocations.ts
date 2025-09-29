import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DRIVER LOCATION MUTATIONS
// ============================================================================

/**
 * Creates a new driver location record.
 * @param payload The input data for creating the driver location.
 */
export const createDriverLocation = graphql(`
  mutation CreateDriverLocation($payload: CreateDriverLocationInput!) {
    dms {
      createDriverLocation(payload: $payload) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the driver ID of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param driverId The new driver ID.
 */
export const updateDriverLocationDriverId = graphql(`
  mutation UpdateDriverLocationDriverId($id: UUID!, $driverId: UUID!) {
    dms {
      updateDriverLocationDriverId(id: $id, driverId: $driverId) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the latitude of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param latitude The new latitude.
 */
export const updateDriverLocationLatitude = graphql(`
  mutation UpdateDriverLocationLatitude($id: UUID!, $latitude: Float!) {
    dms {
      updateDriverLocationLatitude(id: $id, latitude: $latitude) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the longitude of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param longitude The new longitude.
 */
export const updateDriverLocationLongitude = graphql(`
  mutation UpdateDriverLocationLongitude($id: UUID!, $longitude: Float!) {
    dms {
      updateDriverLocationLongitude(id: $id, longitude: $longitude) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the altitude of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param altitude The new altitude.
 */
export const updateDriverLocationAltitude = graphql(`
  mutation UpdateDriverLocationAltitude($id: UUID!, $altitude: Float) {
    dms {
      updateDriverLocationAltitude(id: $id, altitude: $altitude) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the accuracy of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param accuracy The new accuracy.
 */
export const updateDriverLocationAccuracy = graphql(`
  mutation UpdateDriverLocationAccuracy($id: UUID!, $accuracy: Float) {
    dms {
      updateDriverLocationAccuracy(id: $id, accuracy: $accuracy) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the speed in km/h of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param speedKmh The new speed in km/h.
 */
export const updateDriverLocationSpeedKmh = graphql(`
  mutation UpdateDriverLocationSpeedKmh($id: UUID!, $speedKmh: Float) {
    dms {
      updateDriverLocationSpeedKmh(id: $id, speedKmh: $speedKmh) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the heading of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param heading The new heading.
 */
export const updateDriverLocationHeading = graphql(`
  mutation UpdateDriverLocationHeading($id: UUID!, $heading: Float) {
    dms {
      updateDriverLocationHeading(id: $id, heading: $heading) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the timestamp of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param timestamp The new timestamp.
 */
export const updateDriverLocationTimestamp = graphql(`
  mutation UpdateDriverLocationTimestamp($id: UUID!, $timestamp: DateTime) {
    dms {
      updateDriverLocationTimestamp(id: $id, timestamp: $timestamp) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Updates the position (latitude, longitude, and altitude) of a driver location record.
 * @param id The UUID of the driver location record to update.
 * @param latitude The new latitude.
 * @param longitude The new longitude.
 * @param altitude The new altitude.
 */
export const updateDriverLocationPosition = graphql(`
  mutation UpdateDriverLocationPosition($id: UUID!, $latitude: Float!, $longitude: Float!, $altitude: Float) {
    dms {
      updateDriverLocationPosition(id: $id, latitude: $latitude, longitude: $longitude, altitude: $altitude) {
        id
        latitude
        longitude
        altitude
        accuracy
        speedKmh
        heading
        timestamp
        createdAt
        updatedAt
        driver {
          id
          licenseNumber
        }
      }
    }
  }
`);

/**
 * Removes a driver location record by its ID.
 * @param id The UUID of the driver location record to remove.
 */
export const removeDriverLocation = graphql(`
  mutation RemoveDriverLocation($id: UUID!) {
    dms {
      removeDriverLocation(id: $id)
    }
  }
`);
