import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { KyselyCrmCompaniesRepository } from "../../../src/db/repositories/crmCompanies.repository";
import { Insertable } from "kysely";
import { CrmCompanies, CrmContacts } from "../../../src/db/types";

describe("KyselyCrmCompaniesRepository", () => {
  let repository: KyselyCrmCompaniesRepository;

  const testCompany: Insertable<CrmCompanies> = {
    name: "Test Company",
    email: "test@company.com",
    address: "123 Test Street",
    phone: "123-456-7890",
    created: new Date(),
    updated: new Date(),
  };

  beforeEach(() => {
    repository = new KyselyCrmCompaniesRepository(globalThis.testDb);
  });

  afterEach(async () => {
    await globalThis.testDb.deleteFrom("crm.contacts").execute();
    await globalThis.testDb.deleteFrom("crm.companies").execute();
  });

  it("should create a company successfully", async () => {
    const company = await repository.create(testCompany);

    expect(company).toBeDefined();
    expect(company.name).toBe(testCompany.name);
    expect(company.email).toBe(testCompany.email);
    expect(company.id).toBeDefined();
  });

  it("should find a company by ID", async () => {
    const createdCompany = await repository.create(testCompany);
    const foundCompany = await repository.findById(createdCompany.id);

    expect(foundCompany).toBeDefined();
    expect(foundCompany?.id).toBe(createdCompany.id);
    expect(foundCompany?.name).toBe(testCompany.name);
  });

  it("should find a company by email", async () => {
    const createdCompany = await repository.create(testCompany);
    const foundCompany = await repository.findByEmail(createdCompany.email);

    expect(foundCompany).toBeDefined();
    expect(foundCompany?.email).toBe(createdCompany.email);
  });

  it("should update a company", async () => {
    const createdCompany = await repository.create(testCompany);
    const updatedName = "Updated Company";

    const updatedCompany = await repository.update(createdCompany.id, {
      name: updatedName,
    });

    expect(updatedCompany).toBeDefined();
    expect(updatedCompany.name).toBe(updatedName);
  });

  it("should soft delete a company", async () => {
    const createdCompany = await repository.create(testCompany);

    await repository.softDelete(createdCompany.id);

    const foundCompany = await repository.findById(createdCompany.id);
    expect(foundCompany).toBeUndefined();
  });

  it("should delete a company permanently", async () => {
    const createdCompany = await repository.create(testCompany);

    await repository.delete(createdCompany.id);

    const foundCompany = await repository.findById(createdCompany.id);
    expect(foundCompany).toBeUndefined();
  });

  it("should add a contact by ID", async () => {
    const company: Insertable<CrmCompanies> = {
      name: "Test Company",
      email: "test@company.com",
      address: "123 Test St",
      phone: "1234567890",
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };

    const createdCompany = await repository.create(company);

    const contact: Insertable<CrmContacts> = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      companyId: null,
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };

    const createdContact = await globalThis.testDb
      .insertInto("crm.contacts")
      .values(contact)
      .returningAll()
      .executeTakeFirstOrThrow();

    const updatedContact = await repository.addContactByID(
      createdCompany.id,
      createdContact.id,
    );

    expect(updatedContact.companyId).toBe(createdCompany.id);
  });

  it("should add a single contact", async () => {
    const company: Insertable<CrmCompanies> = {
      name: "Test Company",
      email: "test@company.com",
      address: "123 Test St",
      phone: "1234567890",
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };

    const createdCompany = await repository.create(company);

    const contact: Insertable<CrmContacts> = {
      name: "Jane Doe",
      email: "jane.doe@example.com",
      phone: "0987654321",
      companyId: createdCompany.id,
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };

    const newContact = await repository.addContact(contact);

    expect(newContact.name).toBe("Jane Doe");
    expect(newContact.companyId).toBe(createdCompany.id);
  });

  it("should add multiple contacts", async () => {
    const company: Insertable<CrmCompanies> = {
      name: "Test Company",
      email: "test@company.com",
      address: "123 Test St",
      phone: "1234567890",
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };

    const createdCompany = await repository.create(company);

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

    const newContacts = await repository.addContacts(contacts);

    expect(newContacts).toHaveLength(2);
    expect(newContacts[0].name).toBe("John Doe");
    expect(newContacts[1].name).toBe("Jane Smith");
  });
});
