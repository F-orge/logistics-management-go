import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { KyselyCrmActivitiesRepository } from "../../../src/db/repositories/crmActivities.repository";
import { KyselyCrmCompaniesRepository } from "../../../src/db/repositories/crmCompanies.repository";
import { KyselyCrmContactsRepository } from "../../../src/db/repositories/crmContacts.repository";
import { Insertable } from "kysely";
import {
  CrmActivities,
  CrmCompanies,
  CrmContacts,
} from "../../../src/db/types";

// Mock data for testing
const mockActivity: Insertable<CrmActivities> = {
  type: "Call",
  companyId: "",
  contactId: "",
  description: "Follow-up call",
  created: new Date(),
  updated: new Date(),
  deleted: false,
};

describe("KyselyCrmActivitiesRepository", () => {
  let activityRepository: KyselyCrmActivitiesRepository;
  let companyRepository: KyselyCrmCompaniesRepository;
  let contactRepository: KyselyCrmContactsRepository;

  beforeEach(async () => {
    // Initialize the repositories with the global test database instance
    activityRepository = new KyselyCrmActivitiesRepository(globalThis.testDb);
    companyRepository = new KyselyCrmCompaniesRepository(globalThis.testDb);
    contactRepository = new KyselyCrmContactsRepository(globalThis.testDb);

    // Create a test company
    const testCompany: Insertable<CrmCompanies> = {
      name: "Test Company",
      email: "test@company.com",
      address: "123 Test Street",
      phone: "123-456-7890",
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };
    const createdCompany = await companyRepository.create(testCompany);
    mockActivity.companyId = createdCompany.id;

    // Create a test contact
    const testContact: Insertable<CrmContacts> = {
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      companyId: createdCompany.id,
      created: new Date(),
      updated: new Date(),
      deleted: false,
    };
    const createdContact = await contactRepository.create(testContact);
    mockActivity.contactId = createdContact.id;
  });

  afterEach(async () => {
    // Clean up the test data after each test
    await globalThis.testDb.deleteFrom("crm.activities").execute();
    await globalThis.testDb.deleteFrom("crm.contacts").execute();
    await globalThis.testDb.deleteFrom("crm.companies").execute();
  });

  it("should create an activity successfully", async () => {
    const activity = await activityRepository.create(mockActivity);

    expect(activity).toBeDefined();
    expect(activity.type).toBe(mockActivity.type);
    expect(activity.description).toBe(mockActivity.description ?? "");
    expect(activity.id).toBeDefined();
    expect(activity.created).toBeDefined();
  });

  it("should find an activity by ID", async () => {
    const createdActivity = await activityRepository.create(mockActivity);
    const foundActivity = await activityRepository.findById(createdActivity.id);

    expect(foundActivity).toBeDefined();
    expect(foundActivity?.id).toBe(createdActivity.id);
    expect(foundActivity?.type).toBe(mockActivity.type);
  });

  it("should find activities by type", async () => {
    await activityRepository.create(mockActivity);
    const results = await activityRepository.findByType("Call", 0, 10);

    expect(results).toHaveLength(1);
    expect(results[0].type).toBe(mockActivity.type);
  });

  it("should find activities by company ID", async () => {
    await activityRepository.create(mockActivity);
    const results = await activityRepository.findByCompanyID(
      mockActivity.companyId ?? "",
      0,
      10,
    );

    expect(results).toHaveLength(1);
    expect(results[0].companyId).toBe(mockActivity.companyId ?? "");
  });

  it("should find activities by contact ID", async () => {
    await activityRepository.create(mockActivity);
    const results = await activityRepository.findByContactID(
      mockActivity.contactId ?? "",
      0,
      10,
    );

    expect(results).toHaveLength(1);
    expect(results[0].contactId).toBe(mockActivity.contactId ?? "");
  });

  it("should paginate activities", async () => {
    await activityRepository.create(mockActivity);
    await activityRepository.create({ ...mockActivity, type: "Email" });

    const activitiesPage1 = await activityRepository.paginate(0, 1);
    const activitiesPage2 = await activityRepository.paginate(1, 1);

    expect(activitiesPage1).toHaveLength(1);
    expect(activitiesPage2).toHaveLength(1);
  });

  it("should soft delete an activity", async () => {
    const createdActivity = await activityRepository.create(mockActivity);
    await activityRepository.softDelete(createdActivity.id);

    const foundActivity = await activityRepository.findById(createdActivity.id);
    expect(foundActivity).toBeUndefined();
  });

  it("should delete an activity permanently", async () => {
    const createdActivity = await activityRepository.create(mockActivity);
    await activityRepository.delete(createdActivity.id);

    const foundActivity = await activityRepository.findById(createdActivity.id);
    expect(foundActivity).toBeUndefined();
  });
});
