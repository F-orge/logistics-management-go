import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { KyselyCrmDealsRepository } from "../../../src/db/repositories/crmDeals.repository";
import { KyselyCrmCompaniesRepository } from "../../../src/db/repositories/crmCompanies.repository";
import { KyselyCrmContactsRepository } from "../../../src/db/repositories/crmContacts.repository";
import { Insertable } from "kysely";
import { CrmCompanies, CrmContacts, CrmDeals } from "../../../src/db/types";

let repository: KyselyCrmDealsRepository;
let companiesRepository: KyselyCrmCompaniesRepository;
let contactsRepository: KyselyCrmContactsRepository;

const testDeal: Insertable<CrmDeals> = {
  name: "Test Deal",
  amount: "1000.00", // Changed to string to match the expected type
  status: "open",
  companyId: "test-company-id",
  contactId: "test-contact-id",
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

describe("KyselyCrmDealsRepository", () => {
  beforeEach(async () => {
    repository = new KyselyCrmDealsRepository(globalThis.testDb);
    companiesRepository = new KyselyCrmCompaniesRepository(globalThis.testDb);
    contactsRepository = new KyselyCrmContactsRepository(globalThis.testDb);

    const createdCompany = await companiesRepository.create(testCompany);
    const createdContact = await contactsRepository.create({
      ...testContact,
      companyId: createdCompany.id,
    });

    testDeal.companyId = createdCompany.id;
    testDeal.contactId = createdContact.id;
  });

  afterEach(async () => {
    await globalThis.testDb.deleteFrom("crm.deals").execute();
    await globalThis.testDb.deleteFrom("crm.contacts").execute();
    await globalThis.testDb.deleteFrom("crm.companies").execute();
  });

  it("should create a deal successfully", async () => {
    const deal = await repository.create(testDeal);

    expect(deal).toBeDefined();
    expect(deal.name).toBe(testDeal.name);
    expect(deal.amount).toBe(testDeal.amount as string);
    expect(deal.id).toBeDefined();
  });

  it("should find a deal by ID", async () => {
    const createdDeal = await repository.create(testDeal);
    const foundDeal = await repository.findById(createdDeal.id);

    expect(foundDeal).toBeDefined();
    expect(foundDeal?.id).toBe(createdDeal.id);
    expect(foundDeal?.name).toBe(testDeal.name);
  });

  it("should find all deals", async () => {
    await repository.create(testDeal);
    const deals = await repository.findAll();

    expect(deals).toHaveLength(1);
    expect(deals[0].name).toBe(testDeal.name);
  });

  it("should update a deal", async () => {
    const createdDeal = await repository.create(testDeal);
    const updatedName = "Updated Deal";

    const updatedDeal = await repository.update(createdDeal.id, {
      name: updatedName,
    });

    expect(updatedDeal).toBeDefined();
    expect(updatedDeal.name).toBe(updatedName);
  });

  it("should soft delete a deal", async () => {
    const createdDeal = await repository.create(testDeal);

    await repository.softDelete(createdDeal.id);

    const foundDeal = await repository.findById(createdDeal.id);
    expect(foundDeal).toBeUndefined();
  });

  it("should delete a deal permanently", async () => {
    const createdDeal = await repository.create(testDeal);

    await repository.delete(createdDeal.id);

    const foundDeal = await repository.findById(createdDeal.id);
    expect(foundDeal).toBeUndefined();
  });

  it("should find deals by status", async () => {
    await repository.create(testDeal);

    const deals = await repository.findByStatus("open", 0, 10);

    expect(deals).toHaveLength(1);
    expect(deals[0].status).toBe("open");
  });

  it("should search deals by name", async () => {
    await repository.create(testDeal);

    const deals = await repository.searchByName("Test", 0, 10);

    expect(deals).toHaveLength(1);
    expect(deals[0].name).toBe(testDeal.name);
  });
});
