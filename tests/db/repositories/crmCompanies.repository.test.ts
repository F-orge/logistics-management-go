import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { KyselyCrmCompaniesRepository } from "../../../src/db/repositories/crmCompanies.repository";
import { KyselyCrmContactsRepository } from "../../../src/db/repositories/crmContacts.repository";
import { KyselyCrmActivitiesRepository } from "../../../src/db/repositories/crmActivities.repository";
import { Insertable } from "kysely";
import {
  CrmActivities,
  CrmCompanies,
  CrmContacts,
} from "../../../src/db/types";

describe("KyselyCrmCompaniesRepository", () => {
  let companiesRepository: KyselyCrmCompaniesRepository;
  let contactsRepository: KyselyCrmContactsRepository;
  let activitiesRepository: KyselyCrmActivitiesRepository;

  const testCompany: Insertable<CrmCompanies> = {
    name: "Test Company",
    email: "test@company.com",
    address: "123 Test Street",
    phone: "123-456-7890",
    created: new Date(),
    updated: new Date(),
  };

  beforeEach(() => {
    contactsRepository = new KyselyCrmContactsRepository(globalThis.testDb);
    activitiesRepository = new KyselyCrmActivitiesRepository(globalThis.testDb);
    companiesRepository = new KyselyCrmCompaniesRepository(
      globalThis.testDb,
    );
  });

  afterEach(async () => {
    await globalThis.testDb.deleteFrom("crm.activities").execute();
    await globalThis.testDb.deleteFrom("crm.contacts").execute();
    await globalThis.testDb.deleteFrom("crm.companies").execute();
  });

  it("should create a company successfully", async () => {
    const company = await companiesRepository.create(testCompany);

    expect(company).toBeDefined();
    expect(company.name).toBe(testCompany.name);
    expect(company.email).toBe(testCompany.email);
    expect(company.id).toBeDefined();
  });

  it("should find a company by ID", async () => {
    const createdCompany = await companiesRepository.create(testCompany);
    const foundCompany = await companiesRepository.findById(createdCompany.id);

    expect(foundCompany).toBeDefined();
    expect(foundCompany?.id).toBe(createdCompany.id);
    expect(foundCompany?.name).toBe(testCompany.name);
  });

  it("should find a company by email", async () => {
    const createdCompany = await companiesRepository.create(testCompany);
    const foundCompany = await companiesRepository.findByEmail(
      createdCompany.email,
    );

    expect(foundCompany).toBeDefined();
    expect(foundCompany?.email).toBe(createdCompany.email);
  });

  it("should update a company", async () => {
    const createdCompany = await companiesRepository.create(testCompany);
    const updatedName = "Updated Company";

    const updatedCompany = await companiesRepository.update(createdCompany.id, {
      name: updatedName,
    });

    expect(updatedCompany).toBeDefined();
    expect(updatedCompany.name).toBe(updatedName);
  });

  it("should soft delete a company", async () => {
    const createdCompany = await companiesRepository.create(testCompany);

    await companiesRepository.softDelete(createdCompany.id);

    const foundCompany = await companiesRepository.findById(createdCompany.id);
    expect(foundCompany).toBeUndefined();
  });

  it("should delete a company permanently", async () => {
    const createdCompany = await companiesRepository.create(testCompany);

    await companiesRepository.delete(createdCompany.id);

    const foundCompany = await companiesRepository.findById(createdCompany.id);
    expect(foundCompany).toBeUndefined();
  });
});
