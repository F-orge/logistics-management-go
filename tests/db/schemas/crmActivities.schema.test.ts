import { describe, expect, it } from "bun:test";
import {
  CrmActivitiesBaseSchema,
  CrmActivitiesInsertSchema,
  CrmActivitiesUpdateSchema,
} from "../../../src/db/schemas/crmActivities.schema";
import { ZodError } from "zod/v4";

const validBase = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  companyId: "123e4567-e89b-12d3-a456-426614174001",
  contactId: "123e4567-e89b-12d3-a456-426614174002",
  type: "call",
  description: "Discussed project requirements.",
  created: new Date(),
  updated: new Date(),
  deleted: null,
};

const validInsert = {
  companyId: "123e4567-e89b-12d3-a456-426614174001",
  contactId: "123e4567-e89b-12d3-a456-426614174002",
  type: "meeting",
  description: "Met with client.",
};

const validUpdate = {
  type: "email",
  description: null,
};

describe("CrmActivitiesBaseSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid activity", () => {
      expect(() => CrmActivitiesBaseSchema.parse(validBase)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects invalid id", () => {
      expect(() =>
        CrmActivitiesBaseSchema.parse({ ...validBase, id: "bad-id" })
      ).toThrow("Invalid activity ID format");
    });
    it("rejects missing type", () => {
      const { type, ...rest } = validBase;
      expect(() => CrmActivitiesBaseSchema.parse(rest)).toThrow();
    });
    it("rejects too long type", () => {
      expect(() =>
        CrmActivitiesBaseSchema.parse({ ...validBase, type: "a".repeat(101) })
      ).toThrow("Activity type cannot exceed 100 characters");
    });
    it("rejects too long description", () => {
      expect(() =>
        CrmActivitiesBaseSchema.parse({
          ...validBase,
          description: "a".repeat(2001),
        })
      ).toThrow("Description cannot exceed 2000 characters");
    });
  });
});

describe("CrmActivitiesInsertSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid insert", () => {
      expect(() => CrmActivitiesInsertSchema.parse(validInsert)).not.toThrow();
    });
    it("accepts missing optional fields", () => {
      expect(() =>
        CrmActivitiesInsertSchema.parse({
          type: "call",
          companyId: null,
          contactId: null,
          description: null,
        })
      ).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects missing type", () => {
      const { type, ...rest } = validInsert;
      expect(() => CrmActivitiesInsertSchema.parse(rest)).toThrow();
    });
    it("rejects too long description", () => {
      expect(() =>
        CrmActivitiesInsertSchema.parse({
          ...validInsert,
          description: "a".repeat(2001),
        })
      ).toThrow("Description cannot exceed 2000 characters");
    });
  });
});

describe("CrmActivitiesUpdateSchema", () => {
  describe("Valid cases", () => {
    it("accepts partial update", () => {
      expect(() => CrmActivitiesUpdateSchema.parse(validUpdate)).not.toThrow();
    });
    it("accepts empty object", () => {
      expect(() => CrmActivitiesUpdateSchema.parse({})).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects too long type", () => {
      expect(() => CrmActivitiesUpdateSchema.parse({ type: "a".repeat(101) }))
        .toThrow("Activity type cannot exceed 100 characters");
    });
  });
});

describe("Error Messages", () => {
  it("should provide meaningful error messages", () => {
    try {
      CrmActivitiesBaseSchema.parse({ ...validBase, type: "" });
    } catch (e: any) {
      if (e instanceof ZodError) {
        expect(e.message).toContain("Activity type is required");
      }
    }
  });
});
