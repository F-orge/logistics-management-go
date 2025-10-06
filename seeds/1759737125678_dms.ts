import { Kysely } from 'kysely';
import { faker } from '@faker-js/faker';
import { DB } from '@/db/types';

// Import DMS helpers
import {
  generateDmsDeliveryRoute,
  generateDmsDeliveryTask,
  generateDmsCustomerTrackingLink,
  generateDmsDriverLocation,
  generateDmsProofOfDelivery,
  generateDmsTaskEvent,
} from '@/seeds/dms-helpers';

// Import DMS repositories
import { DmsDeliveryRouteRepository } from '@/repositories/dms/deliveryRoutes';
import { DmsDeliveryTaskRepository } from '@/repositories/dms/deliveryTasks';
import { DmsCustomerTrackingLinkRepository } from '@/repositories/dms/customerTrackingLinks';
import { DmsDriverLocationRepository } from '@/repositories/dms/driverLocations';
import { DmsProofOfDeliveryRepository } from '@/repositories/dms/proofOfDeliveries';
import { DmsTaskEventRepository } from '@/repositories/dms/taskEvents';

export async function seed(db: Kysely<DB>): Promise<void> {
  console.log('🚛 Starting DMS seed...');

  // Configure faker
  faker.seed(12345);

  // Initialize repositories
  const deliveryRouteRepo = new DmsDeliveryRouteRepository(db);
  const deliveryTaskRepo = new DmsDeliveryTaskRepository(db);
  const customerTrackingLinkRepo = new DmsCustomerTrackingLinkRepository(db);
  const driverLocationRepo = new DmsDriverLocationRepository(db);
  const proofOfDeliveryRepo = new DmsProofOfDeliveryRepository(db);
  const taskEventRepo = new DmsTaskEventRepository(db);

  // Get prerequisite data
  console.log('📦 Fetching prerequisite data...');

  // Get drivers from TMS
  const drivers = await db.selectFrom('tms.drivers').select(['id']).execute();

  // Get packages from WMS
  const packages = await db.selectFrom('wms.packages').select(['id']).execute();

  console.log(
    `Found ${drivers.length} drivers and ${packages.length} packages`,
  );

  // 1. Create Delivery Routes
  console.log('🛣️ Creating delivery routes...');
  const deliveryRoutesData = Array.from({ length: 50 }, () =>
    generateDmsDeliveryRoute(faker, faker.helpers.arrayElement(drivers).id),
  );

  const deliveryRoutes = await deliveryRouteRepo
    .batchCreate(deliveryRoutesData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${deliveryRoutes.length} delivery routes`);

  // 2. Create Delivery Tasks
  console.log('📋 Creating delivery tasks...');
  const deliveryTasksData = Array.from({ length: 200 }, () =>
    generateDmsDeliveryTask(
      faker,
      faker.helpers.arrayElement(deliveryRoutes).id,
      faker.helpers.arrayElement(packages).id,
    ),
  );

  const deliveryTasks = await deliveryTaskRepo
    .batchCreate(deliveryTasksData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${deliveryTasks.length} delivery tasks`);

  // 3. Create Customer Tracking Links
  console.log('🔗 Creating customer tracking links...');
  const customerTrackingLinksData = deliveryTasks.map((task) =>
    generateDmsCustomerTrackingLink(faker, task.id),
  );

  const customerTrackingLinks = await customerTrackingLinkRepo
    .batchCreate(customerTrackingLinksData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(
    `✅ Created ${customerTrackingLinks.length} customer tracking links`,
  );

  // 4. Create Driver Locations
  console.log('📍 Creating driver locations...');
  const driverLocationsData = Array.from({ length: 500 }, () =>
    generateDmsDriverLocation(faker, faker.helpers.arrayElement(drivers).id),
  );

  const driverLocations = await driverLocationRepo
    .batchCreate(driverLocationsData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${driverLocations.length} driver locations`);

  // 5. Create Proof of Deliveries (only for some completed tasks)
  console.log('📄 Creating proof of deliveries...');
  const completedTasks = deliveryTasks.filter(() =>
    faker.datatype.boolean(0.3),
  ); // 30% have proof
  const proofOfDeliveriesData = completedTasks.map((task) =>
    generateDmsProofOfDelivery(faker, task.id),
  );

  const proofOfDeliveries = await proofOfDeliveryRepo
    .batchCreate(proofOfDeliveriesData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${proofOfDeliveries.length} proof of deliveries`);

  // 6. Create Task Events
  console.log('📝 Creating task events...');
  const taskEventsData = Array.from({ length: 400 }, () =>
    generateDmsTaskEvent(faker, faker.helpers.arrayElement(deliveryTasks).id),
  );

  const taskEvents = await taskEventRepo
    .batchCreate(taskEventsData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${taskEvents.length} task events`);

  // Summary
  const totalRecords =
    deliveryRoutes.length +
    deliveryTasks.length +
    customerTrackingLinks.length +
    driverLocations.length +
    proofOfDeliveries.length +
    taskEvents.length;

  console.log('🎉 DMS seed completed successfully!');
  console.log(`📊 Total records created: ${totalRecords}`);
  console.log('   - Delivery Routes:', deliveryRoutes.length);
  console.log('   - Delivery Tasks:', deliveryTasks.length);
  console.log('   - Customer Tracking Links:', customerTrackingLinks.length);
  console.log('   - Driver Locations:', driverLocations.length);
  console.log('   - Proof of Deliveries:', proofOfDeliveries.length);
  console.log('   - Task Events:', taskEvents.length);
}
