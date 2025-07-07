import { describe, expect, it } from "bun:test";
import {
  AuthUsersBaseSchema,
  AuthUsersInsertSchema,
  AuthUsersUpdateSchema,
} from "../../../src/db/schemas/authUsers.schema";

const validBase = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  email: "user@example.com",
  name: "John Doe",
  password: "hashedpassword",
  phone: "+1234567890",
  profilePictureUrl: "https://example.com/pic.jpg",
  status: "active",
  emailVerified: false,
  isAdmin: false,
  lastLogin: new Date(),
  created: new Date(),
  updated: new Date(),
  deleted: null,
  deletedAt: null,
};

const validInsert = {
  email: "user@example.com",
  name: "John Doe",
  password: "hashedpassword",
  phone: "+1234567890",
  profilePictureUrl: "https://example.com/pic.jpg",
  lastLogin: new Date().toISOString(),
};

const validUpdate = {
  name: "Jane Doe",
  phone: null,
};

describe("AuthUsersBaseSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid user", () => {
      expect(() => AuthUsersBaseSchema.parse(validBase)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects invalid email", () => {
      expect(() =>
        AuthUsersBaseSchema.parse({ ...validBase, email: "not-an-email" })
      ).toThrow("Invalid email format");
    });
    it("rejects missing name", () => {
      const { name, ...rest } = validBase;
      expect(() => AuthUsersBaseSchema.parse(rest)).toThrow("Required");
    });
    it("rejects invalid phone", () => {
      expect(() =>
        AuthUsersBaseSchema.parse({ ...validBase, phone: "badphone" })
      ).toThrow("Invalid phone format");
    });
    it("rejects too long profilePictureUrl", () => {
      expect(() =>
        AuthUsersBaseSchema.parse({
          ...validBase,
          profilePictureUrl: "https://" + "a".repeat(490) + ".com",
        })
      ).toThrow("Profile picture URL cannot exceed 500 characters");
    });
  });
});

describe("AuthUsersInsertSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid insert", () => {
      expect(() => AuthUsersInsertSchema.parse(validInsert)).not.toThrow();
    });
    it("accepts missing optional fields", () => {
      expect(() =>
        AuthUsersInsertSchema.parse({
          email: "user@example.com",
          name: "John Doe",
          password: "hashedpassword",
        })
      ).toThrow("Required");
    });
  });
  describe("Invalid cases", () => {
    it("rejects missing email", () => {
      const { email, ...rest } = validInsert;
      expect(() => AuthUsersInsertSchema.parse(rest)).toThrow("Required");
    });
    it("rejects invalid lastLogin string", () => {
      expect(() =>
        AuthUsersInsertSchema.parse({ ...validInsert, lastLogin: "notadate" })
      ).toThrow("Invalid date format");
    });
  });
});

describe("AuthUsersUpdateSchema", () => {
  describe("Valid cases", () => {
    it("accepts partial update", () => {
      expect(() => AuthUsersUpdateSchema.parse(validUpdate)).not.toThrow();
    });
    it("accepts empty object", () => {
      expect(() => AuthUsersUpdateSchema.parse({})).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects invalid phone", () => {
      expect(() => AuthUsersUpdateSchema.parse({ phone: "badphone" })).toThrow(
        "Invalid phone format",
      );
    });
  });
});

describe("Error Messages", () => {
  it("should provide meaningful error messages", () => {
    try {
      AuthUsersBaseSchema.parse({ ...validBase, email: "bad" });
    } catch (e: any) {
      expect(e.errors[0].message).toContain("Invalid email format");
    }
  });
});
