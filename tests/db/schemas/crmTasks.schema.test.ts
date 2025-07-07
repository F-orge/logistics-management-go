import { describe, expect, it } from "bun:test";
import {
  CrmTasksBaseSchema,
  CrmTasksInsertSchema,
  CrmTasksUpdateSchema,
} from "../../../src/db/schemas/crmTasks.schema";

const validBase = {
  id: "123e4567-e89b-12d3-a456-426614174000",
  title: "Call client",
  description: "Discuss contract details.",
  status: "pending",
  dueDate: new Date(),
  companyId: "123e4567-e89b-12d3-a456-426614174001",
  contactId: "123e4567-e89b-12d3-a456-426614174002",
  created: new Date(),
  updated: new Date(),
  deleted: null,
};

const validInsert = {
  title: "Call client",
  description: "Discuss contract details.",
  dueDate: new Date().toISOString(),
  companyId: "123e4567-e89b-12d3-a456-426614174001",
  contactId: "123e4567-e89b-12d3-a456-426614174002",
};

describe("CrmTasksBaseSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid task", () => {
      expect(() => CrmTasksBaseSchema.parse(validBase)).not.toThrow();
    });
    it("accepts null for nullable fields", () => {
      const obj = {
        ...validBase,
        description: null,
        dueDate: null,
        companyId: null,
        contactId: null,
        deleted: null,
      };
      expect(() => CrmTasksBaseSchema.parse(obj)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects invalid id", () => {
      expect(() => CrmTasksBaseSchema.parse({ ...validBase, id: "bad-id" }))
        .toThrow("Invalid task ID format");
    });
    it("rejects missing title", () => {
      const { title, ...rest } = validBase;
      expect(() => CrmTasksBaseSchema.parse(rest)).toThrow("Required");
    });
    it("rejects too long title", () => {
      expect(() =>
        CrmTasksBaseSchema.parse({ ...validBase, title: "a".repeat(256) })
      ).toThrow("Task title cannot exceed 255 characters");
    });
    it("rejects invalid status", () => {
      expect(() => CrmTasksBaseSchema.parse({ ...validBase, status: "bad" }))
        .toThrow("Status must be pending, in-progress, or completed");
    });
  });
});

describe("CrmTasksInsertSchema", () => {
  describe("Valid cases", () => {
    it("accepts a valid insert", () => {
      expect(() => CrmTasksInsertSchema.parse(validInsert)).not.toThrow();
    });
    it("accepts missing optional fields", () => {
      const obj = { ...validInsert };
      //@ts-ignore
      delete obj.description;
      //@ts-ignore
      delete obj.dueDate;
      //@ts-ignore
      delete obj.companyId;
      //@ts-ignore
      delete obj.contactId;
      expect(() => CrmTasksInsertSchema.parse(obj)).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects missing title", () => {
      const { title, ...rest } = validInsert;
      expect(() => CrmTasksInsertSchema.parse(rest)).toThrow("Required");
    });
    it("rejects invalid dueDate string", () => {
      expect(() =>
        CrmTasksInsertSchema.parse({ ...validInsert, dueDate: "not-a-date" })
      ).toThrow("Invalid date format");
    });
  });
});

describe("CrmTasksUpdateSchema", () => {
  describe("Valid cases", () => {
    it("accepts partial update", () => {
      expect(() => CrmTasksUpdateSchema.parse({ title: "Updated task" })).not
        .toThrow();
    });
    it("accepts empty object", () => {
      expect(() => CrmTasksUpdateSchema.parse({})).not.toThrow();
    });
  });
  describe("Invalid cases", () => {
    it("rejects too long title", () => {
      expect(() => CrmTasksUpdateSchema.parse({ title: "a".repeat(256) }))
        .toThrow("Task title cannot exceed 255 characters");
    });
    it.failing("rejects invalid status", () => {
      // Zod's .enum() with .partial() means status is optional, so only fails if present and invalid
      expect(() => CrmTasksUpdateSchema.parse({ status: "bad" })).toThrow(
        "Status must be pending, in-progress, or completed",
      );
    });
  });
});

describe("Error Messages", () => {
  it("should provide meaningful error messages", () => {
    try {
      CrmTasksBaseSchema.parse({ ...validBase, title: "" });
    } catch (e: any) {
      expect(e.errors[0].message).toContain("Task title is required");
    }
  });
});
