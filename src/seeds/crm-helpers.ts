import { Faker } from '@faker-js/faker';
import { Insertable } from 'kysely';
import {
  CrmCasePriority,
  CrmCaseStatus,
  CrmCaseType,
  CrmInteractionType,
  CrmInvoiceStatus,
  CrmLeadSource,
  CrmLeadStatus,
  CrmOpportunitySource,
  CrmOpportunityStage,
  CrmPaymentMethod,
  CrmProductType,
  CrmRecordType,
  DB,
} from '@/db/types';

export const generateCrmAttachment = (
  faker: Faker,
  recordId?: string,
  recordType?: CrmRecordType,
): Insertable<DB['crm.attachments']> => ({
  fileName: faker.system.fileName(),
  filePath: faker.system.filePath(),
  mimeType: faker.system.mimeType(),
  recordId: recordId,
  recordType:
    recordType || faker.helpers.arrayElement(Object.values(CrmRecordType)),
});

export const generateCrmCampaign = (
  faker: Faker,
): Insertable<DB['crm.campaigns']> => ({
  name: faker.lorem.words(3),
  budget: faker.number.float({ min: 1000, max: 100000 }),
  startDate: faker.date.past(),
  endDate: faker.date.future(),
});

export const generateCrmCase = (
  faker: Faker,
  ownerId: string,
  contactId?: string,
): Insertable<DB['crm.cases']> => ({
  caseNumber: faker.string.uuid(),
  contactId: contactId,
  description: faker.lorem.paragraph(),
  ownerId: ownerId,
  priority: faker.helpers.arrayElement(Object.values(CrmCasePriority)),
  status: faker.helpers.arrayElement(Object.values(CrmCaseStatus)),
  type: faker.helpers.arrayElement(Object.values(CrmCaseType)),
});

export const generateCrmCompany = (
  faker: Faker,
  ownerId?: string,
): Insertable<DB['crm.companies']> => ({
  name: faker.company.name(),
  annualRevenue: faker.number.float({
    min: 100000,
    max: 100000000,
  }),
  city: faker.location.city(),
  country: faker.location.country(),
  industry: faker.commerce.department(),
  ownerId: ownerId,
  phoneNumber: faker.phone.number({ style: 'international' }),
  postalCode: faker.location.zipCode(),
  state: faker.location.state(),
  street: faker.location.streetAddress(),
  website: faker.internet.url(),
});

export const generateCrmContact = (
  faker: Faker,
  ownerId: string,
  companyId?: string,
): Insertable<DB['crm.contacts']> => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  companyId: companyId,
  jobTitle: faker.person.jobTitle(),
  ownerId: ownerId,
  phoneNumber: faker.phone.number({ style: 'international' }),
});

export const generateCrmInteraction = (
  faker: Faker,
  userId: string,
  contactId: string,
  caseId?: string,
): Insertable<DB['crm.interactions']> => ({
  contactId: contactId,
  caseId: caseId,
  interactionDate: faker.date.recent(),
  notes: faker.lorem.sentence(),
  outcome: faker.lorem.words(2),
  type: faker.helpers.arrayElement(Object.values(CrmInteractionType)),
  userId: userId,
});

export const generateCrmInvoiceItem = (
  faker: Faker,
  invoiceId: string,
  productId: string,
): Insertable<DB['crm.invoiceItems']> => ({
  invoiceId: invoiceId,
  productId: productId,
  price: faker.number.float({ min: 10, max: 1000 }),
  quantity: faker.number.int({ min: 1, max: 10 }),
});

export const generateCrmInvoice = (
  faker: Faker,
  opportunityId?: string,
): Insertable<DB['crm.invoices']> => ({
  dueDate: faker.date.future(),
  issueDate: faker.date.past(),
  opportunityId: opportunityId,
  paidAt: faker.date.recent(),
  paymentMethod: faker.helpers.arrayElement(Object.values(CrmPaymentMethod)),
  sentAt: faker.date.recent(),
  status: faker.helpers.arrayElement(Object.values(CrmInvoiceStatus)),
  total: faker.number.float({ min: 100, max: 5000 }),
});

export const generateCrmLead = (
  faker: Faker,
  ownerId: string,
  campaignId?: string,
  convertedCompanyId?: string,
  convertedContactId?: string,
  convertedOpportunityId?: string,
): Insertable<DB['crm.leads']> => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  campaignId: campaignId,
  convertedAt: faker.date.recent(),
  convertedCompanyId,
  convertedContactId,
  convertedOpportunityId,
  leadScore: faker.number.int({ min: 1, max: 100 }),
  leadSource: faker.helpers.arrayElement(Object.values(CrmLeadSource)),
  ownerId: ownerId,
  status: faker.helpers.arrayElement(Object.values(CrmLeadStatus)),
});

export const generateCrmNotification = (
  faker: Faker,
  userId: string,
): Insertable<DB['crm.notifications']> => ({
  userId: userId,
  message: faker.lorem.sentence(),
  isRead: faker.datatype.boolean(),
  link: faker.internet.url(),
});

export const generateCrmOpportunity = (
  faker: Faker,
  ownerId: string,
  companyId?: string,
  contactId?: string,
  campaignId?: string,
): Insertable<DB['crm.opportunities']> => ({
  name: faker.lorem.words(3),
  ownerId: ownerId,
  campaignId: campaignId,
  companyId: companyId,
  contactId: contactId,
  dealValue: faker.number.float({
    min: 1000,
    max: 1000000,
  }),
  expectedCloseDate: faker.date.future(),
  lostReason: faker.lorem.sentence(),
  probability: faker.number.float({ min: 0, max: 1 }),
  source: faker.helpers.arrayElement(Object.values(CrmOpportunitySource)),
  stage: faker.helpers.arrayElement(Object.values(CrmOpportunityStage)),
});

export const generateCrmOpportunityProduct = (
  faker: Faker,
  opportunityId: string,
  productId: string,
): Insertable<DB['crm.opportunityProducts']> => ({
  opportunityId: opportunityId,
  productId: productId,
  quantity: faker.number.int({ min: 1, max: 100 }),
});

export const generateCrmProduct = (
  faker: Faker,
): Insertable<DB['crm.products']> => ({
  name: faker.commerce.productName(),
  price: faker.number.float({ min: 1, max: 1000 }),
  description: faker.lorem.paragraph(),
  sku: faker.string.alphanumeric(10).toUpperCase(),
  type: faker.helpers.arrayElement(Object.values(CrmProductType)),
});

export const generateCrmTagging = (
  faker: Faker,
  recordId: string,
  tagId: string,
  recordType?: CrmRecordType,
): Insertable<DB['crm.taggings']> => ({
  recordId: recordId,
  recordType:
    recordType || faker.helpers.arrayElement(Object.values(CrmRecordType)),
  tagId: tagId,
});

export const generateCrmTag = (faker: Faker): Insertable<DB['crm.tags']> => ({
  name: faker.lorem.word(),
});
