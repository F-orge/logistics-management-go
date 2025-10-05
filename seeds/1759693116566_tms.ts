import type { Kysely } from 'kysely';
import { DB } from '@/db/types';
import { Faker, faker } from '@faker-js/faker';
import {
  generateTmsCarrier,
  generateTmsCarrierRate,
  generateTmsDriver,
  generateTmsDriverSchedule,
  generateTmsExpense,
  generateTmsGeofence,
  generateTmsGeofenceEvent,
  generateTmsGpsPing,
  generateTmsPartnerInvoice,
  generateTmsPartnerInvoiceItem,
  generateTmsProofOfDelivery,
  generateTmsRoute,
  generateTmsShipmentLeg,
  generateTmsShipmentLegEvent,
  generateTmsTrip,
  generateTmsTripStop,
  generateTmsVehicle,
  generateTmsVehicleMaintenance,
} from '@/seeds/tms-helpers';
import { TmsCarrierRepository } from '@/repositories/tms/carriers';
import { TmsCarrierRateRepository } from '@/repositories/tms/carrierRates';
import { TmsDriverRepository } from '@/repositories/tms/drivers';
import { TmsDriverScheduleRepository } from '@/repositories/tms/driverSchedules';
import { TmsExpenseRepository } from '@/repositories/tms/expenses';
import { TmsGeofenceRepository } from '@/repositories/tms/geofences';
import { TmsGeofenceEventRepository } from '@/repositories/tms/geofenceEvents';
import { TmsGpsPingRepository } from '@/repositories/tms/gpsPings';
import { TmsPartnerInvoiceRepository } from '@/repositories/tms/partnerInvoices';
import { TmsPartnerInvoiceItemRepository } from '@/repositories/tms/partnerInvoiceItems';
import { TmsProofOfDeliveryRepository } from '@/repositories/tms/proofOfDeliveries';
import { TmsRouteRepository } from '@/repositories/tms/routes';
import { TmsShipmentLegRepository } from '@/repositories/tms/shipmentLegs';
import { TmsShipmentLegEventRepository } from '@/repositories/tms/shipmentLegEvents';
import { TmsTripRepository } from '@/repositories/tms/trips';
import { TmsTripStopRepository } from '@/repositories/tms/tripStops';
import { TmsVehicleRepository } from '@/repositories/tms/vehicles';
import { TmsVehicleMaintenanceRepository } from '@/repositories/tms/vehicleMaintenance';

