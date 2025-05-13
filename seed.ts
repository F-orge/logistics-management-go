import { faker } from '@faker-js/faker';
import PocketBase from 'pocketbase';
import {
  type ChatMessagesRecord,
  type ChatMessagesResponse,
  type ChatRoomsRecord,
  type ChatRoomsResponse,
  ChatRoomsTypeOptions,
  Collections,
  type CompaniesRecord,
  type CompaniesResponse,
  CompaniesTypeOptions,
  type DepartmentsRecord,
  type DepartmentsResponse,
  type InventoryItemsRecord,
  type InventoryItemsResponse,
  InventoryItemsStatusOptions,
  type InvoicesRecord,
  type InvoicesResponse,
  InvoicesStatusOptions,
  type NotificationsRecord,
  type NotificationsResponse,
  type OrderLineItemsRecord,
  type OrderLineItemsResponse,
  type OrdersRecord,
  type OrdersResponse,
  OrdersStatusOptions,
  PaymentsPaymentMethodOptions,
  type PaymentsRecord,
  type PaymentsResponse,
  PaymentsStatusOptions,
  type ProductsRecord,
  type ProductsResponse,
  type RouteSegmentsRecord,
  type RouteSegmentsResponse,
  RouteSegmentsSegmentTypeOptions,
  type RoutesRecord,
  type RoutesResponse,
  RoutesStatusOptions,
  type ShipmentsRecord,
  type ShipmentsResponse,
  ShipmentsStatusOptions, // From pocketbase.gen.ts
  type TaskMessagesRecord,
  type TaskMessagesResponse,
  TasksPriorityOptions,
  type TasksRecord,
  type TasksResponse,
  TasksStatusOptions,
  TasksTagsOptions,
  type TypedPocketBase,
  type UsersRecord,
  type UsersResponse,
  UsersRoleOptions,
  type VehiclesRecord,
  type VehiclesResponse,
  VehiclesStatusOptions,
  type WarehousesRecord,
  type WarehousesResponse,
} from './lib/pocketbase.gen.ts'; // Adjust path if your types file is elsewhere

// --- Configuration ---
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090';
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com';
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'password123';

const NUM_USERS = 30;
const NUM_DEPARTMENTS = 5;
const NUM_COMPANIES = 15;
const NUM_WAREHOUSES = 4;
const NUM_PRODUCTS = 60;
const NUM_VEHICLES = 12;
const NUM_ORDERS = 50;
const NUM_ORDER_LINE_ITEMS_PER_ORDER_MAX = 4;
const NUM_SHIPMENTS_PER_ORDER = 1; // Typically 1 shipment per order
const NUM_TASKS = 40;
const NUM_ROUTES = 10;
const NUM_ROUTE_SEGMENTS_PER_ROUTE_MAX = 5;
const NUM_INVOICES_PER_ORDER = 1;
const NUM_PAYMENTS_PER_INVOICE_MAX = 2;
const NUM_CHAT_ROOMS = 20;
const NUM_MESSAGES_PER_ROOM_MAX = 8;
const NUM_TASK_MESSAGES_PER_TASK_MAX = 5;
const NUM_NOTIFICATIONS_PER_USER_AVG = 2;
const NUM_INVENTORY_ITEMS_PER_PRODUCT_WAREHOUSE_MAX = 3;

const STANDARD_USER_PASSWORD = 'password12345';

// --- PocketBase Client ---
const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;

// --- Helper Functions ---
function randomEnumValue<T extends object>(enumObj: T): T[keyof T] {
  const enumValues = Object.values(enumObj) as T[keyof T][];
  return faker.helpers.arrayElement(enumValues);
}

async function createDummyFile(
  fileNamePrefix = 'file',
  contentType = 'image/png',
  customContent?: string | BlobPart[],
  width = 300,
  height = 200,
): Promise<File> {
  let blob: Blob;
  const extension = contentType.split('/')[1] || 'tmp';
  const fileName = `${fileNamePrefix}-${faker.string.uuid()}.${extension}`;

  if (customContent) {
    blob = new Blob(
      Array.isArray(customContent) ? customContent : [customContent],
      { type: contentType },
    );
  } else if (contentType.startsWith('image/')) {
    try {
      const imageUrl = faker.image.urlLoremFlickr({
        category: 'abstract',
        width,
        height,
      });
      const response = await fetch(imageUrl);
      if (!response.ok)
        throw new Error(`Failed to fetch image: ${response.statusText}`);
      blob = await response.blob();
      contentType = blob.type || contentType; // Use actual blob type
    } catch (err) {
      console.warn(
        `Failed to fetch placeholder image for ${fileNamePrefix}, creating dummy blob.`,
        err,
      );
      // Simple dummy image (e.g. a 1x1 pixel gif) as fallback if fetch fails
      const b64 = 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
      blob = new Blob([Uint8Array.from(atob(b64), (c) => c.charCodeAt(0))], {
        type: 'image/gif',
      });
      // blob = new Blob([`Dummy content for ${fileName}`], { type: contentType }); // fallback
    }
  } else if (contentType === 'application/pdf') {
    blob = new Blob(
      [
        `%PDF-1.4\n%Dummy PDF for ${fileName}\n1 0 obj<</Type/Catalog/Pages 2 0 R>>endobj\n2 0 obj<</Type/Pages/Kids[3 0 R]/Count 1>>endobj\n3 0 obj<</Type/Page/MediaBox[0 0 612 792]/Contents 4 0 R/Parent 2 0 R>>endobj\n4 0 obj<</Length 35>>stream\nBT /F1 24 Tf 100 700 Td (Dummy PDF) Tj ET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000016 00000 n \n0000000063 00000 n \n0000000117 00000 n \n0000000197 00000 n \ntrailer<</Size 5/Root 1 0 R>>startxref\n258\n%%EOF`,
      ],
      { type: contentType },
    );
  } else {
    blob = new Blob([faker.lorem.paragraphs()], { type: contentType });
  }
  return new File([blob], fileName, { type: contentType });
}

async function clearCollection(collectionName: Collections) {
  try {
    console.log(`Clearing collection: ${collectionName}...`);
    const records = await pb
      .collection(collectionName)
      .getFullList({ batch: 200 });
    for (const record of records) {
      await pb.collection(collectionName).delete(record.id);
    }
    console.log(`Collection ${collectionName} cleared successfully.`);
  } catch (error) {
    console.error(
      `Error clearing collection ${collectionName}:`,
      (error as any)?.response?.data || error,
    );
  }
}

