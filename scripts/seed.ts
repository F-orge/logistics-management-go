import { base, de, de_AT, en, Faker } from '@faker-js/faker';
import { hashPassword } from 'better-auth/crypto';
import { drizzle } from 'drizzle-orm/node-postgres';
import { reset } from 'drizzle-seed';
import { account, session, user } from '@/db/schemas';
import * as schema from '@/db/schemas/index';
import { authFactory } from '@/lib/auth';

// helpers

// auth schema

function seedUser(faker: Faker) {
  const [firstName, lastName] = [
    faker.person.firstName(),
    faker.person.lastName(),
  ];

  return {
    id: crypto.randomUUID(),
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    emailVerified: faker.datatype.boolean(),
    image: faker.image.avatarGitHub(),
    role: faker.helpers.arrayElement(['admin', 'developer']),
    banned: faker.datatype.boolean(),
    banReason: faker.word.words({ count: { min: 5, max: 10 } }),
    banExpires: faker.datatype.boolean()
      ? faker.date.future({ years: 5 })
      : null,
  };
}

async function seedAccount(faker: Faker, userId: string) {
  return {
    id: crypto.randomUUID(),
    accountId: crypto.randomUUID(),
    providerId: crypto.randomUUID(),
    userId,
    accessToken: faker.string.alphanumeric(),
    refreshToken: faker.string.alphanumeric(),
    idToken: faker.string.alphanumeric(),
    accessTokenExpiresAt: faker.date.future(),
    refreshTokenExpiresAt: faker.date.future(),
    password: await hashPassword('password123'),
  };
}

function seedSession(faker: Faker, userId: string, inpersonatedBy?: string) {
  return {
    id: crypto.randomUUID(),
    expiresAt: faker.date.future(),
    token: faker.string.alphanumeric(30),
    ipAddress: faker.internet.ipv4(),
    userAgent: faker.internet.userAgent(),
    userId,
    inpersonatedBy,
  };
}

// crm schema

function seedCrmCompany(faker: Faker, ownerId: string) {
  return {
    name: faker.company.name(),
    street: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    postalCode: faker.location.zipCode(),
    country: faker.location.country(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    industry: faker.person.jobType(),
    website: faker.internet.url(),
    annualRevenue: faker.finance
      .amount({ min: 1, max: 9999999999999, dec: 2 })
      .toString(),
    ownerId,
  };
}

function seedCrmContact(faker: Faker, ownerId: string, companyId?: string) {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    phoneNumber: faker.phone.number({ style: 'international' }),
    jobTitle: faker.person.jobTitle(),
    companyId,
    ownerId,
  };
}

function seedCrmCase(faker: Faker, ownerId: string, contactId?: string) {
  return {
    caseNumber: `CASE-${faker.date.recent().getFullYear()}-${faker.string.numeric(3)}-${faker.string.numeric(3)}`,
    status: faker.helpers.arrayElement(schema.caseStatusEnum.enumValues),
    priority: faker.helpers.arrayElement(schema.casePriorityEnum.enumValues),
    type: faker.helpers.arrayElement(schema.caseTypeEnum.enumValues),
    ownerId,
    contactId,
    description: faker.lorem.sentence(),
  };
}

function seedCrmAttachment(
  faker: Faker,
  recordId: string,
  recordType: (typeof schema.recordTypeEnum.enumValues)[number],
) {
  return {
    fileName: faker.system.fileName(),
    filePath: faker.system.filePath(),
    mimeType: faker.system.mimeType(),
    recordId,
    recordType,
  };
}

function seedCrmCampaign(faker: Faker) {
  return {
    name: `CAMPAIGN-${faker.commerce.productAdjective()}`,
    budget: faker.finance
      .amount({ min: 1, max: 9999999999999, dec: 2 })
      .toString(),
    startDate: faker.date.recent().toUTCString(),
    endDate: faker.date.future().toUTCString(),
  };
}

function seedCrmInteraction(
  faker: Faker,
  contactId: string,
  userId: string,
  caseId?: string,
) {
  return {
    contactId,
    userId,
    caseId,
    type: faker.helpers.arrayElement(schema.interactionTypeEnum.enumValues),
    outcome: faker.lorem.paragraph(1),
    notes: faker.lorem.paragraph(1),
    interactionDate: faker.date.recent(),
  };
}