export async function seed(db: Kysely<DB>): Promise<void> {
  const users = await db.selectFrom('user').select(['id']).execute();
  const userIds = users.map((user) => user.id);

  if (userIds.length === 0) {
    console.warn('No users found. Skipping TMS seed data generation.');
    return;
  }

  const tmsCarrierRepository = new TmsCarrierRepository(db);
  const tmsCarrierRateRepository = new TmsCarrierRateRepository(db);
  const tmsDriverRepository = new TmsDriverRepository(db);
  const tmsDriverScheduleRepository = new TmsDriverScheduleRepository(db);
  const tmsExpenseRepository = new TmsExpenseRepository(db);
  const tmsGeofenceRepository = new TmsGeofenceRepository(db);
  const tmsGeofenceEventRepository = new TmsGeofenceEventRepository(db);
  const tmsGpsPingRepository = new TmsGpsPingRepository(db);
  const tmsPartnerInvoiceRepository = new TmsPartnerInvoiceRepository(db);
  const tmsPartnerInvoiceItemRepository = new TmsPartnerInvoiceItemRepository(
    db,
  );
  const tmsProofOfDeliveryRepository = new TmsProofOfDeliveryRepository(db);
  const tmsRouteRepository = new TmsRouteRepository(db);
  const tmsShipmentLegRepository = new TmsShipmentLegRepository(db);
  const tmsShipmentLegEventRepository = new TmsShipmentLegEventRepository(db);
  const tmsTripRepository = new TmsTripRepository(db);
  const tmsTripStopRepository = new TmsTripStopRepository(db);
  const tmsVehicleRepository = new TmsVehicleRepository(db);
  const tmsVehicleMaintenanceRepository = new TmsVehicleMaintenanceRepository(
    db,
  );

  const numRecords = 10;

  // Seed tms.carriers
  const carriers = await tmsCarrierRepository
    .batchCreate(
      Array.from({ length: numRecords }, () => generateTmsCarrier(faker)),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const carrierIds = carriers.map((carrier) => carrier.id);

  // Seed tms.vehicles
  const vehicles = await tmsVehicleRepository
    .batchCreate(
      Array.from({ length: numRecords }, () => generateTmsVehicle(faker)),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const vehicleIds = vehicles.map((vehicle) => vehicle.id);

  // Seed tms.drivers
  const drivers = await tmsDriverRepository
    .batchCreate(
      Array.from({ length: numRecords }, () =>
        generateTmsDriver(faker, faker.helpers.arrayElement(userIds)),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const driverIds = drivers.map((driver) => driver.id);

  // Seed tms.carrierRates
  await tmsCarrierRateRepository
    .batchCreate(
      Array.from({ length: numRecords * 2 }, () =>
        generateTmsCarrierRate(faker, faker.helpers.arrayElement(carrierIds)),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.driverSchedules
  await tmsDriverScheduleRepository
    .batchCreate(
      Array.from({ length: numRecords * 2 }, () =>
        generateTmsDriverSchedule(faker, faker.helpers.arrayElement(driverIds)),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.geofences
  const geofences = await tmsGeofenceRepository
    .batchCreate(
      Array.from({ length: numRecords }, () => generateTmsGeofence(faker)),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const geofenceIds = geofences.map((geofence) => geofence.id);

  // Seed tms.trips
  const trips = await tmsTripRepository
    .batchCreate(
      Array.from({ length: numRecords }, () =>
        generateTmsTrip(
          faker,
          faker.helpers.arrayElement([undefined, ...driverIds]), // driverId can be null
          faker.helpers.arrayElement([undefined, ...vehicleIds]), // vehicleId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const tripIds = trips.map((trip) => trip.id);

  // Seed tms.gpsPings
  await tmsGpsPingRepository
    .batchCreate(
      Array.from({ length: numRecords * 5 }, () =>
        generateTmsGpsPing(faker, faker.helpers.arrayElement(vehicleIds)),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.geofenceEvents
  await tmsGeofenceEventRepository
    .batchCreate(
      Array.from({ length: numRecords * 3 }, () =>
        generateTmsGeofenceEvent(
          faker,
          faker.helpers.arrayElement(geofenceIds),
          faker.helpers.arrayElement(vehicleIds),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.vehicleMaintenance
  await tmsVehicleMaintenanceRepository
    .batchCreate(
      Array.from({ length: numRecords * 2 }, () =>
        generateTmsVehicleMaintenance(
          faker,
          faker.helpers.arrayElement(vehicleIds),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.shipmentLegs
  const shipmentLegs = await tmsShipmentLegRepository
    .batchCreate(
      Array.from({ length: numRecords * 2 }, () =>
        generateTmsShipmentLeg(
          faker,
          undefined, // shipmentId is nullable and not generated here
          faker.helpers.arrayElement([undefined, ...carrierIds]), // carrierId can be null
          faker.helpers.arrayElement([undefined, ...tripIds]), // internalTripId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const shipmentLegIds = shipmentLegs.map((leg) => leg.id);

  // Seed tms.partnerInvoices
  const partnerInvoices = await tmsPartnerInvoiceRepository
    .batchCreate(
      Array.from({ length: numRecords }, () =>
        generateTmsPartnerInvoice(
          faker,
          faker.helpers.arrayElement(carrierIds),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const partnerInvoiceIds = partnerInvoices.map((invoice) => invoice.id);

  // Seed tms.partnerInvoiceItems
  await tmsPartnerInvoiceItemRepository
    .batchCreate(
      Array.from({ length: numRecords * 3 }, () =>
        generateTmsPartnerInvoiceItem(
          faker,
          faker.helpers.arrayElement(partnerInvoiceIds),
          faker.helpers.arrayElement(shipmentLegIds),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.tripStops
  const tripStops = await tmsTripStopRepository
    .batchCreate(
      Array.from({ length: numRecords * 3 }, () =>
        generateTmsTripStop(
          faker,
          faker.helpers.arrayElement(tripIds),
          faker.helpers.arrayElement([undefined, ...shipmentLegIds]), // shipmentId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const tripStopIds = tripStops.map((stop) => stop.id);

  // Seed tms.proofOfDeliveries
  await tmsProofOfDeliveryRepository
    .batchCreate(
      Array.from({ length: numRecords * 2 }, () =>
        generateTmsProofOfDelivery(
          faker,
          faker.helpers.arrayElement(tripStopIds),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.routes
  await tmsRouteRepository
    .batchCreate(
      Array.from({ length: numRecords }, () =>
        generateTmsRoute(faker, faker.helpers.arrayElement(tripIds)),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.shipmentLegEvents
  await tmsShipmentLegEventRepository
    .batchCreate(
      Array.from({ length: numRecords * 4 }, () =>
        generateTmsShipmentLegEvent(
          faker,
          faker.helpers.arrayElement(shipmentLegIds),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed tms.expenses
  await tmsExpenseRepository
    .batchCreate(
      Array.from({ length: numRecords * 3 }, () =>
        generateTmsExpense(
          faker,
          faker.helpers.arrayElement([undefined, ...driverIds]), // driverId can be null
          faker.helpers.arrayElement([undefined, ...tripIds]), // tripId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
}
