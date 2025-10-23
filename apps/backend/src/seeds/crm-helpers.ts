import { Faker } from "@faker-js/faker";
import { Insertable } from "kysely";
import {
  CrmAttachment,
  CrmCampaign,
  CrmCase,
  CrmCasePriority,
  CrmCaseStatus,
  CrmCaseType,
  CrmCompany,
  CrmContact,
  CrmInteraction,
  CrmInteractionType,
  CrmInvoice,
  CrmInvoiceItem,
  CrmInvoiceStatus,
  CrmLead,
  CrmLeadSource,
  CrmLeadStatus,
  CrmNotification,
  CrmOpportunity,
  CrmOpportunityProduct,
  CrmOpportunitySource,
  CrmOpportunityStage,
  CrmPaymentMethod,
  CrmProduct,
  CrmProductType,
  CrmRecordType,
} from "@packages/db/db.types";

// Utility function to randomly select from enum values
const randomEnumValue = <T extends Record<string, string>>(
  enumObj: T
): T[keyof T] => {
  const values = Object.values(enumObj);
  return values[Math.floor(Math.random() * values.length)] as T[keyof T];
};

// CRM Company - Requires ownerId
export const seedCrmCompany = (
  faker: Faker,
  options: { ownerId: string }
): Insertable<CrmCompany> => ({
  name: faker.company.name(),
  industry: faker.company.buzzNoun(),
  annualRevenue: faker.number
    .bigInt({ min: 100000, max: 100000000 })
    .toString(),
  street: faker.location.streetAddress(),
  city: faker.location.city(),
  state: faker.location.state(),
  postalCode: faker.location.zipCode(),
  country: faker.location.country(),
  phoneNumber: faker.phone.number(),
  website: faker.internet.url(),
  ownerId: options.ownerId,
});

// CRM Contact - Requires ownerId, optional companyId
export const seedCrmContact = (
  faker: Faker,
  options: { companyId?: string; ownerId: string }
): Insertable<CrmContact> => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  phoneNumber: faker.phone.number(),
  jobTitle: faker.person.jobTitle(),
  companyId: options.companyId,
  ownerId: options.ownerId,
});

// CRM Lead - Requires ownerId, optional campaignId
export const seedCrmLead = (
  faker: Faker,
  options: {
    ownerId: string;
    campaignId?: string;
    convertedCompanyId?: string;
    convertedContactId?: string;
    convertedOpportunityId?: string;
  }
): Insertable<CrmLead> => ({
  name: faker.person.fullName(),
  email: faker.internet.email(),
  leadSource: randomEnumValue(CrmLeadSource),
  status: randomEnumValue(CrmLeadStatus),
  leadScore: faker.number.int({ min: 0, max: 100 }),
  ownerId: options.ownerId,
  campaignId: options.campaignId,
  convertedCompanyId: options.convertedCompanyId,
  convertedContactId: options.convertedContactId,
  convertedOpportunityId: options.convertedOpportunityId,
  convertedAt:
    options.convertedCompanyId ||
    options.convertedContactId ||
    options.convertedOpportunityId
      ? faker.date.recent({ days: 30 })
      : undefined,
});

// CRM Campaign - No foreign keys required
export const seedCrmCampaign = (faker: Faker): Insertable<CrmCampaign> => ({
  name: faker.company.catchPhrase(),
  budget: faker.number.bigInt({ min: 1000, max: 1000000 }).toString(),
  startDate: faker.date.recent({ days: 30 }),
  endDate: faker.date.future({ years: 1 }),
});

// CRM Opportunity - Requires ownerId, optional companyId, contactId, campaignId
export const seedCrmOpportunity = (
  faker: Faker,
  options: {
    ownerId: string;
    companyId?: string;
    contactId?: string;
    campaignId?: string;
  }
): Insertable<CrmOpportunity> => ({
  name: faker.commerce.productName(),
  dealValue: faker.number.bigInt({ min: 1000, max: 1000000 }).toString(),
  probability: faker.number.int({ min: 0, max: 100 }),
  expectedCloseDate: faker.date.future({ years: 1 }),
  stage: randomEnumValue(CrmOpportunityStage),
  source: randomEnumValue(CrmOpportunitySource),
  lostReason: faker.helpers.maybe(() => faker.lorem.sentence(), {
    probability: 0.2,
  }),
  ownerId: options.ownerId,
  companyId: options.companyId,
  contactId: options.contactId,
  campaignId: options.campaignId,
});

