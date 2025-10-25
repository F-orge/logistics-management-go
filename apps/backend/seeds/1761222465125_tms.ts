import { DB } from "@packages/db/db.types";
import type { Kysely } from "kysely";
import { Faker, base, de, de_AT, en } from "@faker-js/faker";
import {
  seedTmsCarrier,
  seedTmsCarrierRate,
  seedTmsDriver,
  seedTmsDriverSchedule,
  seedTmsVehicle,
  seedTmsVehicleMaintenance,
  seedTmsTrip,
  seedTmsTripStop,
  seedTmsRoute,
  seedTmsGpsPing,
  seedTmsProofOfDelivery,
  seedTmsExpense,
  seedTmsGeofence,
  seedTmsGeofenceEvent,
  seedTmsShipmentLeg,
  seedTmsShipmentLegEvent,
  seedTmsPartnerInvoice,
  seedTmsPartnerInvoiceItem,
} from "../src/seeds/tms-helpers";

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] });

  // Get all users to use as drivers
  const users = await db.selectFrom("user").selectAll().execute();

  if (users.length === 0) {
    console.log("No users found. Please run auth seeds first.");
    return;
  }

  const getRandomUserId = () =>
    users[Math.floor(Math.random() * users.length)].id;

  // 1. Seed Carriers (no dependencies)
  console.log("Seeding TMS Carriers...");
  const carrierData = Array.from({ length: 50 }, () => seedTmsCarrier(faker));

  const carriers = await db
    .insertInto("tms.carriers")
    .values(carrierData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${carriers.length} carriers`);

  // 2. Seed Carrier Rates (depends on carriers)
  console.log("Seeding TMS Carrier Rates...");
  const carrierRateData: Array<ReturnType<typeof seedTmsCarrierRate>> = [];

  for (const carrier of carriers) {
    // Each carrier has 3-8 different rates
    const rateCount = faker.number.int({ min: 3, max: 8 });
    for (let i = 0; i < rateCount; i++) {
      carrierRateData.push(
        seedTmsCarrierRate(faker, { carrierId: carrier.id })
      );
    }
  }

  const carrierRates = await db
    .insertInto("tms.carrierRates")
    .values(carrierRateData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${carrierRates.length} carrier rates`);

  // 3. Seed Vehicles (no dependencies)
  console.log("Seeding TMS Vehicles...");
  const vehicleData = Array.from({ length: 100 }, () => seedTmsVehicle(faker));

  const vehicles = await db
    .insertInto("tms.vehicles")
    .values(vehicleData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${vehicles.length} vehicles`);

  // 4. Seed Vehicle Maintenance (depends on vehicles)
  console.log("Seeding TMS Vehicle Maintenance...");
  const maintenanceData: Array<ReturnType<typeof seedTmsVehicleMaintenance>> =
    [];

  for (const vehicle of vehicles) {
    // Each vehicle has 1-5 maintenance records
    const maintenanceCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < maintenanceCount; i++) {
      maintenanceData.push(
        seedTmsVehicleMaintenance(faker, { vehicleId: vehicle.id })
      );
    }
  }

  const maintenance = await db
    .insertInto("tms.vehicleMaintenance")
    .values(maintenanceData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${maintenance.length} maintenance records`);

  // 5. Seed Drivers (depends on users)
  console.log("Seeding TMS Drivers...");
  // Use a subset of users as drivers
  const driverUserIds = faker.helpers
    .arrayElements(users, Math.min(users.length, 200))
    .map((u) => u.id);
  const driverData = driverUserIds.map((userId) =>
    seedTmsDriver(faker, { userId })
  );

  const drivers = await db
    .insertInto("tms.drivers")
    .values(driverData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${drivers.length} drivers`);

  // 6. Seed Driver Schedules (depends on drivers)
  console.log("Seeding TMS Driver Schedules...");
  const scheduleData: Array<ReturnType<typeof seedTmsDriverSchedule>> = [];

  for (const driver of drivers) {
    // Each driver has 0-3 scheduled periods
    const scheduleCount = faker.number.int({ min: 0, max: 3 });
    for (let i = 0; i < scheduleCount; i++) {
      scheduleData.push(seedTmsDriverSchedule(faker, { driverId: driver.id }));
    }
  }

  const schedules = await db
    .insertInto("tms.driverSchedules")
    .values(scheduleData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${schedules.length} driver schedules`);

  // 7. Seed Trips (depends on drivers and vehicles)
  console.log("Seeding TMS Trips...");
  const tripData = Array.from({ length: 500 }, () => {
    const driverId = faker.helpers.maybe(
      () => drivers[Math.floor(Math.random() * drivers.length)].id,
      { probability: 0.9 }
    );
    const vehicleId = faker.helpers.maybe(
      () => vehicles[Math.floor(Math.random() * vehicles.length)].id,
      { probability: 0.9 }
    );

    return seedTmsTrip(faker, { driverId, vehicleId });
  });

  const trips = await db
    .insertInto("tms.trips")
    .values(tripData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${trips.length} trips`);

  // Get WMS outbound shipments for trip stop linkage
  const wmsOutboundShipments = await db
    .selectFrom("wms.outboundShipments")
    .select(["id"])
    .execute();

  // 8. Seed Trip Stops (depends on trips and WMS outbound shipments)
  console.log("Seeding TMS Trip Stops...");
  const tripStopData: Array<ReturnType<typeof seedTmsTripStop>> = [];

  for (const trip of trips) {
    // Each trip has 2-8 stops
    const stopCount = faker.number.int({ min: 2, max: 8 });
    for (let i = 0; i < stopCount; i++) {
      // Link to actual WMS outbound shipments if available
      const shipmentId = wmsOutboundShipments.length > 0 
        ? faker.helpers.maybe(
            () => wmsOutboundShipments[Math.floor(Math.random() * wmsOutboundShipments.length)].id,
            { probability: 0.7 }
          )
        : undefined;

      tripStopData.push(
        seedTmsTripStop(faker, {
          tripId: trip.id,
          shipmentId,
        })
      );
    }
  }

  const tripStops = await db
    .insertInto("tms.tripStops")
    .values(tripStopData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${tripStops.length} trip stops`);

  // 9. Seed Routes (depends on trips)
  console.log("Seeding TMS Routes...");
  const routeData = trips.map((trip) =>
    seedTmsRoute(faker, { tripId: trip.id })
  );

  const routes = await db
    .insertInto("tms.routes")
    .values(routeData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${routes.length} routes`);

  // 10. Seed GPS Pings (depends on vehicles)
  console.log("Seeding TMS GPS Pings...");
  const gpsPingData: Array<ReturnType<typeof seedTmsGpsPing>> = [];

  for (const vehicle of vehicles.slice(0, 50)) {
    // Only for active vehicles
    // Each vehicle has multiple GPS pings over the past week
    const pingCount = faker.number.int({ min: 20, max: 100 });
    for (let i = 0; i < pingCount; i++) {
      gpsPingData.push(seedTmsGpsPing(faker, { vehicleId: vehicle.id }));
    }
  }

  const gpsPings = await db
    .insertInto("tms.gpsPings")
    .values(gpsPingData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${gpsPings.length} GPS pings`);

  // 11. Seed Proof of Deliveries (depends on trip stops)
  console.log("Seeding TMS Proof of Deliveries...");
  const podData = tripStops
    .filter(() => faker.datatype.boolean({ probability: 0.6 })) // 60% of stops have proof
    .map((stop) =>
      seedTmsProofOfDelivery(faker, {
        tripStopId: stop.id,
      })
    );

  const proofOfDeliveries = await db
    .insertInto("tms.proofOfDeliveries")
    .values(podData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${proofOfDeliveries.length} proof of deliveries`);

  // 12. Seed Expenses (depends on drivers and trips)
  console.log("Seeding TMS Expenses...");
  const expenseData: Array<ReturnType<typeof seedTmsExpense>> = [];

  for (const trip of trips.slice(0, 300)) {
    // Expenses for subset of trips
    // Each trip has 1-5 expenses
    const expenseCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < expenseCount; i++) {
      const driver = drivers[Math.floor(Math.random() * drivers.length)];
      expenseData.push(
        seedTmsExpense(faker, {
          driverId: driver.id,
          tripId: trip.id,
        })
      );
    }
  }

  const expenses = await db
    .insertInto("tms.expenses")
    .values(expenseData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${expenses.length} expenses`);

  // 13. Seed Geofences (no dependencies)
  console.log("Seeding TMS Geofences...");
  const geofenceData = Array.from({ length: 30 }, () => seedTmsGeofence(faker));

  const geofences = await db
    .insertInto("tms.geofences")
    .values(geofenceData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${geofences.length} geofences`);

  // 14. Seed Geofence Events (depends on vehicles and geofences)
  console.log("Seeding TMS Geofence Events...");
  const geofenceEventData: Array<ReturnType<typeof seedTmsGeofenceEvent>> = [];

  for (const vehicle of vehicles.slice(0, 50)) {
    // Each vehicle has multiple geofence events
    const eventCount = faker.number.int({ min: 5, max: 20 });
    for (let i = 0; i < eventCount; i++) {
      const geofence = geofences[Math.floor(Math.random() * geofences.length)];
      geofenceEventData.push(
        seedTmsGeofenceEvent(faker, {
          vehicleId: vehicle.id,
          geofenceId: geofence.id,
        })
      );
    }
  }

  const geofenceEvents = await db
    .insertInto("tms.geofenceEvents")
    .values(geofenceEventData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${geofenceEvents.length} geofence events`);

  // 15. Seed Shipment Legs (depends on carriers, trips, and WMS outbound shipments)
  console.log("Seeding TMS Shipment Legs...");
  const shipmentLegData: Array<ReturnType<typeof seedTmsShipmentLeg>> = [];

  // Create shipment legs for external carriers and internal trips
  for (let i = 0; i < 200; i++) {
    // Link to actual WMS outbound shipments if available
    const shipmentId = wmsOutboundShipments.length > 0
      ? wmsOutboundShipments[Math.floor(Math.random() * wmsOutboundShipments.length)].id
      : undefined;
    const legCount = faker.number.int({ min: 1, max: 3 });

    for (let j = 0; j < legCount; j++) {
      const useCarrier = faker.datatype.boolean({ probability: 0.4 });
      const carrierId = useCarrier
        ? carriers[Math.floor(Math.random() * carriers.length)].id
        : undefined;
      const internalTripId = !useCarrier
        ? trips[Math.floor(Math.random() * trips.length)].id
        : undefined;

      shipmentLegData.push(
        seedTmsShipmentLeg(faker, {
          shipmentId,
          carrierId,
          tripId: internalTripId,
        })
      );
    }
  }

  const shipmentLegs = await db
    .insertInto("tms.shipmentLegs")
    .values(shipmentLegData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${shipmentLegs.length} shipment legs`);

  // 16. Seed Shipment Leg Events (depends on shipment legs)
  console.log("Seeding TMS Shipment Leg Events...");
  const shipmentLegEventData: Array<
    ReturnType<typeof seedTmsShipmentLegEvent>
  > = [];

  for (const shipmentLeg of shipmentLegs) {
    // Each leg has 2-6 status events
    const eventCount = faker.number.int({ min: 2, max: 6 });
    for (let i = 0; i < eventCount; i++) {
      shipmentLegEventData.push(
        seedTmsShipmentLegEvent(faker, { shipmentLegId: shipmentLeg.id })
      );
    }
  }

  const shipmentLegEvents = await db
    .insertInto("tms.shipmentLegEvents")
    .values(shipmentLegEventData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${shipmentLegEvents.length} shipment leg events`);

  // 17. Seed Partner Invoices (depends on carriers)
  console.log("Seeding TMS Partner Invoices...");
  const partnerInvoiceData: Array<ReturnType<typeof seedTmsPartnerInvoice>> =
    [];

  for (const carrier of carriers) {
    // Each carrier has 2-8 invoices
    const invoiceCount = faker.number.int({ min: 2, max: 8 });
    for (let i = 0; i < invoiceCount; i++) {
      partnerInvoiceData.push(
        seedTmsPartnerInvoice(faker, { carrierId: carrier.id })
      );
    }
  }

  const partnerInvoices = await db
    .insertInto("tms.partnerInvoices")
    .values(partnerInvoiceData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${partnerInvoices.length} partner invoices`);

  // 18. Seed Partner Invoice Items (depends on partner invoices and shipment legs)
  console.log("Seeding TMS Partner Invoice Items...");
  const partnerInvoiceItemData: Array<
    ReturnType<typeof seedTmsPartnerInvoiceItem>
  > = [];

  for (const invoice of partnerInvoices) {
    // Each invoice has 1-5 line items
    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < itemCount; i++) {
      const shipmentLegId =
        shipmentLegs[Math.floor(Math.random() * shipmentLegs.length)].id;

      partnerInvoiceItemData.push(
        seedTmsPartnerInvoiceItem(faker, {
          partnerInvoiceId: invoice.id,
          shipmentLegId,
        })
      );
    }
  }

  const partnerInvoiceItems = await db
    .insertInto("tms.partnerInvoiceItems")
    .values(partnerInvoiceItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${partnerInvoiceItems.length} partner invoice items`);

  console.log("TMS seeding completed successfully!");
}
