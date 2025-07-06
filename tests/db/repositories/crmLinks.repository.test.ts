import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { KyselyCrmLinksRepository } from "../../../src/db/repositories/crmLinks.repository";
import { KyselyCrmCompaniesRepository } from "../../../src/db/repositories/crmCompanies.repository";
import { KyselyCrmContactsRepository } from "../../../src/db/repositories/crmContacts.repository";
import type { Insertable } from "kysely";
import type {
  CrmCompanies,
  CrmContacts,
  CrmLinks,
} from "../../../src/db/types";
import { KyselyCrmActivitiesRepository } from "../../../src/db/repositories/crmActivities.repository";

let repository: KyselyCrmLinksRepository;
let companiesRepository: KyselyCrmCompaniesRepository;
let contactsRepository: KyselyCrmContactsRepository;

const testLink: Insertable<CrmLinks> = {
  link: "https://example.com",
  description: "Test Link",
  contactId: "test-contact-id",
  companyId: "test-company-id",
  created: new Date(),
  updated: new Date(),
  deleted: false,
};

const testCompany: Insertable<CrmCompanies> = {
  name: "Test Company",
  email: "test@company.com",
  address: "123 Test Street",
  phone: "123-456-7890",
  created: new Date(),
  updated: new Date(),
};

const testContact: Insertable<CrmContacts> = {
  name: "Test Contact",
  email: "test@contact.com",
  phone: "987-654-3210",
  created: new Date(),
  updated: new Date(),
  deleted: false,
};

describe("KyselyCrmLinksRepository", () => {
  beforeEach(async () => {
    repository = new KyselyCrmLinksRepository(globalThis.testDb);
    companiesRepository = new KyselyCrmCompaniesRepository(
      globalThis.testDb,
      new KyselyCrmContactsRepository(globalThis.testDb),
      new KyselyCrmActivitiesRepository(globalThis.testDb),
    );
    contactsRepository = new KyselyCrmContactsRepository(globalThis.testDb);

    const createdCompany = await companiesRepository.create(testCompany);
    const createdContact = await contactsRepository.create({
      ...testContact,
      companyId: createdCompany.id,
    });

    testLink.companyId = createdCompany.id;
    testLink.contactId = createdContact.id;
  });

  afterEach(async () => {
    await globalThis.testDb.deleteFrom("crm.links").execute();
    await globalThis.testDb.deleteFrom("crm.contacts").execute();
    await globalThis.testDb.deleteFrom("crm.companies").execute();
  });

  it("should create a link successfully", async () => {
    const link = await repository.create(testLink);

    expect(link).toBeDefined();
    expect(link.link).toBe(testLink.link);
    expect(link.id).toBeDefined();
  });

  it("should find a link by ID", async () => {
    const createdLink = await repository.create(testLink);
    const foundLink = await repository.findById(createdLink.id);

    expect(foundLink).toBeDefined();
    expect(foundLink?.id).toBe(createdLink.id);
    expect(foundLink?.link).toBe(testLink.link);
  });

  it("should find links by contact ID", async () => {
    await repository.create(testLink);
    const links = await repository.findByContactID(
      testLink.contactId ?? "",
      0,
      10,
    );

    expect(links).toHaveLength(1);
    expect(links[0].contactId).toBe(testLink.contactId ?? "");
  });

  it.failing("should find links by company ID", async () => {
    await repository.create(testLink);
    const links = await repository.findByCompanyID(
      testLink.companyId ?? "",
      0,
      1,
    );

    expect(links).toHaveLength(1);
    expect(links[0].companyId).toBe(testLink.companyId ?? "");
  });

  it("should update a link", async () => {
    const createdLink = await repository.create(testLink);
    const updatedDescription = "Updated Description";

    const updatedLink = await repository.update(createdLink.id, {
      description: updatedDescription,
    });

    expect(updatedLink).toBeDefined();
    expect(updatedLink.description).toBe(updatedDescription);
  });

  it("should soft delete a link", async () => {
    const createdLink = await repository.create(testLink);

    await repository.softDelete(createdLink.id);

    const foundLink = await repository.findById(createdLink.id);
    expect(foundLink).toBeUndefined();
  });

  it("should delete a link permanently", async () => {
    const createdLink = await repository.create(testLink);

    await repository.delete(createdLink.id);

    const foundLink = await repository.findById(createdLink.id);
    expect(foundLink).toBeUndefined();
  });

  it("should paginate links", async () => {
    await repository.create(testLink);
    await repository.create({ ...testLink, link: "https://example2.com" });

    const linksPage1 = await repository.paginate(0, 1);
    const linksPage2 = await repository.paginate(1, 1);

    expect(linksPage1).toHaveLength(1);
    expect(linksPage1[0].link).toBe(testLink.link);

    expect(linksPage2).toHaveLength(1);
    expect(linksPage2[0].link).toBe("https://example2.com");
  });
});
