import { Faker } from '@faker-js/faker';
import { Insertable } from 'kysely';
import {
  DB,
  TmsCarrierRateUnitEnum,
  TmsCurrencyEnum,
  TmsDriverScheduleReasonEnum,
  TmsDriverStatusEnum,
  TmsExpenseStatusEnum,
  TmsExpenseTypeEnum,
  TmsGeofenceEventTypeEnum,
  TmsPartnerInvoiceStatusEnum,
  TmsProofTypeEnum,
  TmsShipmentLegStatusEnum,
  TmsTripStatusEnum,
  TmsTripStopStatusEnum,
  TmsVehicleServiceTypeEnum,
  TmsVehicleStatusEnum,
} from '@/db/types';

export const generateTmsCarrier = (
  faker: Faker,
): Insertable<DB['tms.carriers']> => ({
  name: faker.company.name(),
  contactDetails: faker.phone.number({ style: 'international' }),
  servicesOffered: faker.lorem.words(5),
});

export const generateTmsCarrierRate = (
  faker: Faker,
  carrierId: string,
): Insertable<DB['tms.carrierRates']> => ({
  carrierId: carrierId,
  destination: faker.location.city(),
  origin: faker.location.city(),
  rate: faker.number.float({ min: 10, max: 1000 }),
  serviceType: faker.lorem.word(),
  unit: faker.helpers.arrayElement(Object.values(TmsCarrierRateUnitEnum)),
});

export const generateTmsDriver = (
  faker: Faker,
  userId: string,
): Insertable<DB['tms.drivers']> => ({
  userId: userId,
  licenseNumber: faker.string.alphanumeric(10).toUpperCase(),
  licenseExpiryDate: faker.date.future(),
  status: faker.helpers.arrayElement(Object.values(TmsDriverStatusEnum)),
});

export const generateTmsDriverSchedule = (
  faker: Faker,
  driverId: string,
): Insertable<DB['tms.driverSchedules']> => ({
  driverId: driverId,
  startDate: faker.date.past(),
  endDate: faker.date.future(),
  reason: faker.helpers.arrayElement(
    Object.values(TmsDriverScheduleReasonEnum),
  ),
});

export const generateTmsExpense = (
  faker: Faker,
  driverId?: string,
  tripId?: string,
): Insertable<DB['tms.expenses']> => ({
  amount: faker.number.float({ min: 10, max: 500 }),
  currency: faker.helpers.arrayElement(Object.values(TmsCurrencyEnum)),
  driverId: driverId,
  fuelQuantity: faker.number.float({ min: 10, max: 100 }),
  odometerReading: faker.number.int({ min: 1000, max: 100000 }),
  receiptUrl: faker.internet.url(),
  status: faker.helpers.arrayElement(Object.values(TmsExpenseStatusEnum)),
  tripId: tripId,
  type: faker.helpers.arrayElement(Object.values(TmsExpenseTypeEnum)),
});

export const generateTmsGeofence = (
  faker: Faker,
): Insertable<DB['tms.geofences']> => ({
  name: faker.lorem.word(),
  coordinates: faker.location.latitude() + ',' + faker.location.longitude(),
});

export const generateTmsGeofenceEvent = (
  faker: Faker,
  geofenceId: string,
  vehicleId: string,
): Insertable<DB['tms.geofenceEvents']> => ({
  geofenceId: geofenceId,
  vehicleId: vehicleId,
  eventType: faker.helpers.arrayElement(
    Object.values(TmsGeofenceEventTypeEnum),
  ),
  timestamp: faker.date.recent(),
});

export const generateTmsGpsPing = (
  faker: Faker,
  vehicleId: string,
): Insertable<DB['tms.gpsPings']> => ({
  vehicleId: vehicleId,
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  timestamp: faker.date.recent(),
});

export const generateTmsPartnerInvoice = (
  faker: Faker,
  carrierId: string,
): Insertable<DB['tms.partnerInvoices']> => ({
  carrierId: carrierId,
  invoiceDate: faker.date.past(),
  invoiceNumber: faker.string.alphanumeric(10).toUpperCase(),
  status: faker.helpers.arrayElement(
    Object.values(TmsPartnerInvoiceStatusEnum),
  ),
  totalAmount: faker.number.float({ min: 100, max: 10000 }),
});

