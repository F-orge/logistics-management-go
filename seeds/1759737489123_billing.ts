import { faker } from '@faker-js/faker';
import { Kysely } from 'kysely';
import { DB } from '@/db/types';
import { BillingAccountingSyncLogRepository } from '@/repositories/billing/accountingSyncLogs';
import { BillingAccountTransactionRepository } from '@/repositories/billing/accountTransactions';
// Import billing repositories
import { BillingClientAccountRepository } from '@/repositories/billing/clientAccounts';
import { BillingCreditNoteRepository } from '@/repositories/billing/creditNotes';
import { BillingDisputeRepository } from '@/repositories/billing/disputes';
import { BillingDocumentRepository } from '@/repositories/billing/documents';
import { BillingInvoiceLineItemRepository } from '@/repositories/billing/invoiceLineItems';
import { BillingInvoiceRepository } from '@/repositories/billing/invoices';
import { BillingPaymentRepository } from '@/repositories/billing/payments';
import { BillingQuoteRepository } from '@/repositories/billing/quotes';
import { BillingRateCardRepository } from '@/repositories/billing/rateCards';
import { BillingRateRuleRepository } from '@/repositories/billing/rateRules';
import { BillingSurchargeRepository } from '@/repositories/billing/surcharges';
// Import billing helpers
import {
  generateBillingAccountingSyncLog,
  generateBillingAccountTransaction,
  generateBillingClientAccount,
  generateBillingCreditNote,
  generateBillingDispute,
  generateBillingDocument,
  generateBillingInvoice,
  generateBillingInvoiceLineItem,
  generateBillingPayment,
  generateBillingQuote,
  generateBillingRateCard,
  generateBillingRateRule,
  generateBillingSurcharge,
} from '@/seeds/billing-helpers';

