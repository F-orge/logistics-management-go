import { describe, expect, it } from "bun:test";
import {
  CrmDealsBaseSchema,
  CrmDealsInsertSchema,
  CrmDealsUpdateSchema,
} from "../../../src/db/schemas/crmDeals.schema";
import { ZodError } from "zod/v4";

const validBase = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  name: "Big Deal",
  amount: 1000000.01,
  status: "open",
  companyId: "123e4567-e89b-12d3-a456-426614174001",
  contactId: "123e4567-e89b-12d3-a456-426614174002",
  created: new Date(),
  updated: new Date(),
  deleted: null,
};

const validInsert = {
  name: "Big Deal",
  amount: 1000000.01,
  status: "open",
  companyId: "123e4567-e89b-12d3-a456-426614174001",
  contactId: "123e4567-e89b-12d3-a456-426614174002",
};

describe("CrmDealsBaseSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid deal", () => {
      expect(() => CrmDealsBaseSchema.parse(validBase)).not.toThrow();
    });
    it("accepts null for nullable fields", () => {
      const obj = {
        ...validBase,
        companyId: null,
        contactId: null,
        deleted: null,
      };
      expect(() => CrmDealsBaseSchema.parse(obj)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects invalid id", () => {
      expect(() => CrmDealsBaseSchema.parse({ ...validBase, id: "bad-id" }))
        .toThrow("Invalid deal ID format");
    });
    it("rejects missing name", () => {
      const { name, ...rest } = validBase;
      expect(() => CrmDealsBaseSchema.parse(rest)).toThrow();
    });
    it("rejects too long name", () => {
      expect(() =>
        CrmDealsBaseSchema.parse({ ...validBase, name: "a".repeat(256) })
      ).toThrow("Deal name cannot exceed 255 characters");
    });
    it("rejects invalid status", () => {
      expect(() => CrmDealsBaseSchema.parse({ ...validBase, status: "bad" }))
        .toThrow("Status must be open, won, or lost");
    });
    it("rejects negative amount", () => {
      expect(() => CrmDealsBaseSchema.parse({ ...validBase, amount: -1 }))
        .toThrow("Deal amount cannot be negative");
    });
  });
});

describe("CrmDealsInsertSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid insert", () => {
      expect(() => CrmDealsInsertSchema.parse(validInsert)).not.toThrow();
    });
    it("accepts missing optional fields", () => {
      const obj = { ...validInsert };
      //@ts-ignore
      delete obj.companyId;
      //@ts-ignore
      delete obj.contactId;
      expect(() => CrmDealsInsertSchema.parse(obj)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects missing name", () => {
      const { name, ...rest } = validInsert;
      expect(() => CrmDealsInsertSchema.parse(rest)).toThrow();
    });
    it("rejects invalid status", () => {
      expect(() =>
        CrmDealsInsertSchema.parse({ ...validInsert, status: "bad" })
      ).toThrow("Status must be open, won, or lost");
    });
  });
});

describe("CrmDealsUpdateSchema", () => {
  describe("Valid cases", () => {
    it("accepts partial update", () => {
      expect(() => CrmDealsUpdateSchema.parse({ name: "Updated Deal" })).not
        .toThrow();
    });
    it("accepts empty object", () => {
      expect(() => CrmDealsUpdateSchema.parse({})).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects too long name", () => {
      expect(() => CrmDealsUpdateSchema.parse({ name: "a".repeat(256) }))
        .toThrow("Deal name cannot exceed 255 characters");
    });
    it("rejects invalid status", () => {
      expect(() => CrmDealsUpdateSchema.parse({ status: "bad" })).toThrow(
        "Status must be open, won, or lost",
      );
    });
  });
});

describe("Error Messages", () => {
  it("should provide meaningful error messages", () => {
    try {
      CrmDealsBaseSchema.parse({ ...validBase, name: "" });
    } catch (e: any) {
      if (e instanceof ZodError) {
        expect(e.message).toContain("Deal name is required");
      }
    }
  });
});
