import { faker } from "@faker-js/faker";
import PocketBase from "pocketbase";
import {
  Collections,
  CustomerRelationsCasesPriorityOptions,
  CustomerRelationsCasesStatusOptions,
  CustomerRelationsCasesTypeOptions,
  CustomerRelationsInteractionsTypeOptions,
  CustomerRelationsInvoicesPaymentMethodOptions,
  CustomerRelationsInvoicesStatusOptions,
  CustomerRelationsLeadsSourceOptions,
  CustomerRelationsLeadsStatusOptions,
  CustomerRelationsOpportunitiesSourceOptions,
  CustomerRelationsOpportunitiesStageOptions,
  CustomerRelationsProductsTypeOptions,
  TransportManagementCarrierRatesUnitOptions,
  TransportManagementDriversStatusOptions,
  TransportManagementTripStopsStatusOptions,
  TransportManagementTripsStatusOptions,
  TransportManagementVehiclesStatusOptions,
  UsersRolesOptions,
  WarehouseManagementInboundShipmentsStatusOptions,
  WarehouseManagementInventoryAdjustmentReasonOptions,
  WarehouseManagementInventoryStockStatusOptions,
  WarehouseManagementLocationsTypeOptions,
  WarehouseManagementOutboundShipmentsStatusOptions,
  WarehouseManagementProductsStatusOptions,
  WarehouseManagementSalesOrdersStatusOptions,
} from "../src/lib/pb.types";

const pb = new PocketBase(process.env.POCKETBASE_URL || "http://localhost:8090");

// Store IDs for cross-phase references
const ids: Record<string, any> = {
  users: {} as Record<string, string>,
  companies: {} as Record<string, string>,
  contacts: {} as Record<string, string>,
  products: {
    crm: {} as Record<string, string>,
    wms: {} as Record<string, string>,
  },
  warehouses: {} as Record<string, string>,
  locations: {} as Record<string, string>,
  suppliers: {} as Record<string, string>,
  drivers: {} as Record<string, string>,
  vehicles: {} as Record<string, string>,
  carriers: {} as Record<string, string>,
  campaigns: {} as Record<string, string>,
  opportunities: {} as Record<string, string>,
  inventoryBatches: {} as Record<string, string>,
  inventoryStock: {} as Record<string, string>,
  carrierRates: {} as Record<string, string>,
  salesOrders: {} as Record<string, string>,
  inboundShipments: {} as Record<string, string>,
  outboundShipments: {} as Record<string, string>,
  routes: {} as Record<string, string>,
  trips: {} as Record<string, string>,
  tripStops: {} as Record<string, string>,
  gpsPings: {} as Record<string, string>,
};

// ============================================================================
// AUTHENTICATION
// ============================================================================

async function authenticateAsAdmin() {
  try {
    await pb
      .collection(Collections.Superusers)
      .authWithPassword(
        process.env.POCKETBASE_ADMIN || "admin@example.com",
        process.env.POCKETBASE_PASSWORD || "admin123456"
      );
    console.log("✓ Authenticated as admin");
  } catch (error) {
    console.error("✗ Failed to authenticate as admin:", error);
    throw error;
  }
}

// ============================================================================
// PHASE 1: USERS (Foundational)
// ============================================================================

async function seedPhase1Users() {
  console.log("\n📝 PHASE 1: Seeding Users...");

  const roles = [
    UsersRolesOptions["sales-rep"],
    UsersRolesOptions["account-manager"],
    UsersRolesOptions["warehouse-manager"],
    UsersRolesOptions.driver,
    UsersRolesOptions.dispatcher,
    UsersRolesOptions["inventory-manager"],
    UsersRolesOptions.picker,
    UsersRolesOptions["logistics-coordinator"],
    UsersRolesOptions["finance-manager"],
    UsersRolesOptions["logistics-manager"],
  ];

  const users = Array.from({ length: 10 }, () => ({
    email: faker.internet.email(),
    password: "SecurePass123!",
    name: faker.person.fullName(),
    roles: [faker.helpers.arrayElement(roles)],
  }));

  for (const userData of users) {
    try {
      const user = await pb.collection(Collections.Users).create({
        ...userData,
        passwordConfirm: userData.password,
        emailVisibility: true,
      });
      ids.users[userData.email] = user.id;
      console.log(`  ✓ Created user: ${userData.name} (${userData.email})`);
    } catch (error: any) {
      console.error(`  ✗ Failed to create user ${userData.email}:`, error?.response?.message || error.message);
    }
  }

  console.log(`✓ Phase 1 Complete: Created ${Object.keys(ids.users).length} users`);
}

// ============================================================================
// PHASE 2: CRM CORE (Companies, Contacts, Products)
// ============================================================================

