import { graphql } from "@/lib/graphql/client";

// ============================================================================
// DRIVER MUTATIONS
// ============================================================================

/**
 * Creates a new driver.
 * @param payload The input data for creating the driver.
 */
export const createDriver = graphql(`
  mutation CreateDriver($payload: CreateDriverInput!) {
    tms {
      createDriver(payload: $payload) {
        id
        licenseNumber
        licenseExpiryDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the license number of a driver.
 * @param id The UUID of the driver to update.
 * @param licenseNumber The new license number.
 */
export const updateDriverLicenseNumber = graphql(`
  mutation UpdateDriverLicenseNumber($id: UUID!, $licenseNumber: String!) {
    tms {
      updateDriverLicenseNumber(id: $id, licenseNumber: $licenseNumber) {
        id
        licenseNumber
        licenseExpiryDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the license expiry date of a driver.
 * @param id The UUID of the driver to update.
 * @param licenseExpiryDate The new license expiry date.
 */
export const updateDriverLicenseExpiryDate = graphql(`
  mutation UpdateDriverLicenseExpiryDate($id: UUID!, $licenseExpiryDate: NaiveDate!) {
    tms {
      updateDriverLicenseExpiryDate(id: $id, licenseExpiryDate: $licenseExpiryDate) {
        id
        licenseNumber
        licenseExpiryDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates the status of a driver.
 * @param id The UUID of the driver to update.
 * @param status The new status.
 */
export const updateDriverStatus = graphql(`
  mutation UpdateDriverStatus($id: UUID!, $status: DriverStatusEnum!) {
    tms {
      updateDriverStatus(id: $id, status: $status) {
        id
        licenseNumber
        licenseExpiryDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a driver by its ID.
 * @param id The UUID of the driver to remove.
 */
export const removeDriver = graphql(`
  mutation RemoveDriver($id: UUID!) {
    tms {
      removeDriver(id: $id)
    }
  }
`);

/**
 * Adds a new driver schedule to a driver.
 * @param driverId The UUID of the driver to add the schedule to.
 * @param payload The input data for creating the driver schedule.
 */
export const addDriverSchedule = graphql(`
  mutation AddDriverSchedule($driverId: UUID!, $payload: CreateDriverScheduleInput!) {
    tms {
      addDriverSchedule(driverId: $driverId, payload: $payload) {
        id
        licenseNumber
        licenseExpiryDate
        status
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Updates an existing driver schedule.
 * @param id The UUID of the driver schedule to update.
 * @param payload The input data for updating the driver schedule.
 */
export const updateDriverSchedule = graphql(`
  mutation UpdateDriverSchedule($id: UUID!, $payload: CreateDriverScheduleInput!) {
    tms {
      updateDriverSchedule(id: $id, payload: $payload) {
        id
        startDate
        endDate
        reason
        createdAt
        updatedAt
      }
    }
  }
`);

/**
 * Removes a driver schedule by its ID.
 * @param id The UUID of the driver schedule to remove.
 */
export const removeDriverSchedule = graphql(`
  mutation RemoveDriverSchedule($id: UUID!) {
    tms {
      removeDriverSchedule(id: $id)
    }
  }
`);
