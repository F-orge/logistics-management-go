import { base, de, de_AT, en, Faker } from "@faker-js/faker";
import { DB } from "@packages/graphql/db.types";
import type { Kysely } from "kysely";
import {
  seedDmsCustomerTrackingLink,
  seedDmsDeliveryRoute,
  seedDmsDeliveryTask,
  seedDmsDriverLocation,
  seedDmsProofOfDelivery,
  seedDmsTaskEvent,
} from "../src/seeds/dms-helpers";

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] });

  // Get all drivers from TMS for delivery routes
  const tmsDrivers = await db.selectFrom("tms.drivers").selectAll().execute();

  if (tmsDrivers.length === 0) {
    console.log("No TMS drivers found. Please run TMS seeds first.");
    return;
  }

  // Get WMS packages for delivery tasks
  const wmsPackages = await db.selectFrom("wms.packages").selectAll().execute();

  if (wmsPackages.length === 0) {
    console.log("No WMS packages found. Please run WMS seeds first.");
    return;
  }

  // 1. Seed Delivery Routes (depends on TMS drivers)
  console.log("Seeding DMS Delivery Routes...");
  const deliveryRouteData = Array.from({ length: 100 }, () => {
    const driver = tmsDrivers[Math.floor(Math.random() * tmsDrivers.length)];
    return seedDmsDeliveryRoute(faker, { driverId: driver.id });
  });

  const deliveryRoutes = await db
    .insertInto("dms.deliveryRoutes")
    .values(deliveryRouteData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${deliveryRoutes.length} delivery routes`);

  // 2. Seed Delivery Tasks (depends on delivery routes and WMS packages)
  console.log("Seeding DMS Delivery Tasks...");
  const deliveryTaskData: Array<ReturnType<typeof seedDmsDeliveryTask>> = [];

  for (const route of deliveryRoutes) {
    // Each route has 3-12 delivery tasks
    const taskCount = faker.number.int({ min: 3, max: 12 });
    for (let i = 0; i < taskCount; i++) {
      const wmsPackage =
        wmsPackages[Math.floor(Math.random() * wmsPackages.length)];
      deliveryTaskData.push(
        seedDmsDeliveryTask(faker, {
          deliveryRouteId: route.id,
          packageId: wmsPackage.id,
        })
      );
    }
  }

  const deliveryTasks = await db
    .insertInto("dms.deliveryTasks")
    .values(deliveryTaskData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${deliveryTasks.length} delivery tasks`);

  // 3. Seed Customer Tracking Links (depends on delivery tasks)
  console.log("Seeding DMS Customer Tracking Links...");
  const customerTrackingLinkData = Array.from(
    { length: Math.floor(deliveryTasks.length * 0.8) },
    () => {
      const deliveryTask =
        deliveryTasks[Math.floor(Math.random() * deliveryTasks.length)];
      return seedDmsCustomerTrackingLink(faker, {
        deliveryTaskId: deliveryTask.id,
      });
    }
  );

  const customerTrackingLinks = await db
    .insertInto("dms.customerTrackingLinks")
    .values(customerTrackingLinkData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${customerTrackingLinks.length} customer tracking links`);

  // 4. Seed Driver Locations (depends on TMS drivers) - Process in batches to avoid parameter limit
  console.log("Seeding DMS Driver Locations...");
  const allDriverLocations: Array<any> = [];

  // Process drivers in smaller batches
  const driverBatches = [];
  for (let i = 0; i < tmsDrivers.length; i += 50) {
    driverBatches.push(tmsDrivers.slice(i, i + 50));
  }

  for (const driverBatch of driverBatches) {
    const driverLocationData: Array<ReturnType<typeof seedDmsDriverLocation>> =
      [];

    for (const driver of driverBatch) {
      // Each driver has multiple location pings (2-4 per driver to avoid parameter limit)
      const locationCount = faker.number.int({ min: 2, max: 4 });
      for (let i = 0; i < locationCount; i++) {
        driverLocationData.push(
          seedDmsDriverLocation(faker, { driverId: driver.id })
        );
      }
    }

    const batchLocations = await db
      .insertInto("dms.driverLocations")
      .values(driverLocationData)
      .returningAll()
      .onConflict((oc) => oc.doNothing())
      .execute();

    allDriverLocations.push(...batchLocations);
  }

  console.log(`Seeded ${allDriverLocations.length} driver locations`);

  // 5. Seed Proof of Deliveries (depends on delivery tasks)
  console.log("Seeding DMS Proof of Deliveries...");
  const proofOfDeliveryData = Array.from(
    { length: Math.floor(deliveryTasks.length * 0.6) },
    () => {
      const deliveryTask =
        deliveryTasks[Math.floor(Math.random() * deliveryTasks.length)];
      return seedDmsProofOfDelivery(faker, {
        deliveryTaskId: deliveryTask.id,
      });
    }
  );

  const proofsOfDelivery = await db
    .insertInto("dms.proofOfDeliveries")
    .values(proofOfDeliveryData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${proofsOfDelivery.length} proofs of delivery`);

  // 6. Seed Task Events (depends on delivery tasks)
  console.log("Seeding DMS Task Events...");
  const taskEventData: Array<ReturnType<typeof seedDmsTaskEvent>> = [];

  for (const deliveryTask of deliveryTasks) {
    // Each delivery task has 2-8 events (tracking lifecycle)
    const eventCount = faker.number.int({ min: 2, max: 8 });
    for (let i = 0; i < eventCount; i++) {
      taskEventData.push(
        seedDmsTaskEvent(faker, {
          deliveryTaskId: deliveryTask.id,
        })
      );
    }
  }

  const taskEvents = await db
    .insertInto("dms.taskEvents")
    .values(taskEventData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${taskEvents.length} task events`);

  console.log("DMS seeding completed successfully!");
}
