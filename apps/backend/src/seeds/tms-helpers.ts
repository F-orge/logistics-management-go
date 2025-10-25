import { Faker } from "@faker-js/faker";
import type { Insertable } from "kysely";
import {
  TmsCarrier,
  TmsCarrierRate,
  TmsDriver,
  TmsDriverSchedule,
  TmsVehicle,
  TmsVehicleMaintenance,
  TmsTrip,
  TmsTripStop,
  TmsRoute,
  TmsShipmentLeg,
  TmsShipmentLegEvent,
  TmsExpense,
  TmsGpsPing,
  TmsGeofence,
  TmsGeofenceEvent,
  TmsPartnerInvoice,
  TmsPartnerInvoiceItem,
  TmsProofOfDelivery,
  TmsCarrierRateUnitEnum,
  TmsCurrencyEnum,
  TmsDriverStatusEnum,
  TmsDriverScheduleReasonEnum,
  TmsVehicleStatusEnum,
  TmsVehicleServiceTypeEnum,
  TmsTripStatusEnum,
  TmsTripStopStatusEnum,
  TmsShipmentLegStatusEnum,
  TmsExpenseStatusEnum,
  TmsExpenseTypeEnum,
  TmsGeofenceEventTypeEnum,
  TmsPartnerInvoiceStatusEnum,
  TmsProofTypeEnum,
} from "@packages/db/db.types";

// Utility function to randomly select from enum values
const randomEnumValue = <T extends Record<string, string>>(
  enumObj: T
): T[keyof T] => {
  const values = Object.values(enumObj);
  return values[Math.floor(Math.random() * values.length)] as T[keyof T];
};

// TMS Carrier - Base entity, no foreign keys required
export const seedTmsCarrier = (faker: Faker): Insertable<TmsCarrier> => ({
  name: faker.company.name() + " Transport",
  contactPerson: faker.person.fullName(),
  contactEmail: faker.internet.email(),
  contactPhone: faker.phone.number({ style: "international" }),
  servicesOffered: faker.helpers.maybe(() => faker.lorem.paragraph(), {
    probability: 0.8,
  }),
});

// TMS Carrier Rate - Requires carrierId
export const seedTmsCarrierRate = (
  faker: Faker,
  options: { carrierId: string }
): Insertable<TmsCarrierRate> => ({
  carrierId: options.carrierId,
  serviceType: faker.commerce.department(),
  unit: randomEnumValue(TmsCarrierRateUnitEnum),
  destination: faker.location.city(),
  origin: faker.location.city(),
  rate: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
});

// TMS Driver - Requires userId
export const seedTmsDriver = (
  faker: Faker,
  options: { userId: string }
): Insertable<TmsDriver> => ({
  userId: options.userId,
  licenseNumber: faker.string.alphanumeric(10).toUpperCase(),
  licenseExpiryDate: faker.helpers.maybe(
    () => faker.date.future({ years: 5 }),
    { probability: 0.9 }
  ),
  contactPhone: faker.helpers.maybe(
    () => faker.phone.number({ style: "international" }),
    {
      probability: 0.8,
    }
  ),
  status: randomEnumValue(TmsDriverStatusEnum),
});

// TMS Driver Schedule - Requires driverId
export const seedTmsDriverSchedule = (
  faker: Faker,
  options: { driverId: string }
): Insertable<TmsDriverSchedule> => ({
  driverId: options.driverId,
  startDate: faker.date.recent({ days: 30 }),
  endDate: faker.date.recent({ days: 60 }),
  reason: randomEnumValue(TmsDriverScheduleReasonEnum),
});

// TMS Vehicle - No foreign keys required
export const seedTmsVehicle = (faker: Faker): Insertable<TmsVehicle> => ({
  registrationNumber: faker.vehicle.vrm(),
  make: faker.vehicle.manufacturer(),
  model: faker.vehicle.model(),
  year: faker.helpers.maybe(
    () => faker.date.past({ years: 15 }).getFullYear(),
    { probability: 0.9 }
  ),
  vin: faker.helpers.maybe(() => faker.vehicle.vin(), { probability: 0.8 }),
  capacityWeight: faker.helpers.maybe(
    () => faker.number.float({ min: 500, max: 40000, fractionDigits: 0 }),
    { probability: 0.9 }
  ),
  capacityVolume: faker.helpers.maybe(
    () => faker.number.float({ min: 10, max: 200, fractionDigits: 2 }),
    { probability: 0.8 }
  ),
  currentMileage: faker.helpers.maybe(
    () => faker.number.int({ min: 0, max: 500000 }),
    { probability: 0.9 }
  ),
  lastMaintenanceDate: faker.helpers.maybe(
    () => faker.date.recent({ days: 90 }),
    { probability: 0.7 }
  ),
  status: randomEnumValue(TmsVehicleStatusEnum),
});