function seedCrmInvoice(faker: Faker, opportunityId?: string) {
  return {
    opportunityId,
    status: faker.helpers.arrayElement(schema.invoiceStatusEnum.enumValues),
    total: faker.finance
      .amount({ min: 1, max: 9999999999999, dec: 2 })
      .toString(),
    issueDate: faker.date.recent().toUTCString(),
    dueDate: faker.date.future().toUTCString(),
    sentAt: faker.date.recent(),
    paidAt: faker.date.future(),
    paymentMethod: faker.helpers.arrayElement(
      schema.paymentMethodEnum.enumValues,
    ),
  };
}

function seedCrmLead(
  faker: Faker,
  ownerId: string,
  campaignId?: string,
  convertedContactId?: string,
  convertedCompanyId?: string,
  convertedOpportunityId?: string,
) {
  const [firstName, lastName] = [
    faker.person.firstName(),
    faker.person.lastName(),
  ];

  return {
    name: `${firstName} ${lastName}`,
    email: faker.internet.email({ firstName, lastName }),
    leadSource: faker.helpers.arrayElement(schema.leadSourceEnum.enumValues),
    status: faker.helpers.arrayElement(schema.leadStatusEnum.enumValues),
    leadScore: faker.number.int({ max: 100 }),
    ownerId,
    campaignId,
    convertedAt: faker.date.past(),
    convertedContactId,
    convertedCompanyId,
    convertedOpportunityId,
  };
}

function seedCrmNotification(faker: Faker, userId: string) {
  return {
    userId,
    message: faker.lorem.lines(1),
    isRead: faker.datatype.boolean(),
    link: faker.internet.url(),
  };
}

function seedCrmOpportunity(
  faker: Faker,
  ownerId: string,
  contactId?: string,
  companyId?: string,
  campaignId?: string,
) {
  return {
    name: `OPPORTUNITY-${faker.commerce.productAdjective()}`,
    stage: faker.helpers.arrayElement(schema.opportunityStageEnum.enumValues),
    dealValue: faker.finance
      .amount({ min: 1, max: 9999999999999, dec: 2 })
      .toString(),
    probability: faker.number.float(),
    expectedCloseDate: faker.date.future().toUTCString(),
    lostReason: faker.datatype.boolean() ? faker.lorem.paragraph(5) : undefined,
    source: faker.helpers.arrayElement(schema.opportunitySourceEnum.enumValues),
    ownerId,
    contactId,
    companyId,
    campaignId,
  };
}

function seedCrmProduct(faker: Faker) {
  return {
    name: faker.commerce.product(),
    sku: faker.commerce.isbn(),
    price: faker.commerce.price(),
    type: faker.helpers.arrayElement(schema.productTypeEnum.enumValues),
    description: faker.commerce.productDescription(),
  };
}

function seedCrmTag(faker: Faker) {}

