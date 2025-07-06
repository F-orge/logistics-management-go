import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { KyselyCrmContactsRepository } from "../../../src/db/repositories/crmContacts.repository";
import { KyselyCrmCompaniesRepository } from "../../../src/db/repositories/crmCompanies.repository";

// Mock data for testing
const mockContact = {
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "1234567890",
  companyId: "company-123",
};

describe("KyselyCrmContactsRepository", () => {
  let repository: KyselyCrmContactsRepository;
  let companyRepository: KyselyCrmCompaniesRepository;

  beforeEach(async () => {
    // Initialize the repositories with the global test database instance
    repository = new KyselyCrmContactsRepository(globalThis.testDb);
    companyRepository = new KyselyCrmCompaniesRepository(globalThis.testDb);

    // Create a test company
    const testCompany = await companyRepository.create({
      name: "Test Company",
      email: "test@company.com",
      address: "123 Test Street",
      phone: "123-456-7890",
      created: new Date(),
      updated: new Date(),
    });

    mockContact.companyId = testCompany.id;
  });

  afterEach(async () => {
    // Clean up the test data after each test
    await globalThis.testDb.deleteFrom("crm.contacts").execute();
    await globalThis.testDb.deleteFrom("crm.companies").execute();
  });

  it("should create a contact successfully", async () => {
    const contact = await repository.create(mockContact);

    expect(contact).toBeDefined();
    expect(contact.name).toBe(mockContact.name);
    expect(contact.email).toBe(mockContact.email);
    expect(contact.id).toBeDefined();
    expect(contact.created).toBeDefined();
  });

  it("should find a contact by ID", async () => {
    const createdContact = await repository.create(mockContact);
    const foundContact = await repository.findById(createdContact.id);

    expect(foundContact).toBeDefined();
    expect(foundContact?.id).toBe(createdContact.id);
    expect(foundContact?.name).toBe(mockContact.name);
  });

  it("should update a contact successfully", async () => {
    const createdContact = await repository.create(mockContact);
    const updatedContact = await repository.update(createdContact.id, {
      name: "Jane Doe",
    });

    expect(updatedContact).toBeDefined();
    expect(updatedContact.name).toBe("Jane Doe");
  });

  it("should soft delete a contact", async () => {
    const createdContact = await repository.create(mockContact);
    await repository.softDelete(createdContact.id);

    const foundContact = await repository.findById(createdContact.id);
    expect(foundContact).toBeUndefined();
  });

  it("should paginate contacts", async () => {
    await repository.create(mockContact);
    await repository.create({ ...mockContact, email: "jane.doe@example.com" });

    const contactsPage1 = await repository.paginate(1, 0);
    const contactsPage2 = await repository.paginate(1, 1);

    expect(contactsPage1).toHaveLength(1);
    expect(contactsPage2).toHaveLength(1);
  });

  it("should search contacts by name", async () => {
    await repository.create(mockContact);
    const results = await repository.searchByName("John");

    expect(results).toHaveLength(1);
    expect(results[0].name).toBe(mockContact.name);
  });

  it("should find a contact by phone number", async () => {
    const createdContact = await repository.create(mockContact);
    const foundContact = await repository.findByPhoneNumber(
      createdContact.phone,
    );

    expect(foundContact).toBeDefined();
    expect(foundContact?.phone).toBe(mockContact.phone);
  });

  it("should find contacts by company ID", async () => {
    await repository.create(mockContact);
    const results = await repository.findByCompany(mockContact.companyId);

    expect(results).toHaveLength(1);
    expect(results[0].companyId).toBe(mockContact.companyId);
  });

  it("should find a contact by email", async () => {
    const createdContact = await repository.create(mockContact);
    const foundContact = await repository.findByEmail(createdContact.email);

    expect(foundContact).toBeDefined();
    expect(foundContact?.email).toBe(mockContact.email);
  });
});
