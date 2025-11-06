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
  UsersRolesOptions,
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

    // Phase 3: Marketing/Sales
    await seedPhase3MarketingSales();

    // Phase 4: CRM Secondary
    await seedPhase4CRMSecondary();

    console.log("\n✓ Seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("\n✗ Seeding failed:", error);
    process.exit(1);
  }
}

main();