// --- Seeding Functions ---

async function seedUsers(
  allCompanies: CompaniesResponse[],
  allDepartments: DepartmentsResponse[],
): Promise<UsersResponse[]> {
  console.log('Seeding users...');
  const createdUsers: UsersResponse[] = [];

  for (let i = 0; i < NUM_USERS; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const avatarFile = await createDummyFile(`avatar_user_${i}_`, 'image/jpeg');

    const userData: Partial<UsersRecord> = {
      name: `${firstName} ${lastName}`,
      email: faker.internet.email({
        firstName,
        lastName,
        allowSpecialCharacters: false,
      }), // PocketBase default user has restrictions
      password: 'password123',
      //@ts-ignore
      passwordConfirm: 'password123',
      emailVisibility: true,
      verified: faker.datatype.boolean(0.9),
      role: randomEnumValue(UsersRoleOptions),
      avatar: avatarFile as any,
      address: `<p>${faker.location.streetAddress(true)}</p>`,
      phone: faker.phone.number(),
      company:
        allCompanies.length > 0 && faker.datatype.boolean(0.3)
          ? faker.helpers.arrayElement(allCompanies).id
          : undefined,
      department:
        allDepartments.length > 0 && faker.datatype.boolean(0.7)
          ? faker.helpers.arrayElement(allDepartments).id
          : undefined,
    };
    try {
      const record = await pb
        .collection(Collections.Users)
        .create<UsersResponse>(userData);
      createdUsers.push(record);
      console.log(`Created user: ${record.name} (ID: ${record.id})`);
    } catch (error) {
      console.error(
        `Failed to create user ${userData.name}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdUsers.length} users seeded.`);
  return createdUsers;
}

async function seedCompanies(
  allUsers: UsersResponse[],
): Promise<CompaniesResponse[]> {
  console.log('Seeding companies...');
  const createdCompanies: CompaniesResponse[] = [];
  for (let i = 0; i < NUM_COMPANIES; i++) {
    const companyData: Partial<CompaniesRecord> = {
      name: faker.company.name(),
      type: randomEnumValue(CompaniesTypeOptions),
      address: `<p>${faker.location.streetAddress(true)}</p>`,
      contact_email: faker.internet.email(),
      contact_phone: faker.phone.number(),
      primary_contact_person:
        allUsers.length > 0 && faker.datatype.boolean(0.5)
          ? faker.helpers.arrayElement(allUsers).id
          : undefined,
    };
    try {
      const record = await pb
        .collection(Collections.Companies)
        .create<CompaniesResponse>(companyData);
      createdCompanies.push(record);
      console.log(`Created company: ${record.name} (ID: ${record.id})`);
    } catch (error) {
      console.error(
        `Failed to create company ${companyData.name}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdCompanies.length} companies seeded.`);
  return createdCompanies;
}

async function seedWarehouses(
  allUsers: UsersResponse[],
): Promise<WarehousesResponse[]> {
  console.log('Seeding warehouses...');
  const createdWarehouses: WarehousesResponse[] = [];
  for (let i = 0; i < NUM_WAREHOUSES; i++) {
    const warehouseData: Partial<WarehousesRecord> = {
      name: `Warehouse ${faker.company.buzzNoun()} ${faker.location.city()}`,
      address: `<p>${faker.location.streetAddress(true)}</p>`,
      manager:
        allUsers.length > 0 && faker.datatype.boolean(0.7)
          ? faker.helpers.arrayElement(
              allUsers.filter(
                (u) =>
                  u.role === UsersRoleOptions.warehouse_manager ||
                  u.role === UsersRoleOptions.department_manager,
              ),
            ).id
          : faker.helpers.arrayElement(allUsers).id,
      latitude: faker.location.latitude().toString(),
      longitude: faker.location.longitude().toString(),
    };
    try {
      const record = await pb
        .collection(Collections.Warehouses)
        .create<WarehousesResponse>(warehouseData);
      createdWarehouses.push(record);
      console.log(`Created warehouse: ${record.name} (ID: ${record.id})`);
    } catch (error) {
      console.error(
        `Failed to create warehouse ${warehouseData.name}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdWarehouses.length} warehouses seeded.`);
  return createdWarehouses;
}

async function seedDepartments(
  allUsers: UsersResponse[],
): Promise<DepartmentsResponse[]> {
  console.log('Seeding departments...');
  const createdDepartments: DepartmentsResponse[] = [];

  for (let i = 0; i < NUM_DEPARTMENTS; i++) {
    const avatarFile = await createDummyFile(`avatar_dept_${i}_`, 'image/jpeg');
    const coverFile = await createDummyFile(
      `cover_dept_${i}_`,
      'image/jpeg',
      undefined,
      1200,
      400,
    );

    const potentialManagers = allUsers.filter(
      (u) =>
        u.role === UsersRoleOptions.department_manager ||
        u.role === UsersRoleOptions.executive,
    );
    // Employees for this department will be users who have this department_id set.
    // This requires users to be created first and potentially updated if department_id is assigned here.
    // For simplicity, we can assign managers now. Employees link will be through User.department.
    // Or, we can collect users assigned to this conceptual department (if we pre-assign department concept to users)

    const departmentData: Partial<DepartmentsRecord> = {
      name: faker.commerce.department() + ` ${faker.company.buzzAdjective()}`,
      avatar: avatarFile as any,
      cover_photo: coverFile as any,
      managers:
        potentialManagers.length > 0
          ? faker.helpers
              .arrayElements(potentialManagers, {
                min: 1,
                max: Math.min(2, potentialManagers.length),
              })
              .map((u) => u.id)
          : [],
      // employees field will be populated after users are associated with departments, or queried.
      // For now, we ensure users have a department ID, PocketBase relation might handle the flip side.
      // If `Department.employees` must be set explicitly:
      // employees: allUsers.filter(u => u.department === /* current department id, chicken-egg */).map(u => u.id),
    };
    try {
      const record = await pb
        .collection(Collections.Departments)
        .create<DepartmentsResponse>(departmentData);
      createdDepartments.push(record);
      console.log(`Created department: ${record.name} (ID: ${record.id})`);
    } catch (error) {
      console.error(
        `Failed to create department ${departmentData.name}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  // Second pass to update department employees based on user.department field (if users were seeded with department_id)
  for (const dept of createdDepartments) {
    const deptEmployees = allUsers
      .filter((u) => u.department === dept.id)
      .map((u) => u.id);
    if (deptEmployees.length > 0) {
      try {
        await pb
          .collection(Collections.Departments)
          .update(dept.id, { employees: deptEmployees });
        console.log(
          `Updated department ${dept.name} with ${deptEmployees.length} employees.`,
        );
      } catch (error) {
        console.error(
          `Failed to update employees for department ${dept.name}:`,
          (error as any)?.response?.data || error,
        );
      }
    }
  }
  console.log(`${createdDepartments.length} departments seeded.`);
  return createdDepartments;
}

async function seedProducts(
  allCompanies: CompaniesResponse[],
): Promise<ProductsResponse[]> {
  console.log('Seeding products...');
  const createdProducts: ProductsResponse[] = [];
  const supplierCompanies = allCompanies.filter(
    (c) => c.type === CompaniesTypeOptions.supplier,
  );

  for (let i = 0; i < NUM_PRODUCTS; i++) {
    const imageFiles: File[] = [];
    const numImages = faker.number.int({ min: 0, max: 3 });
    for (let k = 0; k < numImages; k++) {
      imageFiles.push(
        await createDummyFile(`product_${i}_img${k}_`, 'image/jpeg'),
      );
    }

    const productData: Partial<ProductsRecord> = {
      name: faker.commerce.productName(),
      sku: faker.string.alphanumeric(10).toUpperCase(),
      description: `<p>${faker.commerce.productDescription()}</p>`,
      cost: Number.parseFloat(faker.commerce.price({ min: 5, max: 500 })),
      image: imageFiles as any,
      supplier:
        supplierCompanies.length > 0 && faker.datatype.boolean(0.6)
          ? faker.helpers.arrayElement(supplierCompanies).id
          : undefined,
      weight: faker.number.float({ min: 0.1, max: 50 }),
      dimensions: `${faker.number.int({ min: 1, max: 100 })}x${faker.number.int({ min: 1, max: 100 })}x${faker.number.int({ min: 1, max: 100 })} cm`,
    };
    try {
      const record = await pb
        .collection(Collections.Products)
        .create<ProductsResponse>(productData);
      createdProducts.push(record);
      console.log(`Created product: ${record.name} (ID: ${record.id})`);
    } catch (error) {
      console.error(
        `Failed to create product ${productData.name}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdProducts.length} products seeded.`);
  return createdProducts;
}

async function seedVehicles(
  allUsers: UsersResponse[],
): Promise<VehiclesResponse[]> {
  console.log('Seeding vehicles...');
  const createdVehicles: VehiclesResponse[] = [];
  const driverUsers = allUsers.filter(
    (u) => u.role === UsersRoleOptions.delivery_driver,
  );

  for (let i = 0; i < NUM_VEHICLES; i++) {
    const vehicleData: Partial<VehiclesRecord> = {
      license_plate: faker.vehicle.vrm(),
      make: faker.vehicle.manufacturer(),
      model: faker.vehicle.model(),
      type: faker.vehicle.type(),
      status: randomEnumValue(VehiclesStatusOptions),
      current_driver:
        driverUsers.length > 0 && faker.datatype.boolean(0.7)
          ? faker.helpers.arrayElement(driverUsers).id
          : undefined,
      capacity_weight: faker.number.int({ min: 500, max: 15000 }), // in kg
      capacity_volume: faker.number.int({ min: 5, max: 80 }), // in m^3
    };
    try {
      const record = await pb
        .collection(Collections.Vehicles)
        .create<VehiclesResponse>(vehicleData);
      createdVehicles.push(record);
      console.log(
        `Created vehicle: ${record.license_plate} (ID: ${record.id})`,
      );
    } catch (error) {
      console.error(
        `Failed to create vehicle ${vehicleData.license_plate}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdVehicles.length} vehicles seeded.`);
  return createdVehicles;
}

async function seedOrders(
  allUsers: UsersResponse[],
  allCompanies: CompaniesResponse[],
  allWarehouses: WarehousesResponse[],
): Promise<OrdersResponse[]> {
  console.log('Seeding orders...');
  const createdOrders: OrdersResponse[] = [];
  const customerCompanies = allCompanies.filter(
    (c) => c.type === CompaniesTypeOptions.customer,
  );

  for (let i = 0; i < NUM_ORDERS; i++) {
    const orderData: Partial<OrdersRecord> = {
      order_id_custom: `ORD-${faker.string.alphanumeric(8).toUpperCase()}`,
      customer:
        customerCompanies.length > 0
          ? faker.helpers.arrayElement(customerCompanies).id
          : faker.helpers.arrayElement(allCompanies).id, // Fallback if no specific customers
      order_date: faker.date.past({ years: 1 }).toISOString(),
      status: randomEnumValue(OrdersStatusOptions),
      billing_address: `<p>${faker.location.streetAddress(true)}</p>`,
      shipping_address: `<p>${faker.location.streetAddress(true)}</p>`,
      // total_amount will be calculated/updated after line items if desired, or faked here
      total_amount: Number.parseFloat(
        faker.finance.amount({ min: 50, max: 5000 }),
      ),
      created_by:
        allUsers.length > 0
          ? faker.helpers.arrayElement(allUsers).id
          : undefined,
      assigned_warehouse:
        allWarehouses.length > 0 && faker.datatype.boolean(0.8)
          ? faker.helpers.arrayElement(allWarehouses).id
          : undefined,
    };
    try {
      const record = await pb
        .collection(Collections.Orders)
        .create<OrdersResponse>(orderData);
      createdOrders.push(record);
      console.log(
        `Created order: ${record.order_id_custom} (ID: ${record.id})`,
      );
    } catch (error) {
      console.error(
        `Failed to create order ${orderData.order_id_custom}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdOrders.length} orders seeded.`);
  return createdOrders;
}

async function seedOrderLineItems(
  allOrders: OrdersResponse[],
  allProducts: ProductsResponse[],
): Promise<OrderLineItemsResponse[]> {
  console.log('Seeding order line items...');
  const createdItems: OrderLineItemsResponse[] = [];
  if (allProducts.length === 0) {
    console.warn('No products available to create order line items. Skipping.');
    return [];
  }

  for (const order of allOrders) {
    const numItems = faker.number.int({
      min: 1,
      max: NUM_ORDER_LINE_ITEMS_PER_ORDER_MAX,
    });
    let orderTotal = 0;
    for (let i = 0; i < numItems; i++) {
      const product = faker.helpers.arrayElement(allProducts);
      const quantity = faker.number.int({ min: 1, max: 5 });
      const price_per_unit =
        product.cost ||
        Number.parseFloat(faker.commerce.price({ min: 10, max: 200 }));
      const subtotal = quantity * price_per_unit;
      orderTotal += subtotal;

      const itemData: Partial<OrderLineItemsRecord> = {
        order: order.id,
        product: product.id,
        quantity,
        price_per_unit,
        subtotal,
      };
      try {
        const record = await pb
          .collection(Collections.OrderLineItems)
          .create<OrderLineItemsResponse>(itemData);
        createdItems.push(record);
        console.log(
          `Created order line item for order ${order.id}, product ${product.name}`,
        );
      } catch (error) {
        console.error(
          `Failed to create order line item for order ${order.id}:`,
          (error as any)?.response?.data || error,
        );
      }
    }
    // Optionally update order total amount
    try {
      await pb
        .collection(Collections.Orders)
        .update(order.id, { total_amount: orderTotal });
    } catch (error) {
      console.error(
        `Failed to update total for order ${order.id}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdItems.length} order line items seeded.`);
  return createdItems;
}

async function seedShipments(
  allOrders: OrdersResponse[],
  allCompanies: CompaniesResponse[],
  allUsers: UsersResponse[],
  allDepartments: DepartmentsResponse[],
): Promise<ShipmentsResponse[]> {
  console.log('Seeding shipments...');
  const createdShipments: ShipmentsResponse[] = [];
  const carrierCompanies = allCompanies.filter(
    (c) => c.type === CompaniesTypeOptions.carrier,
  );
  const driverUsers = allUsers.filter(
    (u) => u.role === UsersRoleOptions.delivery_driver,
  );

  for (const order of allOrders) {
    if (faker.datatype.boolean(0.9)) {
      // Not all orders might be shipped immediately
      for (let i = 0; i < NUM_SHIPMENTS_PER_ORDER; i++) {
        const proofFiles: File[] = [];
        if (
          randomEnumValue(ShipmentsStatusOptions) ===
            ShipmentsStatusOptions.delivered &&
          faker.datatype.boolean(0.7)
        ) {
          proofFiles.push(
            await createDummyFile(`pod_${order.id}_`, 'image/jpeg'),
          );
        }
        const status = randomEnumValue(ShipmentsStatusOptions);
        const shipmentData: Partial<ShipmentsRecord> = {
          order_ref: order.id,
          tracking_number: `TRK-${faker.string.alphanumeric(12).toUpperCase()}`,
          status,
          carrier:
            carrierCompanies.length > 0 && faker.datatype.boolean(0.8)
              ? faker.helpers.arrayElement(carrierCompanies).id
              : undefined,
          driver:
            driverUsers.length > 0 && faker.datatype.boolean(0.6)
              ? faker.helpers.arrayElement(driverUsers).id
              : undefined,
          department_assigned:
            allDepartments.length > 0 && faker.datatype.boolean(0.5)
              ? faker.helpers.arrayElement(allDepartments).id
              : undefined,
          estimated_delivered_date: faker.date
            .soon({ days: 10, refDate: order.order_date })
            .toISOString(),
          actual_delivered_date:
            status === ShipmentsStatusOptions.delivered
              ? faker.date
                  .recent({ days: 5, refDate: new Date() })
                  .toISOString()
              : undefined,
          current_location_notes: faker.datatype.boolean(0.3)
            ? faker.lorem.sentence()
            : undefined,
          proof_of_delivery: proofFiles as any,
        };

        try {
          const record = await pb
            .collection(Collections.Shipments)
            .create<ShipmentsResponse>(shipmentData as ShipmentsRecord); // cast needed due to partial
          createdShipments.push(record);
          console.log(
            `Created shipment ${record.tracking_number} for order ${order.id}`,
          );
        } catch (error) {
          console.error(
            `Failed to create shipment for order ${order.id}:`,
            (error as any)?.response?.data || error,
          );
        }
      }
    }
  }
  console.log(`${createdShipments.length} shipments seeded.`);
  return createdShipments;
}

async function seedInvoices(
  allOrders: OrdersResponse[],
  allCompanies: CompaniesResponse[],
): Promise<InvoicesResponse[]> {
  console.log('Seeding invoices...');
  const createdInvoices: InvoicesResponse[] = [];
  // const customerCompanies = allCompanies.filter(c => c.type === CompaniesTypeOptions.customer);

  for (const order of allOrders) {
    if (faker.datatype.boolean(0.95)) {
      // Most orders should have an invoice
      for (let i = 0; i < NUM_INVOICES_PER_ORDER; i++) {
        const invoicePdfFile = await createDummyFile(
          `invoice_${order.order_id_custom}_`,
          'application/pdf',
        );
        const invoiceData: Partial<InvoicesRecord> = {
          invoice_number: `INV-${faker.string.alphanumeric(7).toUpperCase()}`,
          customer: order.customer, // Use customer from order
          order_ref: order.id,
          invoice_date: faker.date
            .between({ from: order.order_date, to: new Date() })
            .toISOString(),
          due_date: faker.date
            .future({ years: 0.1, refDate: order.order_date })
            .toISOString(),
          total_amount:
            order.total_amount ||
            Number.parseFloat(faker.finance.amount({ min: 50, max: 5000 })),
          status: randomEnumValue(InvoicesStatusOptions),
          invoice_pdf: invoicePdfFile as any,
        };
        try {
          const record = await pb
            .collection(Collections.Invoices)
            .create<InvoicesResponse>(invoiceData);
          createdInvoices.push(record);
          console.log(
            `Created invoice ${record.invoice_number} for order ${order.id}`,
          );
        } catch (error) {
          console.error(
            `Failed to create invoice for order ${order.id}:`,
            (error as any)?.response?.data || error,
          );
        }
      }
    }
  }
  console.log(`${createdInvoices.length} invoices seeded.`);
  return createdInvoices;
}

async function seedPayments(
  allInvoices: InvoicesResponse[],
): Promise<PaymentsResponse[]> {
  console.log('Seeding payments...');
  const createdPayments: PaymentsResponse[] = [];

  for (const invoice of allInvoices) {
    // Create payments only for invoices that are not draft or void
    if (
      invoice.status !== InvoicesStatusOptions.draft &&
      invoice.status !== InvoicesStatusOptions.void
    ) {
      const numPayments =
        invoice.status === InvoicesStatusOptions.partially_paid
          ? faker.number.int({ min: 1, max: NUM_PAYMENTS_PER_INVOICE_MAX })
          : invoice.status === InvoicesStatusOptions.paid
            ? 1
            : faker.number.int({ min: 0, max: 1 });

      let amountAlreadyPaid = 0;
      for (let i = 0; i < numPayments; i++) {
        let amount_paid = 0;
        if (invoice.total_amount) {
          if (
            i === numPayments - 1 &&
            (invoice.status === InvoicesStatusOptions.paid ||
              (invoice.status === InvoicesStatusOptions.partially_paid &&
                numPayments === 1))
          ) {
            // last payment for paid or single partial
            amount_paid =
              invoice.status === InvoicesStatusOptions.paid
                ? invoice.total_amount - amountAlreadyPaid
                : Number.parseFloat(
                    faker.finance.amount({
                      min: 1,
                      max: (invoice.total_amount - amountAlreadyPaid) * 0.8,
                    }),
                  );
          } else {
            // multiple partial payments
            amount_paid = Number.parseFloat(
              faker.finance.amount({
                min: 10,
                max: Math.max(10, (invoice.total_amount || 100) / numPayments),
              }),
            );
          }
          amount_paid = Math.max(
            0,
            Math.min(amount_paid, invoice.total_amount - amountAlreadyPaid),
          ); // ensure not overpaying
        } else {
          amount_paid = Number.parseFloat(
            faker.finance.amount({ min: 10, max: 1000 }),
          );
        }
        amountAlreadyPaid += amount_paid;

        const paymentData: Partial<PaymentsRecord> = {
          invoice: invoice.id,
          payment_date: faker.date
            .between({ from: invoice.invoice_date, to: new Date() })
            .toISOString(),
          amount_paid,
          payment_method: randomEnumValue(PaymentsPaymentMethodOptions),
          status:
            invoice.status === InvoicesStatusOptions.paid &&
            i === numPayments - 1
              ? PaymentsStatusOptions.completed
              : randomEnumValue(PaymentsStatusOptions),
          transaction_id: faker.finance.ethereumAddress(), // Using ethereumAddress as a generic transaction ID
          notes: faker.datatype.boolean(0.2)
            ? faker.lorem.sentence()
            : undefined,
        };

        if (paymentData.amount_paid && paymentData.amount_paid > 0) {
          try {
            const record = await pb
              .collection(Collections.Payments)
              .create<PaymentsResponse>(paymentData);
            createdPayments.push(record);
            console.log(
              `Created payment for invoice ${invoice.id} with amount ${paymentData.amount_paid}`,
            );
          } catch (error) {
            console.error(
              `Failed to create payment for invoice ${invoice.id}:`,
              (error as any)?.response?.data || error,
            );
          }
        }
      }
    }
  }
  console.log(`${createdPayments.length} payments seeded.`);
  return createdPayments;
}

async function seedTasks(
  allUsers: UsersResponse[],
  allDepartments: DepartmentsResponse[],
  allOrders: OrdersResponse[],
  allShipments: ShipmentsResponse[],
): Promise<TasksResponse[]> {
  console.log('Seeding tasks...');
  const createdTasks: TasksResponse[] = [];
  if (allUsers.length === 0) {
    console.warn('No users available to assign tasks. Skipping task seeding.');
    return [];
  }

  for (let i = 0; i < NUM_TASKS; i++) {
    const assigner = faker.helpers.arrayElement(allUsers);
    const assignees =
      allUsers.length > 1
        ? faker.helpers
            .arrayElements(
              allUsers.filter((u) => u.id !== assigner.id),
              { min: 1, max: Math.min(3, allUsers.length - 1) },
            )
            .map((u) => u.id)
        : [];

    const attachmentFiles: File[] = [];
    if (faker.datatype.boolean(0.3)) {
      const numAttachments = faker.number.int({ min: 1, max: 2 });
      for (let k = 0; k < numAttachments; k++) {
        attachmentFiles.push(
          await createDummyFile(
            `task_${i}_attach${k}_`,
            faker.system.mimeType(),
          ),
        );
      }
    }

    const taskData: Partial<TasksRecord> = {
      title: faker.hacker
        .phrase()
        .replace(/^./, (match) => match.toUpperCase()),
      description: `<p>${faker.lorem.paragraphs({ min: 1, max: 3 })}</p>`,
      status: randomEnumValue(TasksStatusOptions),
      priority: randomEnumValue(TasksPriorityOptions),
      assigner: assigner.id,
      assignees,
      department:
        allDepartments.length > 0 && faker.datatype.boolean(0.6)
          ? faker.helpers.arrayElement(allDepartments).id
          : undefined,
      attachments: attachmentFiles as any,
      due_date: faker.datatype.boolean(0.7)
        ? faker.date.future().toISOString()
        : undefined,
      tags: faker.datatype.boolean(0.5)
        ? randomEnumValue(TasksTagsOptions)
        : undefined, // single tag as per type
      order_ref:
        allOrders.length > 0 && faker.datatype.boolean(0.2)
          ? faker.helpers.arrayElement(allOrders).id
          : undefined,
      related_shipment:
        allShipments.length > 0 && faker.datatype.boolean(0.15)
          ? faker.helpers.arrayElement(allShipments).id
          : undefined,
      kanban_order: faker.number.int({ min: 0, max: 1000 }),
    };
    try {
      const record = await pb
        .collection(Collections.Tasks)
        .create<TasksResponse>(taskData);
      createdTasks.push(record);
      console.log(`Created task: ${record.title} (ID: ${record.id})`);
    } catch (error) {
      console.error(
        `Failed to create task ${taskData.title}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdTasks.length} tasks seeded.`);
  return createdTasks;
}

async function seedChatRooms(
  allUsers: UsersResponse[],
  allOrders: OrdersResponse[],
): Promise<ChatRoomsResponse[]> {
  console.log('Seeding chat rooms...');
  const createdRooms: ChatRoomsResponse[] = [];
  if (allUsers.length < 2) {
    console.warn('Not enough users for chat rooms. Skipping.');
    return [];
  }

  for (let i = 0; i < NUM_CHAT_ROOMS; i++) {
    const roomType = randomEnumValue(ChatRoomsTypeOptions);
    const participants = faker.helpers
      .arrayElements(allUsers, { min: 2, max: Math.min(5, allUsers.length) })
      .map((u) => u.id);

    const roomData: Partial<ChatRoomsRecord> = {
      name:
        roomType === ChatRoomsTypeOptions.group_chat
          ? faker.company.catchPhrase()
          : undefined,
      participants,
      type: roomType,
      related_order:
        roomType === ChatRoomsTypeOptions.order_chat && allOrders.length > 0
          ? faker.helpers.arrayElement(allOrders).id
          : undefined,
      last_message_at: faker.date.recent({ days: 30 }).toISOString(), // Will be updated by messages
    };

    try {
      const record = await pb
        .collection(Collections.ChatRooms)
        .create<ChatRoomsResponse>(roomData);
      createdRooms.push(record);
      console.log(
        `Created chat room: ${record.name || record.id} (Type: ${record.type})`,
      );
    } catch (error) {
      console.error(
        `Failed to create chat room:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdRooms.length} chat rooms seeded.`);
  return createdRooms;
}

async function seedChatMessages(
  allUsers: UsersResponse[],
  allRooms: ChatRoomsResponse[],
): Promise<ChatMessagesResponse[]> {
  console.log('Seeding chat messages...');
  const createdMessages: ChatMessagesResponse[] = [];
  if (allUsers.length === 0 || allRooms.length === 0) {
    console.warn('No users or rooms to create chat messages. Skipping.');
    return [];
  }

  for (const room of allRooms) {
    const numMessages = faker.number.int({
      min: 1,
      max: NUM_MESSAGES_PER_ROOM_MAX,
    });
    // Get participants of the current room
    const roomParticipants = await pb
      .collection(Collections.Users)
      .getFullList({
        filter: `id = "${room.participants.join('" || id = "')}"`,
      });

    if (roomParticipants.length === 0) continue;

    for (let i = 0; i < numMessages; i++) {
      const sender = faker.helpers.arrayElement(roomParticipants);
      const attachmentFiles: File[] = [];
      if (faker.datatype.boolean(0.15)) {
        attachmentFiles.push(
          await createDummyFile(
            `chat_${room.id}_msg${i}_`,
            faker.system.mimeType(),
          ),
        );
      }

      const messageData: Partial<ChatMessagesRecord> = {
        room: room.id,
        sender: sender.id,
        content: `<p>${faker.lorem.sentence()}</p>`,
        attachments: attachmentFiles as any,
        read_by: faker.helpers
          .arrayElements(
            roomParticipants.filter((p) => p.id !== sender.id),
            { min: 0, max: roomParticipants.length - 1 },
          )
          .map((u) => u.id),
      };
      try {
        const record = await pb
          .collection(Collections.ChatMessages)
          .create<ChatMessagesResponse>(messageData);
        createdMessages.push(record);
        // Update room's last_message_at
        await pb
          .collection(Collections.ChatRooms)
          .update(room.id, { last_message_at: record.created });
        console.log(
          `Created chat message in room ${room.id} by sender ${sender.id}`,
        );
      } catch (error) {
        console.error(
          `Failed to create chat message for room ${room.id}:`,
          (error as any)?.response?.data || error,
        );
      }
    }
  }
  console.log(`${createdMessages.length} chat messages seeded.`);
  return createdMessages;
}

async function seedTaskMessages(
  allTasks: TasksResponse[],
  allUsers: UsersResponse[],
): Promise<TaskMessagesResponse[]> {
  console.log('Seeding task messages...');
  const createdTaskMessages: TaskMessagesResponse[] = [];
  if (allTasks.length === 0 || allUsers.length === 0) {
    console.warn('No tasks or users available for task messages. Skipping.');
    return [];
  }

  for (const task of allTasks) {
    const numMessages = faker.number.int({
      min: 0,
      max: NUM_TASK_MESSAGES_PER_TASK_MAX,
    });
    const potentialSenderIds = [
      task.assigner,
      ...(task.assignees || []),
    ].filter(Boolean) as string[];
    if (potentialSenderIds.length === 0) continue;

    const taskParticipants = await pb
      .collection(Collections.Users)
      .getFullList({
        filter: `id = "${potentialSenderIds.join('" || id = "')}"`,
      });
    if (taskParticipants.length === 0) continue;

    for (let i = 0; i < numMessages; i++) {
      const sender = faker.helpers.arrayElement(taskParticipants);
      const attachmentFiles: File[] = [];
      if (faker.datatype.boolean(0.1)) {
        attachmentFiles.push(
          await createDummyFile(
            `taskmsg_${task.id}_msg${i}_`,
            faker.system.mimeType(),
          ),
        );
      }

      const messageData: Partial<TaskMessagesRecord> = {
        task: task.id,
        sender: sender.id,
        content: `<p>${faker.lorem.sentence()}</p>`,
        attachments: attachmentFiles as any,
        read_by: faker.helpers
          .arrayElements(
            taskParticipants.filter((p) => p.id !== sender.id),
            { min: 0, max: taskParticipants.length - 1 },
          )
          .map((u) => u.id),
      };
      try {
        const record = await pb
          .collection(Collections.TaskMessages)
          .create<TaskMessagesResponse>(messageData);
        createdTaskMessages.push(record);
        console.log(
          `Created task message for task ${task.id} by sender ${sender.id}`,
        );
      } catch (error) {
        console.error(
          `Failed to create task message for task ${task.id}:`,
          (error as any)?.response?.data || error,
        );
      }
    }
  }
  console.log(`${createdTaskMessages.length} task messages seeded.`);
  return createdTaskMessages;
}

async function seedRoutes(
  allUsers: UsersResponse[],
  allVehicles: VehiclesResponse[],
  allShipments: ShipmentsResponse[],
): Promise<RoutesResponse[]> {
  console.log('Seeding routes...');
  const createdRoutes: RoutesResponse[] = [];
  const driverUsers = allUsers.filter(
    (u) => u.role === UsersRoleOptions.delivery_driver,
  );

  for (let i = 0; i < NUM_ROUTES; i++) {
    const routeData: Partial<RoutesRecord> = {
      route_name: `Route ${faker.string.alphanumeric(6).toUpperCase()}`,
      driver_assigned:
        driverUsers.length > 0 && faker.datatype.boolean(0.8)
          ? faker.helpers.arrayElement(driverUsers).id
          : undefined,
      vehicle_assigned:
        allVehicles.length > 0 && faker.datatype.boolean(0.8)
          ? faker.helpers.arrayElement(allVehicles).id
          : undefined,
      planned_start_time: faker.date.soon({ days: 5 }).toISOString(),
      planned_end_time: faker.date.soon({ days: 7 }).toISOString(), // Ensure end is after start
      status: randomEnumValue(RoutesStatusOptions),
      // shipments_on_route is RecordIdString, so one shipment. Maybe primary one? Or handled by RouteSegments.
      // Let's assume it's an optional primary shipment defining the route's main purpose.
      shipments_on_route:
        allShipments.length > 0 && faker.datatype.boolean(0.3)
          ? faker.helpers.arrayElement(allShipments).id
          : undefined,
      latitude: faker.datatype.boolean(0.5)
        ? Number.parseFloat(faker.location.latitude().toFixed(6))
        : undefined,
      longitude: faker.datatype.boolean(0.5)
        ? Number.parseFloat(faker.location.longitude().toFixed(6))
        : undefined,
    };
    if (
      routeData.planned_start_time &&
      routeData.planned_end_time &&
      new Date(routeData.planned_end_time) <
        new Date(routeData.planned_start_time)
    ) {
      routeData.planned_end_time = faker.date
        .future({ refDate: routeData.planned_start_time })
        .toISOString();
    }

    try {
      const record = await pb
        .collection(Collections.Routes)
        .create<RoutesResponse>(routeData);
      createdRoutes.push(record);
      console.log(`Created route: ${record.route_name} (ID: ${record.id})`);
    } catch (error) {
      console.error(
        `Failed to create route ${routeData.route_name}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdRoutes.length} routes seeded.`);
  return createdRoutes;
}

async function seedRouteSegments(
  allRoutes: RoutesResponse[],
  allShipments: ShipmentsResponse[],
): Promise<RouteSegmentsResponse[]> {
  console.log('Seeding route segments...');
  const createdSegments: RouteSegmentsResponse[] = [];

  for (const route of allRoutes) {
    const numSegments = faker.number.int({
      min: 2,
      max: NUM_ROUTE_SEGMENTS_PER_ROUTE_MAX,
    });
    let lastTime = route.planned_start_time
      ? new Date(route.planned_start_time)
      : new Date();

    for (let i = 0; i < numSegments; i++) {
      const segmentType =
        i === 0
          ? RouteSegmentsSegmentTypeOptions.start_point
          : randomEnumValue(RouteSegmentsSegmentTypeOptions);
      const estArrival = faker.date.soon({ days: 1, refDate: lastTime });
      const estDeparture = faker.date.soon({ days: 0.1, refDate: estArrival }); // depart shortly after arrival
      lastTime = estDeparture;

      const segmentData: Partial<RouteSegmentsRecord> = {
        route: route.id,
        sequence_number: i + 1,
        segment_type: segmentType,
        address_text:
          segmentType !== RouteSegmentsSegmentTypeOptions.waypoint
            ? `<p>${faker.location.streetAddress(true)}</p>`
            : undefined,
        latitude: faker.location.latitude().toString(),
        longitude: faker.location.longitude().toString(),
        estimated_arrival_time: estArrival.toISOString(),
        estimated_departure_time: estDeparture.toISOString(),
        instructions: faker.datatype.boolean(0.4)
          ? faker.lorem.sentence()
          : undefined,
        related_shipment:
          (segmentType === RouteSegmentsSegmentTypeOptions.pickup ||
            segmentType === RouteSegmentsSegmentTypeOptions.delivery) &&
          allShipments.length > 0 &&
          faker.datatype.boolean(0.7)
            ? faker.helpers.arrayElement(allShipments).id
            : undefined,
        // actual times would be set during route execution
      };
      try {
        const record = await pb
          .collection(Collections.RouteSegments)
          .create<RouteSegmentsResponse>(segmentData);
        createdSegments.push(record);
        console.log(
          `Created route segment ${record.sequence_number} for route ${route.id}`,
        );
      } catch (error) {
        console.error(
          `Failed to create route segment for route ${route.id}:`,
          (error as any)?.response?.data || error,
        );
      }
    }
  }
  console.log(`${createdSegments.length} route segments seeded.`);
  return createdSegments;
}

async function seedInventoryItems(
  allProducts: ProductsResponse[],
  allWarehouses: WarehousesResponse[],
): Promise<InventoryItemsResponse[]> {
  console.log('Seeding inventory items...');
  const createdItems: InventoryItemsResponse[] = [];
  if (allProducts.length === 0 || allWarehouses.length === 0) {
    console.warn('No products or warehouses for inventory items. Skipping.');
    return [];
  }

  for (const product of allProducts) {
    for (const warehouse of allWarehouses) {
      if (faker.datatype.boolean(0.5)) {
        // Not every product in every warehouse
        const numItemVariants = faker.number.int({
          min: 1,
          max: NUM_INVENTORY_ITEMS_PER_PRODUCT_WAREHOUSE_MAX,
        });
        for (let i = 0; i < numItemVariants; i++) {
          const itemData: Partial<InventoryItemsRecord> = {
            product: product.id,
            warehouse: warehouse.id,
            quantity_on_hand: faker.number.int({ min: 0, max: 500 }),
            status: randomEnumValue(InventoryItemsStatusOptions),
            lot_number: faker.datatype.boolean(0.6)
              ? faker.string.alphanumeric(10)
              : undefined,
            serial_number: faker.datatype.boolean(0.3)
              ? faker.string.uuid()
              : undefined,
            expiry_date: faker.datatype.boolean(0.2)
              ? faker.date.future({ years: 2 }).toISOString()
              : undefined,
            last_counted_date: faker.date.recent({ days: 90 }).toISOString(),
            storage_location_code: `LOC-${faker.string.alphanumeric(5).toUpperCase()}`,
          };
          try {
            const record = await pb
              .collection(Collections.InventoryItems)
              .create<InventoryItemsResponse>(itemData);
            createdItems.push(record);
            console.log(
              `Created inventory item for product ${product.name} in warehouse ${warehouse.name}`,
            );
          } catch (error) {
            console.error(
              `Failed to create inventory item for ${product.name}:`,
              (error as any)?.response?.data || error,
            );
          }
        }
      }
    }
  }
  console.log(`${createdItems.length} inventory items seeded.`);
  return createdItems;
}

async function seedNotifications(
  allUsers: UsersResponse[],
): Promise<NotificationsResponse[]> {
  console.log('Seeding notifications...');
  const createdNotifications: NotificationsResponse[] = [];
  if (allUsers.length === 0) {
    console.warn('No users to send notifications to. Skipping.');
    return [];
  }

  for (let i = 0; i < NUM_USERS * NUM_NOTIFICATIONS_PER_USER_AVG; i++) {
    const user = faker.helpers.arrayElement(allUsers);
    const notificationData: Partial<NotificationsRecord> = {
      user: user.id,
      title: faker.company.catchPhrase(),
      message: `<p>${faker.lorem.sentence()}</p>`, // Message is HTMLString in some definitions, ensure this
      is_read: faker.datatype.boolean(0.3), // if you add an is_read field
    };
    try {
      const record = await pb
        .collection(Collections.Notifications)
        .create<NotificationsResponse>(notificationData);
      createdNotifications.push(record);
      console.log(`Created notification for user ${user.id}: ${record.title}`);
    } catch (error) {
      console.error(
        `Failed to create notification for user ${user.id}:`,
        (error as any)?.response?.data || error,
      );
    }
  }
  console.log(`${createdNotifications.length} notifications seeded.`);
  return createdNotifications;
}

// --- Main Seeding Orchestrator ---
async function seedDatabase() {
  try {
    console.log(ADMIN_EMAIL, ADMIN_PASSWORD);
    await pb
      .collection('_superusers')
      .authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
    console.log('Admin authentication successful.');

    console.warn('--- STARTING DATA DELETION ---');
    // Clear in reverse order of creation or consider dependencies
    await clearCollection(Collections.TaskMessages);
    await clearCollection(Collections.ChatMessages);
    await clearCollection(Collections.RouteSegments);
    await clearCollection(Collections.Payments);
    await clearCollection(Collections.OrderLineItems);
    await clearCollection(Collections.InventoryItems);
    await clearCollection(Collections.Notifications);
    await clearCollection(Collections.Shipments); // before Orders, Tasks
    await clearCollection(Collections.Invoices); // before Orders
    await clearCollection(Collections.Tasks); // before Users, Departments, Orders, Shipments
    await clearCollection(Collections.ChatRooms); // before Users, Orders
    await clearCollection(Collections.Routes); // before Users, Vehicles, Shipments
    await clearCollection(Collections.Orders); // before Companies, Users, Warehouses
    await clearCollection(Collections.Products); // before Companies
    await clearCollection(Collections.Vehicles); // before Users
    await clearCollection(Collections.Departments); // before Users
    await clearCollection(Collections.Warehouses); // before Users
    await clearCollection(Collections.Companies); // before Users
    await clearCollection(Collections.Users);
    console.warn('--- DATA DELETION COMPLETE ---');

    console.log('--- STARTING DATA SEEDING ---');
    // Seed in order of dependency
    const companies = await seedCompanies([]); // No user dependency initially for primary_contact_person, can be updated
    const preliminaryDepartments = await seedDepartments([]); // No user dependency for managers initially

    const users = await seedUsers(companies, preliminaryDepartments); // Users can now link to companies and preliminary departments

    // Update companies with primary contacts if any were missed or to use newly created users
    for (const company of companies) {
      if (
        !company.primary_contact_person &&
        users.length > 0 &&
        faker.datatype.boolean(0.3)
      ) {
        await pb.collection(Collections.Companies).update(company.id, {
          primary_contact_person: faker.helpers.arrayElement(users).id,
        });
      }
    }
    // Re-seed/Update departments to correctly link managers and employees from the full user list
    const departments = await seedDepartments(users); // This will re-iterate, or better to update existing ones.
    // For simplicity of this script, we can assume the first pass created shells,
    // and this pass properly links. A more optimized way would be to update.
    // The current seedDepartments already does a second pass for employees.
    // We need to ensure managers are also correctly linked.

    const warehouses = await seedWarehouses(users);
    const products = await seedProducts(companies);
    const vehicles = await seedVehicles(users);

    const orders = await seedOrders(users, companies, warehouses);
    await seedOrderLineItems(orders, products); // Depends on Orders, Products

    const shipments = await seedShipments(
      orders,
      companies,
      users,
      departments,
    ); // Depends on Orders, Companies, Users, Departments
    const invoices = await seedInvoices(orders, companies); // Depends on Orders, Companies
    await seedPayments(invoices); // Depends on Invoices

    const tasks = await seedTasks(users, departments, orders, shipments); // Depends on Users, Depts, Orders, Shipments

    const chatRooms = await seedChatRooms(users, orders); // Depends on Users, Orders
    await seedChatMessages(users, chatRooms); // Depends on Users, ChatRooms

    await seedTaskMessages(tasks, users); // Depends on Tasks, Users

    const routes = await seedRoutes(users, vehicles, shipments); // Depends on Users, Vehicles, Shipments
    await seedRouteSegments(routes, shipments); // Depends on Routes, Shipments

    await seedInventoryItems(products, warehouses); // Depends on Products, Warehouses
    await seedNotifications(users); // Depends on Users

    console.log('--- DATABASE SEEDING COMPLETE ---');
  } catch (error) {
    console.error(
      'An error occurred during the seeding process:',
      (error as any)?.response?.data || error,
    );
  } finally {
    pb.authStore.clear();
    console.log('Admin auth cleared. Seeding script finished.');
  }
}

// Run the seeder
seedDatabase();
