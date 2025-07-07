import { describe, expect, it } from "bun:test";
import {
  CrmContactsBaseSchema,
  CrmContactsInsertSchema,
  CrmContactsUpdateSchema,
} from "../../../src/db/schemas/crmContacts.schema";
import { ZodError } from "zod/v4";

const validBase = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "Jane Smith",
  email: "jane@company.com",
  phone: "+1234567890",
  address: null,
  birthday: null,
  companyId: null,
  position: null,
  created: new Date(),
  updated: new Date(),
  deleted: null,
};

const validInsert = {
  name: "Jane Smith",
  email: "jane@company.com",
  phone: "+1234567890",
};

const validUpdate = {
  name: "Janet Smith",
  position: "Manager",
};

describe("CrmContactsBaseSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid contact", () => {
      expect(() => CrmContactsBaseSchema.parse(validBase)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects invalid id", () => {
      expect(() => CrmContactsBaseSchema.parse({ ...validBase, id: "bad-id" }))
        .toThrow("Invalid contact ID format");
    });
    it("rejects missing name", () => {
      const { name, ...rest } = validBase;
      expect(() => CrmContactsBaseSchema.parse(rest)).toThrow();
    });
    it("rejects too long name", () => {
      expect(() =>
        CrmContactsBaseSchema.parse({ ...validBase, name: "a".repeat(256) })
      ).toThrow("Contact name cannot exceed 255 characters");
    });
    it("rejects invalid email", () => {
      expect(() => CrmContactsBaseSchema.parse({ ...validBase, email: "bad" }))
        .toThrow("Invalid email format");
    });
    it("rejects invalid phone", () => {
      expect(() =>
        CrmContactsBaseSchema.parse({ ...validBase, phone: "badphone" })
      ).toThrow("Invalid phone format");
    });
  });
});

describe("CrmContactsInsertSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid insert", () => {
      expect(() => CrmContactsInsertSchema.parse(validInsert)).not.toThrow();
    });
    it("accepts missing optional fields", () => {
      expect(() =>
        CrmContactsInsertSchema.parse({
          name: "Jane Smith",
          email: "jane@company.com",
          phone: "+1234567890",
        })
      ).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects missing name", () => {
      const { name, ...rest } = validInsert;
      expect(() => CrmContactsInsertSchema.parse(rest)).toThrow();
    });
    it("rejects invalid email", () => {
      expect(() =>
        CrmContactsInsertSchema.parse({ ...validInsert, email: "bad" })
      ).toThrow("Invalid email format");
    });
  });
});

describe("CrmContactsUpdateSchema", () => {
  describe("Valid cases", () => {
    it("accepts partial update", () => {
      expect(() => CrmContactsUpdateSchema.parse(validUpdate)).not.toThrow();
    });
    it("accepts empty object", () => {
      expect(() => CrmContactsUpdateSchema.parse({})).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects too long name", () => {
      expect(() => CrmContactsUpdateSchema.parse({ name: "a".repeat(256) }))
        .toThrow("Contact name cannot exceed 255 characters");
    });
  });
});

describe("Error Messages", () => {
  it("should provide meaningful error messages", () => {
    try {
      CrmContactsBaseSchema.parse({ ...validBase, name: "" });
    } catch (e: any) {
      if (e instanceof ZodError) {
        expect(e.message).toContain("Contact name is required");
      }
    }
  });
});