export const generateTmsPartnerInvoiceItem = (
  faker: Faker,
  partnerInvoiceId: string,
  shipmentLegId: string,
): Insertable<DB['tms.partnerInvoiceItems']> => ({
  partnerInvoiceId: partnerInvoiceId,
  shipmentLegId: shipmentLegId,
  amount: faker.number.float({ min: 10, max: 1000 }),
});

export const generateTmsProofOfDelivery = (
  faker: Faker,
  tripStopId: string,
): Insertable<DB['tms.proofOfDeliveries']> => ({
  tripStopId: tripStopId,
  filePath: faker.system.filePath(),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  timestamp: faker.date.recent(),
  type: faker.helpers.arrayElement(Object.values(TmsProofTypeEnum)),
});

export const generateTmsRoute = (
  faker: Faker,
  tripId: string,
): Insertable<DB['tms.routes']> => ({
  tripId: tripId,
  optimizedRouteData: faker.lorem.paragraphs(2),
  totalDistance: faker.number.float({ min: 10, max: 1000 }),
  totalDuration: faker.number.int({ min: 10, max: 600 }),
});

export const generateTmsShipmentLeg = (
  faker: Faker,
  shipmentId?: string,
  carrierId?: string,
  internalTripId?: string,
): Insertable<DB['tms.shipmentLegs']> => ({
  startLocation: faker.location.city(),
  endLocation: faker.location.city(),
  legSequence: faker.number.int({ min: 1, max: 10 }),
  shipmentId: shipmentId,
  carrierId: carrierId,
  internalTripId: internalTripId,
  status: faker.helpers.arrayElement(Object.values(TmsShipmentLegStatusEnum)),
});

export const generateTmsShipmentLegEvent = (
  faker: Faker,
  shipmentLegId: string,
): Insertable<DB['tms.shipmentLegEvents']> => ({
  shipmentLegId: shipmentLegId,
  eventTimestamp: faker.date.recent(),
  location: faker.location.city(),
  statusMessage: faker.lorem.sentence(),
});

export const generateTmsTrip = (
  faker: Faker,
  driverId?: string,
  vehicleId?: string,
): Insertable<DB['tms.trips']> => ({
  driverId: driverId,
  vehicleId: vehicleId,
  status: faker.helpers.arrayElement(Object.values(TmsTripStatusEnum)),
});

export const generateTmsTripStop = (
  faker: Faker,
  tripId: string,
  shipmentId?: string,
): Insertable<DB['tms.tripStops']> => ({
  tripId: tripId,
  address: faker.location.streetAddress(true),
  sequence: faker.number.int({ min: 1, max: 20 }),
  estimatedArrivalTime: faker.date.soon(),
  estimatedDepartureTime: faker.date.soon(),
  shipmentId: shipmentId,
  status: faker.helpers.arrayElement(Object.values(TmsTripStopStatusEnum)),
});

export const generateTmsVehicle = (
  faker: Faker,
): Insertable<DB['tms.vehicles']> => ({
  registrationNumber: faker.vehicle.vrm(),
  model: faker.vehicle.model(),
  capacityVolume: faker.number.float({ min: 10, max: 100 }),
  capacityWeight: faker.number.float({ min: 1000, max: 10000 }),
  status: faker.helpers.arrayElement(Object.values(TmsVehicleStatusEnum)),
});

export const generateTmsVehicleMaintenance = (
  faker: Faker,
  vehicleId: string,
): Insertable<DB['tms.vehicleMaintenance']> => ({
  vehicleId: vehicleId,
  serviceDate: faker.date.past(),
  cost: faker.number.float({ min: 50, max: 2000 }),
  serviceType: faker.helpers.arrayElement(
    Object.values(TmsVehicleServiceTypeEnum),
  ),
  notes: faker.lorem.sentence(),
});
