import { faker } from '@faker-js/faker';
import { CamelCasePlugin, Kysely, PostgresDialect } from 'kysely';
import type { DB } from 'kysely-codegen';
import { Pool } from 'pg';
import { Result } from 'typescript-result';

const SEEDING_CONFIG = {
  companies: 50,
  warehouses: 10,
  users: 25,
  products: 200,
  inventoryItems: 500,
  vehicles: 15,
  orders: 100,
  orderLineItems: 300, // 3 items per order on average
  shipments: 80,
  routes: 25,
  routeSegments: 100, // 4 segments per route on average
  invoices: 80,
  payments: 60,
};

const db = new Kysely<DB>({
  dialect: new PostgresDialect({
    pool: new Pool({ connectionString: process.env.DATABASE_URL }),
  }),
  plugins: [new CamelCasePlugin()],
});

const adminUser = await Result.try(() =>
  db
    .insertInto('auth.users')
    .values({
      email: 'admin@email.com',
      name: 'admin user',
      password: 'password123',
      isAdmin: true,
    })
    .returningAll()
    .executeTakeFirstOrThrow(),
);

if (adminUser.isError()) {
  console.warn('Admin user already exists skipping...');
}

// Helper arrays for realistic data
const companyTypes = ['customer', 'supplier', 'carrier', 'internal'];
const productCategories = [
  'Electronics',
  'Clothing',
  'Food & Beverage',
  'Automotive',
  'Pharmaceuticals',
  'Books',
  'Home & Garden',
  'Sports',
];
const inventoryStatuses = ['available', 'reserved', 'damaged', 'expired'];
const orderStatuses = [
  'pending',
  'confirmed',
  'shipped',
  'delivered',
  'cancelled',
];
const shipmentStatuses = ['pending', 'in_transit', 'delivered', 'returned'];
const vehicleTypes = ['truck', 'van', 'pickup', 'cargo_bike'];
const vehicleStatuses = [
  'available',
  'in_use',
  'maintenance',
  'out_of_service',
];
const paymentMethods = ['credit_card', 'bank_transfer', 'cash', 'check'];
const paymentStatuses = ['pending', 'completed', 'failed', 'refunded'];
const dimensionUnits = ['cm', 'in', 'mm'];
const weightUnits = ['kg', 'lb', 'g'];

console.log('🌱 Starting database seeding...\n');

// Store created records for foreign key relationships
const createdCompanies: any[] = [];
const createdWarehouses: any[] = [];
const createdUsers: any[] = [];
const createdProducts: any[] = [];
const createdOrders: any[] = [];
const createdVehicles: any[] = [];
const createdRoutes: any[] = [];
const createdShipments: any[] = [];
const createdInvoices: any[] = [];

