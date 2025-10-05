import { CrmRecordType, DB } from '@/db/types';
import type { Kysely } from 'kysely';
import { Faker, faker } from '@faker-js/faker';
import {
  generateCrmAttachment,
  generateCrmCampaign,
  generateCrmCase,
  generateCrmCompany,
  generateCrmContact,
  generateCrmInteraction,
  generateCrmInvoice,
  generateCrmInvoiceItem,
  generateCrmLead,
  generateCrmNotification,
  generateCrmOpportunity,
  generateCrmOpportunityProduct,
  generateCrmProduct,
  generateCrmTag,
  generateCrmTagging,
} from '@/seeds/crm-helpers';
import { CrmAttachmentRepository } from '@/repositories/crm/attachments';
import { CrmCampaignRepository } from '@/repositories/crm/campaigns';
import { CrmCaseRepository } from '@/repositories/crm/cases';
import { CrmCompanyRepository } from '@/repositories/crm/companies';
import { CrmContactRepository } from '@/repositories/crm/contacts';
import { CrmInteractionRepository } from '@/repositories/crm/interactions';
import { CrmInvoiceItemRepository } from '@/repositories/crm/invoiceItems';
import { CrmInvoiceRepository } from '@/repositories/crm/invoices';
import { CrmLeadRepository } from '@/repositories/crm/leads';
import { CrmNotificationRepository } from '@/repositories/crm/notifications';
import { CrmOpportunityRepository } from '@/repositories/crm/opportunities';
import { CrmOpportunityProductRepository } from '@/repositories/crm/opportunityProducts';
import { CrmProductRepository } from '@/repositories/crm/products';
import { CrmTagRepository } from '@/repositories/crm/tags';
import { CrmTaggingRepository } from '@/repositories/crm/taggings';

export async function seed(db: Kysely<DB>): Promise<void> {
  const users = await db.selectFrom('user').select(['id']).execute();
  const userIds = users.map((user) => user.id);

  if (userIds.length === 0) {
    console.warn('No users found. Skipping CRM seed data generation.');
    return;
  }

  const crmCompanyRepository = new CrmCompanyRepository(db);
  const crmContactRepository = new CrmContactRepository(db);
  const crmCampaignRepository = new CrmCampaignRepository(db);
  const crmLeadRepository = new CrmLeadRepository(db);
  const crmOpportunityRepository = new CrmOpportunityRepository(db);
  const crmProductRepository = new CrmProductRepository(db);
  const crmCaseRepository = new CrmCaseRepository(db);
  const crmInvoiceRepository = new CrmInvoiceRepository(db);
  const crmInvoiceItemRepository = new CrmInvoiceItemRepository(db);
  const crmInteractionRepository = new CrmInteractionRepository(db);
  const crmNotificationRepository = new CrmNotificationRepository(db);
  const crmTagRepository = new CrmTagRepository(db);
  const crmTaggingRepository = new CrmTaggingRepository(db);
  const crmAttachmentRepository = new CrmAttachmentRepository(db);

  const numRecords = 10;

  // Seed crm.companies
  const companies = await crmCompanyRepository
    .batchCreate(
      Array.from({ length: numRecords }, () =>
        generateCrmCompany(faker, faker.helpers.arrayElement(userIds)),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const companyIds = companies.map((company) => company.id);

  // Seed crm.contacts
  const contacts = await crmContactRepository
    .batchCreate(
      Array.from({ length: numRecords * 2 }, () =>
        generateCrmContact(
          faker,
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement([undefined, ...companyIds]), // companyId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const contactIds = contacts.map((contact) => contact.id);

  // Seed crm.campaigns
  const campaigns = await crmCampaignRepository
    .batchCreate(
      Array.from({ length: numRecords }, () => generateCrmCampaign(faker)),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const campaignIds = campaigns.map((campaign) => campaign.id);

  // Seed crm.leads
  const leads = await crmLeadRepository
    .batchCreate(
      Array.from({ length: numRecords * 2 }, () =>
        generateCrmLead(
          faker,
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement([undefined, ...campaignIds]), // campaignId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const leadIds = leads.map((lead) => lead.id);

  // Seed crm.opportunities
  const opportunities = await crmOpportunityRepository
    .batchCreate(
      Array.from({ length: numRecords }, () =>
        generateCrmOpportunity(
          faker,
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement([undefined, ...companyIds]), // companyId can be null
          faker.helpers.arrayElement([undefined, ...contactIds]), // contactId can be null
          faker.helpers.arrayElement([undefined, ...campaignIds]), // campaignId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const opportunityIds = opportunities.map((opportunity) => opportunity.id);

  // Seed crm.products
  const products = await crmProductRepository
    .batchCreate(
      Array.from({ length: numRecords * 3 }, () => generateCrmProduct(faker)),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const productIds = products.map((product) => product.id);

  // Seed crm.cases
  const cases = await crmCaseRepository
    .batchCreate(
      Array.from({ length: numRecords }, () =>
        generateCrmCase(
          faker,
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement([undefined, ...contactIds]), // contactId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const caseIds = cases.map((c) => c.id);

  // Seed crm.invoices
  const invoices = await crmInvoiceRepository
    .batchCreate(
      Array.from(
        { length: numRecords },
        () =>
          generateCrmInvoice(
            faker,
            faker.helpers.arrayElement([undefined, ...opportunityIds]),
          ), // opportunityId can be null
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const invoiceIds = invoices.map((invoice) => invoice.id);

  // Seed crm.invoiceItems
  await crmInvoiceItemRepository
    .batchCreate(
      Array.from({ length: numRecords * 5 }, () =>
        generateCrmInvoiceItem(
          faker,
          faker.helpers.arrayElement(invoiceIds),
          faker.helpers.arrayElement(productIds),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed crm.interactions
  await crmInteractionRepository
    .batchCreate(
      Array.from({ length: numRecords * 3 }, () =>
        generateCrmInteraction(
          faker,
          faker.helpers.arrayElement(userIds),
          faker.helpers.arrayElement(contactIds),
          faker.helpers.arrayElement([undefined, ...caseIds]), // caseId can be null
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed crm.notifications
  await crmNotificationRepository
    .batchCreate(
      Array.from({ length: numRecords * 4 }, () =>
        generateCrmNotification(faker, faker.helpers.arrayElement(userIds)),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed crm.tags
  const tags = await crmTagRepository
    .batchCreate(
      Array.from({ length: numRecords }, () => generateCrmTag(faker)),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
  const tagIds = tags.map((tag) => tag.id);

  // Seed crm.taggings
  const recordIds = [
    ...companyIds,
    ...contactIds,
    ...campaignIds,
    ...leadIds,
    ...opportunityIds,
    ...productIds,
    ...caseIds,
    ...invoiceIds,
  ];
  await crmTaggingRepository
    .batchCreate(
      Array.from({ length: numRecords * 5 }, () =>
        generateCrmTagging(
          faker,
          faker.helpers.arrayElement(recordIds),
          faker.helpers.arrayElement(tagIds),
          faker.helpers.arrayElement(Object.values(CrmRecordType)),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();

  // Seed crm.attachments
  await crmAttachmentRepository
    .batchCreate(
      Array.from({ length: numRecords * 5 }, () =>
        generateCrmAttachment(
          faker,
          faker.helpers.arrayElement(recordIds),
          faker.helpers.arrayElement(Object.values(CrmRecordType)),
        ),
      ),
    )
    .onConflict((oc) => oc.doNothing())
    .execute();
}
