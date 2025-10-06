import { base, de, de_AT, en, Faker } from '@faker-js/faker';
import type { Kysely } from 'kysely';
import { DB } from '@/db/types';
import { TmsCarrierRateRepository } from '@/repositories/tms/carrierRates';
import { TmsCarrierRepository } from '@/repositories/tms/carriers';
import { TmsDriverScheduleRepository } from '@/repositories/tms/driverSchedules';
import { TmsDriverRepository } from '@/repositories/tms/drivers';
import { TmsExpenseRepository } from '@/repositories/tms/expenses';
import { TmsGeofenceEventRepository } from '@/repositories/tms/geofenceEvents';
import { TmsGeofenceRepository } from '@/repositories/tms/geofences';
import { TmsGpsPingRepository } from '@/repositories/tms/gpsPings';
import { TmsPartnerInvoiceItemRepository } from '@/repositories/tms/partnerInvoiceItems';
import { TmsPartnerInvoiceRepository } from '@/repositories/tms/partnerInvoices';
import { TmsProofOfDeliveryRepository } from '@/repositories/tms/proofOfDeliveries';
import { TmsRouteRepository } from '@/repositories/tms/routes';
import { TmsShipmentLegEventRepository } from '@/repositories/tms/shipmentLegEvents';
import { TmsShipmentLegRepository } from '@/repositories/tms/shipmentLegs';
import { TmsTripStopRepository } from '@/repositories/tms/tripStops';
import { TmsTripRepository } from '@/repositories/tms/trips';
import { TmsVehicleMaintenanceRepository } from '@/repositories/tms/vehicleMaintenance';
import { TmsVehicleRepository } from '@/repositories/tms/vehicles';
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

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] });

  // Initialize repositories
  const carrierRepo = new TmsCarrierRepository(db);
  const vehicleRepo = new TmsVehicleRepository(db);
  const geofenceRepo = new TmsGeofenceRepository(db);
  const driverRepo = new TmsDriverRepository(db);
  const driverScheduleRepo = new TmsDriverScheduleRepository(db);
  const vehicleMaintenanceRepo = new TmsVehicleMaintenanceRepository(db);
  const tripRepo = new TmsTripRepository(db);
  const tripStopRepo = new TmsTripStopRepository(db);
  const routeRepo = new TmsRouteRepository(db);
  const proofOfDeliveryRepo = new TmsProofOfDeliveryRepository(db);
  const gpsPingRepo = new TmsGpsPingRepository(db);
  const geofenceEventRepo = new TmsGeofenceEventRepository(db);
  const expenseRepo = new TmsExpenseRepository(db);
  const carrierRateRepo = new TmsCarrierRateRepository(db);
  const shipmentLegRepo = new TmsShipmentLegRepository(db);
  const shipmentLegEventRepo = new TmsShipmentLegEventRepository(db);
  const partnerInvoiceRepo = new TmsPartnerInvoiceRepository(db);
  const partnerInvoiceItemRepo = new TmsPartnerInvoiceItemRepository(db);

  console.log('🚛 Starting TMS seed data generation...');

  // Get existing users to use as drivers
  const users = await db.selectFrom('user').select(['id']).execute();
  if (users.length === 0) {
    console.log('⚠️  No users found. Please run auth seed first.');
    return;
  }

  const userIds = users.map((u) => u.id);
  console.log(`📊 Found ${userIds.length} users for TMS data`);

  // 1. Create independent entities first

  // Create carriers
  console.log('🏢 Creating carriers...');
  const carrierData = Array.from({ length: 25 }, () =>
    generateTmsCarrier(faker),
  );
  const carriers = await carrierRepo
    .batchCreate(carrierData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${carriers.length} carriers`);

  // Create vehicles
  console.log('🚚 Creating vehicles...');
  const vehicleData = Array.from({ length: 50 }, () =>
    generateTmsVehicle(faker),
  );
  const vehicles = await vehicleRepo
    .batchCreate(vehicleData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${vehicles.length} vehicles`);

  // Create geofences
  console.log('🗺️ Creating geofences...');
  const geofenceData = Array.from({ length: 20 }, () =>
    generateTmsGeofence(faker),
  );
  const geofences = await geofenceRepo
    .batchCreate(geofenceData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${geofences.length} geofences`);

  // 2. Create drivers (need users)
  console.log('👨‍💼 Creating drivers...');
  const driverData = Array.from({ length: 40 }, () =>
    generateTmsDriver(faker, faker.helpers.arrayElement(userIds)),
  );
  const drivers = await driverRepo
    .batchCreate(driverData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${drivers.length} drivers`);

  // 3. Create driver schedules
  console.log('📅 Creating driver schedules...');
  const driverScheduleData: Array<
    ReturnType<typeof generateTmsDriverSchedule>
  > = [];
  drivers.forEach((driver) => {
    const scheduleCount = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < scheduleCount; i++) {
      driverScheduleData.push(generateTmsDriverSchedule(faker, driver.id));
    }
  });
  const driverSchedules = await driverScheduleRepo
    .batchCreate(driverScheduleData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${driverSchedules.length} driver schedules`);

  // 4. Create vehicle maintenance records
  console.log('🔧 Creating vehicle maintenance records...');
  const vehicleMaintenanceData: Array<
    ReturnType<typeof generateTmsVehicleMaintenance>
  > = [];
  vehicles.forEach((vehicle) => {
    const maintenanceCount = faker.number.int({ min: 2, max: 5 });
    for (let i = 0; i < maintenanceCount; i++) {
      vehicleMaintenanceData.push(
        generateTmsVehicleMaintenance(faker, vehicle.id),
      );
    }
  });
  const vehicleMaintenance = await vehicleMaintenanceRepo
    .batchCreate(vehicleMaintenanceData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(
    `✅ Created ${vehicleMaintenance.length} vehicle maintenance records`,
  );

  // 5. Create trips
  console.log('🛣️ Creating trips...');
  const tripData = Array.from({ length: 80 }, () => {
    const driverId =
      Math.random() > 0.1 ? faker.helpers.arrayElement(drivers).id : undefined;
    const vehicleId =
      Math.random() > 0.1 ? faker.helpers.arrayElement(vehicles).id : undefined;
    return generateTmsTrip(faker, driverId, vehicleId);
  });
  const trips = await tripRepo
    .batchCreate(tripData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${trips.length} trips`);

  // 6. Create trip stops
  console.log('📍 Creating trip stops...');
  const tripStopData: Array<ReturnType<typeof generateTmsTripStop>> = [];
  trips.forEach((trip) => {
    const stopCount = faker.number.int({ min: 2, max: 6 });
    for (let i = 0; i < stopCount; i++) {
      // Don't reference shipments yet since WMS seed hasn't run
      tripStopData.push(generateTmsTripStop(faker, trip.id, undefined));
    }
  });
  const tripStops = await tripStopRepo
    .batchCreate(tripStopData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${tripStops.length} trip stops`);

  // 7. Create routes
  console.log('🗺️ Creating routes...');
  const routeData = trips.map((trip) => generateTmsRoute(faker, trip.id));
  const routes = await routeRepo
    .batchCreate(routeData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${routes.length} routes`);

  // 8. Create proof of deliveries
  console.log('📋 Creating proof of deliveries...');
  const proofData = tripStops
    .slice(0, Math.floor(tripStops.length * 0.7))
    .map((tripStop) => generateTmsProofOfDelivery(faker, tripStop.id));
  const proofOfDeliveries = await proofOfDeliveryRepo
    .batchCreate(proofData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${proofOfDeliveries.length} proof of deliveries`);

  // 9. Create GPS pings
  console.log('📡 Creating GPS pings...');
  const gpsPingData: Array<ReturnType<typeof generateTmsGpsPing>> = [];
  vehicles.slice(0, 30).forEach((vehicle) => {
    const pingCount = faker.number.int({ min: 10, max: 50 });
    for (let i = 0; i < pingCount; i++) {
      gpsPingData.push(generateTmsGpsPing(faker, vehicle.id));
    }
  });
  const gpsPings = await gpsPingRepo
    .batchCreate(gpsPingData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${gpsPings.length} GPS pings`);

  // 10. Create geofence events
  console.log('🚨 Creating geofence events...');
  const geofenceEventData: Array<ReturnType<typeof generateTmsGeofenceEvent>> =
    [];
  vehicles.slice(0, 25).forEach((vehicle) => {
    const eventCount = faker.number.int({ min: 2, max: 8 });
    for (let i = 0; i < eventCount; i++) {
      geofenceEventData.push(
        generateTmsGeofenceEvent(
          faker,
          faker.helpers.arrayElement(geofences).id,
          vehicle.id,
        ),
      );
    }
  });
  const geofenceEvents = await geofenceEventRepo
    .batchCreate(geofenceEventData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${geofenceEvents.length} geofence events`);

  // 11. Create expenses
  console.log('💳 Creating expenses...');
  const expenseData: Array<ReturnType<typeof generateTmsExpense>> = [];
  trips.forEach((trip) => {
    const expenseCount = faker.number.int({ min: 1, max: 4 });
    for (let i = 0; i < expenseCount; i++) {
      const driverId =
        Math.random() > 0.2
          ? faker.helpers.arrayElement(drivers).id
          : undefined;
      expenseData.push(generateTmsExpense(faker, driverId, trip.id));
    }
  });
  const expenses = await expenseRepo
    .batchCreate(expenseData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${expenses.length} expenses`);

  // 12. Create carrier rates
  console.log('💰 Creating carrier rates...');
  const carrierRateData: Array<ReturnType<typeof generateTmsCarrierRate>> = [];
  carriers.forEach((carrier) => {
    const rateCount = faker.number.int({ min: 3, max: 8 });
    for (let i = 0; i < rateCount; i++) {
      carrierRateData.push(generateTmsCarrierRate(faker, carrier.id));
    }
  });
  const carrierRates = await carrierRateRepo
    .batchCreate(carrierRateData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${carrierRates.length} carrier rates`);

  // 13. Create shipment legs
  console.log('📦 Creating shipment legs...');
  const shipmentLegData = Array.from({ length: 100 }, () => {
    // Don't reference shipment IDs yet since WMS seed hasn't run
    const carrierId =
      Math.random() > 0.5 ? faker.helpers.arrayElement(carriers).id : undefined;
    const internalTripId =
      Math.random() > 0.5 ? faker.helpers.arrayElement(trips).id : undefined;
    return generateTmsShipmentLeg(faker, undefined, carrierId, internalTripId);
  });
  const shipmentLegs = await shipmentLegRepo
    .batchCreate(shipmentLegData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${shipmentLegs.length} shipment legs`);

  // 14. Create shipment leg events
  console.log('📊 Creating shipment leg events...');
  const shipmentLegEventData: Array<
    ReturnType<typeof generateTmsShipmentLegEvent>
  > = [];
  shipmentLegs.forEach((shipmentLeg) => {
    const eventCount = faker.number.int({ min: 2, max: 5 });
    for (let i = 0; i < eventCount; i++) {
      shipmentLegEventData.push(
        generateTmsShipmentLegEvent(faker, shipmentLeg.id),
      );
    }
  });
  const shipmentLegEvents = await shipmentLegEventRepo
    .batchCreate(shipmentLegEventData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${shipmentLegEvents.length} shipment leg events`);

  // 15. Create partner invoices
  console.log('🧾 Creating partner invoices...');
  const partnerInvoiceData = Array.from({ length: 30 }, () =>
    generateTmsPartnerInvoice(faker, faker.helpers.arrayElement(carriers).id),
  );
  const partnerInvoices = await partnerInvoiceRepo
    .batchCreate(partnerInvoiceData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${partnerInvoices.length} partner invoices`);

  // 16. Create partner invoice items
  console.log('📝 Creating partner invoice items...');
  const partnerInvoiceItemData: Array<
    ReturnType<typeof generateTmsPartnerInvoiceItem>
  > = [];
  partnerInvoices.forEach((invoice) => {
    const itemCount = faker.number.int({ min: 1, max: 4 });
    for (let i = 0; i < itemCount; i++) {
      partnerInvoiceItemData.push(
        generateTmsPartnerInvoiceItem(
          faker,
          invoice.id,
          faker.helpers.arrayElement(shipmentLegs).id,
        ),
      );
    }
  });
  const partnerInvoiceItems = await partnerInvoiceItemRepo
    .batchCreate(partnerInvoiceItemData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${partnerInvoiceItems.length} partner invoice items`);

  console.log('🎉 TMS seed data generation completed successfully!');
  console.log('📊 Summary:');
  console.log(`  - ${carriers.length} carriers`);
  console.log(`  - ${vehicles.length} vehicles`);
  console.log(`  - ${geofences.length} geofences`);
  console.log(`  - ${drivers.length} drivers`);
  console.log(`  - ${driverSchedules.length} driver schedules`);
  console.log(`  - ${vehicleMaintenance.length} vehicle maintenance records`);
  console.log(`  - ${trips.length} trips`);
  console.log(`  - ${tripStops.length} trip stops`);
  console.log(`  - ${routes.length} routes`);
  console.log(`  - ${proofOfDeliveries.length} proof of deliveries`);
  console.log(`  - ${gpsPings.length} GPS pings`);
  console.log(`  - ${geofenceEvents.length} geofence events`);
  console.log(`  - ${expenses.length} expenses`);
  console.log(`  - ${carrierRates.length} carrier rates`);
  console.log(`  - ${shipmentLegs.length} shipment legs`);
  console.log(`  - ${shipmentLegEvents.length} shipment leg events`);
  console.log(`  - ${partnerInvoices.length} partner invoices`);
  console.log(`  - ${partnerInvoiceItems.length} partner invoice items`);
}
