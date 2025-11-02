import { DB } from "@packages/graphql/db.types";
import type { Kysely } from "kysely";
import { Faker, base, de, de_AT, en } from "@faker-js/faker";
import {
  seedBillingAccountingSyncLog,
  seedBillingAccountTransaction,
  seedBillingClientAccount,
  seedBillingCreditNote,
  seedBillingDispute,
  seedBillingDocument,
  seedBillingInvoice,
  seedBillingInvoiceLineItem,
  seedBillingPayment,
  seedBillingQuote,
  seedBillingRateCard,
  seedBillingRateRule,
  seedBillingSurcharge,
} from "../src/seeds/billing-helpers";

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] });

  // Get all users for creator/processor references
  const users = await db.selectFrom("user").selectAll().execute();

  if (users.length === 0) {
    console.log("No users found. Please run auth seeds first.");
    return;
  }

  const getRandomUserId = () =>
    users[Math.floor(Math.random() * users.length)].id;

  // Get CRM companies for billing clients
  const crmCompanies = await db
    .selectFrom("crm.companies")
    .select(["id"])
    .execute();

  if (crmCompanies.length === 0) {
    console.log("No CRM companies found. Please run CRM seeds first.");
    return;
  }

  // 1. Seed Client Accounts (depends on CRM companies)
  console.log("Seeding Billing Client Accounts...");
  const clientAccountData = Array.from({ length: 300 }, () => {
    const company =
      crmCompanies[Math.floor(Math.random() * crmCompanies.length)];
    return seedBillingClientAccount(faker, { clientId: company.id });
  });

  const clientAccounts = await db
    .insertInto("billing.clientAccounts")
    .values(clientAccountData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${clientAccounts.length} client accounts`);

  // 2. Seed Rate Cards (no dependencies)
  console.log("Seeding Billing Rate Cards...");
  const rateCardData = Array.from({ length: 20 }, () => {
    const createdByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.8,
    });
    return seedBillingRateCard(faker, { createdByUserId });
  });

  const rateCards = await db
    .insertInto("billing.rateCards")
    .values(rateCardData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${rateCards.length} rate cards`);

  // 3. Seed Rate Rules (depends on rate cards)
  console.log("Seeding Billing Rate Rules...");
  const rateRuleData: Array<ReturnType<typeof seedBillingRateRule>> = [];

  for (const rateCard of rateCards) {
    // Each rate card has 3-10 rules
    const ruleCount = faker.number.int({ min: 3, max: 10 });
    for (let i = 0; i < ruleCount; i++) {
      rateRuleData.push(
        seedBillingRateRule(faker, { rateCardId: rateCard.id })
      );
    }
  }

  const rateRules = await db
    .insertInto("billing.rateRules")
    .values(rateRuleData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${rateRules.length} rate rules`);

  // 4. Seed Surcharges (no dependencies)
  console.log("Seeding Billing Surcharges...");
  const surchargeData = Array.from({ length: 15 }, () =>
    seedBillingSurcharge(faker)
  );

  const surcharges = await db
    .insertInto("billing.surcharges")
    .values(surchargeData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${surcharges.length} surcharges`);

  // 5. Seed Quotes (depends on CRM companies and users)
  console.log("Seeding Billing Quotes...");
  const quoteData = Array.from({ length: 400 }, () => {
    const clientId = faker.helpers.maybe(
      () => crmCompanies[Math.floor(Math.random() * crmCompanies.length)].id,
      { probability: 0.9 }
    );
    const createdByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.8,
    });
    return seedBillingQuote(faker, { clientId, createdByUserId });
  });

  const quotes = await db
    .insertInto("billing.quotes")
    .values(quoteData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${quotes.length} quotes`);

  // 6. Seed Invoices (depends on CRM companies, users, and quotes)
  console.log("Seeding Billing Invoices...");
  const invoiceData = Array.from({ length: 300 }, () => {
    const clientId =
      crmCompanies[Math.floor(Math.random() * crmCompanies.length)].id;
    const createdByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.9,
    });
    const quoteId = faker.helpers.maybe(
      () => quotes[Math.floor(Math.random() * quotes.length)].id,
      { probability: 0.4 }
    );
    return seedBillingInvoice(faker, { clientId, createdByUserId, quoteId });
  });

  const invoices = await db
    .insertInto("billing.invoices")
    .values(invoiceData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${invoices.length} invoices`);

  // Get reference data from other schemas for proper linking
  const wmsOutboundShipments = await db
    .selectFrom("wms.outboundShipments")
    .select(["id"])
    .execute();

  const tmsTrips = await db.selectFrom("tms.trips").select(["id"]).execute();

  const wmsPackages = await db
    .selectFrom("wms.packages")
    .select(["id"])
    .execute();

  // 7. Seed Invoice Line Items (depends on invoices and actual shipments/trips/packages)
  console.log("Seeding Billing Invoice Line Items...");
  const invoiceLineItemData: Array<
    ReturnType<typeof seedBillingInvoiceLineItem>
  > = [];

  for (const invoice of invoices) {
    // Each invoice has 1-6 line items
    const itemCount = faker.number.int({ min: 1, max: 6 });
    for (let i = 0; i < itemCount; i++) {
      // Link to actual entities instead of random UUIDs
      let sourceRecordType: string | undefined;
      let sourceRecordId: string | undefined;

      const entityType = faker.helpers.arrayElement([
        "shipment",
        "trip",
        "package",
      ]);

      if (entityType === "shipment" && wmsOutboundShipments.length > 0) {
        sourceRecordType = "wms_outbound_shipment";
        sourceRecordId =
          wmsOutboundShipments[
            Math.floor(Math.random() * wmsOutboundShipments.length)
          ].id;
      } else if (entityType === "trip" && tmsTrips.length > 0) {
        sourceRecordType = "tms_trip";
        sourceRecordId =
          tmsTrips[Math.floor(Math.random() * tmsTrips.length)].id;
      } else if (entityType === "package" && wmsPackages.length > 0) {
        sourceRecordType = "wms_package";
        sourceRecordId =
          wmsPackages[Math.floor(Math.random() * wmsPackages.length)].id;
      }

      invoiceLineItemData.push(
        seedBillingInvoiceLineItem(faker, {
          invoiceId: invoice.id,
          sourceRecordId,
          sourceRecordType,
        })
      );
    }
  }

  const invoiceLineItems = await db
    .insertInto("billing.invoiceLineItems")
    .values(invoiceLineItemData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${invoiceLineItems.length} invoice line items`);

  // 8. Seed Payments (depends on invoices and users)
  console.log("Seeding Billing Payments...");
  const paymentData = Array.from({ length: 200 }, () => {
    const invoice = invoices[Math.floor(Math.random() * invoices.length)];
    const processedByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.7,
    });
    return seedBillingPayment(faker, {
      invoiceId: invoice.id,
      processedByUserId,
    });
  });

  const payments = await db
    .insertInto("billing.payments")
    .values(paymentData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${payments.length} payments`);

  // 9. Seed Account Transactions (depends on client accounts, users, and actual records)
  console.log("Seeding Billing Account Transactions...");
  const accountTransactionData = Array.from({ length: 500 }, () => {
    const clientAccount =
      clientAccounts[Math.floor(Math.random() * clientAccounts.length)];
    const processedByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.8,
    });

    // Link to actual invoices, payments, or credit notes
    let sourceRecordType: string | undefined;
    let sourceRecordId: string | undefined;

    const recordType = faker.helpers.arrayElement(["invoice", "payment"]);

    if (recordType === "invoice" && invoices.length > 0) {
      sourceRecordType = "billing_invoice";
      sourceRecordId = invoices[Math.floor(Math.random() * invoices.length)].id;
    } else if (recordType === "payment" && payments.length > 0) {
      sourceRecordType = "billing_payment";
      sourceRecordId = payments[Math.floor(Math.random() * payments.length)].id;
    }

    return seedBillingAccountTransaction(faker, {
      clientAccountId: clientAccount.id,
      processedByUserId,
      sourceRecordId,
      sourceRecordType,
    });
  });

  const accountTransactions = await db
    .insertInto("billing.accountTransactions")
    .values(accountTransactionData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${accountTransactions.length} account transactions`);

  // 10. Seed Disputes (depends on CRM companies, invoice line items, and users)
  console.log("Seeding Billing Disputes...");
  const disputeData = Array.from({ length: 30 }, () => {
    const clientId =
      crmCompanies[Math.floor(Math.random() * crmCompanies.length)].id;
    const lineItem =
      invoiceLineItems[Math.floor(Math.random() * invoiceLineItems.length)];
    const resolvedByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.6,
    });
    return seedBillingDispute(faker, {
      clientId,
      lineItemId: lineItem.id,
      resolvedByUserId,
    });
  });

  const disputes = await db
    .insertInto("billing.disputes")
    .values(disputeData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${disputes.length} disputes`);

  // 11. Seed Credit Notes (depends on invoices, users, and disputes)
  console.log("Seeding Billing Credit Notes...");
  const creditNoteData = Array.from({ length: 50 }, () => {
    const invoice = invoices[Math.floor(Math.random() * invoices.length)];
    const createdByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.9,
    });
    const disputeId = faker.helpers.maybe(
      () => disputes[Math.floor(Math.random() * disputes.length)].id,
      { probability: 0.4 }
    );
    return seedBillingCreditNote(faker, {
      invoiceId: invoice.id,
      createdByUserId,
      disputeId,
    });
  });

  const creditNotes = await db
    .insertInto("billing.creditNotes")
    .values(creditNoteData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${creditNotes.length} credit notes`);

  // 12. Seed Documents (depends on various records and users)
  console.log("Seeding Billing Documents...");
  const documentData: Array<ReturnType<typeof seedBillingDocument>> = [];

  // Documents for invoices
  for (let i = 0; i < 150; i++) {
    const invoice = invoices[Math.floor(Math.random() * invoices.length)];
    const uploadedByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.8,
    });
    documentData.push(
      seedBillingDocument(faker, {
        recordId: invoice.id,
        recordType: "invoice",
        uploadedByUserId,
      })
    );
  }

  // Documents for quotes
  for (let i = 0; i < 80; i++) {
    const quote = quotes[Math.floor(Math.random() * quotes.length)];
    const uploadedByUserId = faker.helpers.maybe(() => getRandomUserId(), {
      probability: 0.8,
    });
    documentData.push(
      seedBillingDocument(faker, {
        recordId: quote.id,
        recordType: "quote",
        uploadedByUserId,
      })
    );
  }

  const documents = await db
    .insertInto("billing.documents")
    .values(documentData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${documents.length} documents`);

  // 13. Seed Accounting Sync Logs (depends on various records)
  console.log("Seeding Billing Accounting Sync Logs...");
  const syncLogData: Array<ReturnType<typeof seedBillingAccountingSyncLog>> =
    [];

  // Sync logs for invoices
  for (let i = 0; i < 100; i++) {
    const invoice = invoices[Math.floor(Math.random() * invoices.length)];
    syncLogData.push(
      seedBillingAccountingSyncLog(faker, {
        recordId: invoice.id,
        recordType: "invoice",
      })
    );
  }

  // Sync logs for payments
  for (let i = 0; i < 60; i++) {
    const payment = payments[Math.floor(Math.random() * payments.length)];
    syncLogData.push(
      seedBillingAccountingSyncLog(faker, {
        recordId: payment.id,
        recordType: "payment",
      })
    );
  }

  const syncLogs = await db
    .insertInto("billing.accountingSyncLog")
    .values(syncLogData)
    .returningAll()
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`Seeded ${syncLogs.length} accounting sync logs`);

  console.log("Billing seeding completed successfully!");
}
