import { beforeEach, describe, expect, it } from "bun:test";
import { KyselyAuthUsersRepository } from "../../../src/db/repositories/authUsers.repository";

describe("KyselyAuthUsersRepository", () => {
  let repository: KyselyAuthUsersRepository;

  beforeEach(() => {
    repository = new KyselyAuthUsersRepository(testDb);
  });

  it("should create a user successfully", async () => {
    const userData = {
      email: "test@example.com",
      name: "Test User",
      password: "password123",
      emailVerified: false,
      isAdmin: false,
      status: "active",
    };

    const user = await repository.create(userData);

    expect(user).toBeDefined();
    expect(user.email).toBe(userData.email);
    expect(user.id).toBeDefined();
    expect(user.created).toBeDefined();
  });

  it("should find a user by ID", async () => {
    const userData = {
      email: "test2@example.com",
      name: "Test User 2",
      password: "password123",
      emailVerified: false,
      isAdmin: false,
      status: "active",
    };

    const createdUser = await repository.create(userData);
    const foundUser = await repository.findById(createdUser.id);

    expect(foundUser).toBeDefined();
    expect(foundUser?.id).toBe(createdUser.id);
  });

  it("should find a user by email", async () => {
    const userData = {
      email: "test3@example.com",
      name: "Test User 3",
      password: "password123",
      emailVerified: false,
      isAdmin: false,
      status: "active",
    };

    const createdUser = await repository.create(userData);
    const foundUser = await repository.findByEmail(createdUser.email);

    expect(foundUser).toBeDefined();
    expect(foundUser?.email).toBe(createdUser.email);
  });

  it("should update a user successfully", async () => {
    const userData = {
      email: "test4@example.com",
      name: "Test User 4",
      password: "password123",
      emailVerified: false,
      isAdmin: false,
      status: "active",
    };

    const createdUser = await repository.create(userData);
    const updates = { name: "Updated User 4" };

    const updatedUser = await repository.update(createdUser.id, updates);

    expect(updatedUser).toBeDefined();
    expect(updatedUser.name).toBe(updates.name);
  });

  it("should soft delete a user", async () => {
    const userData = {
      email: "test5@example.com",
      name: "Test User 5",
      password: "password123",
      emailVerified: false,
      isAdmin: false,
      status: "active",
    };

    const createdUser = await repository.create(userData);
    await repository.softDelete(createdUser.id);

    const foundUser = await repository.findById(createdUser.id);
    expect(foundUser).toBeUndefined();
  });

  it("should hard delete a user", async () => {
    const userData = {
      email: "test6@example.com",
      name: "Test User 6",
      password: "password123",
      emailVerified: false,
      isAdmin: false,
      status: "active",
    };

    const createdUser = await repository.create(userData);
    await repository.delete(createdUser.id);

    const foundUser = await repository.findById(createdUser.id);
    expect(foundUser).toBeUndefined();
  });
});
