import { describe, expect, it } from "bun:test";
import {
  CrmCompaniesBaseSchema,
  CrmCompaniesInsertSchema,
  CrmCompaniesUpdateSchema,
} from "../../../src/db/schemas/crmCompanies.schema";
import { ZodError } from "zod/v4";

const validBase = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "Acme Corp",
  email: "info@acme.com",
  phone: "+1234567890",
  address: "123 Main St",
  billingAddress: null,
  websiteUrl: null,
  industry: null,
  taxId: null,
  notes: null,
  status: "active",
  created: new Date(),
  updated: new Date(),
  deleted: null,
};

const validInsert = {
  name: "Acme Corp",
  email: "info@acme.com",
  phone: "+1234567890",
  address: "123 Main St",
  billingAddress: null,
  websiteUrl: null,
  industry: null,
  taxId: null,
  notes: null,
};

const validUpdate = {
  name: "Acme Inc.",
  notes: "Updated notes.",
};

describe("CrmCompaniesBaseSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid company", () => {
      expect(() => CrmCompaniesBaseSchema.parse(validBase)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects invalid id", () => {
      expect(() => CrmCompaniesBaseSchema.parse({ ...validBase, id: "bad-id" }))
        .toThrow("Invalid company ID format");
    });
    it("rejects missing name", () => {
      const { name, ...rest } = validBase;
      expect(() => CrmCompaniesBaseSchema.parse(rest)).toThrow();
    });
    it("rejects too long name", () => {
      expect(() =>
        CrmCompaniesBaseSchema.parse({ ...validBase, name: "a".repeat(256) })
      ).toThrow("Company name cannot exceed 255 characters");
    });
    it("rejects invalid email", () => {
      expect(() => CrmCompaniesBaseSchema.parse({ ...validBase, email: "bad" }))
        .toThrow("Invalid email format");
    });
    it("rejects invalid phone", () => {
      expect(() =>
        CrmCompaniesBaseSchema.parse({ ...validBase, phone: "badphone" })
      ).toThrow("Invalid phone format");
    });
    it("rejects too long address", () => {
      expect(() =>
        CrmCompaniesBaseSchema.parse({ ...validBase, address: "a".repeat(256) })
      ).toThrow("Address cannot exceed 255 characters");
    });
    it("rejects too long notes", () => {
      expect(() =>
        CrmCompaniesBaseSchema.parse({ ...validBase, notes: "a".repeat(2001) })
      ).toThrow("Notes cannot exceed 2000 characters");
    });
  });
});

describe("CrmCompaniesInsertSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid insert", () => {
      expect(() => CrmCompaniesInsertSchema.parse(validInsert)).not.toThrow();
    });
    it("accepts missing nullable fields", () => {
      expect(() =>
        CrmCompaniesInsertSchema.parse({
          name: "Acme Corp",
          email: "info@acme.com",
          phone: "+1234567890",
          address: "123 Main St",
        })
      ).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects missing name", () => {
      const { name, ...rest } = validInsert;
      expect(() => CrmCompaniesInsertSchema.parse(rest)).toThrow();
    });
    it("rejects invalid email", () => {
      expect(() =>
        CrmCompaniesInsertSchema.parse({ ...validInsert, email: "bad" })
      ).toThrow("Invalid email format");
    });
  });
});

describe("CrmCompaniesUpdateSchema", () => {
  describe("Valid cases", () => {
    it("accepts partial update", () => {
      expect(() => CrmCompaniesUpdateSchema.parse(validUpdate)).not.toThrow();
    });
    it("accepts empty object", () => {
      expect(() => CrmCompaniesUpdateSchema.parse({})).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects too long name", () => {
      expect(() => CrmCompaniesUpdateSchema.parse({ name: "a".repeat(256) }))
        .toThrow("Company name cannot exceed 255 characters");
    });
  });
});

describe("Error Messages", () => {
  it("should provide meaningful error messages", () => {
    try {
      CrmCompaniesBaseSchema.parse({ ...validBase, name: "" });
    } catch (e: any) {
      if (e instanceof ZodError) {
        expect(e.message).toContain("Company name is required");
      }
    }
  });
});
