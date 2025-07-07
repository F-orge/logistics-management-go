import { describe, expect, it } from "bun:test";
import {
  CrmLinksBaseSchema,
  CrmLinksInsertSchema,
  CrmLinksUpdateSchema,
} from "../../../src/db/schemas/crmLinks.schema";
import { ZodError } from "zod/v4";

const validBase = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  companyId: "123e4567-e89b-12d3-a456-426614174001",
  contactId: "123e4567-e89b-12d3-a456-426614174002",
  link: "https://example.com",
  description: "A useful link.",
  created: new Date(),
  updated: new Date(),
  deleted: null,
};

const validInsert = {
  companyId: "123e4567-e89b-12d3-a456-426614174001",
  contactId: "123e4567-e89b-12d3-a456-426614174002",
  link: "https://example.com",
  description: "A useful link.",
};

describe("CrmLinksBaseSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid link", () => {
      expect(() => CrmLinksBaseSchema.parse(validBase)).not.toThrow();
    });
    it("accepts null for nullable fields", () => {
      const obj = {
        ...validBase,
        companyId: null,
        contactId: null,
        description: null,
        deleted: null,
      };
      expect(() => CrmLinksBaseSchema.parse(obj)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects invalid id", () => {
      expect(() => CrmLinksBaseSchema.parse({ ...validBase, id: "bad-id" }))
        .toThrow("Invalid link ID format");
    });
    it("rejects missing link", () => {
      const { link, ...rest } = validBase;
      expect(() => CrmLinksBaseSchema.parse(rest)).toThrow();
    });
    it("rejects too long link", () => {
      expect(() =>
        CrmLinksBaseSchema.parse({
          ...validBase,
          link: "https://" + "a".repeat(495) + ".com",
        })
      ).toThrow("Link cannot exceed 500 characters");
    });
    it("rejects invalid url", () => {
      expect(() =>
        CrmLinksBaseSchema.parse({ ...validBase, link: "not-a-url" })
      ).toThrow("Invalid URL format");
    });
  });
});

describe("CrmLinksInsertSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid insert", () => {
      expect(() => CrmLinksInsertSchema.parse(validInsert)).not.toThrow();
    });
    it("accepts missing optional fields", () => {
      const obj = { ...validInsert };
      //@ts-ignore
      delete obj.companyId;
      //@ts-ignore
      delete obj.contactId;
      //@ts-ignore
      delete obj.description;
      expect(() => CrmLinksInsertSchema.parse(obj)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects missing link", () => {
      const { link, ...rest } = validInsert;
      expect(() => CrmLinksInsertSchema.parse(rest)).toThrow();
    });
    it("rejects invalid url", () => {
      expect(() =>
        CrmLinksInsertSchema.parse({ ...validInsert, link: "not-a-url" })
      ).toThrow("Invalid URL format");
    });
  });
});

describe("CrmLinksUpdateSchema", () => {
  describe("Valid cases", () => {
    it("accepts partial update", () => {
      expect(() => CrmLinksUpdateSchema.parse({ link: "https://updated.com" }))
        .not.toThrow();
    });
    it("accepts empty object", () => {
      expect(() => CrmLinksUpdateSchema.parse({})).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects too long link", () => {
      expect(() =>
        CrmLinksUpdateSchema.parse({
          link: "https://" + "a".repeat(495) + ".com",
        })
      ).toThrow("Link cannot exceed 500 characters");
    });
    it("rejects invalid url", () => {
      expect(() => CrmLinksUpdateSchema.parse({ link: "not-a-url" })).toThrow(
        "Invalid URL format",
      );
    });
  });
});

describe("Error Messages", () => {
  it("should provide meaningful error messages", () => {
    try {
      CrmLinksBaseSchema.parse({ ...validBase, link: "" });
    } catch (e: any) {
      if (e instanceof ZodError) {
        expect(e.message).toContain("Link is required");
      }
    }
  });
});