// TMS Vehicle Maintenance - Requires vehicleId
export const seedTmsVehicleMaintenance = (
  faker: Faker,
  options: { vehicleId: string; performedById?: string }
): Insertable<TmsVehicleMaintenance> => ({
  vehicleId: options.vehicleId,
  serviceType: randomEnumValue(TmsVehicleServiceTypeEnum),
  cost: faker.helpers.maybe(
    () => faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
    { probability: 0.8 }
  ),
  serviceDate: faker.date.recent({ days: 180 }),
  notes: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.5,
  }),
});

// TMS Trip - Optional driverId and vehicleId
export const seedTmsTrip = (
  faker: Faker,
  options: { driverId?: string; vehicleId?: string } = {}
): Insertable<TmsTrip> => ({
  driverId: options.driverId,
  vehicleId: options.vehicleId,
  startLocation: faker.helpers.maybe(() => faker.location.city(), {
    probability: 0.9,
  }),
  endLocation: faker.helpers.maybe(() => faker.location.city(), {
    probability: 0.9,
  }),
  startTime: faker.helpers.maybe(() => faker.date.recent({ days: 7 }), {
    probability: 0.8,
  }),
  endTime: faker.helpers.maybe(() => faker.date.recent({ days: 3 }), {
    probability: 0.5,
  }),
  status: randomEnumValue(TmsTripStatusEnum),
});

// TMS Trip Stop - Requires tripId
export const seedTmsTripStop = (
  faker: Faker,
  options: { tripId: string; shipmentId: string }
): Insertable<TmsTripStop> => {
  const estimatedArrivalTime = faker.date.recent({ days: 7 });
  const estimatedDepartureTime = faker.date.soon({
    days: 5,
    refDate: estimatedArrivalTime,
  });

  const actualDepartureTime = faker.helpers.maybe(
    () => faker.date.recent({ days: 2, refDate: estimatedDepartureTime }),
    { probability: 0.4 }
  );

  const actualArrivalTime = faker.helpers.maybe(
    () => faker.date.recent({ days: 5, refDate: estimatedArrivalTime }),
    { probability: 0.6 }
  );

  return {
    tripId: options.tripId,
    status: randomEnumValue(TmsTripStopStatusEnum),
    actualArrivalTime,
    actualDepartureTime,
    address: faker.location.streetAddress(),
    estimatedArrivalTime,
    estimatedDepartureTime,
    sequence: faker.number.int({ min: 1, max: 20 }),
    shipmentId: options.shipmentId,
  };
};

// TMS Route - Optional tripId
export const seedTmsRoute = (
  faker: Faker,
  options: { tripId?: string } = {}
): Insertable<TmsRoute> => {
  return {
    tripId: options.tripId,
    totalDistance: faker.helpers.maybe(
      () => faker.number.float({ min: 10, max: 2000, fractionDigits: 2 }),
      { probability: 0.9 }
    ),
    optimizedRouteData: faker.helpers.maybe(() => faker.lorem.paragraph(), {
      probability: 0.7,
    }),
    totalDuration: faker.helpers.maybe(
      () => faker.number.int({ min: 30, max: 1440 }),
      { probability: 0.8 }
    ),
  };
};

// TMS Shipment Leg - Requires tripId
export const seedTmsShipmentLeg = (
  faker: Faker,
  options: { tripId?: string; carrierId?: string; shipmentId: string }
): Insertable<TmsShipmentLeg> => ({
  carrierId: options.carrierId,
  legSequence: faker.number.int({ min: 1, max: 5 }),
  status: randomEnumValue(TmsShipmentLegStatusEnum),
  endLocation: faker.location.city(),
  startLocation: faker.location.city(),
  internalTripId: options.tripId,
  shipmentId: options.shipmentId,
});

