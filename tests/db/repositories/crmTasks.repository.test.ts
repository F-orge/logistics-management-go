import { afterEach, beforeEach, describe, expect, it } from "bun:test";
import { KyselyCrmTasksRepository } from "../../../src/db/repositories/crmTasks.repository";
import { KyselyCrmCompaniesRepository } from "../../../src/db/repositories/crmCompanies.repository";
import { KyselyCrmContactsRepository } from "../../../src/db/repositories/crmContacts.repository";
import { Insertable } from "kysely";
import { CrmTasks, TaskStatus } from "../../../src/db/types";

describe("KyselyCrmTasksRepository", () => {
  let tasksRepository: KyselyCrmTasksRepository;
  let companiesRepository: KyselyCrmCompaniesRepository;
  let contactsRepository: KyselyCrmContactsRepository;

  const testTask: Insertable<CrmTasks> = {
    title: "Test Task",
    description: "This is a test task",
    status: "pending" as TaskStatus, // Explicitly cast to TaskStatus
    companyId: "", // Initialize as empty string to avoid undefined
    contactId: "", // Initialize as empty string to avoid undefined
    dueDate: new Date(), // Ensure non-nullable Date
    created: new Date(),
    updated: new Date(),
    deleted: false,
  };

  beforeEach(async () => {
    tasksRepository = new KyselyCrmTasksRepository(globalThis.testDb);
    companiesRepository = new KyselyCrmCompaniesRepository(globalThis.testDb);
    contactsRepository = new KyselyCrmContactsRepository(globalThis.testDb);

    // Create a test company
    const testCompany = await companiesRepository.create({
      name: "Test Company",
      email: "test@company.com",
      address: "123 Test Street",
      phone: "123-456-7890",
      created: new Date(),
      updated: new Date(),
    });

    // Create a test contact
    const testContact = await contactsRepository.create({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "1234567890",
      companyId: testCompany.id,
      created: new Date(),
      updated: new Date(),
      deleted: false,
    });

    // Update testTask with the created company and contact IDs
    testTask.companyId = testCompany.id;
    testTask.contactId = testContact.id;
  });

  afterEach(async () => {
    await globalThis.testDb.deleteFrom("crm.tasks").execute();
    await globalThis.testDb.deleteFrom("crm.contacts").execute();
    await globalThis.testDb.deleteFrom("crm.companies").execute();
  });

  it("should create a task successfully", async () => {
    const task = await tasksRepository.create(testTask);

    expect(task).toBeDefined();
    expect(task.title).toBe(testTask.title);
    expect(task.id).toBeDefined();
  });

  it("should find a task by ID", async () => {
    const createdTask = await tasksRepository.create(testTask);
    const foundTask = await tasksRepository.findById(createdTask.id);

    expect(foundTask).toBeDefined();
    expect(foundTask?.id).toBe(createdTask.id);
    expect(foundTask?.title).toBe(testTask.title);
  });

  it("should find tasks by company ID", async () => {
    await tasksRepository.create(testTask);
    const tasks = await tasksRepository.findByCompanyID(
      testTask.companyId ?? "",
      0,
      10,
    );

    expect(tasks).toHaveLength(1);
    expect(tasks[0].companyId).toBe(testTask.companyId ?? "");
  });

  it("should find tasks by contact ID", async () => {
    await tasksRepository.create(testTask);
    const tasks = await tasksRepository.findByContactID(
      testTask.contactId!,
      0,
      10,
    );

    expect(tasks).toHaveLength(1);
    expect(tasks[0].contactId).toBe(testTask.contactId!);
  });

  it("should find tasks by due date", async () => {
    await tasksRepository.create(testTask);
    const tasks = await tasksRepository.findByDueDate(
      testTask.dueDate! as Date,
      0,
      10,
    );

    expect(tasks).toHaveLength(1);
    expect(tasks[0].dueDate).toEqual(testTask.dueDate! as Date);
  });

  it("should find tasks by status", async () => {
    await tasksRepository.create(testTask);
    const tasks = await tasksRepository.findByStatus(testTask.status!, 0, 10);

    expect(tasks).toHaveLength(1);
    expect(tasks[0].status).toBe(testTask.status!);
  });

  it("should search tasks by title", async () => {
    await tasksRepository.create(testTask);
    const tasks = await tasksRepository.searchByTitle("Test", 0, 10);

    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toContain("Test");
  });

  it("should soft delete a task", async () => {
    const createdTask = await tasksRepository.create(testTask);

    await tasksRepository.softDelete(createdTask.id);

    const foundTask = await tasksRepository.findById(createdTask.id);
    expect(foundTask).toBeUndefined();
  });

  it("should delete a task permanently", async () => {
    const createdTask = await tasksRepository.create(testTask);

    await tasksRepository.delete(createdTask.id);

    const foundTask = await tasksRepository.findById(createdTask.id);
    expect(foundTask).toBeUndefined();
  });
});
