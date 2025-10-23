import { DB, CrmRecordType } from "@packages/db/db.types";
import type { Kysely } from "kysely";
import { Faker, en } from "@faker-js/faker";
import {
  seedCrmCompany,
  seedCrmContact,
  seedCrmLead,
  seedCrmCampaign,
  seedCrmOpportunity,
  seedCrmProduct,
  seedCrmCase,
  seedCrmInteraction,
  seedCrmInvoice,
  seedCrmInvoiceItem,
  seedCrmOpportunityProduct,
  seedCrmNotification,
  seedCrmAttachment,
} from "../src/seeds/crm-helpers";

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: en });

  // Get all users to use as owners
  const users = await db.selectFrom("user").selectAll().execute();

  if (users.length === 0) {
    console.log("No users found. Please run auth seeds first.");
    return;
  }

  const getRandomUserId = () =>
    users[Math.floor(Math.random() * users.length)].id;

  // 1. Seed Companies (no dependencies)
  console.log("Seeding CRM Companies...");
  const companyData = Array.from({ length: 500 }, () =>
    seedCrmCompany(faker, { ownerId: getRandomUserId() })
  );

  const companies = await db
    .insertInto("crm.companies")
    .values(companyData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${companies.length} companies`);

  // 2. Seed Campaigns (no dependencies)
  console.log("Seeding CRM Campaigns...");
  const campaignData = Array.from({ length: 100 }, () =>
    seedCrmCampaign(faker)
  );

  const campaigns = await db
    .insertInto("crm.campaigns")
    .values(campaignData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${campaigns.length} campaigns`);

  // 3. Seed Products (no dependencies)
  console.log("Seeding CRM Products...");
  const productData = Array.from({ length: 200 }, () => seedCrmProduct(faker));

  const products = await db
    .insertInto("crm.products")
    .values(productData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${products.length} products`);

  // 4. Seed Contacts (depends on companies)
  console.log("Seeding CRM Contacts...");
  const contactData = Array.from({ length: 1000 }, () => {
    const companyId = faker.helpers.maybe(
      () => companies[Math.floor(Math.random() * companies.length)]?.id,
      { probability: 0.7 }
    );
    return seedCrmContact(faker, {
      companyId,
      ownerId: getRandomUserId(),
    });
  });

  const contacts = await db
    .insertInto("crm.contacts")
    .values(contactData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${contacts.length} contacts`);

  // 5. Seed Leads (depends on campaigns)
  console.log("Seeding CRM Leads...");
  const leadData = Array.from({ length: 800 }, () => {
    const campaignId = faker.helpers.maybe(
      () => campaigns[Math.floor(Math.random() * campaigns.length)]?.id,
      { probability: 0.3 }
    );

    // Some leads are converted
    const isConverted = faker.datatype.boolean({ probability: 0.2 });
    let convertedCompanyId, convertedContactId, convertedOpportunityId;

    if (isConverted) {
      convertedCompanyId = faker.helpers.maybe(
        () => companies[Math.floor(Math.random() * companies.length)]?.id,
        { probability: 0.8 }
      );
      convertedContactId = faker.helpers.maybe(
        () => contacts[Math.floor(Math.random() * contacts.length)]?.id,
        { probability: 0.9 }
      );
    }

    return seedCrmLead(faker, {
      ownerId: getRandomUserId(),
      campaignId,
      convertedCompanyId,
      convertedContactId,
      convertedOpportunityId, // Will be set later if needed
    });
  });

  const leads = await db
    .insertInto("crm.leads")
    .values(leadData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${leads.length} leads`);

  // 6. Seed Opportunities (depends on companies, contacts, campaigns)
  console.log("Seeding CRM Opportunities...");
  const opportunityData = Array.from({ length: 600 }, () => {
    const companyId = faker.helpers.maybe(
      () => companies[Math.floor(Math.random() * companies.length)]?.id,
      { probability: 0.8 }
    );
    const contactId = faker.helpers.maybe(
      () => contacts[Math.floor(Math.random() * contacts.length)]?.id,
      { probability: 0.9 }
    );
    const campaignId = faker.helpers.maybe(
      () => campaigns[Math.floor(Math.random() * campaigns.length)]?.id,
      { probability: 0.4 }
    );

    return seedCrmOpportunity(faker, {
      ownerId: getRandomUserId(),
      companyId,
      contactId,
      campaignId,
    });
  });

  const opportunities = await db
    .insertInto("crm.opportunities")
    .values(opportunityData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${opportunities.length} opportunities`);

  // 7. Seed Cases (depends on contacts)
  console.log("Seeding CRM Cases...");
  const caseData = Array.from({ length: 300 }, () => {
    const contactId = faker.helpers.maybe(
      () => contacts[Math.floor(Math.random() * contacts.length)]?.id,
      { probability: 0.8 }
    );

    return seedCrmCase(faker, {
      ownerId: getRandomUserId(),
      contactId,
    });
  });

  const cases = await db
    .insertInto("crm.cases")
    .values(caseData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${cases.length} cases`);

  // 8. Seed Interactions (depends on contacts and users, optionally cases)
  console.log("Seeding CRM Interactions...");
  const interactionData = Array.from({ length: 2000 }, () => {
    const contactId = contacts[Math.floor(Math.random() * contacts.length)].id;
    const userId = getRandomUserId();
    const caseId = faker.helpers.maybe(
      () => cases[Math.floor(Math.random() * cases.length)]?.id,
      { probability: 0.3 }
    );

    return seedCrmInteraction(faker, {
      contactId,
      userId,
      caseId,
    });
  });

  const interactions = await db
    .insertInto("crm.interactions")
    .values(interactionData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${interactions.length} interactions`);

  // 9. Seed Invoices (depends on opportunities)
  console.log("Seeding CRM Invoices...");
  const invoiceData = Array.from({ length: 400 }, () => {
    const opportunityId = faker.helpers.maybe(
      () => opportunities[Math.floor(Math.random() * opportunities.length)]?.id,
      { probability: 0.7 }
    );

    return seedCrmInvoice(faker, { opportunityId });
  });

  const invoices = await db
    .insertInto("crm.invoices")
    .values(invoiceData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${invoices.length} invoices`);

  // 10. Seed Invoice Items (depends on invoices and products)
  console.log("Seeding CRM Invoice Items...");
  const invoiceItemData: Array<ReturnType<typeof seedCrmInvoiceItem>> = [];

  for (const invoice of invoices) {
    // Each invoice has 1-5 items
    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < itemCount; i++) {
      const productId =
        products[Math.floor(Math.random() * products.length)].id;
      invoiceItemData.push(
        seedCrmInvoiceItem(faker, {
          invoiceId: invoice.id,
          productId,
        })
      );
    }
  }

  const invoiceItems = await db
    .insertInto("crm.invoiceItems")
    .values(invoiceItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${invoiceItems.length} invoice items`);

  // 11. Seed Opportunity Products (depends on opportunities and products)
  console.log("Seeding CRM Opportunity Products...");
  const opportunityProductData: Array<
    ReturnType<typeof seedCrmOpportunityProduct>
  > = [];

  for (const opportunity of opportunities) {
    // Each opportunity has 1-3 products
    const productCount = faker.number.int({ min: 1, max: 3 });
    const selectedProducts = faker.helpers.arrayElements(
      products,
      productCount
    );

    for (const product of selectedProducts) {
      opportunityProductData.push(
        seedCrmOpportunityProduct(faker, {
          opportunityId: opportunity.id,
          productId: product.id,
        })
      );
    }
  }

  const opportunityProducts = await db
    .insertInto("crm.opportunityProducts")
    .values(opportunityProductData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${opportunityProducts.length} opportunity products`);

  // 12. Seed Notifications (depends on users)
  console.log("Seeding CRM Notifications...");
  const notificationData = Array.from({ length: 1500 }, () =>
    seedCrmNotification(faker, { userId: getRandomUserId() })
  );

  const notifications = await db
    .insertInto("crm.notifications")
    .values(notificationData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${notifications.length} notifications`);

  // 13. Seed Attachments (depends on various records)
  console.log("Seeding CRM Attachments...");
  const attachmentData: Array<ReturnType<typeof seedCrmAttachment>> = [];

  // Add attachments to different record types
  const recordTypes = [
    { records: companies.slice(0, 100), type: CrmRecordType.Companies },
    { records: contacts.slice(0, 200), type: CrmRecordType.Contacts },
    { records: leads.slice(0, 150), type: CrmRecordType.Leads },
    { records: opportunities.slice(0, 180), type: CrmRecordType.Opportunities },
    { records: cases.slice(0, 100), type: CrmRecordType.Cases },
  ];

  for (const { records, type } of recordTypes) {
    for (const record of records) {
      // Each record has 0-3 attachments
      const attachmentCount = faker.number.int({ min: 0, max: 3 });
      for (let i = 0; i < attachmentCount; i++) {
        attachmentData.push(
          seedCrmAttachment(faker, {
            recordId: record.id,
            recordType: type,
          })
        );
      }
    }
  }

  const attachments = await db
    .insertInto("crm.attachments")
    .values(attachmentData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${attachments.length} attachments`);

  console.log("CRM seeding completed successfully!");
}