export async function seed(db: Kysely<DB>): Promise<void> {
  console.log('💰 Starting Billing seed...');

  // Configure faker
  faker.seed(12345);

  // Initialize repositories
  const clientAccountRepo = new BillingClientAccountRepository(db);
  const quoteRepo = new BillingQuoteRepository(db);
  const invoiceRepo = new BillingInvoiceRepository(db);
  const invoiceLineItemRepo = new BillingInvoiceLineItemRepository(db);
  const paymentRepo = new BillingPaymentRepository(db);
  const disputeRepo = new BillingDisputeRepository(db);
  const creditNoteRepo = new BillingCreditNoteRepository(db);
  const documentRepo = new BillingDocumentRepository(db);
  const rateCardRepo = new BillingRateCardRepository(db);
  const rateRuleRepo = new BillingRateRuleRepository(db);
  const surchargeRepo = new BillingSurchargeRepository(db);
  const accountTransactionRepo = new BillingAccountTransactionRepository(db);
  const accountingSyncLogRepo = new BillingAccountingSyncLogRepository(db);

  // Get prerequisite data
  console.log('📦 Fetching prerequisite data...');

  // Get companies from CRM
  const companies = await db
    .selectFrom('crm.companies')
    .select(['id'])
    .execute();

  // Get users
  const users = await db.selectFrom('user').select(['id']).execute();

  console.log(`Found ${companies.length} companies and ${users.length} users`);

  // 1. Create Rate Cards
  console.log('💳 Creating rate cards...');
  const rateCardsData = Array.from({ length: 10 }, () =>
    generateBillingRateCard(faker, faker.helpers.arrayElement(users).id),
  );

  const rateCards = await rateCardRepo
    .batchCreate(rateCardsData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${rateCards.length} rate cards`);

  // 2. Create Rate Rules
  console.log('📋 Creating rate rules...');
  const rateRulesData = Array.from({ length: 50 }, () =>
    generateBillingRateRule(faker, faker.helpers.arrayElement(rateCards).id),
  );

  const rateRules = await rateRuleRepo
    .batchCreate(rateRulesData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${rateRules.length} rate rules`);

  // 3. Create Surcharges
  console.log('💸 Creating surcharges...');
  const surchargesData = Array.from({ length: 15 }, () =>
    generateBillingSurcharge(faker),
  );

  const surcharges = await surchargeRepo
    .batchCreate(surchargesData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${surcharges.length} surcharges`);

  // 4. Create Client Accounts
  console.log('🏦 Creating client accounts...');
  const clientAccountsData = companies.map((company) =>
    generateBillingClientAccount(faker, company.id),
  );

  const clientAccounts = await clientAccountRepo
    .batchCreate(clientAccountsData)
    .onConflict((oc) => oc.doNothing())
    .execute();

  console.log(`✅ Created ${clientAccounts.length} client accounts`);

  // 5. Create Quotes
  console.log('📄 Creating quotes...');
  const quotesData = Array.from({ length: 100 }, () =>
    generateBillingQuote(
      faker,
      faker.helpers.arrayElement(companies).id,
      faker.helpers.arrayElement(users).id,
    ),
  );

  const quotes = await quoteRepo
    .batchCreate(quotesData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${quotes.length} quotes`);

  // 6. Create Invoices
  console.log('🧾 Creating invoices...');
  const invoicesData = Array.from({ length: 80 }, () =>
    generateBillingInvoice(
      faker,
      faker.helpers.arrayElement(companies).id,
      faker.helpers.arrayElement(users).id,
      faker.datatype.boolean()
        ? faker.helpers.arrayElement(quotes).id
        : undefined,
    ),
  );

  const invoices = await invoiceRepo
    .batchCreate(invoicesData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${invoices.length} invoices`);

  // 7. Create Invoice Line Items
  console.log('📝 Creating invoice line items...');
  const invoiceLineItemsData = Array.from({ length: 250 }, () =>
    generateBillingInvoiceLineItem(
      faker,
      faker.helpers.arrayElement(invoices).id,
      faker.datatype.boolean() ? faker.string.uuid() : undefined,
      faker.datatype.boolean()
        ? faker.helpers.arrayElement(['shipment', 'storage', 'handling'])
        : undefined,
    ),
  );

  const invoiceLineItems = await invoiceLineItemRepo
    .batchCreate(invoiceLineItemsData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${invoiceLineItems.length} invoice line items`);

  // 8. Create Payments
  console.log('💳 Creating payments...');
  const paymentsData = Array.from({ length: 60 }, () =>
    generateBillingPayment(
      faker,
      faker.helpers.arrayElement(invoices).id,
      faker.helpers.arrayElement(users).id,
    ),
  );

  const payments = await paymentRepo
    .batchCreate(paymentsData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${payments.length} payments`);

  // 9. Create Disputes
  console.log('⚖️ Creating disputes...');
  const disputesData = Array.from({ length: 20 }, () =>
    generateBillingDispute(
      faker,
      faker.helpers.arrayElement(companies).id,
      faker.helpers.arrayElement(invoiceLineItems).id,
      faker.datatype.boolean()
        ? faker.helpers.arrayElement(users).id
        : undefined,
    ),
  );

  const disputes = await disputeRepo
    .batchCreate(disputesData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${disputes.length} disputes`);

  // 10. Create Credit Notes
  console.log('💸 Creating credit notes...');
  const creditNotesData = Array.from({ length: 15 }, () =>
    generateBillingCreditNote(
      faker,
      faker.helpers.arrayElement(invoices).id,
      faker.datatype.boolean()
        ? faker.helpers.arrayElement(disputes).id
        : undefined,
      faker.helpers.arrayElement(users).id,
    ),
  );

  const creditNotes = await creditNoteRepo
    .batchCreate(creditNotesData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${creditNotes.length} credit notes`);

  // 11. Create Documents
  console.log('📁 Creating documents...');
  const documentsData = Array.from({ length: 100 }, () => {
    const recordTypes = ['invoice', 'quote', 'payment', 'dispute'];
    const recordType = faker.helpers.arrayElement(recordTypes);
    let recordId: string;

    switch (recordType) {
      case 'invoice':
        recordId = faker.helpers.arrayElement(invoices).id;
        break;
      case 'quote':
        recordId = faker.helpers.arrayElement(quotes).id;
        break;
      case 'payment':
        recordId = faker.helpers.arrayElement(payments).id;
        break;
      case 'dispute':
        recordId = faker.helpers.arrayElement(disputes).id;
        break;
      default:
        recordId = faker.helpers.arrayElement(invoices).id;
    }

    return generateBillingDocument(
      faker,
      recordId,
      recordType,
      faker.helpers.arrayElement(users).id,
    );
  });

  const documents = await documentRepo
    .batchCreate(documentsData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${documents.length} documents`);

  // 12. Create Account Transactions
  console.log('💰 Creating account transactions...');
  const accountTransactionsData = Array.from({ length: 150 }, () => {
    const sourceRecordTypes = ['invoice', 'payment', 'credit_note'];
    const sourceRecordType = faker.helpers.arrayElement(sourceRecordTypes);
    let sourceRecordId: string;

    switch (sourceRecordType) {
      case 'invoice':
        sourceRecordId = faker.helpers.arrayElement(invoices).id;
        break;
      case 'payment':
        sourceRecordId = faker.helpers.arrayElement(payments).id;
        break;
      case 'credit_note':
        sourceRecordId = faker.helpers.arrayElement(creditNotes).id;
        break;
      default:
        sourceRecordId = faker.helpers.arrayElement(invoices).id;
    }

    return generateBillingAccountTransaction(
      faker,
      faker.helpers.arrayElement(clientAccounts).id,
      sourceRecordId,
      sourceRecordType,
      faker.helpers.arrayElement(users).id,
    );
  });

  const accountTransactions = await accountTransactionRepo
    .batchCreate(accountTransactionsData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${accountTransactions.length} account transactions`);

  console.log('🔄 Creating accounting sync logs...');
  const accountingSyncLogsData = Array.from({ length: 50 }, () => {
    const recordTypes = ['invoice', 'payment', 'credit_note', 'client_account'];
    const recordType = faker.helpers.arrayElement(recordTypes);
    let recordId: string;

    switch (recordType) {
      case 'invoice':
        recordId = faker.helpers.arrayElement(invoices).id;
        break;
      case 'payment':
        recordId = faker.helpers.arrayElement(payments).id;
        break;
      case 'credit_note':
        recordId = faker.helpers.arrayElement(creditNotes).id;
        break;
      case 'client_account':
        recordId = faker.helpers.arrayElement(clientAccounts).id;
        break;
      default:
        recordId = faker.helpers.arrayElement(invoices).id;
    }

    return generateBillingAccountingSyncLog(faker, recordId, recordType);
  });

  const accountingSyncLogs = await accountingSyncLogRepo
    .batchCreate(accountingSyncLogsData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${accountingSyncLogs.length} accounting sync logs`);

  // Summary
  const totalRecords =
    rateCards.length +
    rateRules.length +
    surcharges.length +
    clientAccounts.length +
    quotes.length +
    invoices.length +
    invoiceLineItems.length +
    payments.length +
    disputes.length +
    creditNotes.length +
    documents.length +
    accountTransactions.length;
  // + accountingSyncLogs.length;

  console.log('🎉 Billing seed completed successfully!');
  console.log(`📊 Total records created: ${totalRecords}`);
  console.log('   - Rate Cards:', rateCards.length);
  console.log('   - Rate Rules:', rateRules.length);
  console.log('   - Surcharges:', surcharges.length);
  console.log('   - Client Accounts:', clientAccounts.length);
  console.log('   - Quotes:', quotes.length);
  console.log('   - Invoices:', invoices.length);
  console.log('   - Invoice Line Items:', invoiceLineItems.length);
  console.log('   - Payments:', payments.length);
  console.log('   - Disputes:', disputes.length);
  console.log('   - Credit Notes:', creditNotes.length);
  console.log('   - Documents:', documents.length);
  console.log('   - Account Transactions:', accountTransactions.length);
  // console.log('   - Accounting Sync Logs:', accountingSyncLogs.length);
}
