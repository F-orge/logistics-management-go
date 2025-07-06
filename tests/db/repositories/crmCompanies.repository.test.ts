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
    companiesRepository = new KyselyCrmCompaniesRepository(globalThis.testDb);
    contactsRepository = new KyselyCrmContactsRepository(globalThis.testDb);
    activitiesRepository = new KyselyCrmActivitiesRepository(globalThis.testDb);
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

  it("should add a single contact", async () => {
    const createdCompany = await companiesRepository.create(testCompany);

    const contact: Insertable<CrmContacts> = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "0987654321",
      companyId: createdCompany.id,
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };

    const newContact = await companiesRepository.addContact(
      contact,
      contactsRepository,
    );

    expect(newContact.name).toBe("Jane Doe");
    expect(newContact.companyId).toBe(createdCompany.id);
  });

  it("should add multiple contacts", async () => {
    const createdCompany = await companiesRepository.create(testCompany);

    const contacts: Insertable<CrmContacts>[] = [
      {
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "1234567890",
        companyId: createdCompany.id,
        created: new Date(),
        updated: new Date(),
        deleted: false,
      },
      {
        name: "Jane Smith",
        email: "jane.smith@example.com",
        phone: "0987654321",
        companyId: createdCompany.id,
        created: new Date(),
        updated: new Date(),
        deleted: false,
      },
    ];

    const newContacts = await companiesRepository.addContacts(
      contacts,
      contactsRepository,
    );

    expect(newContacts).toHaveLength(2);
    expect(newContacts[0].name).toBe("John Doe");
    expect(newContacts[1].name).toBe("Jane Smith");
  });

  it("should add a contact by ID", async () => {
    const createdCompany = await companiesRepository.create(testCompany);

    const contact: Insertable<CrmContacts> = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      companyId: null,
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };

    const createdContact = await contactsRepository.create(contact);

    const updatedContact = await companiesRepository.addContactByID(
      createdCompany.id,
      createdContact.id,
      contactsRepository,
    );

    expect(updatedContact.companyId).toBe(createdCompany.id);
  });

  it("should add an activity to a company", async () => {
    const createdCompany = await companiesRepository.create(testCompany);

    const activity: Insertable<CrmActivities> = {
      type: "Follow-up",
      description: "Call the client to discuss project updates",
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };

    const newActivity = await companiesRepository.addActivity(
      createdCompany.id,
      activity,
      activitiesRepository,
    );

    expect(newActivity).toBeDefined();
    expect(newActivity.type).toBe(activity.type);
    expect(newActivity.companyId).toBe(createdCompany.id);
  });
});
