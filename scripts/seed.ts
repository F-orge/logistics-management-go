import { faker } from "@faker-js/faker";
import PocketBase, { ClientResponseError } from "pocketbase";
import {
  BillingManagementDisputesStatusOptions,
  BillingManagementInvoicesStatusOptions,
  BillingManagementLogsStatusOptions,
  BillingManagementPaymentsStatusOptions,
  BillingManagementQuotesStatusOptions,
  BillingManagementRateCardsTypeOptions,
  BillingManagementRateRulesPricingModelOptions,
  BillingManagementSurchargesCalculationMethodOptions,
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
  DeliveryManagementRoutesStatusOptions,
  DeliveryManagementTaskEventsStatusOptions,
  DeliveryManagementTasksFailureReasonOptions,
  DeliveryManagementTasksStatusOptions,
  TransportManagementCarrierRatesUnitOptions,
  TransportManagementDriversStatusOptions,
  TransportManagementExpensesStatusOptions,
  TransportManagementExpensesTypeOptions,
  TransportManagementGeofenceEventsTypeOptions,
  TransportManagementShipmentLegsStatusOptions,
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
  WarehouseManagementReturnItemsConditionOptions,
  WarehouseManagementReturnsStatusOptions,
  WarehouseManagementSalesOrdersStatusOptions,
  WarehouseManagementStockTransferStatusOptions,
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
  // Phase 10: Billing System
  rateCards: {} as Record<string, string>,
  rateRules: {} as Record<string, string>,
  surcharges: {} as Record<string, string>,
  clientAccounts: {} as Record<string, string>,
  quotes: {} as Record<string, string>,
  invoices: {} as Record<string, string>,
  invoiceLineItems: {} as Record<string, string>,
  payments: {} as Record<string, string>,
  disputes: {} as Record<string, string>,
  creditNotes: {} as Record<string, string>,
  // Phase 11: Logistics Execution (TMS)
  shipmentLegs: {} as Record<string, string>,
  shipmentLegEvents: {} as Record<string, string>,
  tmsProofOfDeliveries: {} as Record<string, string>,
  // Phase 12: Delivery Management (DMS)
  deliveryRoutes: {} as Record<string, string>,
  deliveryTasks: {} as Record<string, string>,
  taskEvents: {} as Record<string, string>,
  dmsProofOfDeliveries: {} as Record<string, string>,
  driverLocations: {} as Record<string, string>,
  // Phase 13: Advanced & Operational
  expenses: {} as Record<string, string>,
  geofences: {} as Record<string, string>,
  geofenceEvents: {} as Record<string, string>,
  notifications: {} as Record<string, string>,
  billingLogs: {} as Record<string, string>,
  stockTransfers: {} as Record<string, string>,
  packages: {} as Record<string, string>,
  packageItems: {} as Record<string, string>,
  returns: {} as Record<string, string>,
  returnItems: {} as Record<string, string>,
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
    if (error instanceof ClientResponseError) {
      console.error("✗ Failed to authenticate as admin:", error.message, error.response.data);
    } else {
      console.error("✗ Failed to authenticate as admin:", error);
    }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`  ✗ Failed to create user ${userData.email}:`, error.message, error.response.data);
      } else {
        console.error(`  ✗ Failed to create user ${userData.email}:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create ${companyData.name}:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create ${companyData.name}:`, error);
      }
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
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`    ✗ Failed to create ${contactData.name}:`, error.message, error.response.data);
        } else {
          console.error(`    ✗ Failed to create ${contactData.name}:`, error);
        }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create ${productData.name}:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create ${productData.name}:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create ${campaignData.name}:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create ${campaignData.name}:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create ${leadData.name}:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create ${leadData.name}:`, error);
      }
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
        } catch (error) {
          if (error instanceof ClientResponseError) {
            console.error(`      ✗ Failed to link product:`, error.message, error.response.data);
          } else {
            console.error(`      ✗ Failed to link product:`, error);
          }
        }
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create ${opportunityData.name}:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create ${opportunityData.name}:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create interaction:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create interaction:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create case:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create case:`, error);
      }
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
          } catch (error) {
            if (error instanceof ClientResponseError) {
              console.error(`      ✗ Failed to add invoice item:`, error.message, error.response.data);
            } else {
              console.error(`      ✗ Failed to add invoice item:`, error);
            }
          }
        }
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create invoice:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create invoice:`, error);
      }
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
    {
      name: "Warehouse-NYC",
      city: "New York",
      state: "NY",
      country: "USA",
      postalCode: "10001",
    },
    {
      name: "Warehouse-LA",
      city: "Los Angeles",
      state: "CA",
      country: "USA",
      postalCode: "90001",
    },
    {
      name: "Warehouse-Chicago",
      city: "Chicago",
      state: "IL",
      country: "USA",
      postalCode: "60601",
    },
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
          const locationName = `LOC-${String.fromCharCode(65 + (i % 10))}-${Math.floor(i / 10) + 1}-${(i % 5) + 1}`;
          const location = await pb.collection(Collections.WarehouseManagementLocations).create({
            warehouse: created.id,
            name: locationName,
            aisle: String.fromCharCode(65 + (i % 10)),
            row: String(Math.floor(i / 10) + 1),
            bin: String((i % 5) + 1),
            type: faker.helpers.arrayElement(locationTypes),
          });
          ids.locations[`${warehouse.name}-LOC-${i}`] = location.id;
        } catch (error) {
          if (error instanceof ClientResponseError) {
            console.error(`      ✗ Failed to create location:`, error.message, error.response.data);
          } else {
            console.error(`      ✗ Failed to create location:`, error);
          }
        }
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create warehouse:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create warehouse:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create supplier:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create supplier:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create product:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create product:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create batch:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create batch:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create inventory stock:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create inventory stock:`, error);
      }
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
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create driver:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create driver:`, error);
      }
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
        capacityWeight: faker.number.float({
          min: 500,
          max: 5000,
          multipleOf: 100,
        }),
        status: faker.helpers.arrayElement(Object.values(TransportManagementVehiclesStatusOptions)),
      });
      ids.vehicles[`${vehicleTypes[i]}-${i}`] = vehicle.id;
      console.log(`    ✓ ${vehicleTypes[i]} (Registration: ${vehicle.registrationNumber})`);
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create vehicle:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create vehicle:`, error);
      }
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
          const originIdx = faker.number.int({
            min: 0,
            max: cities.length - 1,
          });
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
        } catch (error) {
          if (error instanceof ClientResponseError) {
            console.error(`      ✗ Failed to create carrier rate:`, error.message, error.response.data);
          } else {
            console.error(`      ✗ Failed to create carrier rate:`, error);
          }
        }
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create carrier:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create carrier:`, error);
      }
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
        } catch (error) {
          if (error instanceof ClientResponseError) {
            console.error(`      ✗ Failed to add sales order item:`, error.message, error.response.data);
          } else {
            console.error(`      ✗ Failed to add sales order item:`, error);
          }
        }
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create sales order:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create sales order:`, error);
      }
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
        } catch (error) {
          if (error instanceof ClientResponseError) {
            console.error(`      ✗ Failed to add inbound shipment item:`, error.message, error.response.data);
          } else {
            console.error(`      ✗ Failed to add inbound shipment item:`, error);
          }
        }
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create inbound shipment:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create inbound shipment:`, error);
      }
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
          } catch (error) {
            if (error instanceof ClientResponseError) {
              console.error(`      ✗ Failed to add outbound shipment item:`, error.message, error.response.data);
            } else {
              console.error(`      ✗ Failed to add outbound shipment item:`, error);
            }
          }
        }
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`    ✗ Failed to create outbound shipment:`, error.message, error.response.data);
        } else {
          console.error(`    ✗ Failed to create outbound shipment:`, error);
        }
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
        totalDistance: faker.number.float({
          min: 50,
          max: 200,
          multipleOf: 0.1,
        }),
        totalDuration: faker.number.float({
          min: 2,
          max: 8,
          multipleOf: 0.5,
        }),
      });
      ids.routes[name] = route.id;
      console.log(`    ✓ ${route.name} (Distance: ${route.totalDistance}km, Duration: ${route.totalDuration}h)`);
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create route ${name}:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create route ${name}:`, error);
      }
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
        } catch (error) {
          if (error instanceof ClientResponseError) {
            console.error(`      ✗ Failed to add trip stop:`, error.message, error.response.data);
          } else {
            console.error(`      ✗ Failed to add trip stop:`, error);
          }
        }
      }
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create trip:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create trip:`, error);
      }
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
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`      ✗ Failed to add GPS ping:`, error.message, error.response.data);
        } else {
          console.error(`      ✗ Failed to add GPS ping:`, error);
        }
      }
    }
  }

  console.log(
    `✓ Phase 9 Complete: Created ${Object.keys(ids.routes).length} routes, ${Object.keys(ids.trips).length} trips, ${Object.keys(ids.tripStops).length} trip stops, ${Object.keys(ids.gpsPings).length} GPS pings`
  );
}

// ============================================================================
// PHASE 10: BILLING SYSTEM
// ============================================================================

async function seedPhase10BillingSystem() {
  console.log("\n📝 PHASE 10: Seeding Billing System...");

  const companyIds = Object.values(ids.companies);
  const userIds = Object.values(ids.users);

  if (companyIds.length === 0 || userIds.length === 0) {
    console.error("✗ Missing prerequisite data. Phases 1-2 must run first.");
    return;
  }

  // 1. Seed Rate Cards
  const rateCardTypes = Object.values(BillingManagementRateCardsTypeOptions);
  const rateCardData = [
    { name: "Standard Rate Card", type: rateCardTypes[0] },
    { name: "Premium Rate Card", type: rateCardTypes[1] },
    { name: "Express Rate Card", type: rateCardTypes[2] },
    { name: "Bulk Rate Card", type: rateCardTypes[3] },
  ];

  console.log("  Creating rate cards...");
  for (const cardData of rateCardData) {
    try {
      const rateCard = await pb.collection(Collections.BillingManagementRateCards).create({
        name: cardData.name,
        type: cardData.type,
        isActive: true,
        validFrom: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        validTo: faker.date.future({ years: 2 }).toISOString().split("T")[0],
        description: `${cardData.name} with standard pricing model`,
        createdBy: faker.helpers.arrayElement(userIds),
      });
      ids.rateCards[cardData.name] = rateCard.id;
      console.log(`    ✓ ${cardData.name}`);
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create rate card:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create rate card:`, error);
      }
    }
  }

  // 2. Seed Rate Rules
  const pricingModels = Object.values(BillingManagementRateRulesPricingModelOptions);
  const rateCardIds = Object.values(ids.rateCards);

  console.log("  Creating rate rules...");
  for (const rateCardId of rateCardIds) {
    for (let i = 0; i < 2; i++) {
      try {
        const rateRule = await pb.collection(Collections.BillingManagementRateRules).create({
          rateCard: rateCardId,
          condition: i === 0 ? "weight:0-5kg" : "distance:0-50km",
          value: i === 0 ? "5" : "50",
          price: faker.number.float({ min: 10, max: 500, multipleOf: 0.01 }),
          pricingModel: faker.helpers.arrayElement(pricingModels),
          minValue: i === 0 ? 0 : 0,
          maxValue: i === 0 ? 5 : 50,
          priority: faker.number.int({ min: 1, max: 100 }),
          isActive: true,
        });
        ids.rateRules[`${rateCardId}-${i}`] = rateRule.id;
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`      ✗ Failed to create rate rule:`, error.message, error.response.data);
        } else {
          console.error(`      ✗ Failed to create rate rule:`, error);
        }
      }
    }
  }

  // 3. Seed Surcharges
  const calculationMethods = Object.values(BillingManagementSurchargesCalculationMethodOptions);
  const surchargeTypes = ["fuel-adjustment", "hazmat-fee", "peak-season"];

  console.log("  Creating surcharges...");
  for (const surchargeType of surchargeTypes) {
    try {
      const surcharge = await pb.collection(Collections.BillingManagementSurcharges).create({
        name: surchargeType.toUpperCase(),
        type: surchargeType,
        amount: faker.number.float({ min: 5, max: 100, multipleOf: 0.01 }),
        calculationMethod: faker.helpers.arrayElement(calculationMethods),
        isActive: true,
        validFrom: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        validTo: faker.date.future({ years: 2 }).toISOString().split("T")[0],
        description: `Additional charge for ${surchargeType}`,
      });
      ids.surcharges[surchargeType] = surcharge.id;
      console.log(`    ✓ ${surchargeType}`);
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create surcharge:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create surcharge:`, error);
      }
    }
  }

  // 4. Seed Client Accounts
  console.log("  Creating client accounts...");
  for (const companyId of companyIds) {
    try {
      const clientAccount = await pb.collection(Collections.BillingManagementClientAccounts).create({
        client: companyId as string,
        creditLimit: faker.number.int({ min: 5000, max: 50000 }),
        availableCredit: faker.number.int({ min: 1000, max: 25000 }),
        walletBalance: faker.number.int({ min: 0, max: 10000 }),
        currency: "PHP",
        paymentTermsDays: faker.number.int({ min: 15, max: 60 }),
        isCreditApproved: faker.datatype.boolean(),
        lastPaymentDate: faker.date.past({ years: 1 }).toISOString().split("T")[0],
      });
      (ids.clientAccounts as Record<string, string>)[companyId as string] = clientAccount.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create client account:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create client account:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.clientAccounts).length} client accounts`);

  // 5. Seed Quotes
  const quoteStatuses = Object.values(BillingManagementQuotesStatusOptions);

  console.log("  Creating quotes...");
  for (let i = 0; i < 10; i++) {
    try {
      const quote = await pb.collection(Collections.BillingManagementQuotes).create({
        client: faker.helpers.arrayElement(companyIds),
        originDetails: JSON.stringify({
          city: faker.location.city(),
          country: "USA",
        }),
        destinationDetails: JSON.stringify({
          city: faker.location.city(),
          country: "USA",
        }),
        weight: faker.number.float({ min: 1, max: 100, multipleOf: 0.1 }),
        length: faker.number.float({ min: 10, max: 200, multipleOf: 1 }),
        width: faker.number.float({ min: 10, max: 200, multipleOf: 1 }),
        height: faker.number.float({ min: 10, max: 200, multipleOf: 1 }),
        quotePrice: faker.number.float({
          min: 100,
          max: 5000,
          multipleOf: 0.01,
        }),
        serviceLevel: faker.helpers.arrayElement(["Standard", "Express", "Economy"]),
        expiredAt: faker.date.future({ years: 1 }).toISOString().split("T")[0],
        status: faker.helpers.arrayElement(quoteStatuses),
        notes: faker.commerce.productDescription(),
        createdBy: faker.helpers.arrayElement(userIds),
      });
      ids.quotes[`QUOTE-${i}`] = quote.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create quote:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create quote:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.quotes).length} quotes`);

  // 6. Seed Invoices
  const invoiceStatuses = Object.values(BillingManagementInvoicesStatusOptions);
  const quoteIds = Object.values(ids.quotes);

  console.log("  Creating invoices...");
  for (let i = 0; i < 15; i++) {
    try {
      const invoice = await pb.collection(Collections.BillingManagementInvoices).create({
        quote: quoteIds.length > 0 ? faker.helpers.arrayElement(quoteIds) : undefined,
        status: faker.helpers.arrayElement(invoiceStatuses),
        issueDate: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        dueDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
        totalAmount: faker.number.float({
          min: 500,
          max: 10000,
          multipleOf: 0.01,
        }),
        amountPaid: faker.number.float({
          min: 0,
          max: 10000,
          multipleOf: 0.01,
        }),
        currency: "PHP",
        discountAmount: faker.number.float({
          min: 0,
          max: 1000,
          multipleOf: 0.01,
        }),
        subtotal: faker.number.float({
          min: 500,
          max: 9000,
          multipleOf: 0.01,
        }),
        paymentTerms: faker.helpers.arrayElement(["Net 15", "Net 30", "Net 60"]),
        notes: faker.commerce.productDescription(),
        sentAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString().split("T")[0] : undefined,
        paidAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString().split("T")[0] : undefined,
        createdBy: faker.helpers.arrayElement(userIds),
      });
      ids.invoices[`INV-${i}`] = invoice.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create invoice:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create invoice:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.invoices).length} invoices`);

  // 7. Seed Invoice Line Items
  const invoiceIds = Object.values(ids.invoices);

  console.log("  Creating invoice line items...");
  let lineItemCount = 0;
  for (const invoiceId of invoiceIds) {
    const numItems = faker.number.int({ min: 2, max: 3 });
    for (let i = 0; i < numItems; i++) {
      try {
        const lineItem = await pb.collection(Collections.BillingManagementInvoiceLineItems).create({
          invoice: invoiceId,
          description: faker.commerce.productDescription(),
          quantity: faker.number.int({ min: 1, max: 10 }),
          unitPrice: faker.number.float({
            min: 50,
            max: 500,
            multipleOf: 0.01,
          }),
          taxRate: faker.helpers.arrayElement([0, 5, 12, 15]),
          taxAmount: faker.number.float({
            min: 0,
            max: 500,
            multipleOf: 0.01,
          }),
          discountRate: faker.helpers.arrayElement([0, 5, 10, 15]),
          discountAmount: faker.number.float({
            min: 0,
            max: 200,
            multipleOf: 0.01,
          }),
        });
        ids.invoiceLineItems[lineItemCount.toString()] = lineItem.id;
        lineItemCount++;
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`      ✗ Failed to add invoice line item:`, error.message, error.response.data);
        } else {
          console.error(`      ✗ Failed to add invoice line item:`, error);
        }
      }
    }
  }
  console.log(`    ✓ Created line items for invoices`);

  // 8. Seed Payments
  const paymentStatuses = Object.values(BillingManagementPaymentsStatusOptions);
  const paymentMethods = ["credit-card", "debit-card", "bank-transfer", "wallet"];

  console.log("  Creating payments...");
  for (let i = 0; i < 10; i++) {
    try {
      const payment = await pb.collection(Collections.BillingManagementPayments).create({
        invoice: faker.helpers.arrayElement(invoiceIds),
        amount: faker.number.float({ min: 100, max: 5000, multipleOf: 0.01 }),
        paymentMethod: faker.helpers.arrayElement(paymentMethods),
        status: faker.helpers.arrayElement(paymentStatuses),
        paymentDate: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        processedAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString() : undefined,
        currency: "PHP",
        fees: faker.number.float({ min: 0, max: 100, multipleOf: 0.01 }),
        netAmount: faker.number.float({
          min: 100,
          max: 5000,
          multipleOf: 0.01,
        }),
        notes: faker.commerce.productDescription(),
        processedBy: faker.helpers.arrayElement(userIds),
      });
      ids.payments[`PAY-${i}`] = payment.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create payment:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create payment:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.payments).length} payments`);

  // 9. Seed Disputes
  const disputeStatuses = Object.values(BillingManagementDisputesStatusOptions);
  const invoiceLineItemIds = Object.values(ids.invoiceLineItems);

  console.log("  Creating disputes...");
  if (invoiceLineItemIds.length > 0) {
    for (let i = 0; i < 3; i++) {
      try {
        const dispute = await pb.collection(Collections.BillingManagementDisputes).create({
          lineItem: faker.helpers.arrayElement(invoiceLineItemIds),
          client: faker.helpers.arrayElement(companyIds),
          reason: faker.commerce.productDescription(),
          status: faker.helpers.arrayElement(disputeStatuses),
          disputeAmount: faker.number.float({
            min: 50,
            max: 1000,
            multipleOf: 0.01,
          }),
          resolutionNotes: faker.lorem.paragraph(),
          submittedAt: faker.date.past({ years: 1 }).toISOString().split("T")[0],
          resolvedAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString().split("T")[0] : undefined,
          resolvedBy: faker.datatype.boolean() ? faker.helpers.arrayElement(userIds) : undefined,
        });
        ids.disputes[`DISP-${i}`] = dispute.id;
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`    ✗ Failed to create dispute:`, error.message, error.response.data);
        } else {
          console.error(`    ✗ Failed to create dispute:`, error);
        }
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.disputes).length} disputes`);

  // 10. Seed Credit Notes
  const creditNoteData: any[] = [];
  const disputeIds = Object.values(ids.disputes);
  if (invoiceIds.length > 0 && disputeIds.length > 0) {
    for (let i = 0; i < 3; i++) {
      creditNoteData.push({
        invoice: faker.helpers.arrayElement(invoiceIds),
        dispute: faker.helpers.arrayElement(disputeIds),
        amount: faker.number.float({ min: 100, max: 2000, multipleOf: 0.01 }),
        reason: faker.lorem.sentence(),
        issueDate: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        appliedAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString().split("T")[0] : undefined,
        currency: "PHP",
        notes: faker.lorem.paragraph(),
      });
    }
  }

  console.log("  Creating credit notes...");
  for (const noteData of creditNoteData) {
    try {
      const creditNote = await pb.collection(Collections.BillingManagementCreditNotes).create(noteData);
      ids.creditNotes[`CREDIT-${creditNote.id.substring(0, 8)}`] = creditNote.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create credit note:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create credit note:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.creditNotes).length} credit notes`);

  console.log(
    `✓ Phase 10 Complete: Created rate cards, rules, surcharges, accounts, quotes, invoices, payments, disputes, and credit notes`
  );
}

// ============================================================================
// PHASE 11: LOGISTICS EXECUTION (TMS)
// ============================================================================

async function seedPhase11LogisticsExecution() {
  console.log("\n📝 PHASE 11: Seeding Logistics Execution (TMS)...");

  const carrierIds = Object.values(ids.carriers);
  const tripIds = Object.values(ids.trips);
  const tripStopIds = Object.values(ids.tripStops);

  if (tripIds.length === 0 || tripStopIds.length === 0) {
    console.error("✗ Missing prerequisite data. Phases 1-9 must run first.");
    return;
  }

  const shipmentStatuses = Object.values(TransportManagementShipmentLegsStatusOptions);

  // 1. Seed Shipment Legs
  console.log("  Creating shipment legs...");
  for (let i = 0; i < 10; i++) {
    try {
      const shipmentLeg = await pb.collection(Collections.TransportManagementShipmentLegs).create({
        shipmentId: faker.string.alphanumeric(10).toUpperCase(),
        legSequence: (i % 3) + 1,
        startLocation: {
          lat: faker.location.latitude(),
          lon: faker.location.longitude(),
        },
        endLocation: {
          lat: faker.location.latitude(),
          lon: faker.location.longitude(),
        },
        carrier: carrierIds.length > 0 ? faker.helpers.arrayElement(carrierIds) : undefined,
        internalTrip: faker.helpers.arrayElement(tripIds),
        status: faker.helpers.arrayElement(shipmentStatuses),
      });
      ids.shipmentLegs[`LEG-${i}`] = shipmentLeg.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create shipment leg:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create shipment leg:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.shipmentLegs).length} shipment legs`);

  // 2. Seed Shipment Leg Events
  const shipmentLegIds = Object.values(ids.shipmentLegs);

  console.log("  Creating shipment leg events...");
  for (const legId of shipmentLegIds) {
    const numEvents = faker.number.int({ min: 2, max: 4 });
    for (let i = 0; i < numEvents; i++) {
      try {
        await pb.collection(Collections.TransportManagementShipmentLegEvents).create({
          message: faker.helpers.arrayElement([
            "Shipment picked up",
            "In transit",
            "Arrived at checkpoint",
            "Delivery attempted",
            "Delivered successfully",
          ]),
          shipmentLegId: legId,
          location: {
            lat: faker.location.latitude(),
            lon: faker.location.longitude(),
          },
          timestamp: faker.date.past({ years: 1 }).toISOString(),
        });
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`      ✗ Failed to create shipment leg event:`, error.message, error.response.data);
        } else {
          console.error(`      ✗ Failed to create shipment leg event:`, error);
        }
      }
    }
  }
  console.log(`    ✓ Created shipment leg events`);

  // 3. Seed TMS Proof of Deliveries
  console.log("  Creating TMS proof of deliveries...");
  for (const tripStopId of tripStopIds.slice(0, Math.min(5, tripStopIds.length))) {
    try {
      await pb.collection(Collections.TransportManagementProofOfDeliveries).create({
        tripStop: tripStopId,
        coordinate: {
          lat: faker.location.latitude(),
          lon: faker.location.longitude(),
        },
      });
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create TMS POD:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create TMS POD:`, error);
      }
    }
  }
  console.log(`    ✓ Created TMS proof of deliveries`);

  console.log(`✓ Phase 11 Complete: Created shipment legs, events, and PODs`);
}

// ============================================================================
// PHASE 12: DELIVERY MANAGEMENT (DMS)
// ============================================================================

async function seedPhase12DeliveryManagement() {
  console.log("\n📝 PHASE 12: Seeding Delivery Management (DMS)...");

  const driverIds = Object.values(ids.drivers);
  const productIds = Object.values(ids.products.wms);
  const salesOrderIds = Object.values(ids.salesOrders);

  if (driverIds.length === 0) {
    console.error("✗ Missing prerequisite data. Phases 1-9 must run first.");
    return;
  }

  const routeStatuses = Object.values(DeliveryManagementRoutesStatusOptions);
  const taskStatuses = Object.values(DeliveryManagementTasksStatusOptions);
  const taskEventStatuses = Object.values(DeliveryManagementTaskEventsStatusOptions);
  const failureReasons = Object.values(DeliveryManagementTasksFailureReasonOptions);

  // 1. Seed Delivery Routes
  console.log("  Creating delivery routes...");
  for (let i = 0; i < 5; i++) {
    try {
      const route = await pb.collection(Collections.DeliveryManagementRoutes).create({
        driver: faker.helpers.arrayElement(driverIds),
        routeDate: faker.date.future({ years: 1 }).toISOString().split("T")[0],
        status: faker.helpers.arrayElement(routeStatuses),
        totalDistance: faker.number.float({
          min: 10,
          max: 100,
          multipleOf: 0.1,
        }),
        estimatedDurationInMinutes: faker.number.int({ min: 30, max: 480 }),
        startedAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString() : undefined,
        completedAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString() : undefined,
      });
      ids.deliveryRoutes[`ROUTE-${i}`] = route.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create delivery route:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create delivery route:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.deliveryRoutes).length} delivery routes`);

  // 2. Seed Packages (needed for delivery tasks)
  const warehouseIds = Object.values(ids.warehouses);
  const userIds = Object.values(ids.users);

  console.log("  Creating packages...");
  const packageIds: string[] = [];
  for (let i = 0; i < 12; i++) {
    try {
      const pkg = await pb.collection(Collections.WarehouseManagementPackages).create({
        salesOrder: salesOrderIds.length > 0 ? faker.helpers.arrayElement(salesOrderIds) : undefined,
        warehouse: faker.helpers.arrayElement(warehouseIds),
        type: faker.helpers.arrayElement(["Box", "Envelope", "Bag", "Pallet"]),
        weight: faker.number.float({ min: 0.5, max: 100, multipleOf: 0.1 }),
        length: faker.number.float({ min: 10, max: 200, multipleOf: 1 }),
        width: faker.number.float({ min: 10, max: 200, multipleOf: 1 }),
        height: faker.number.float({ min: 10, max: 200, multipleOf: 1 }),
        packedByUser: faker.helpers.arrayElement(userIds),
        packedAt: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        shippedAt: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString().split("T")[0] : undefined,
        isFragile: faker.datatype.boolean(0.3),
        isHazmat: faker.datatype.boolean(0.1),
        requireSignature: faker.datatype.boolean(0.4),
        insuranceValue: faker.datatype.boolean()
          ? faker.number.float({ min: 100, max: 5000, multipleOf: 0.01 })
          : undefined,
      });
      packageIds.push(pkg.id);
      ids.packages[`PACKAGE-${i}`] = pkg.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create package:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create package:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${packageIds.length} packages`);

  // 3. Seed Delivery Tasks
  const deliveryRouteIds = Object.values(ids.deliveryRoutes);

  console.log("  Creating delivery tasks...");
  for (let i = 0; i < 15; i++) {
    try {
      const task = await pb.collection(Collections.DeliveryManagementTasks).create({
        package: packageIds.length > 0 ? faker.helpers.arrayElement(packageIds) : undefined,
        route: faker.helpers.arrayElement(deliveryRouteIds),
        sequence: (i % 5) + 1,
        deliveryAddress: faker.location.streetAddress(),
        recipientName: faker.person.fullName(),
        recipientPhone: faker.phone.number(),
        deliveryInstructions: faker.lorem.sentence(),
        estimatedArrivalTime: faker.date.future({ years: 1 }).toISOString(),
        actualArrivalTime: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString() : undefined,
        deliveryTime: faker.datatype.boolean() ? faker.date.past({ years: 1 }).toISOString() : undefined,
        status: faker.helpers.arrayElement(taskStatuses),
        attemptCount: faker.number.int({ min: 0, max: 3 }),
        failureReason: faker.datatype.boolean() ? faker.helpers.arrayElement(failureReasons) : undefined,
      });
      ids.deliveryTasks[`TASK-${i}`] = task.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create delivery task:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create delivery task:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.deliveryTasks).length} delivery tasks`);

  // 3. Seed Task Events
  const deliveryTaskIds = Object.values(ids.deliveryTasks);

  console.log("  Creating task events...");
  for (const taskId of deliveryTaskIds) {
    const numEvents = faker.number.int({ min: 2, max: 3 });
    for (let i = 0; i < numEvents; i++) {
      try {
        await pb.collection(Collections.DeliveryManagementTaskEvents).create({
          task: taskId,
          status: faker.helpers.arrayElement(taskEventStatuses),
          reason: faker.lorem.sentence(),
          notes: faker.lorem.paragraph(),
          coordinates: {
            lat: faker.location.latitude(),
            lon: faker.location.longitude(),
          },
        });
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`      ✗ Failed to create task event:`, error.message, error.response.data);
        } else {
          console.error(`      ✗ Failed to create task event:`, error);
        }
      }
    }
  }
  console.log(`    ✓ Created task events`);

  // 4. Seed DMS Proof of Deliveries
  console.log("  Creating DMS proof of deliveries...");
  for (const taskId of deliveryTaskIds.slice(0, Math.min(8, deliveryTaskIds.length))) {
    try {
      await pb.collection(Collections.DeliveryManagementProofOfDeliveries).create({
        task: taskId,
        signatureData: JSON.stringify({
          signature: faker.string.alphanumeric(50),
        }),
        recipientName: faker.person.fullName(),
        coordinates: {
          lat: faker.location.latitude(),
          lon: faker.location.longitude(),
        },
      });
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create DMS POD:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create DMS POD:`, error);
      }
    }
  }
  console.log(`    ✓ Created DMS proof of deliveries`);

  // 5. Seed Driver Locations
  console.log("  Creating driver locations...");
  for (const driverId of driverIds) {
    for (let i = 0; i < faker.number.int({ min: 3, max: 5 }); i++) {
      try {
        await pb.collection(Collections.DeliveryManagementDriverLocation).create({
          driver: driverId,
          coordinates: {
            lat: faker.location.latitude(),
            lon: faker.location.longitude(),
          },
          heading: {
            lat: faker.location.latitude(),
            lon: faker.location.longitude(),
          },
        });
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`      ✗ Failed to create driver location:`, error.message, error.response.data);
        } else {
          console.error(`      ✗ Failed to create driver location:`, error);
        }
      }
    }
  }
  console.log(`    ✓ Created driver locations`);

  console.log(`✓ Phase 12 Complete: Created delivery routes, tasks, events, PODs, and driver locations`);
}

// ============================================================================
// PHASE 13: ADVANCED & OPERATIONAL
// ============================================================================

async function seedPhase13AdvancedOperational() {
  console.log("\n📝 PHASE 13: Seeding Advanced & Operational Data...");

  const tripIds = Object.values(ids.trips);
  const driverIds = Object.values(ids.drivers);
  const vehicleIds = Object.values(ids.vehicles);
  const productIds = Object.values(ids.products.wms);
  const salesOrderIds = Object.values(ids.salesOrders);
  const warehouseIds = Object.values(ids.warehouses);
  const companyIds = Object.values(ids.companies);
  const userIds = Object.values(ids.users);
  const inventoryBatchIds = Object.values(ids.inventoryBatches);

  const expenseTypes = Object.values(TransportManagementExpensesTypeOptions);
  const expenseStatuses = Object.values(TransportManagementExpensesStatusOptions);
  const geofenceEventTypes = Object.values(TransportManagementGeofenceEventsTypeOptions);
  const billingLogStatuses = Object.values(BillingManagementLogsStatusOptions);
  const stockTransferStatuses = Object.values(WarehouseManagementStockTransferStatusOptions);
  const returnStatuses = Object.values(WarehouseManagementReturnsStatusOptions);
  const returnItemConditions = Object.values(WarehouseManagementReturnItemsConditionOptions);

  // 1. Seed Expenses
  console.log("  Creating expenses...");
  for (let i = 0; i < 10; i++) {
    try {
      // Create a mock receipt file
      const mockReceiptContent = `Receipt for expense ${i}\nAmount: ${faker.number.float({ min: 50, max: 500, multipleOf: 0.01 })}\nDate: ${new Date().toISOString()}`;
      const mockFile = new File([mockReceiptContent], `receipt_${i}.txt`, {
        type: "text/plain",
      });

      const expense = await pb.collection(Collections.TransportManagementExpenses).create({
        trip: tripIds.length > 0 ? faker.helpers.arrayElement(tripIds) : undefined,
        driver: faker.helpers.arrayElement(driverIds),
        type: faker.helpers.arrayElement(expenseTypes),
        amount: faker.number.float({ min: 50, max: 500, multipleOf: 0.01 }),
        currency: "PHP",
        fuelQuantity: faker.number.float({
          min: 5,
          max: 50,
          multipleOf: 0.1,
        }),
        odometerReading: faker.number.int({ min: 10000, max: 100000 }),
        status: faker.helpers.arrayElement(expenseStatuses),
        receipts: [mockFile],
      });
      ids.expenses[`EXP-${i}`] = expense.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create expense:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create expense:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.expenses).length} expenses`);

  // 2. Seed Geofences
  console.log("  Creating geofences...");
  for (let i = 0; i < 5; i++) {
    try {
      const geofence = await pb.collection(Collections.TransportManagementGeofence).create({
        name: faker.helpers.arrayElement([
          "Main Warehouse",
          "Customer Zone",
          "Restricted Area",
          "Service Area",
          "Depot",
        ]),
        coordinates: {
          lat: faker.location.latitude(),
          lon: faker.location.longitude(),
        },
        radius: faker.number.int({ min: 100, max: 5000 }),
      });
      ids.geofences[`GEO-${i}`] = geofence.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create geofence:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create geofence:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.geofences).length} geofences`);

  // 3. Seed Geofence Events
  const geofenceIds = Object.values(ids.geofences);

  console.log("  Creating geofence events...");
  for (let i = 0; i < 15; i++) {
    try {
      await pb.collection(Collections.TransportManagementGeofenceEvents).create({
        vehicle: faker.helpers.arrayElement(vehicleIds),
        geofence: faker.helpers.arrayElement(geofenceIds),
        type: faker.helpers.arrayElement(geofenceEventTypes),
      });
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`      ✗ Failed to create geofence event:`, error.message, error.response.data);
      } else {
        console.error(`      ✗ Failed to create geofence event:`, error);
      }
    }
  }
  console.log(`    ✓ Created geofence events`);

  // 4. Seed Notifications
  console.log("  Creating notifications...");
  for (let i = 0; i < 15; i++) {
    try {
      await pb.collection(Collections.Notifications).create({
        user: faker.helpers.arrayElement(userIds),
        message: faker.lorem.sentence(),
        isRead: faker.datatype.boolean(),
        link: faker.datatype.boolean() ? faker.internet.url() : undefined,
      });
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`      ✗ Failed to create notification:`, error.message, error.response.data);
      } else {
        console.error(`      ✗ Failed to create notification:`, error);
      }
    }
  }
  console.log(`    ✓ Created notifications`);

  // 5. Seed Billing Logs
  console.log("  Creating billing logs...");
  for (let i = 0; i < 10; i++) {
    try {
      await pb.collection(Collections.BillingManagementLogs).create({
        recordId: faker.string.alphanumeric(15),
        recordType: faker.helpers.arrayElement(["invoice", "payment", "quote"]),
        externalSystem: faker.helpers.arrayElement(["accounting", "payment_gateway"]),
        externalId: faker.string.alphanumeric(20),
        status: faker.helpers.arrayElement(billingLogStatuses),
        errorMessage: faker.datatype.boolean() ? faker.lorem.sentence() : undefined,
        requestPayload: JSON.stringify({ request: faker.lorem.word() }),
        responsePayload: JSON.stringify({ response: faker.lorem.word() }),
        lastSyncAt: faker.date.past({ years: 1 }).toISOString().split("T")[0],
        retryCount: faker.number.int({ min: 0, max: 5 }),
      });
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`      ✗ Failed to create billing log:`, error.message, error.response.data);
      } else {
        console.error(`      ✗ Failed to create billing log:`, error);
      }
    }
  }
  console.log(`    ✓ Created billing logs`);

  // 6. Seed Stock Transfers
  console.log("  Creating stock transfers...");
  for (let i = 0; i < 5; i++) {
    try {
      const transfer = await pb.collection(Collections.WarehouseManagementStockTransfer).create({
        product: productIds.length > 0 ? faker.helpers.arrayElement(productIds) : undefined,
        quantity: faker.number.int({ min: 10, max: 500 }),
        status: faker.helpers.arrayElement(stockTransferStatuses),
        sourceWarehouse: faker.helpers.arrayElement(warehouseIds),
        destinationWarehouse: faker.helpers.arrayElement(warehouseIds),
      });
      ids.stockTransfers[`TRANSFER-${i}`] = transfer.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create stock transfer:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create stock transfer:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.stockTransfers).length} stock transfers`);

  // 7. Seed Package Items (packages now created in Phase 12)
  const packageIds = Object.values(ids.packages);

  console.log("  Creating package items...");
  for (const packageId of packageIds) {
    const numItems = faker.number.int({ min: 2, max: 3 });
    for (let i = 0; i < numItems; i++) {
      try {
        await pb.collection(Collections.WarehouseManagementPackageItems).create({
          package: packageId,
          product: productIds.length > 0 ? faker.helpers.arrayElement(productIds) : undefined,
          batch: inventoryBatchIds.length > 0 ? faker.helpers.arrayElement(inventoryBatchIds) : undefined,
          quantity: faker.number.int({ min: 1, max: 50 }),
          lotNumber: faker.string.alphanumeric(10).toUpperCase(),
          expiryDate: faker.date.future({ years: 2 }).toISOString().split("T")[0],
        });
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`      ✗ Failed to create package item:`, error.message, error.response.data);
        } else {
          console.error(`      ✗ Failed to create package item:`, error);
        }
      }
    }
  }
  console.log(`    ✓ Created package items`);

  // 8. Seed Returns
  console.log("  Creating returns...");
  for (let i = 0; i < 5; i++) {
    try {
      const returnRecord = await pb.collection(Collections.WarehouseManagementReturns).create({
        salesOrder: salesOrderIds.length > 0 ? faker.helpers.arrayElement(salesOrderIds) : undefined,
        client: faker.helpers.arrayElement(companyIds),
        status: faker.helpers.arrayElement(returnStatuses),
        reason: faker.lorem.paragraph(),
      });
      ids.returns[`RETURN-${i}`] = returnRecord.id;
    } catch (error) {
      if (error instanceof ClientResponseError) {
        console.error(`    ✗ Failed to create return:`, error.message, error.response.data);
      } else {
        console.error(`    ✗ Failed to create return:`, error);
      }
    }
  }
  console.log(`    ✓ Created ${Object.keys(ids.returns).length} returns`);

  // 9. Seed Return Items
  const returnIds = Object.values(ids.returns);

  console.log("  Creating return items...");
  for (const returnId of returnIds) {
    const numItems = faker.number.int({
      min: 1,
      max: Math.min(3, productIds.length),
    });
    const selectedProducts = faker.helpers.arrayElements(productIds, numItems);
    for (const productId of selectedProducts) {
      try {
        await pb.collection(Collections.WarehouseManagementReturnItems).create({
          return: returnId,
          product: productId,
          quantityExpected: faker.number.int({ min: 1, max: 20 }),
          quantityReceived: faker.number.int({ min: 0, max: 20 }),
          condition: faker.helpers.arrayElement(returnItemConditions),
        });
      } catch (error) {
        if (error instanceof ClientResponseError) {
          console.error(`      ✗ Failed to create return item:`, error.message, error.response.data);
        } else {
          console.error(`      ✗ Failed to create return item:`, error);
        }
      }
    }
  }
  console.log(`    ✓ Created return items`);

  console.log(
    `✓ Phase 13 Complete: Created expenses, geofences, notifications, billing logs, stock transfers, packages, and returns`
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

    // Phase 10: Billing System
    await seedPhase10BillingSystem();

    // Phase 11: Logistics Execution (TMS)
    await seedPhase11LogisticsExecution();

    // Phase 12: Delivery Management (DMS)
    await seedPhase12DeliveryManagement();

    // Phase 13: Advanced & Operational
    await seedPhase13AdvancedOperational();

    console.log("\n✓ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Seeding failed:", error);
    process.exit(1);
  }
}

main();