// 1. Seed Companies
console.log('📦 Seeding companies...');
for (let i = 0; i < SEEDING_CONFIG.companies; i++) {
  const companyName = faker.company.name();

  const newCompany = await Result.try(() =>
    db
      .insertInto('companies')
      .values({
        name: companyName,
        type: faker.helpers.arrayElement(companyTypes),
        address: faker.location.streetAddress(),
        contactEmail: faker.internet.email({ firstName: companyName }),
        contactPhone: faker.phone.number({ style: 'international' }),
        primaryContactPerson: faker.person.fullName(),
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newCompany.isOk()) {
    createdCompanies.push(newCompany.value);
    if (i % 10 === 0)
      console.log(`  Created ${i + 1}/${SEEDING_CONFIG.companies} companies`);
  }
}

// 2. Seed Warehouses
console.log('\n🏭 Seeding warehouses...');
for (let i = 0; i < SEEDING_CONFIG.warehouses; i++) {
  const newWarehouse = await Result.try(() =>
    db
      .insertInto('warehouses')
      .values({
        name: `${faker.location.city()} Distribution Center`,
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude().toString(),
        longitude: faker.location.longitude().toString(),
        manager: faker.person.fullName(),
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newWarehouse.isOk()) {
    createdWarehouses.push(newWarehouse.value);
  }
}

// 3. Seed Additional Users
console.log('\n👥 Seeding users...');
for (let i = 0; i < SEEDING_CONFIG.users; i++) {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();

  const newUser = await Result.try(() =>
    db
      .insertInto('auth.users')
      .values({
        email: faker.internet.email({ firstName, lastName }),
        name: `${firstName} ${lastName}`,
        password: 'password123',
        isAdmin: faker.datatype.boolean({ probability: 0.1 }), // 10% chance of being admin
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newUser.isOk()) {
    createdUsers.push(newUser.value);
  }
}

// 4. Seed Products
console.log('\n📦 Seeding products...');
for (let i = 0; i < SEEDING_CONFIG.products; i++) {
  const productName = faker.commerce.productName();
  const supplierCompany = faker.helpers.arrayElement(
    createdCompanies.filter(
      (c) => c.type === 'supplier' || c.type === 'internal',
    ),
  );

  const newProduct = await Result.try(() =>
    db
      .insertInto('products')
      .values({
        name: productName,
        description: faker.commerce.productDescription(),
        sku: faker.string.alphanumeric(8).toUpperCase(),
        cost: faker.commerce.price({ min: 5, max: 500 }),
        supplier: supplierCompany?.id || null,
        imageUrl: faker.image.url({ width: 400, height: 400 }),
        length: faker.number
          .float({ min: 5, max: 50, fractionDigits: 2 })
          .toString(),
        width: faker.number
          .float({ min: 5, max: 50, fractionDigits: 2 })
          .toString(),
        height: faker.number
          .float({ min: 5, max: 30, fractionDigits: 2 })
          .toString(),
        dimensionUnits: faker.helpers.arrayElement(dimensionUnits),
        weight: faker.number
          .float({ min: 0.1, max: 20, fractionDigits: 2 })
          .toString(),
        weightUnits: faker.helpers.arrayElement(weightUnits),
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newProduct.isOk()) {
    createdProducts.push(newProduct.value);
    if (i % 50 === 0)
      console.log(`  Created ${i + 1}/${SEEDING_CONFIG.products} products`);
  }
}

// 5. Seed Vehicles
console.log('\n🚚 Seeding vehicles...');
for (let i = 0; i < SEEDING_CONFIG.vehicles; i++) {
  const currentDriver = faker.datatype.boolean({ probability: 0.7 })
    ? faker.helpers.arrayElement(createdUsers)?.id
    : null;

  const newVehicle = await Result.try(() =>
    db
      .insertInto('vehicles')
      .values({
        licensePlate: faker.vehicle.vrm(),
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        type: faker.helpers.arrayElement(vehicleTypes),
        status: faker.helpers.arrayElement(vehicleStatuses),
        capacityWeight: faker.number
          .float({ min: 500, max: 10000, fractionDigits: 2 })
          .toString(),
        capacityVolume: faker.number
          .float({ min: 10, max: 50, fractionDigits: 2 })
          .toString(),
        currentDriver,
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newVehicle.isOk()) {
    createdVehicles.push(newVehicle.value);
  }
}

// 6. Seed Inventory Items
console.log('\n📋 Seeding inventory items...');
for (let i = 0; i < SEEDING_CONFIG.inventoryItems; i++) {
  const product = faker.helpers.arrayElement(createdProducts);
  const warehouse = faker.helpers.arrayElement(createdWarehouses);
  const hasExpiry = faker.datatype.boolean({ probability: 0.3 });

  const newInventoryItem = await Result.try(() =>
    db
      .insertInto('inventoryItems')
      .values({
        product: product.id,
        warehouse: warehouse.id,
        quantityOnHand: faker.number.int({ min: 0, max: 1000 }),
        lotNumber: faker.string.alphanumeric(10).toUpperCase(),
        serialNumber: faker.string.alphanumeric(12).toUpperCase(),
        status: faker.helpers.arrayElement(inventoryStatuses),
        storageLocationCode: `${faker.string.alpha({ length: 2, casing: 'upper' })}${faker.number.int({ min: 1, max: 99 })}`,
        expiryDate: hasExpiry ? faker.date.future({ years: 2 }) : null,
        lastCountedDate: faker.date.recent({ days: 30 }),
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newInventoryItem.isOk() && i % 100 === 0) {
    console.log(
      `  Created ${i + 1}/${SEEDING_CONFIG.inventoryItems} inventory items`,
    );
  }
}

// 7. Seed Orders
console.log('\n🛒 Seeding orders...');
for (let i = 0; i < SEEDING_CONFIG.orders; i++) {
  const customer = faker.helpers.arrayElement(
    createdCompanies.filter((c) => c.type === 'customer'),
  );
  const warehouse = faker.helpers.arrayElement(createdWarehouses);
  const createdBy = faker.helpers.arrayElement(createdUsers);

  const newOrder = await Result.try(() =>
    db
      .insertInto('orders')
      .values({
        customId: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
        customer: customer.id,
        assignedWarehouse: warehouse.id,
        createdBy: createdBy.id,
        status: faker.helpers.arrayElement(orderStatuses),
        orderDate: faker.date.recent({ days: 90 }),
        shippingAddress: faker.location.streetAddress(),
        billingAddress: faker.location.streetAddress(),
        totalAmount: faker.commerce.price({ min: 50, max: 5000 }),
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newOrder.isOk()) {
    createdOrders.push(newOrder.value);
  }
}

// 8. Seed Order Line Items
console.log('\n📝 Seeding order line items...');
for (let i = 0; i < SEEDING_CONFIG.orderLineItems; i++) {
  const order = faker.helpers.arrayElement(createdOrders);
  const product = faker.helpers.arrayElement(createdProducts);
  const quantity = faker.number.int({ min: 1, max: 20 });
  const pricePerUnit = faker.commerce.price({ min: 10, max: 200 });

  const newOrderLineItem = await Result.try(() =>
    db
      .insertInto('orderLineItems')
      .values({
        order: order.id,
        product: product.id,
        quantity,
        pricePerUnit,
        subTotal: (parseFloat(pricePerUnit) * quantity).toString(),
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );
}

// 9. Seed Routes
console.log('\n🗺️ Seeding routes...');
for (let i = 0; i < SEEDING_CONFIG.routes; i++) {
  const startTime = faker.date.future();
  const endTime = new Date(
    startTime.getTime() + faker.number.int({ min: 2, max: 8 }) * 60 * 60 * 1000,
  ); // 2-8 hours later

  const newRoute = await Result.try(() =>
    db
      .insertInto('routes')
      .values({
        name: `Route ${faker.location.city()} - ${faker.location.city()}`,
        status: faker.helpers.arrayElement([
          'planned',
          'active',
          'completed',
          'cancelled',
        ]),
        plannedStartTime: startTime,
        plannedEndTime: endTime,
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newRoute.isOk()) {
    createdRoutes.push(newRoute.value);
  }
}

// 10. Seed Route Segments
console.log('\n🛣️ Seeding route segments...');
for (let i = 0; i < SEEDING_CONFIG.routeSegments; i++) {
  const route = faker.helpers.arrayElement(createdRoutes);
  const segmentTypes = ['pickup', 'delivery', 'waypoint'];

  const newRouteSegment = await Result.try(() =>
    db
      .insertInto('routeSegments')
      .values({
        route: route.id,
        sequenceNumber: faker.number.int({ min: 1, max: 10 }),
        segmentType: faker.helpers.arrayElement(segmentTypes),
        address: faker.location.streetAddress(),
        latitude: faker.location.latitude().toString(),
        longitude: faker.location.longitude().toString(),
        estimatedArrivalTime: faker.date.future(),
        estimatedDepartureTime: faker.date.future(),
        instructions: faker.lorem.sentence(),
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );
}

// 11. Seed Shipments
console.log('\n📦 Seeding shipments...');
for (let i = 0; i < SEEDING_CONFIG.shipments; i++) {
  const order = faker.helpers.arrayElement(createdOrders);
  const carrier = faker.helpers.arrayElement(
    createdCompanies.filter((c) => c.type === 'carrier'),
  );
  const driver = faker.helpers.arrayElement(createdUsers);

  const newShipment = await Result.try(() =>
    db
      .insertInto('shipments')
      .values({
        order: order.id,
        trackingNumber: faker.string.alphanumeric(12).toUpperCase(),
        carrier: carrier.id,
        driver: driver.id,
        status: faker.helpers.arrayElement(shipmentStatuses),
        estimatedDeliveryDate: faker.date.future(),
        actualDeliveryDate: faker.datatype.boolean({ probability: 0.6 })
          ? faker.date.recent({ days: 7 })
          : null,
        currentLocationNotes: faker.location.city(),
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newShipment.isOk()) {
    createdShipments.push(newShipment.value);
  }
}

// 12. Seed Invoices
console.log('\n🧾 Seeding invoices...');
for (let i = 0; i < SEEDING_CONFIG.invoices; i++) {
  const order = faker.helpers.arrayElement(createdOrders);
  const customer = faker.helpers.arrayElement(
    createdCompanies.filter((c) => c.type === 'customer'),
  );
  const invoiceDate = faker.date.recent({ days: 60 });
  const dueDate = new Date(invoiceDate.getTime() + 30 * 24 * 60 * 60 * 1000); // 30 days later

  const newInvoice = await Result.try(() =>
    db
      .insertInto('invoices')
      .values({
        invoiceNumber: `INV-${faker.string.alphanumeric(8).toUpperCase()}`,
        order: order.id,
        customer: customer.id,
        invoiceDate,
        dueDate,
        totalAmount: faker.commerce.price({ min: 100, max: 10000 }),
        status: faker.helpers.arrayElement([
          'draft',
          'sent',
          'paid',
          'overdue',
          'cancelled',
        ]),
        invoicePdfUrl: faker.datatype.boolean({ probability: 0.7 })
          ? faker.internet.url()
          : null,
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );

  if (newInvoice.isOk()) {
    createdInvoices.push(newInvoice.value);
  }
}

// 13. Seed Payments
console.log('\n💳 Seeding payments...');
for (let i = 0; i < SEEDING_CONFIG.payments; i++) {
  const invoice = faker.helpers.arrayElement(createdInvoices);

  const newPayment = await Result.try(() =>
    db
      .insertInto('payments')
      .values({
        invoice: invoice.id,
        amountPaid: faker.commerce.price({ min: 50, max: 5000 }),
        paymentDate: faker.date.recent({ days: 45 }),
        paymentMethod: faker.helpers.arrayElement(paymentMethods),
        transactionId: faker.string.alphanumeric(16).toUpperCase(),
        status: faker.helpers.arrayElement(paymentStatuses),
        notes: faker.datatype.boolean({ probability: 0.3 })
          ? faker.lorem.sentence()
          : null,
      })
      .returningAll()
      .executeTakeFirstOrThrow(),
  );
}

console.log('\n✅ Database seeding completed successfully!');
console.log(`📊 Summary:`);
console.log(`  - Companies: ${createdCompanies.length}`);
console.log(`  - Warehouses: ${createdWarehouses.length}`);
console.log(`  - Users: ${createdUsers.length + 1} (including admin)`);
console.log(`  - Products: ${createdProducts.length}`);
console.log(`  - Vehicles: ${createdVehicles.length}`);
console.log(`  - Orders: ${createdOrders.length}`);
console.log(`  - Routes: ${createdRoutes.length}`);
console.log(`  - Shipments: ${createdShipments.length}`);
console.log(`  - Invoices: ${createdInvoices.length}`);

await db.destroy();