// CRM Product - No foreign keys required
export const seedCrmProduct = (faker: Faker): Insertable<CrmProduct> => ({
  name: faker.commerce.productName(),
  description: faker.commerce.productDescription(),
  price: faker.number.bigInt({ min: 10, max: 10000 }).toString(),
  sku: faker.string.alphanumeric(8).toUpperCase(),
  type: randomEnumValue(CrmProductType),
});

// CRM Case - Requires ownerId, optional contactId
export const seedCrmCase = (
  faker: Faker,
  options: { ownerId: string; contactId?: string }
): Insertable<CrmCase> => ({
  caseNumber: `CASE-${faker.string.numeric(6)}`,
  description: faker.lorem.paragraphs(2),
  priority: randomEnumValue(CrmCasePriority),
  status: randomEnumValue(CrmCaseStatus),
  type: randomEnumValue(CrmCaseType),
  ownerId: options.ownerId,
  contactId: options.contactId,
});

// CRM Interaction - Requires contactId and userId, optional caseId
export const seedCrmInteraction = (
  faker: Faker,
  options: { contactId: string; userId: string; caseId?: string }
): Insertable<CrmInteraction> => ({
  type: randomEnumValue(CrmInteractionType),
  interactionDate: faker.date.recent({ days: 30 }),
  notes: faker.lorem.paragraph(),
  outcome: faker.lorem.sentence(),
  contactId: options.contactId,
  userId: options.userId,
  caseId: options.caseId,
});

// CRM Invoice - Optional opportunityId
export const seedCrmInvoice = (
  faker: Faker,
  options: { opportunityId?: string } = {}
): Insertable<CrmInvoice> => ({
  issueDate: faker.date.recent({ days: 30 }),
  dueDate: faker.date.future({ years: 1 }),
  total: faker.number.bigInt({ min: 100, max: 50000 }).toString(),
  status: randomEnumValue(CrmInvoiceStatus),
  paymentMethod: randomEnumValue(CrmPaymentMethod),
  sentAt: faker.helpers.maybe(() => faker.date.recent({ days: 20 }), {
    probability: 0.8,
  }),
  paidAt: faker.helpers.maybe(() => faker.date.recent({ days: 10 }), {
    probability: 0.5,
  }),
  opportunityId: options.opportunityId,
});

// CRM Invoice Item - Requires invoiceId and productId
export const seedCrmInvoiceItem = (
  faker: Faker,
  options: { invoiceId: string; productId: string }
): Insertable<CrmInvoiceItem> => ({
  quantity: faker.number.int({ min: 1, max: 10 }),
  price: faker.number.bigInt({ min: 10, max: 1000 }).toString(),
  invoiceId: options.invoiceId,
  productId: options.productId,
});

// CRM Opportunity Product - Requires opportunityId and productId
export const seedCrmOpportunityProduct = (
  faker: Faker,
  options: { opportunityId: string; productId: string }
): Insertable<CrmOpportunityProduct> => ({
  quantity: faker.number.int({ min: 1, max: 100 }),
  opportunityId: options.opportunityId,
  productId: options.productId,
});

// CRM Notification - Requires userId
export const seedCrmNotification = (
  faker: Faker,
  options: { userId: string }
): Insertable<CrmNotification> => ({
  message: faker.lorem.sentence(),
  isRead: faker.datatype.boolean(),
  link: faker.helpers.maybe(() => faker.internet.url(), { probability: 0.7 }),
  userId: options.userId,
});

// CRM Attachment - Requires recordId and recordType
export const seedCrmAttachment = (
  faker: Faker,
  options: { recordId: string; recordType: CrmRecordType }
): Insertable<CrmAttachment> => ({
  fileName: faker.system.fileName(),
  filePath: faker.system.filePath(),
  mimeType: faker.system.mimeType(),
  recordId: options.recordId,
  recordType: options.recordType,
});