// TMS Shipment Leg Event - Requires shipmentLegId
export const seedTmsShipmentLegEvent = (
  faker: Faker,
  options: { shipmentLegId: string }
): Insertable<TmsShipmentLegEvent> => ({
  shipmentLegId: options.shipmentLegId,
  location: faker.helpers.maybe(() => faker.location.city(), {
    probability: 0.8,
  }),
  eventTimestamp: faker.date.recent({ days: 30 }),
  statusMessage: faker.lorem.sentence(),
});

// TMS Expense - Requires tripId and driverId
export const seedTmsExpense = (
  faker: Faker,
  options: { tripId: string; driverId: string }
): Insertable<TmsExpense> => ({
  tripId: options.tripId,
  driverId: options.driverId,
  amount: faker.number.float({ min: 5, max: 500, fractionDigits: 2 }),
  currency: randomEnumValue(TmsCurrencyEnum),
  description: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.8,
  }),
  receiptUrl: faker.helpers.maybe(() => faker.internet.url(), {
    probability: 0.6,
  }),
  expenseDate: faker.date.recent({ days: 30 }),
  status: randomEnumValue(TmsExpenseStatusEnum),
  fuelQuantity: faker.helpers.maybe(
    () => faker.number.float({ min: 1, max: 100, fractionDigits: 2 }),
    { probability: 0.5 }
  ),
  odometerReading: faker.helpers.maybe(
    () => faker.number.int({ min: 0, max: 500000 }),
    { probability: 0.5 }
  ),
  type: randomEnumValue(TmsExpenseTypeEnum),
});

// TMS GPS Ping - Requires vehicleId
export const seedTmsGpsPing = (
  faker: Faker,
  options: { vehicleId: string }
): Insertable<TmsGpsPing> => ({
  vehicleId: options.vehicleId,
  timestamp: faker.date.recent({ days: 1 }),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
});

// TMS Geofence - No foreign keys required
export const seedTmsGeofence = (faker: Faker): Insertable<TmsGeofence> => ({
  name: `Geofence ${faker.string.alphanumeric(6).toUpperCase()}`,
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
});

// TMS Geofence Event - Requires geofenceId and vehicleId
export const seedTmsGeofenceEvent = (
  faker: Faker,
  options: { geofenceId: string; vehicleId: string }
): Insertable<TmsGeofenceEvent> => ({
  geofenceId: options.geofenceId,
  vehicleId: options.vehicleId,
  eventType: randomEnumValue(TmsGeofenceEventTypeEnum),
  timestamp: faker.date.recent({ days: 7 }),
});

// TMS Partner Invoice - Requires carrierId
export const seedTmsPartnerInvoice = (
  faker: Faker,
  options: { carrierId: string }
): Insertable<TmsPartnerInvoice> => ({
  carrierId: options.carrierId,
  invoiceNumber: faker.string.alphanumeric(10).toUpperCase(),
  invoiceDate: faker.date.recent({ days: 30 }),
  totalAmount: faker.number.float({ min: 100, max: 10000, fractionDigits: 2 }),
  status: randomEnumValue(TmsPartnerInvoiceStatusEnum),
});

// TMS Partner Invoice Item - Requires partnerInvoiceId
export const seedTmsPartnerInvoiceItem = (
  faker: Faker,
  options: { partnerInvoiceId: string; shipmentLegId: string }
): Insertable<TmsPartnerInvoiceItem> => ({
  partnerInvoiceId: options.partnerInvoiceId,
  shipmentLegId: options.shipmentLegId,
  amount: faker.number.float({ min: 50, max: 5000, fractionDigits: 2 }),
});

// TMS Proof Of Delivery - Requires shipmentLegId
export const seedTmsProofOfDelivery = (
  faker: Faker,
  options: { tripStopId?: string }
): Insertable<TmsProofOfDelivery> => ({
  filePath: faker.system.filePath(),
  timestamp: faker.date.recent({ days: 30 }),
  tripStopId: options.tripStopId,
  type: randomEnumValue(TmsProofTypeEnum),
  latitude: faker.helpers.maybe(() => faker.location.latitude(), {
    probability: 0.8,
  }),
  longitude: faker.helpers.maybe(() => faker.location.longitude(), {
    probability: 0.8,
  }),
});