async function main() {
  const faker = new Faker({ locale: [de_AT, de, en, base] });
  const db = drizzle(process.env.DATABASE_URL!);
  const auth = authFactory(db);

  await reset(db, schema);

  // auth schema

  const fakeUsers = Array.from({ length: 100 }, () => seedUser(faker));

  const users = (
    await Promise.all(
      fakeUsers.map((user) =>
        auth.api.signUpEmail({
          body: {
            email: user.email,
            name: user.name,
            password: 'password123',
            image: user.image,
          },
        }),
      ),
    )
  ).map((data) => data.user);

  // crm schema
  const fakeCompanies = Array.from(faker.helpers.uniqueArray(users, 100)).map(
    (user) => seedCrmCompany(faker, user.id),
  );

  const crmCompanies = await db
    .insert(schema.crmCompanies)
    .values(fakeCompanies)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeContacts = Array.from({ length: 200 }, () => {
    const user = faker.helpers.arrayElement(users);
    const company = faker.helpers.arrayElement(crmCompanies);
    return seedCrmContact(faker, user?.id, company?.id);
  });

  const crmContacts = await db
    .insert(schema.crmContacts)
    .values(fakeContacts)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeCases = Array.from({ length: 200 }, () => {
    const user = faker.helpers.arrayElement(users);
    const contact = faker.helpers.arrayElement(crmContacts);
    return seedCrmCase(faker, user?.id, contact?.id);
  });

  const crmCases = await db
    .insert(schema.crmCases)
    .values(fakeCases)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeCampaigns = Array.from({ length: 200 }, () =>
    seedCrmCampaign(faker),
  );

  const crmCampaigns = await db
    .insert(schema.crmCampaigns)
    .values(fakeCampaigns)
    .returning()
    .onConflictDoNothing()
    .execute();

  const fakeInteractions = Array.from({ length: 200 }, () => {
    const contact = faker.helpers.arrayElement(crmContacts);
    const user = faker.helpers.arrayElement(users);
    const crmCase = faker.helpers.arrayElement(crmCases);

    return seedCrmInteraction(
      faker,
      contact.id,
      user.id,
      faker.datatype.boolean() ? crmCase.id : undefined,
    );
  });

  const crmInteractions = await db
    .insert(schema.crmInteractions)
    .values(fakeInteractions)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeOpportunities = Array.from({ length: 200 }, () => {
    const owner = faker.helpers.arrayElement(users);
    const contact = faker.helpers.arrayElement(crmContacts);
    const company = faker.helpers.arrayElement(crmCompanies);
    const campaign = faker.helpers.arrayElement(crmCampaigns);

    return seedCrmOpportunity(
      faker,
      owner.id,
      faker.datatype.boolean() ? contact.id : undefined,
      faker.datatype.boolean() ? company.id : undefined,
      faker.datatype.boolean() ? campaign.id : undefined,
    );
  });

  const crmOpportunities = await db
    .insert(schema.crmOpportunities)
    .values(fakeOpportunities)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeProducts = Array.from({ length: 200 }).map(() =>
    seedCrmProduct(faker),
  );

  const crmProducts = await db
    .insert(schema.crmProducts)
    .values(fakeProducts)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeOpportunityProducts = crmOpportunities.map((opportunity) => ({
    opportunityId: opportunity.id,
    productId: faker.helpers.arrayElement(crmProducts).id,
    quantity: faker.number.int({ min: 1, max: 10 }),
  }));

  await db
    .insert(schema.crmOpportunityProducts)
    .values(fakeOpportunityProducts)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeCrmLeads = Array.from({ length: 200 }).map(() => {
    const owner = faker.helpers.arrayElement(users);
    const contact = faker.helpers.arrayElement(crmContacts);
    const company = faker.helpers.arrayElement(crmCompanies);
    const campaign = faker.helpers.arrayElement(crmCampaigns);
    const opportunity = faker.helpers.arrayElement(crmOpportunities);

    return seedCrmLead(
      faker,
      owner.id,
      faker.datatype.boolean() ? campaign.id : undefined,
      faker.datatype.boolean() ? contact.id : undefined,
      faker.datatype.boolean() ? company.id : undefined,
      faker.datatype.boolean() ? opportunity.id : undefined,
    );
  });

  const crmLeads = await db
    .insert(schema.crmLeads)
    .values(fakeCrmLeads)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeCrmNotifications = Array.from({ length: 200 }).map(() => {
    const owner = faker.helpers.arrayElement(users);

    return seedCrmNotification(faker, owner.id);
  });

  const crmNotifications = await db
    .insert(schema.crmNotifications)
    .values(fakeCrmNotifications)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeCrmInvoices = Array.from({ length: 200 }).map(() => {
    const opportunity = faker.helpers.arrayElement(crmOpportunities);

    return seedCrmInvoice(faker, opportunity.id);
  });

  const crmInvoices = await db
    .insert(schema.crmInvoices)
    .values(fakeCrmInvoices)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeCrmInvoiceItems = crmInvoices.map((invoice) => ({
    invoiceId: invoice.id,
    productId: faker.helpers.arrayElement(crmProducts).id,
    quantity: faker.number.int({ min: 1, max: 10 }),
    price: faker.finance
      .amount({ min: 1, max: 9999999999999, dec: 2 })
      .toString(),
  }));

  const crmInvoiceItems = await db
    .insert(schema.crmInvoiceItems)
    .values(fakeCrmInvoiceItems)
    .onConflictDoNothing()
    .returning()
    .execute();

  const fakeCrmAttachments = Array.from({ length: 200 }).map(() => {
    const record = faker.helpers.arrayElement(crmInvoices);

    return seedCrmAttachment(faker, record.id, 'invoices');
  });

  const crmAttachments = await db
    .insert(schema.crmAttachments)
    .values(fakeCrmAttachments)
    .onConflictDoNothing()
    .returning()
    .execute();

  console.log('seeding complete');
}

await main();
