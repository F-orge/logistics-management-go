import PocketBase from "pocketbase";
import { faker } from "@faker-js/faker";
import { Collections, UsersRolesOptions, CustomerRelationsProductsTypeOptions } from "../src/lib/pb.types";

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
// EXECUTION
// ============================================================================

async function main() {
  try {
    console.log("🚀 Starting PocketBase Seed Script...");
    await authenticateAsAdmin();

    // Phase 1: Users
    await seedPhase1Users();

    // Phase 2: CRM Core
    await seedPhase2CRMCore();

    console.log("\n✓ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Seeding failed:", error);
    process.exit(1);
  }
}

main();
