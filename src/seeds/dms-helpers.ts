import { Faker } from '@faker-js/faker';
import { Insertable } from 'kysely';
import {
  DB,
  DmsDeliveryFailureReasonEnum,
  DmsDeliveryRouteStatusEnum,
  DmsDeliveryTaskStatusEnum,
  DmsProofOfDeliveryTypeEnum,
  DmsTaskEventStatusEnum,
} from '@/db/types';

export const generateDmsDeliveryRoute = (
  faker: Faker,
  driverId: string,
): Insertable<DB['dms.deliveryRoutes']> => ({
  driverId: driverId,
  routeDate: faker.date.future(),
  estimatedDurationMinutes: faker.number.int({ min: 60, max: 480 }),
  totalDistanceKm: faker.number.float({ min: 10, max: 500 }),
  status: faker.helpers.arrayElement(Object.values(DmsDeliveryRouteStatusEnum)),
  startedAt: faker.datatype.boolean() ? faker.date.recent() : null,
  completedAt: faker.datatype.boolean() ? faker.date.recent() : null,
  optimizedRouteData: faker.datatype.boolean()
    ? faker.lorem.paragraphs(2)
    : null,
});

export const generateDmsDeliveryTask = (
  faker: Faker,
  deliveryRouteId: string,
  packageId: string,
): Insertable<DB['dms.deliveryTasks']> => ({
  deliveryRouteId: deliveryRouteId,
  packageId: packageId,
  deliveryAddress: faker.location.streetAddress(true),
  routeSequence: faker.number.int({ min: 1, max: 20 }),
  estimatedArrivalTime: faker.date.future(),
  status: faker.helpers.arrayElement(Object.values(DmsDeliveryTaskStatusEnum)),
  deliveryInstructions: faker.datatype.boolean()
    ? faker.lorem.sentence()
    : null,
  recipientName: faker.person.fullName(),
  recipientPhone: faker.phone.number({ style: 'international' }),
  actualArrivalTime: faker.datatype.boolean() ? faker.date.recent() : null,
  deliveryTime: faker.datatype.boolean() ? faker.date.recent() : null,
  attemptCount: faker.number.int({ min: 1, max: 3 }),
  failureReason: faker.datatype.boolean()
    ? faker.helpers.arrayElement(Object.values(DmsDeliveryFailureReasonEnum))
    : null,
});

export const generateDmsCustomerTrackingLink = (
  faker: Faker,
  deliveryTaskId: string,
): Insertable<DB['dms.customerTrackingLinks']> => ({
  deliveryTaskId: deliveryTaskId,
  trackingToken: faker.string.uuid(),
  expiresAt: faker.date.future(),
  isActive: faker.datatype.boolean(),
  accessCount: faker.number.int({ min: 0, max: 100 }),
  lastAccessedAt: faker.datatype.boolean() ? faker.date.recent() : null,
});

export const generateDmsDriverLocation = (
  faker: Faker,
  driverId: string,
): Insertable<DB['dms.driverLocations']> => ({
  driverId: driverId,
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  timestamp: faker.date.recent(),
  accuracy: faker.number.float({ min: 1, max: 100 }),
  altitude: faker.number.float({ min: 0, max: 1000 }),
  heading: faker.number.int({ min: 0, max: 359 }),
  speedKmh: faker.number.float({ min: 0, max: 120 }),
});

export const generateDmsProofOfDelivery = (
  faker: Faker,
  deliveryTaskId: string,
): Insertable<DB['dms.proofOfDeliveries']> => ({
  deliveryTaskId: deliveryTaskId,
  type: faker.helpers.arrayElement(Object.values(DmsProofOfDeliveryTypeEnum)),
  timestamp: faker.date.recent(),
  filePath: faker.datatype.boolean() ? faker.system.filePath() : null,
  signatureData: faker.datatype.boolean()
    ? faker.string.alphanumeric(256)
    : null,
  recipientName: faker.person.fullName(),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  verificationCode: faker.datatype.boolean() ? faker.string.numeric(6) : null,
});

export const generateDmsTaskEvent = (
  faker: Faker,
  deliveryTaskId: string,
): Insertable<DB['dms.taskEvents']> => ({
  deliveryTaskId: deliveryTaskId,
  status: faker.helpers.arrayElement(Object.values(DmsTaskEventStatusEnum)),
  timestamp: faker.date.recent(),
  latitude: faker.location.latitude(),
  longitude: faker.location.longitude(),
  notes: faker.datatype.boolean() ? faker.lorem.sentence() : null,
  reason: faker.datatype.boolean() ? faker.lorem.sentence() : null,
});
