import { base, de, de_AT, en, Faker } from '@faker-js/faker';
import type { Kysely } from 'kysely';
import { CrmRecordType, DB } from '@/db/types';
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
import { CrmTaggingRepository } from '@/repositories/crm/taggings';
import { CrmTagRepository } from '@/repositories/crm/tags';
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

export async function seed(db: Kysely<DB>): Promise<void> {
  const faker = new Faker({ locale: [de_AT, de, en, base] });

  // Initialize repositories
  const campaignRepo = new CrmCampaignRepository(db);
  const productRepo = new CrmProductRepository(db);
  const tagRepo = new CrmTagRepository(db);
  const companyRepo = new CrmCompanyRepository(db);
  const contactRepo = new CrmContactRepository(db);
  const leadRepo = new CrmLeadRepository(db);
  const opportunityRepo = new CrmOpportunityRepository(db);
  const caseRepo = new CrmCaseRepository(db);
  const interactionRepo = new CrmInteractionRepository(db);
  const invoiceRepo = new CrmInvoiceRepository(db);
  const invoiceItemRepo = new CrmInvoiceItemRepository(db);
  const opportunityProductRepo = new CrmOpportunityProductRepository(db);
  const notificationRepo = new CrmNotificationRepository(db);
  const attachmentRepo = new CrmAttachmentRepository(db);
  const taggingRepo = new CrmTaggingRepository(db);

  console.log('🌱 Starting CRM seed data generation...');

  // Get existing users to use as owners
  const users = await db.selectFrom('user').select(['id']).execute();
  if (users.length === 0) {
    console.log('⚠️  No users found. Please run auth seed first.');
    return;
  }

  const userIds = users.map((u) => u.id);
  console.log(`📊 Found ${userIds.length} users for CRM data`);

  // 1. Create independent entities first

  // Create campaigns
  console.log('📈 Creating campaigns...');
  const campaignData = Array.from({ length: 20 }, () =>
    generateCrmCampaign(faker),
  );
  const campaigns = await campaignRepo
    .batchCreate(campaignData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${campaigns.length} campaigns`);

  // Create products
  console.log('🛍️ Creating products...');
  const productData = Array.from({ length: 50 }, () =>
    generateCrmProduct(faker),
  );
  const products = await productRepo
    .batchCreate(productData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${products.length} products`);

  // Create tags
  console.log('🏷️ Creating tags...');
  const tagData = Array.from({ length: 30 }, () => generateCrmTag(faker));
  const tags = await tagRepo
    .batchCreate(tagData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${tags.length} tags`);

  // 2. Create companies
  console.log('🏢 Creating companies...');
  const companyData = Array.from({ length: 100 }, () =>
    generateCrmCompany(faker, faker.helpers.arrayElement(userIds)),
  );
  const companies = await companyRepo
    .batchCreate(companyData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${companies.length} companies`);

  // 3. Create contacts
  console.log('👥 Creating contacts...');
  const contactData = Array.from({ length: 200 }, () => {
    const companyId =
      Math.random() > 0.3
        ? faker.helpers.arrayElement(companies).id
        : undefined;
    return generateCrmContact(
      faker,
      faker.helpers.arrayElement(userIds),
      companyId,
    );
  });
  const contacts = await contactRepo
    .batchCreate(contactData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${contacts.length} contacts`);

  // 4. Create leads
  console.log('🎯 Creating leads...');
  const leadData = Array.from({ length: 150 }, () => {
    const campaignId =
      Math.random() > 0.4
        ? faker.helpers.arrayElement(campaigns).id
        : undefined;
    const convertedCompanyId =
      Math.random() > 0.8
        ? faker.helpers.arrayElement(companies).id
        : undefined;
    const convertedContactId =
      Math.random() > 0.8 ? faker.helpers.arrayElement(contacts).id : undefined;
    return generateCrmLead(
      faker,
      faker.helpers.arrayElement(userIds),
      campaignId,
      convertedCompanyId,
      convertedContactId,
    );
  });
  const leads = await leadRepo
    .batchCreate(leadData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${leads.length} leads`);

  // 5. Create opportunities
  console.log('💰 Creating opportunities...');
  const opportunityData = Array.from({ length: 120 }, () => {
    const companyId =
      Math.random() > 0.2
        ? faker.helpers.arrayElement(companies).id
        : undefined;
    const contactId =
      Math.random() > 0.2 ? faker.helpers.arrayElement(contacts).id : undefined;
    const campaignId =
      Math.random() > 0.5
        ? faker.helpers.arrayElement(campaigns).id
        : undefined;
    return generateCrmOpportunity(
      faker,
      faker.helpers.arrayElement(userIds),
      companyId,
      contactId,
      campaignId,
    );
  });
  const opportunities = await opportunityRepo
    .batchCreate(opportunityData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${opportunities.length} opportunities`);

  // 6. Create cases
  console.log('📋 Creating cases...');
  const caseData = Array.from({ length: 80 }, () => {
    const contactId =
      Math.random() > 0.3 ? faker.helpers.arrayElement(contacts).id : undefined;
    return generateCrmCase(
      faker,
      faker.helpers.arrayElement(userIds),
      contactId,
    );
  });
  const cases = await caseRepo
    .batchCreate(caseData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${cases.length} cases`);

  // 7. Create interactions
  console.log('💬 Creating interactions...');
  const interactionData = Array.from({ length: 300 }, () => {
    const contactId = faker.helpers.arrayElement(contacts).id;
    const caseId =
      Math.random() > 0.7 ? faker.helpers.arrayElement(cases).id : undefined;
    return generateCrmInteraction(
      faker,
      faker.helpers.arrayElement(userIds),
      contactId,
      caseId,
    );
  });
  const interactions = await interactionRepo
    .batchCreate(interactionData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${interactions.length} interactions`);

  // 8. Create invoices
  console.log('🧾 Creating invoices...');
  const invoiceData = Array.from({ length: 60 }, () => {
    const opportunityId =
      Math.random() > 0.5
        ? faker.helpers.arrayElement(opportunities).id
        : undefined;
    return generateCrmInvoice(faker, opportunityId);
  });
  const invoices = await invoiceRepo
    .batchCreate(invoiceData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${invoices.length} invoices`);

  // 9. Create invoice items
  console.log('📝 Creating invoice items...');
  const invoiceItemData: Array<ReturnType<typeof generateCrmInvoiceItem>> = [];
  invoices.forEach((invoice) => {
    const itemCount = faker.number.int({ min: 1, max: 5 });
    for (let i = 0; i < itemCount; i++) {
      invoiceItemData.push(
        generateCrmInvoiceItem(
          faker,
          invoice.id,
          faker.helpers.arrayElement(products).id,
        ),
      );
    }
  });
  const invoiceItems = await invoiceItemRepo
    .batchCreate(invoiceItemData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${invoiceItems.length} invoice items`);

  // 10. Create opportunity products
  console.log('🛒 Creating opportunity products...');
  const opportunityProductData: Array<
    ReturnType<typeof generateCrmOpportunityProduct>
  > = [];
  opportunities.forEach((opportunity) => {
    const productCount = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < productCount; i++) {
      opportunityProductData.push(
        generateCrmOpportunityProduct(
          faker,
          opportunity.id,
          faker.helpers.arrayElement(products).id,
        ),
      );
    }
  });
  const opportunityProducts = await opportunityProductRepo
    .batchCreate(opportunityProductData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${opportunityProducts.length} opportunity products`);

  // 11. Create notifications
  console.log('🔔 Creating notifications...');
  const notificationData = Array.from({ length: 150 }, () =>
    generateCrmNotification(faker, faker.helpers.arrayElement(userIds)),
  );
  const notifications = await notificationRepo
    .batchCreate(notificationData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${notifications.length} notifications`);

  // 12. Create attachments for various record types
  console.log('📎 Creating attachments...');
  const attachmentData: Array<ReturnType<typeof generateCrmAttachment>> = [];

  // Add attachments to companies
  companies.slice(0, 20).forEach((company) => {
    attachmentData.push(
      generateCrmAttachment(faker, company.id, CrmRecordType.Companies),
    );
  });

  // Add attachments to contacts
  contacts.slice(0, 30).forEach((contact) => {
    attachmentData.push(
      generateCrmAttachment(faker, contact.id, CrmRecordType.Contacts),
    );
  });

  // Add attachments to opportunities
  opportunities.slice(0, 25).forEach((opportunity) => {
    attachmentData.push(
      generateCrmAttachment(faker, opportunity.id, CrmRecordType.Opportunities),
    );
  });

  const attachments = await attachmentRepo
    .batchCreate(attachmentData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${attachments.length} attachments`);

  // 13. Create taggings to associate tags with records
  console.log('🏷️ Creating tag associations...');
  const taggingData: Array<ReturnType<typeof generateCrmTagging>> = [];

  // Tag companies
  companies.slice(0, 40).forEach((company) => {
    const tagCount = faker.number.int({ min: 1, max: 3 });
    for (let i = 0; i < tagCount; i++) {
      taggingData.push(
        generateCrmTagging(
          faker,
          company.id,
          faker.helpers.arrayElement(tags).id,
          CrmRecordType.Companies,
        ),
      );
    }
  });

  // Tag contacts
  contacts.slice(0, 60).forEach((contact) => {
    const tagCount = faker.number.int({ min: 1, max: 2 });
    for (let i = 0; i < tagCount; i++) {
      taggingData.push(
        generateCrmTagging(
          faker,
          contact.id,
          faker.helpers.arrayElement(tags).id,
          CrmRecordType.Contacts,
        ),
      );
    }
  });

  const taggings = await taggingRepo
    .batchCreate(taggingData)
    .onConflict((oc) => oc.doNothing())
    .execute();
  console.log(`✅ Created ${taggings.length} tag associations`);

  console.log('🎉 CRM seed data generation completed successfully!');
  console.log('📊 Summary:');
  console.log(`  - ${campaigns.length} campaigns`);
  console.log(`  - ${products.length} products`);
  console.log(`  - ${tags.length} tags`);
  console.log(`  - ${companies.length} companies`);
  console.log(`  - ${contacts.length} contacts`);
  console.log(`  - ${leads.length} leads`);
  console.log(`  - ${opportunities.length} opportunities`);
  console.log(`  - ${cases.length} cases`);
  console.log(`  - ${interactions.length} interactions`);
  console.log(`  - ${invoices.length} invoices`);
  console.log(`  - ${invoiceItems.length} invoice items`);
  console.log(`  - ${opportunityProducts.length} opportunity products`);
  console.log(`  - ${notifications.length} notifications`);
  console.log(`  - ${attachments.length} attachments`);
  console.log(`  - ${taggings.length} tag associations`);
}
