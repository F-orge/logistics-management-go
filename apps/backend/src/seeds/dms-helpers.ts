import { Faker } from "@faker-js/faker";
import type { Insertable } from "kysely";
import {
  DmsCustomerTrackingLink,
  DmsDeliveryRoute,
  DmsDeliveryTask,
  DmsDriverLocation,
  DmsProofOfDelivery,
  DmsTaskEvent,
  DmsDeliveryFailureReasonEnum,
  DmsDeliveryRouteStatusEnum,
  DmsDeliveryTaskStatusEnum,
  DmsProofOfDeliveryTypeEnum,
  DmsTaskEventStatusEnum,
} from "@packages/db/db.types";

// Utility function to randomly select from enum values
const randomEnumValue = <T extends Record<string, string>>(
  enumObj: T
): T[keyof T] => {
  const values = Object.values(enumObj);
  return values[Math.floor(Math.random() * values.length)] as T[keyof T];
};

// DMS Customer Tracking Link - Requires deliveryTaskId
export const seedDmsCustomerTrackingLink = (
  faker: Faker,
  options: { deliveryTaskId: string }
): Insertable<DmsCustomerTrackingLink> => ({
  deliveryTaskId: options.deliveryTaskId,
  trackingToken: faker.string.uuid(),
  expiresAt: faker.date.future({ years: 1 }),
  isActive: faker.datatype.boolean({ probability: 0.8 }),
  accessCount: faker.number.int({ min: 0, max: 50 }),
  lastAccessedAt: faker.helpers.maybe(() => faker.date.recent({ days: 7 }), {
    probability: 0.6,
  }),
});

// DMS Delivery Route - Requires driverId
export const seedDmsDeliveryRoute = (
  faker: Faker,
  options: { driverId: string }
): Insertable<DmsDeliveryRoute> => ({
  driverId: options.driverId,
  routeDate: faker.date.recent({ days: 30 }),
  status: randomEnumValue(DmsDeliveryRouteStatusEnum),
  estimatedDurationMinutes: faker.number.int({ min: 30, max: 480 }),
  totalDistanceKm: faker.number.float({ min: 5, max: 200, fractionDigits: 2 }),
  optimizedRouteData: faker.helpers.maybe(() => faker.lorem.paragraph(), {
    probability: 0.7,
  }),
  startedAt: faker.helpers.maybe(() => faker.date.recent({ days: 5 }), {
    probability: 0.6,
  }),
  completedAt: faker.helpers.maybe(() => faker.date.recent({ days: 3 }), {
    probability: 0.4,
  }),
});

// DMS Delivery Task - Requires deliveryRouteId and packageId
export const seedDmsDeliveryTask = (
  faker: Faker,
  options: { deliveryRouteId: string; packageId: string }
): Insertable<DmsDeliveryTask> => ({
  deliveryRouteId: options.deliveryRouteId,
  packageId: options.packageId,
  routeSequence: faker.number.int({ min: 1, max: 20 }),
  deliveryAddress: faker.location.streetAddress({ useFullAddress: true }),
  recipientName: faker.person.fullName(),
  recipientPhone: faker.phone.number({ style: "international" }),
  deliveryInstructions: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.7,
  }),
  status: randomEnumValue(DmsDeliveryTaskStatusEnum),
  estimatedArrivalTime: faker.date.recent({ days: 7 }),
  actualArrivalTime: faker.helpers.maybe(() => faker.date.recent({ days: 2 }), {
    probability: 0.5,
  }),
  deliveryTime: faker.helpers.maybe(() => faker.date.recent({ days: 2 }), {
    probability: 0.4,
  }),
  attemptCount: faker.number.int({ min: 1, max: 3 }),
  failureReason: faker.helpers.maybe(
    () => randomEnumValue(DmsDeliveryFailureReasonEnum),
    { probability: 0.2 }
  ),
});

// DMS Driver Location - Requires driverId
export const seedDmsDriverLocation = (
  faker: Faker,
  options: { driverId: string }
): Insertable<DmsDriverLocation> => ({
  driverId: options.driverId,
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  altitude: faker.helpers.maybe(
    () => faker.number.float({ min: 0, max: 1000, fractionDigits: 1 }),
    { probability: 0.8 }
  ),
  accuracy: faker.number.float({ min: 1, max: 50, fractionDigits: 1 }),
  speedKmh: faker.helpers.maybe(
    () => faker.number.float({ min: 0, max: 120, fractionDigits: 1 }),
    { probability: 0.9 }
  ),
  heading: faker.helpers.maybe(() => faker.number.int({ min: 0, max: 359 }), {
    probability: 0.8,
  }),
  timestamp: faker.date.recent({ days: 1 }),
});

// DMS Proof Of Delivery - Requires deliveryTaskId
export const seedDmsProofOfDelivery = (
  faker: Faker,
  options: { deliveryTaskId: string }
): Insertable<DmsProofOfDelivery> => ({
  deliveryTaskId: options.deliveryTaskId,
  type: randomEnumValue(DmsProofOfDeliveryTypeEnum),
  timestamp: faker.date.recent({ days: 7 }),
  recipientName: faker.helpers.maybe(() => faker.person.fullName(), {
    probability: 0.8,
  }),
  signatureData: faker.helpers.maybe(() => faker.string.alphanumeric(100), {
    probability: 0.3,
  }),
  filePath: faker.helpers.maybe(() => faker.system.filePath(), {
    probability: 0.5,
  }),
  latitude: faker.helpers.maybe(() => faker.location.latitude(), {
    probability: 0.9,
  }),
  longitude: faker.helpers.maybe(() => faker.location.longitude(), {
    probability: 0.9,
  }),
  verificationCode: faker.helpers.maybe(() => faker.string.numeric(6), {
    probability: 0.2,
  }),
});

// DMS Task Event - Requires deliveryTaskId
export const seedDmsTaskEvent = (
  faker: Faker,
  options: { deliveryTaskId: string }
): Insertable<DmsTaskEvent> => ({
  deliveryTaskId: options.deliveryTaskId,
  status: randomEnumValue(DmsTaskEventStatusEnum),
  timestamp: faker.date.recent({ days: 7 }),
  latitude: faker.helpers.maybe(() => faker.location.latitude(), {
    probability: 0.8,
  }),
  longitude: faker.helpers.maybe(() => faker.location.longitude(), {
    probability: 0.8,
  }),
  reason: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.4,
  }),
  notes: faker.helpers.maybe(() => faker.lorem.paragraph(), {
    probability: 0.6,
  }),
});
