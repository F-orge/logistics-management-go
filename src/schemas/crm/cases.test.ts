import { describe, test, expect } from "bun:test";
import { ZodError } from "zod";
import {
  crmCaseSchema,
  crmCaseInsertSchema,
  crmCaseUpdateSchema,
} from "./cases";

// Define enums for testing purposes, mirroring the original enums from @/db/types
enum CrmCasePriority {
  Critical = 'critical',
  High = 'high',
  Low = 'low',
  Medium = 'medium',
}

enum CrmCaseStatus {
  Cancelled = 'cancelled',
  Closed = 'closed',
  Escalated = 'escalated',
  InProgress = 'in-progress',
  New = 'new',
  Resolved = 'resolved',
  WaitingForCustomer = 'waiting-for-customer',
  WaitingForInternal = 'waiting-for-internal',
}

enum CrmCaseType {
  BugReport = 'bug-report',
  Complaint = 'complaint',
  FeatureRequest = 'feature-request',
  Problem = 'problem',
  Question = 'question',
  TechnicalSupport = 'technical-support',
}

describe("CrmCaseSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: "user-123",
        },
      },
      {
        name: "complete valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174001",
          caseNumber: "CASE-002",
          contactId: "123e4567-e89b-12d3-a456-426614174002",
          description: "Customer reported a bug in the system.",
          ownerId: "user-456",
          priority: CrmCasePriority.High,
          status: CrmCaseStatus.InProgress,
          type: CrmCaseType.BugReport,
          createdAt: new Date("2023-01-01T10:00:00Z"),
          updatedAt: new Date("2023-01-01T11:00:00Z"),
        },
      },
      {
        name: "case number with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174003",
          caseNumber: "A".repeat(127),
          ownerId: "user-789",
        },
      },
      {
        name: "description with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174004",
          caseNumber: "CASE-004",
          description: "D".repeat(1024),
          ownerId: "user-abc",
        },
      },
      {
        name: "ownerId with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174005",
          caseNumber: "CASE-005",
          ownerId: "O".repeat(255),
        },
      },
      {
        name: "all optional fields absent",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174006",
          caseNumber: "CASE-006",
          ownerId: "user-xyz",
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmCaseSchema.parse(input)).not.toThrow();
      const result = crmCaseSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "missing id",
        input: {
          caseNumber: "CASE-001",
          ownerId: "user-123",
        },
        expectedError: "Invalid UUID format for ID",
      },
      {
        name: "invalid id format",
        input: {
          id: "invalid-uuid",
          caseNumber: "CASE-001",
          ownerId: "user-123",
        },
        expectedError: "Invalid UUID format for ID",
      },
      {
        name: "missing caseNumber",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          ownerId: "user-123",
        },
        expectedError: "Case number must be a string",
      },
      {
        name: "caseNumber too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "",
          ownerId: "user-123",
        },
        expectedError: "Case number is required",
      },
      {
        name: "caseNumber too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "A".repeat(128),
          ownerId: "user-123",
        },
        expectedError: "Case number must be at most 127 characters",
      },
      {
        name: "caseNumber wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: 123,
          ownerId: "user-123",
        },
        expectedError: "Case number must be a string",
      },
      {
        name: "invalid contactId format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          contactId: "invalid-uuid",
          ownerId: "user-123",
        },
        expectedError: "Invalid UUID format for contact ID",
      },
      {
        name: "description too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          description: "",
          ownerId: "user-123",
        },
        expectedError: "Description is required",
      },
      {
        name: "description too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          description: "D".repeat(1025),
          ownerId: "user-123",
        },
        expectedError: "Description must be at most 1024 characters",
      },
      {
        name: "description wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          description: 123,
          ownerId: "user-123",
        },
        expectedError: "Description must be a string",
      },
      {
        name: "missing ownerId",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
        },
        expectedError: "Owner ID must be a string",
      },
      {
        name: "ownerId too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: "",
        },
        expectedError: "Owner ID is required",
      },
      {
        name: "ownerId too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: "O".repeat(256),
        },
        expectedError: "Owner ID must be at most 255 characters",
      },
      {
        name: "ownerId wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: 123,
        },
        expectedError: "Owner ID must be a string",
      },
      {
        name: "priority invalid enum value",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: "user-123",
          priority: "invalid-priority",
        },
        expectedError: "Invalid case priority",
      },
      {
        name: "status invalid enum value",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: "user-123",
          status: "invalid-status",
        },
        expectedError: "Invalid case status",
      },
      {
        name: "type invalid enum value",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: "user-123",
          type: "invalid-type",
        },
        expectedError: "Invalid case type",
      },
      {
        name: "createdAt invalid date format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: "user-123",
          createdAt: "not-a-date",
        },
        expectedError: "Invalid ISO datetime format for creation date",
      },
      {
        name: "updatedAt invalid date format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "CASE-001",
          ownerId: "user-123",
          updatedAt: "not-a-date",
        },
        expectedError: "Invalid ISO datetime format for update date",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        crmCaseSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for crmCaseSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        caseNumber: "CASE-VALID",
        ownerId: "user-valid",
      };
      const result = crmCaseSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "invalid-uuid",
        caseNumber: "CASE-INVALID",
        ownerId: "user-invalid",
      };
      const result = crmCaseSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("CrmCaseInsertSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data (no id, createdAt, updatedAt)",
        input: {
          caseNumber: "INSERT-001",
          ownerId: "user-insert",
        },
      },
      {
        name: "complete valid data (no id, createdAt, updatedAt)",
        input: {
          caseNumber: "INSERT-002",
          contactId: "123e4567-e89b-12d3-a456-426614174007",
          description: "New case description.",
          ownerId: "user-insert-full",
          priority: CrmCasePriority.Low,
          status: CrmCaseStatus.New,
          type: CrmCaseType.Question,
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmCaseInsertSchema.parse(input)).not.toThrow();
      const result = crmCaseInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "should reject with id present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "INSERT-FAIL",
          ownerId: "user-fail",
        },
        expectedError: "Unrecognized key: \"id\"",
      },
      {
        name: "should reject with createdAt present",
        input: {
          caseNumber: "INSERT-FAIL",
          ownerId: "user-fail",
          createdAt: new Date(),
        },
        expectedError: "Unrecognized key: \"createdAt\"",
      },
      {
        name: "should reject with updatedAt present",
        input: {
          caseNumber: "INSERT-FAIL",
          ownerId: "user-fail",
          updatedAt: new Date(),
        },
        expectedError: "Unrecognized key: \"updatedAt\"",
      },
      {
        name: "missing caseNumber",
        input: {
          ownerId: "user-fail",
        },
        expectedError: "Case number must be a string",
      },
      {
        name: "missing ownerId",
        input: {
          caseNumber: "INSERT-FAIL",
        },
        expectedError: "Owner ID must be a string",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        crmCaseInsertSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for crmCaseInsertSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        caseNumber: "INSERT-SAFE",
        ownerId: "user-safe",
      };
      const result = crmCaseInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        caseNumber: "INSERT-SAFE-FAIL",
        ownerId: "user-safe-fail",
      };
      const result = crmCaseInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("CrmCaseUpdateSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "partial update: only caseNumber",
        input: {
          caseNumber: "UPDATE-001",
        },
      },
      {
        name: "partial update: only description",
        input: {
          description: "Updated description.",
        },
      },
      {
        name: "partial update: all allowed fields",
        input: {
          caseNumber: "UPDATE-002",
          contactId: "123e4567-e89b-12d3-a456-426614174008",
          description: "Another updated description.",
          ownerId: "user-update-full",
          priority: CrmCasePriority.Medium,
          status: CrmCaseStatus.Resolved,
          type: CrmCaseType.Problem,
        },
      },
      {
        name: "empty object (no changes)",
        input: {},
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmCaseUpdateSchema.parse(input)).not.toThrow();
      const result = crmCaseUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "should reject with id present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          caseNumber: "UPDATE-FAIL",
        },
        expectedError: "Unrecognized key: \"id\"",
      },
      {
        name: "should reject with createdAt present",
        input: {
          caseNumber: "UPDATE-FAIL",
          createdAt: new Date(),
        },
        expectedError: "Unrecognized key: \"createdAt\"",
      },
      {
        name: "should reject with updatedAt present",
        input: {
          caseNumber: "UPDATE-FAIL",
          updatedAt: new Date(),
        },
        expectedError: "Unrecognized key: \"updatedAt\"",
      },
      {
        name: "caseNumber wrong type",
        input: {
          caseNumber: 123,
        },
        expectedError: "Case number must be a string",
      },
      {
        name: "contactId invalid format",
        input: {
          contactId: "invalid-uuid",
        },
        expectedError: "Invalid UUID format for contact ID",
      },
      {
        name: "description wrong type",
        input: {
          description: 123,
        },
        expectedError: "Description must be a string",
      },
      {
        name: "ownerId wrong type",
        input: {
          ownerId: 123,
        },
        expectedError: "Owner ID must be a string",
      },
      {
        name: "priority invalid enum value",
        input: {
          priority: "invalid-priority",
        },
        expectedError: "Invalid case priority",
      },
      {
        name: "status invalid enum value",
        input: {
          status: "invalid-status",
        },
        expectedError: "Invalid case status",
      },
      {
        name: "type invalid enum value",
        input: {
          type: "invalid-type",
        },
        expectedError: "Invalid case type",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        crmCaseUpdateSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for crmCaseUpdateSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        caseNumber: "UPDATE-SAFE",
      };
      const result = crmCaseUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        caseNumber: "UPDATE-SAFE-FAIL",
      };
      const result = crmCaseUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