async function seedPhase2CRMCore() {
  console.log("\n📝 PHASE 2: Seeding CRM Core (Companies, Contacts, Products)...");

  // Get a user ID to use as owner
  const ownerUserId = Object.values(ids.users)[0];
  if (!ownerUserId) {
    console.error("✗ No users found. Phase 1 must run first.");
    return;
  }

  // Seed Companies
  const companies = Array.from({ length: 4 }, () => ({
    name: faker.company.name(),
    industry: faker.helpers.arrayElement([
      "Logistics & Transportation",
      "Delivery Services",
      "Warehousing & Storage",
      "Supply Chain",
    ]),
    annualRevenue: faker.number.int({ min: 1000000, max: 10000000 }),
    website: faker.internet.url(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    country: "USA",
    postalCode: faker.location.zipCode("#####"),
    owner: ownerUserId,
  }));

  console.log("  Creating companies...");
  for (const companyData of companies) {
    try {
      const company = await pb.collection(Collections.CustomerRelationsCompanies).create(companyData);
      ids.companies[company.name] = company.id;
      console.log(`    ✓ ${company.name}`);
    } catch (error: any) {
      console.error(
        `    ✗ Failed to create ${companyData.name}:`,
        error?.response?.data || error?.response?.message || error.message
      );
    }
  }

  // Seed Contacts (linked to companies)
  const companyIds = Object.values(ids.companies);
  if (companyIds.length === 0) {
    console.warn("  ⚠ No companies created. Skipping contacts.");
  } else {
    const contacts = Array.from({ length: 8 }, () => ({
      name: faker.person.fullName(),
      email: faker.internet.email(),
      jobTitle: faker.person.jobTitle(),
      company: faker.helpers.arrayElement(companyIds),
      owner: ownerUserId,
    }));

    console.log("  Creating contacts...");
    for (const contactData of contacts) {
      try {
        const contact = await pb.collection(Collections.CustomerRelationsContacts).create(contactData);
        ids.contacts[contact.name] = contact.id;
        console.log(`    ✓ ${contact.name}`);
      } catch (error: any) {
        console.error(
          `    ✗ Failed to create ${contactData.name}:`,
          error?.response?.data || error?.response?.message || error.message
        );
      }
    }
  }

  // Seed CRM Products
  const serviceNames = [
    "Freight Service",
    "Express Delivery",
    "Warehousing",
    "Logistics Management",
    "Storage Solution",
    "Transport Service",
    "Inventory Management",
    "Distribution Service",
  ];

  const crmProducts = serviceNames.map(() => ({
    name: `${faker.company.name()} Service`,
    sku: faker.string.alphanumeric(8).toUpperCase(),
    type: faker.helpers.arrayElement([
      CustomerRelationsProductsTypeOptions.service,
      CustomerRelationsProductsTypeOptions.subscription,
    ]),
    price: faker.number.int({ min: 100, max: 5000 }),
    description: faker.commerce.productDescription(),
  }));

  console.log("  Creating CRM products...");
  for (const productData of crmProducts) {
    try {
      const product = await pb.collection(Collections.CustomerRelationsProducts).create(productData);
      ids.products.crm[product.name] = product.id;
      console.log(`    ✓ ${product.name}`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create ${productData.name}:`, error?.response?.message || error.message);
    }
  }

  console.log(
    `✓ Phase 2 Complete: Created ${Object.keys(ids.companies).length} companies, ${Object.keys(ids.contacts).length} contacts, ${Object.keys(ids.products.crm).length} products`
  );
}

// ============================================================================
// PHASE 3: MARKETING/SALES (Campaigns, Leads, Opportunities)
// ============================================================================

async function seedPhase3MarketingSales() {
  console.log("\n📝 PHASE 3: Seeding Marketing/Sales Data (Campaigns, Leads, Opportunities)...");

  const ownerUserId = Object.values(ids.users)[0];
  const userIds = Object.values(ids.users);
  const companyIds = Object.values(ids.companies);
  const contactIds = Object.values(ids.contacts);
  const crmProductIds = Object.values(ids.products.crm);

  if (!ownerUserId || companyIds.length === 0 || crmProductIds.length === 0) {
    console.error("✗ Missing prerequisite data. Phases 1 and 2 must run first.");
    return;
  }

  // Seed Campaigns
  const campaigns = Array.from({ length: 5 }, () => ({
    name: `${faker.commerce.department()} Campaign - ${faker.word.adjective()}`,
    budget: faker.number.int({ min: 5000, max: 50000 }),
    startDate: faker.date.past({ years: 1 }).toISOString().split("T")[0],
    endDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
  }));

  console.log("  Creating campaigns...");
  for (const campaignData of campaigns) {
    try {
      const campaign = await pb.collection(Collections.CustomerRelationsCampaigns).create(campaignData);
      ids.campaigns[campaign.name] = campaign.id;
      console.log(`    ✓ ${campaign.name}`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create ${campaignData.name}:`, error?.response?.message || error.message);
    }
  }

  // Seed Leads (linked to campaigns, users)
  const campaignIds = Object.values(ids.campaigns);
  if (campaignIds.length === 0) {
    console.warn("  ⚠ No campaigns created. Skipping leads and opportunities.");
    return;
  }

  const leadSources = Object.values(CustomerRelationsLeadsSourceOptions);
  const leadStatuses = Object.values(CustomerRelationsLeadsStatusOptions);

  const leads = Array.from({ length: 12 }, () => ({
    name: faker.person.fullName(),
    email: faker.internet.email(),
    campaign: faker.helpers.arrayElement(campaignIds),
    owner: faker.helpers.arrayElement(userIds),
    score: faker.number.int({ min: 0, max: 100 }),
    source: faker.helpers.arrayElement(leadSources),
    status: faker.helpers.arrayElement(leadStatuses),
  }));

  console.log("  Creating leads...");
  for (const leadData of leads) {
    try {
      const lead = await pb.collection(Collections.CustomerRelationsLeads).create(leadData);
      console.log(`    ✓ ${lead.name} (Score: ${lead.score})`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create ${leadData.name}:`, error?.response?.message || error.message);
    }
  }

  // Seed Opportunities (linked to companies, contacts, campaigns, products)
  const stages = Object.values(CustomerRelationsOpportunitiesStageOptions);
  const sources = Object.values(CustomerRelationsOpportunitiesSourceOptions);

  const opportunities = Array.from({ length: 8 }, () => ({
    name: `${faker.commerce.productName()} Deal`,
    company: faker.helpers.arrayElement(companyIds),
    contact: faker.helpers.arrayElement(contactIds),
    campaign: faker.helpers.arrayElement(campaignIds),
    owner: faker.helpers.arrayElement(userIds),
    dealValue: faker.number.int({ min: 10000, max: 500000 }),
    probability: faker.number.int({ min: 10, max: 100 }),
    source: faker.helpers.arrayElement(sources),
    stage: faker.helpers.arrayElement(stages),
    expectedCloseDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
  }));

  console.log("  Creating opportunities...");
  for (const opportunityData of opportunities) {
    try {
      const opportunity = await pb.collection(Collections.CustomerRelationsOpportunities).create(opportunityData);
      ids.opportunities[opportunity.name] = opportunity.id;
      console.log(`    ✓ ${opportunity.name} ($${opportunity.dealValue})`);

      // Link products to opportunity
      const numProducts = faker.number.int({ min: 1, max: 3 });
      const selectedProducts = faker.helpers.arrayElements(crmProductIds, numProducts);

      for (const productId of selectedProducts) {
        try {
          await pb.collection(Collections.CustomerRelationsOpportunityProducts).create({
            opportunity: opportunity.id,
            product: productId,
            quantity: faker.number.int({ min: 1, max: 10 }),
          });
        } catch (error: any) {
          console.error(`      ✗ Failed to link product:`, error?.response?.message || error.message);
        }
      }
    } catch (error: any) {
      console.error(`    ✗ Failed to create ${opportunityData.name}:`, error?.response?.message || error.message);
    }
  }

  console.log(
    `✓ Phase 3 Complete: Created ${Object.keys(ids.campaigns).length} campaigns, ${Object.keys(ids.opportunities).length} opportunities`
  );
}

// ============================================================================
// PHASE 4: CRM SECONDARY (Interactions, Cases, Invoices)
// ============================================================================

async function seedPhase4CRMSecondary() {
  console.log("\n📝 PHASE 4: Seeding CRM Secondary (Interactions, Cases, Invoices)...");

  const ownerUserId = Object.values(ids.users)[0];
  const userIds = Object.values(ids.users);
  const contactIds = Object.values(ids.contacts);
  const opportunityIds = Object.values(ids.opportunities);
  const crmProductIds = Object.values(ids.products.crm);

  if (!ownerUserId || contactIds.length === 0) {
    console.error("✗ Missing prerequisite data. Phases 1-3 must run first.");
    return;
  }

  // Seed Interactions (linked to contacts, users, cases)
  const interactionTypes = Object.values(CustomerRelationsInteractionsTypeOptions);

  const interactions = Array.from({ length: 15 }, () => ({
    contact: faker.helpers.arrayElement(contactIds),
    user: faker.helpers.arrayElement(userIds),
    type: faker.helpers.arrayElement(interactionTypes),
    interactionDate: faker.date.past({ years: 1 }).toISOString(),
    notes: faker.commerce.productDescription(),
    outcome: faker.helpers.arrayElement(["positive", "neutral", "negative", "follow-up needed"]),
  }));

  console.log("  Creating interactions...");
  for (const interactionData of interactions) {
    try {
      const interaction = await pb.collection(Collections.CustomerRelationsInteractions).create(interactionData);
      console.log(`    ✓ ${interaction.type} with contact (${interaction.outcome})`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create interaction:`, error?.response?.message || error.message);
    }
  }

  // Seed Cases (linked to contacts, owner)
  const casePriorities = Object.values(CustomerRelationsCasesPriorityOptions);
  const caseStatuses = Object.values(CustomerRelationsCasesStatusOptions);
  const caseTypes = Object.values(CustomerRelationsCasesTypeOptions);

  const cases = Array.from({ length: 8 }, (_, i) => ({
    caseNumber: `CASE-${Date.now()}-${i}`,
    contact: faker.helpers.arrayElement(contactIds),
    owner: faker.helpers.arrayElement(userIds),
    priority: faker.helpers.arrayElement(casePriorities),
    status: faker.helpers.arrayElement(caseStatuses),
    type: faker.helpers.arrayElement(caseTypes),
    description: faker.commerce.productDescription(),
  }));

  console.log("  Creating cases...");
  for (const caseData of cases) {
    try {
      const caseRecord = await pb.collection(Collections.CustomerRelationsCases).create(caseData);
      console.log(`    ✓ ${caseRecord.caseNumber} (${caseRecord.priority} - ${caseRecord.status})`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create case:`, error?.response?.message || error.message);
    }
  }

  // Seed Invoices (linked to opportunities, with items)
  const invoiceStatuses = Object.values(CustomerRelationsInvoicesStatusOptions);
  const paymentMethods = Object.values(CustomerRelationsInvoicesPaymentMethodOptions);

  const invoices = Array.from({ length: 6 }, (_, i) => ({
    invoiceNumber: `INV-${Date.now()}-${i}`,
    opportunity: opportunityIds.length > 0 ? faker.helpers.arrayElement(opportunityIds) : undefined,
    status: faker.helpers.arrayElement(invoiceStatuses),
    issueDate: faker.date.past({ years: 1 }).toISOString().split("T")[0],
    dueDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
    paymentMethod: faker.helpers.arrayElement(paymentMethods),
  }));

  console.log("  Creating invoices...");
  for (const invoiceData of invoices) {
    try {
      const invoice = await pb.collection(Collections.CustomerRelationsInvoices).create(invoiceData);
      console.log(`    ✓ ${invoice.invoiceNumber} (${invoice.status})`);

      // Add invoice items
      if (crmProductIds.length > 0) {
        const numItems = faker.number.int({ min: 1, max: 3 });
        const selectedProducts = faker.helpers.arrayElements(crmProductIds, numItems);

        for (const productIdElement of selectedProducts) {
          try {
            const productId = String(productIdElement);
            const quantity = faker.number.int({ min: 1, max: 5 });

            await pb.collection(Collections.CustomerRelationsInvoiceItems).create({
              invoice: invoice.id,
              product: productId,
              quantity,
              price: faker.number.int({ min: 100, max: 1000 }) * quantity,
            });
          } catch (error: any) {
            console.error(`      ✗ Failed to add invoice item:`, error?.response?.message || error.message);
          }
        }
      }
    } catch (error: any) {
      console.error(`    ✗ Failed to create invoice:`, error?.response?.message || error.message);
    }
  }

  console.log(
    `✓ Phase 4 Complete: Created ${Object.keys(ids.interactions || {}).length} interactions, cases, and invoices`
  );
}

// ============================================================================
// PHASE 5: WAREHOUSE SETUP (Warehouses, Locations, Bin Thresholds)
// ============================================================================

async function seedPhase5WarehouseSetup() {
  console.log("\n📝 PHASE 5: Seeding Warehouse Setup...");

  // Seed Warehouses
  const warehouseData = [
    { name: "Warehouse-NYC", city: "New York", state: "NY", country: "USA", postalCode: "10001" },
    { name: "Warehouse-LA", city: "Los Angeles", state: "CA", country: "USA", postalCode: "90001" },
    { name: "Warehouse-Chicago", city: "Chicago", state: "IL", country: "USA", postalCode: "60601" },
  ];

  console.log("  Creating warehouses...");
  for (const warehouse of warehouseData) {
    try {
      const created = await pb.collection(Collections.WarehouseManagementWarehouses).create({
        name: warehouse.name,
        city: warehouse.city,
        state: warehouse.state,
        country: warehouse.country,
        postalCode: warehouse.postalCode,
        address: faker.location.streetAddress(),
        contactPerson: faker.person.fullName(),
        contactEmail: faker.internet.email(),
        contactPhone: faker.phone.number({ style: "international" }),
        isActive: true,
      });
      ids.warehouses[warehouse.name] = created.id;
      console.log(`    ✓ ${warehouse.name} (${warehouse.city}, ${warehouse.state})`);

      // Create locations within warehouse
      const locationTypes = Object.values(WarehouseManagementLocationsTypeOptions);
      for (let i = 0; i < faker.number.int({ min: 5, max: 10 }); i++) {
        try {
          const location = await pb.collection(Collections.WarehouseManagementLocations).create({
            warehouse: created.id,
            aisle: String.fromCharCode(65 + (i % 10)),
            row: Math.floor(i / 10) + 1,
            bin: (i % 5) + 1,
            type: faker.helpers.arrayElement(locationTypes),
          });
          ids.locations[`${warehouse.name}-LOC-${i}`] = location.id;
        } catch (error: any) {
          console.error(`      ✗ Failed to create location:`, error?.response?.message || error.message);
        }
      }
    } catch (error: any) {
      console.error(`    ✗ Failed to create warehouse:`, error?.response?.message || error.message);
    }
  }

  console.log(
    `✓ Phase 5 Complete: Created ${Object.keys(ids.warehouses).length} warehouses and ${Object.keys(ids.locations).length} locations`
  );
}

// ============================================================================
// PHASE 6: INVENTORY MANAGEMENT (Suppliers, Products, Batches, Stock, Thresholds)
// ============================================================================

async function seedPhase6InventoryManagement() {
  console.log("\n📝 PHASE 6: Seeding Inventory Management...");

  const warehouseIds = Object.values(ids.warehouses);
  const locationIds = Object.values(ids.locations);

  if (warehouseIds.length === 0) {
    console.error("✗ Missing warehouses. Phase 5 must run first.");
    return;
  }

  // Seed Suppliers
  const supplierNames = ["FreshGoods Corp", "Global Supply Co", "Industrial Parts Ltd"];
  console.log("  Creating suppliers...");
  for (const name of supplierNames) {
    try {
      const supplier = await pb.collection(Collections.WarehouseManagementSuppliers).create({
        name,
        email: faker.internet.email(),
        phone: faker.phone.number(),
      });
      ids.suppliers[name] = supplier.id;
      console.log(`    ✓ ${name}`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create supplier:`, error?.response?.message || error.message);
    }
  }

  // Seed WMS Products
  const productNames = ["Widget A", "Gadget B", "Component C", "Part D", "Item E", "Product F"];
  console.log("  Creating warehouse products...");
  for (const name of productNames) {
    try {
      const product = await pb.collection(Collections.WarehouseManagementProducts).create({
        name,
        sku: faker.string.alphanumeric(8).toUpperCase(),
        barcode: faker.string.numeric(12),
        status: faker.helpers.arrayElement(Object.values(WarehouseManagementProductsStatusOptions)),
        supplier:
          Object.values(ids.suppliers).length > 0
            ? faker.helpers.arrayElement(Object.values(ids.suppliers))
            : undefined,
        unitCost: faker.number.float({ min: 10, max: 500, multipleOf: 0.01 }),
      });
      ids.products.wms[name] = product.id;
      console.log(`    ✓ ${name} (SKU: ${product.sku})`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create product:`, error?.response?.message || error.message);
    }
  }

  // Seed Inventory Batches
  const productIds = Object.values(ids.products.wms);
  console.log("  Creating inventory batches...");
  for (const productId of productIds.slice(0, Math.min(4, productIds.length))) {
    try {
      const batch = await pb.collection(Collections.WarehouseManagementInventoryBatches).create({
        product: productId,
        batchNumber: faker.string.alphanumeric(10).toUpperCase(),
        manufacturingDate: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        expiryDate: faker.date.future({ years: 2 }).toISOString().split("T")[0],
      });
      ids.inventoryBatches[batch.batchNumber] = batch.id;
      console.log(`    ✓ Batch: ${batch.batchNumber}`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create batch:`, error?.response?.message || error.message);
    }
  }

  // Seed Inventory Stock
  const batchIds = Object.values(ids.inventoryBatches);
  console.log("  Creating inventory stock...");
  for (let i = 0; i < Math.min(5, Math.min(productIds.length, locationIds.length)); i++) {
    try {
      const stock = await pb.collection(Collections.WarehouseManagementInventoryStock).create({
        product: productIds[i],
        location: locationIds[i],
        batch: batchIds.length > 0 ? faker.helpers.arrayElement(batchIds) : undefined,
        quantity: faker.number.int({ min: 50, max: 500 }),
        status: faker.helpers.arrayElement(Object.values(WarehouseManagementInventoryStockStatusOptions)),
      });
      ids.inventoryStock[`${productIds[i]}-${locationIds[i]}`] = stock.id;
    } catch (error: any) {
      console.error(`    ✗ Failed to create inventory stock:`, error?.response?.message || error.message);
    }
  }

  console.log(
    `✓ Phase 6 Complete: Created ${Object.keys(ids.suppliers).length} suppliers, ${Object.keys(ids.products.wms).length} products, ${Object.keys(ids.inventoryBatches).length} batches, ${Object.keys(ids.inventoryStock).length} stock entries`
  );
}

// ============================================================================
// PHASE 7: TRANSPORT MANAGEMENT (Drivers, Vehicles, Carriers, Carrier Rates)
// ============================================================================

async function seedPhase7TransportManagement() {
  console.log("\n📝 PHASE 7: Seeding Transport Management...");

  const userIds = Object.values(ids.users);

  if (userIds.length === 0) {
    console.error("✗ Missing users. Phases 1 must run first.");
    return;
  }

  // Seed Drivers (linked to users)
  const driverNames = ["John Smith", "Maria Garcia", "Ahmed Hassan", "Lisa Wong", "Carlos Rodriguez"];
  console.log("  Creating drivers...");
  for (const name of driverNames) {
    try {
      const driver = await pb.collection(Collections.TransportManagementDrivers).create({
        name,
        licenseNumber: faker.string.alphanumeric(8).toUpperCase(),
        licenseExpiry: faker.date.future({ years: 3 }).toISOString().split("T")[0],
        status: faker.helpers.arrayElement(Object.values(TransportManagementDriversStatusOptions)),
        user: faker.helpers.arrayElement(userIds),
      });
      ids.drivers[name] = driver.id;
      console.log(`    ✓ ${name} (License: ${driver.licenseNumber})`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create driver:`, error?.response?.message || error.message);
    }
  }

  // Seed Vehicles
  const vehicleTypes = ["Truck", "Van", "Box Truck", "Pickup", "Cargo"];
  console.log("  Creating vehicles...");
  for (let i = 0; i < 5; i++) {
    try {
      const vehicle = await pb.collection(Collections.TransportManagementVehicles).create({
        registrationNumber: faker.string.alphanumeric(6).toUpperCase(),
        model: vehicleTypes[i],
        capacityWeight: faker.number.float({ min: 500, max: 5000, multipleOf: 100 }),
        status: faker.helpers.arrayElement(Object.values(TransportManagementVehiclesStatusOptions)),
      });
      ids.vehicles[`${vehicleTypes[i]}-${i}`] = vehicle.id;
      console.log(`    ✓ ${vehicleTypes[i]} (Registration: ${vehicle.registrationNumber})`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create vehicle:`, error?.response?.message || error.message);
    }
  }

  // Seed Carriers
  const carrierNames = ["FastExpress", "GlobalShip", "RegionalCargo"];
  console.log("  Creating carriers...");
  for (const name of carrierNames) {
    try {
      const carrier = await pb.collection(Collections.TransportManagementCarriers).create({
        name,
        email: faker.internet.email(),
        phone: faker.phone.number(),
        licenseNumber: faker.string.alphanumeric(10).toUpperCase(),
      });
      ids.carriers[name] = carrier.id;
      console.log(`    ✓ ${name}`);

      // Create carrier rates
      const cities = ["New York", "Los Angeles", "Chicago", "Houston", "Phoenix"];
      for (let i = 0; i < 2; i++) {
        try {
          const originIdx = faker.number.int({ min: 0, max: cities.length - 1 });
          let destIdx = faker.number.int({ min: 0, max: cities.length - 1 });
          while (destIdx === originIdx) {
            destIdx = faker.number.int({ min: 0, max: cities.length - 1 });
          }
          const rate = await pb.collection(Collections.TransportManagementCarrierRates).create({
            carrier: carrier.id,
            origin: cities[originIdx],
            destination: cities[destIdx],
            rate: faker.number.float({ min: 50, max: 500, multipleOf: 1 }),
          });
          ids.carrierRates[`${name}-RATE-${i}`] = rate.id;
        } catch (error: any) {
          console.error(`      ✗ Failed to create carrier rate:`, error?.response?.message || error.message);
        }
      }
    } catch (error: any) {
      console.error(`    ✗ Failed to create carrier:`, error?.response?.message || error.message);
    }
  }

  console.log(
    `✓ Phase 7 Complete: Created ${Object.keys(ids.drivers).length} drivers, ${Object.keys(ids.vehicles).length} vehicles, ${Object.keys(ids.carriers).length} carriers, ${Object.keys(ids.carrierRates).length} carrier rates`
  );
}

// ============================================================================
// PHASE 8: WAREHOUSE OPERATIONS (Sales Orders, Inbound/Outbound Shipments)
// ============================================================================

async function seedPhase8WarehouseOperations() {
  console.log("\n📝 PHASE 8: Seeding Warehouse Operations (Sales Orders, Shipments)...");

  const companyIds = Object.values(ids.companies);
  const warehouseIds = Object.values(ids.warehouses);
  const productIds = Object.values(ids.products.wms);
  const carrierIds = Object.values(ids.carriers);

  if (companyIds.length === 0 || warehouseIds.length === 0 || productIds.length === 0) {
    console.error("✗ Missing prerequisite data. Phases 1-6 must run first.");
    return;
  }

  const salesOrderStatuses = Object.values(WarehouseManagementSalesOrdersStatusOptions);
  const inboundStatuses = Object.values(WarehouseManagementInboundShipmentsStatusOptions);
  const outboundStatuses = Object.values(WarehouseManagementOutboundShipmentsStatusOptions);

  // Track sales order items for linking to outbound shipments
  const salesOrderItemIds: string[] = [];

  // Seed Sales Orders (linked to companies)
  const salesOrders = Array.from({ length: 8 }, (_, i) => ({
    orderNumber: `SO-${Date.now()}-${String(i + 1).padStart(3, "0")}`,
    client: faker.helpers.arrayElement(companyIds),
    opportunity:
      Object.values(ids.opportunities).length > 0
        ? faker.helpers.arrayElement(Object.values(ids.opportunities))
        : undefined,
    status: faker.helpers.arrayElement(salesOrderStatuses),
    shippingAddress: faker.number.int({ min: 1, max: 100 }),
  }));

  console.log("  Creating sales orders...");
  for (const orderData of salesOrders) {
    try {
      const order = await pb.collection(Collections.WarehouseManagementSalesOrders).create(orderData);
      ids.salesOrders[order.orderNumber] = order.id;
      console.log(`    ✓ ${order.orderNumber} (${order.status})`);

      // Create sales order items (1-3 items per order)
      const numItems = faker.number.int({ min: 1, max: 3 });
      const selectedProducts = faker.helpers.arrayElements(productIds, numItems);

      for (const productId of selectedProducts) {
        try {
          const item = await pb.collection(Collections.WarehouseManagementSalesOrderItems).create({
            salesOrder: order.id,
            product: productId,
            quantityOrdered: faker.number.int({ min: 1, max: 50 }),
          });
          salesOrderItemIds.push(item.id);
        } catch (error: any) {
          console.error(`      ✗ Failed to add sales order item:`, error?.response?.message || error.message);
        }
      }
    } catch (error: any) {
      console.error(`    ✗ Failed to create sales order:`, error?.response?.message || error.message);
    }
  }

  // Seed Inbound Shipments (linked to companies and warehouses)
  const inboundShipments = Array.from({ length: 6 }, () => ({
    client: faker.helpers.arrayElement(companyIds),
    warehouse: faker.helpers.arrayElement(warehouseIds),
    expectedArrivalDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
    actualArrivalDate: faker.datatype.boolean(0.5)
      ? faker.date.past({ years: 1 }).toISOString().split("T")[0]
      : undefined,
    status: faker.helpers.arrayElement(inboundStatuses),
  }));

  console.log("  Creating inbound shipments...");
  for (const shipmentData of inboundShipments) {
    try {
      const shipment = await pb.collection(Collections.WarehouseManagementInboundShipments).create(shipmentData);
      ids.inboundShipments[`INBOUND-${shipment.id.substring(0, 8)}`] = shipment.id;
      console.log(`    ✓ Inbound Shipment (${shipment.status}) - Expected: ${shipment.expectedArrivalDate}`);

      // Create inbound shipment items
      const numItems = faker.number.int({ min: 1, max: 4 });
      const selectedProducts = faker.helpers.arrayElements(productIds, numItems);

      for (const productId of selectedProducts) {
        try {
          const expectedQty = faker.number.int({ min: 10, max: 200 });
          await pb.collection(Collections.WarehouseManagementInboundShipmentItems).create({
            inboundShipment: shipment.id,
            product: productId,
            expectedQuantity: expectedQty,
            receivedQuantity: shipment.status === "received" ? expectedQty : undefined,
          });
        } catch (error: any) {
          console.error(`      ✗ Failed to add inbound shipment item:`, error?.response?.message || error.message);
        }
      }
    } catch (error: any) {
      console.error(`    ✗ Failed to create inbound shipment:`, error?.response?.message || error.message);
    }
  }

  // Seed Outbound Shipments (linked to sales orders and warehouses)
  const salesOrderIds = Object.values(ids.salesOrders);
  if (salesOrderIds.length > 0 && salesOrderItemIds.length > 0) {
    const outboundShipments = Array.from({ length: 7 }, () => ({
      salesOrder: faker.helpers.arrayElement(salesOrderIds),
      warehouse: faker.helpers.arrayElement(warehouseIds),
      carrier: carrierIds.length > 0 ? faker.helpers.arrayElement(carrierIds) : undefined,
      trackingNumber: faker.string.alphanumeric(12).toUpperCase(),
      status: faker.helpers.arrayElement(outboundStatuses),
    }));

    console.log("  Creating outbound shipments...");
    for (const shipmentData of outboundShipments) {
      try {
        const shipment = await pb.collection(Collections.WarehouseManagementOutboundShipments).create(shipmentData);
        ids.outboundShipments[`OUTBOUND-${shipment.id.substring(0, 8)}`] = shipment.id;
        console.log(`    ✓ Outbound Shipment (${shipment.status}) - Tracking: ${shipment.trackingNumber}`);

        // Create outbound shipment items
        const numItems = faker.number.int({ min: 1, max: 3 });
        const selectedProducts = faker.helpers.arrayElements(productIds, numItems);

        for (const productId of selectedProducts) {
          try {
            const selectedSalesOrderItem = faker.helpers.arrayElement(salesOrderItemIds);
            await pb.collection(Collections.WarehouseManagementOutboundShipmentItems).create({
              outboundShipment: shipment.id,
              product: productId,
              quantityShipped: faker.number.int({ min: 5, max: 100 }),
              salesOrderItem: selectedSalesOrderItem,
            });
          } catch (error: any) {
            console.error(`      ✗ Failed to add outbound shipment item:`, error?.response?.message || error.message);
          }
        }
      } catch (error: any) {
        console.error(`    ✗ Failed to create outbound shipment:`, error?.response?.message || error.message);
      }
    }
  }

  console.log(
    `✓ Phase 8 Complete: Created ${Object.keys(ids.salesOrders).length} sales orders, ${Object.keys(ids.inboundShipments).length} inbound shipments, ${Object.keys(ids.outboundShipments).length} outbound shipments`
  );
}

// ============================================================================
// PHASE 9: TRANSPORT OPERATIONS (Trips, Trip Stops, GPS Pings, Routes)
// ============================================================================

async function seedPhase9TransportOperations() {
  console.log("\n📝 PHASE 9: Seeding Transport Operations (Trips, Trip Stops, GPS Pings, Routes)...");

  const driverIds = Object.values(ids.drivers);
  const vehicleIds = Object.values(ids.vehicles);

  if (driverIds.length === 0 || vehicleIds.length === 0) {
    console.error("✗ Missing prerequisite data. Phases 1-7 must run first.");
    return;
  }

  const tripStatuses = Object.values(TransportManagementTripsStatusOptions);
  const tripStopStatuses = Object.values(TransportManagementTripStopsStatusOptions);

  // Seed Routes (predefined route templates)
  const routeNames = ["Route-Downtown", "Route-Suburban", "Route-Industrial", "Route-Airport", "Route-Harbor"];

  console.log("  Creating routes...");
  for (const name of routeNames) {
    try {
      const route = await pb.collection(Collections.TransportManagementRoutes).create({
        name: `${name}-${Date.now()}`,
        totalDistance: faker.number.float({ min: 50, max: 200, multipleOf: 0.1 }),
        totalDuration: faker.number.float({ min: 2, max: 8, multipleOf: 0.5 }),
      });
      ids.routes[name] = route.id;
      console.log(`    ✓ ${route.name} (Distance: ${route.totalDistance}km, Duration: ${route.totalDuration}h)`);
    } catch (error: any) {
      console.error(`    ✗ Failed to create route ${name}:`, error?.response?.message || error.message);
    }
  }

  // Seed Trips (linked to drivers and vehicles)
  const trips = Array.from({ length: 12 }, () => ({
    driver: faker.helpers.arrayElement(driverIds),
    vehicle: faker.helpers.arrayElement(vehicleIds),
    status: faker.helpers.arrayElement(tripStatuses),
  }));

  console.log("  Creating trips...");
  for (const tripData of trips) {
    try {
      const trip = await pb.collection(Collections.TransportManagementTrips).create(tripData);
      ids.trips[`TRIP-${trip.id.substring(0, 8)}`] = trip.id;
      console.log(`    ✓ Trip (${trip.status}) - Driver: ${tripData.driver}, Vehicle: ${tripData.vehicle}`);

      // Create trip stops (3-6 stops per trip)
      const numStops = faker.number.int({ min: 3, max: 6 });

      for (let seq = 1; seq <= numStops; seq++) {
        try {
          const stopData = {
            trip: trip.id,
            sequence: seq,
            address: faker.location.streetAddress(),
            status: faker.helpers.arrayElement(tripStopStatuses),
            shipment_id: faker.string.alphanumeric(10).toUpperCase(),
            estimatedArrivalTime: faker.date.future({ years: 1 }).toISOString(),
            estimatedDepartureTime: faker.date.future({ years: 1 }).toISOString(),
            actualArrivalTime: trip.status === "completed" ? faker.date.past({ years: 1 }).toISOString() : undefined,
            actualDepartureTime: trip.status === "completed" ? faker.date.past({ years: 1 }).toISOString() : undefined,
          };

          const stop = await pb.collection(Collections.TransportManagementTripStops).create(stopData);
          ids.tripStops[`${trip.id}-${seq}`] = stop.id;
        } catch (error: any) {
          console.error(`      ✗ Failed to add trip stop:`, error?.response?.message || error.message);
        }
      }
    } catch (error: any) {
      console.error(`    ✗ Failed to create trip:`, error?.response?.message || error.message);
    }
  }

  // Seed GPS Pings (location tracking for vehicles)
  console.log("  Creating GPS pings...");
  for (const vehicleId of vehicleIds.slice(0, Math.min(3, vehicleIds.length))) {
    const pingCount = faker.number.int({ min: 15, max: 30 });

    for (let i = 0; i < pingCount; i++) {
      try {
        const ping = await pb.collection(Collections.TransportManagementGpsPings).create({
          vehicle: vehicleId,
          coordinates: {
            lat: faker.location.latitude(),
            lon: faker.location.longitude(),
          },
        });
        ids.gpsPings[`${vehicleId}-${i}`] = ping.id;
      } catch (error: any) {
        console.error(`      ✗ Failed to add GPS ping:`, error?.response?.message || error.message);
      }
    }
  }

  console.log(
    `✓ Phase 9 Complete: Created ${Object.keys(ids.routes).length} routes, ${Object.keys(ids.trips).length} trips, ${Object.keys(ids.tripStops).length} trip stops, ${Object.keys(ids.gpsPings).length} GPS pings`
  );
}

async function main() {
  try {
    console.log("🚀 Starting PocketBase Seed Script...");
    await authenticateAsAdmin();

    // Phase 1: Users
    await seedPhase1Users();

    // Phase 2: CRM Core
    await seedPhase2CRMCore();

    // Phase 3: Marketing/Sales
    await seedPhase3MarketingSales();

    // Phase 4: CRM Secondary
    await seedPhase4CRMSecondary();

    // Phase 5: Warehouse Setup
    await seedPhase5WarehouseSetup();

    // Phase 6: Inventory Management
    await seedPhase6InventoryManagement();

    // Phase 7: Transport Management
    await seedPhase7TransportManagement();

    // Phase 8: Warehouse Operations
    await seedPhase8WarehouseOperations();

    // Phase 9: Transport Operations
    await seedPhase9TransportOperations();

    console.log("\n✓ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Seeding failed:", error);
    process.exit(1);
  }
}

main();
