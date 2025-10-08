import { describe, test, expect } from "bun:test";
import { ZodError } from "zod";
import {
  billingDisputeSchema,
  billingDisputeInsertSchema,
  billingDisputeUpdateSchema,
} from "./dispute";
import { BillingDisputeStatusEnum } from "@/db/types";

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

describe("BillingDisputeSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
        },
      },
      {
        name: "complete valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174003",
          clientId: "123e4567-e89b-12d3-a456-426614174004",
          createdAt: new Date("2023-01-01T10:00:00Z"),
          disputedAmount: 10000000,
          lineItemId: "123e4567-e89b-12d3-a456-426614174005",
          reason: "Service not rendered " + "a".repeat(234),
          resolutionNotes: "Resolved by issuing credit " + "b".repeat(995),
          resolvedAt: new Date("2023-01-01T12:00:00Z"),
          resolvedByUserId: "user-res-123-" + "c".repeat(239),
          status: BillingDisputeStatusEnum.Approved,
          submittedAt: new Date("2023-01-01T11:00:00Z"),
          updatedAt: new Date("2023-01-01T13:00:00Z"),
        },
      },
      {
        name: "disputedAmount at minimum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174006",
          clientId: "123e4567-e89b-12d3-a456-426614174007",
          lineItemId: "123e4567-e89b-12d3-a456-426614174008",
          reason: "Minimum disputed amount",
          disputedAmount: 0,
        },
      },
      {
        name: "disputedAmount at maximum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174009",
          clientId: "123e4567-e89b-12d3-a456-426614174010",
          lineItemId: "123e4567-e89b-12d3-a456-426614174011",
          reason: "Maximum disputed amount",
          disputedAmount: 10000000,
        },
      },
      {
        name: "reason with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174012",
          clientId: "123e4567-e89b-12d3-a456-426614174013",
          lineItemId: "123e4567-e89b-12d3-a456-426614174014",
          reason: "R".repeat(255),
        },
      },
      {
        name: "resolutionNotes with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174015",
          clientId: "123e4567-e89b-12d3-a456-426614174016",
          lineItemId: "123e4567-e89b-12d3-a456-426614174017",
          reason: "Resolution notes max length",
          resolutionNotes: "N".repeat(1024),
        },
      },
      {
        name: "resolvedByUserId with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174018",
          clientId: "123e4567-e89b-12d3-a456-426614174019",
          lineItemId: "123e4567-e89b-12d3-a456-426614174020",
          reason: "Resolved by user ID max length",
          resolvedByUserId: "U".repeat(255),
        },
      },
      {
        name: "all optional fields absent",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174021",
          clientId: "123e4567-e89b-12d3-a456-426614174022",
          lineItemId: "123e4567-e89b-12d3-a456-426614174023",
          reason: "Optional fields absent",
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingDisputeSchema.parse(input)).not.toThrow();
      const result = billingDisputeSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "missing id",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invalid id format",
        input: {
          id: "invalid-uuid",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "missing clientId",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invalid clientId format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "invalid-uuid",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "createdAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          createdAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "disputedAmount less than 0",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          disputedAmount: -0.01,
        },
        expectedError: "Disputed amount must be at least 0",
      },
      {
        name: "disputedAmount greater than 10,000,000",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          disputedAmount: 10000000.01,
        },
        expectedError: "Disputed amount must be at most 10,000,000",
      },
      {
        name: "missing lineItemId",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          reason: "Incorrect charge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invalid lineItemId format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "invalid-uuid",
          reason: "Incorrect charge",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "missing reason",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "reason too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "",
        },
        expectedError: "Reason is required",
      },
      {
        name: "reason too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "R".repeat(256),
        },
        expectedError: "Reason must be at most 255 characters",
      },
      {
        name: "resolutionNotes too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          resolutionNotes: "",
        },
        expectedError: "Resolution notes are required",
      },
      {
        name: "resolutionNotes too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          resolutionNotes: "N".repeat(1025),
        },
        expectedError: "Resolution notes must be at most 1024 characters",
      },
      {
        name: "resolvedAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          resolvedAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "resolvedByUserId too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          resolvedByUserId: "",
        },
        expectedError: "Resolved by user ID is required",
      },
      {
        name: "resolvedByUserId too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          resolvedByUserId: "U".repeat(256),
        },
        expectedError: "Resolved by user ID must be at most 255 characters",
      },
      {
        name: "status invalid enum value",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          status: "invalid-status",
        },
        expectedError: "Invalid option: expected one of \"approved\"|\"closed\"|\"denied\"|\"escalated\"|\"open\"|\"under-review\"",
      },
      {
        name: "submittedAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          submittedAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "updatedAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          updatedAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingDisputeSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingDisputeSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        clientId: "123e4567-e89b-12d3-a456-426614174001",
        lineItemId: "123e4567-e89b-12d3-a456-426614174002",
        reason: "Incorrect charge",
      };
      const result = billingDisputeSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "invalid-uuid",
        clientId: "123e4567-e89b-12d3-a456-426614174001",
        lineItemId: "123e4567-e89b-12d3-a456-426614174002",
        reason: "Incorrect charge",
      };
      const result = billingDisputeSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("BillingDisputeInsertSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data (no id, createdAt, updatedAt)",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          lineItemId: "123e4567-e89b-12d3-a456-426614174001",
          reason: "New Incorrect charge",
        },
      },
      {
        name: "complete valid data (no id, createdAt, updatedAt)",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174002",
          disputedAmount: 5000000,
          lineItemId: "123e4567-e89b-12d3-a456-426614174003",
          reason: "New Service not rendered " + "d".repeat(220),
          resolutionNotes: "New Resolved by issuing credit " + "e".repeat(990),
          resolvedAt: new Date("2023-01-02T12:00:00Z"),
          resolvedByUserId: "user-insert-res-123-" + "f".repeat(235),
          status: BillingDisputeStatusEnum.Closed,
          submittedAt: new Date("2023-01-02T11:00:00Z"),
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingDisputeInsertSchema.parse(input)).not.toThrow();
      const result = billingDisputeInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [

      {
        name: "missing clientId",
        input: {
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "missing lineItemId",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          reason: "Incorrect charge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "missing reason",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "disputedAmount less than 0",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          disputedAmount: -1,
        },
        expectedError: "Disputed amount must be at least 0",
      },
      {
        name: "reason too long",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "R".repeat(256),
        },
        expectedError: "Reason must be at most 255 characters",
      },
      {
        name: "resolutionNotes too long",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          resolutionNotes: "N".repeat(1025),
        },
        expectedError: "Resolution notes must be at most 1024 characters",
      },
      {
        name: "resolvedByUserId too long",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          resolvedByUserId: "U".repeat(256),
        },
        expectedError: "Resolved by user ID must be at most 255 characters",
      },
      {
        name: "status invalid enum value",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          lineItemId: "123e4567-e89b-12d3-a456-426614174002",
          reason: "Incorrect charge",
          status: "invalid-status",
        },
        expectedError: "Invalid option: expected one of \"approved\"|\"closed\"|\"denied\"|\"escalated\"|\"open\"|\"under-review\"",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingDisputeInsertSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingDisputeInsertSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        clientId: "123e4567-e89b-12d3-a456-426614174000",
        lineItemId: "123e4567-e89b-12d3-a456-426614174001",
        reason: "New Incorrect charge",
      };
      const result = billingDisputeInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        clientId: "123e4567-e89b-12d3-a456-426614174001",
        lineItemId: "123e4567-e89b-12d3-a456-426614174002",
        reason: "Incorrect charge",
        disputedAmount: -1,
      };
      const result = billingDisputeInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("BillingDisputeUpdateSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "partial update: only disputedAmount",
        input: {
          disputedAmount: 500.50,
        },
      },
      {
        name: "partial update: all allowed fields",
        input: {
          disputedAmount: 10000000,
          reason: "Updated reason " + "g".repeat(240),
          resolutionNotes: "Updated resolution notes " + "h".repeat(990),
          resolvedAt: new Date("2023-01-03T12:00:00Z"),
          resolvedByUserId: "user-update-res-123-" + "i".repeat(223),
          status: BillingDisputeStatusEnum.Denied,
          submittedAt: new Date("2023-01-03T11:00:00Z"),
        },
      },
      {
        name: "empty object (no changes)",
        input: {},
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingDisputeUpdateSchema.parse(input)).not.toThrow();
      const result = billingDisputeUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [

      {
        name: "disputedAmount less than 0",
        input: {
          disputedAmount: -1,
        },
        expectedError: "Disputed amount must be at least 0",
      },
      {
        name: "reason too long",
        input: {
          reason: "R".repeat(256),
        },
        expectedError: "Reason must be at most 255 characters",
      },
      {
        name: "resolutionNotes too long",
        input: {
          resolutionNotes: "N".repeat(1025),
        },
        expectedError: "Resolution notes must be at most 1024 characters",
      },
      {
        name: "resolvedByUserId too long",
        input: {
          resolvedByUserId: "U".repeat(256),
        },
        expectedError: "Resolved by user ID must be at most 255 characters",
      },
      {
        name: "status invalid enum value",
        input: {
          status: "invalid-status",
        },
        expectedError: "Invalid option: expected one of \"approved\"|\"closed\"|\"denied\"|\"escalated\"|\"open\"|\"under-review\"",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingDisputeUpdateSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingDisputeUpdateSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        disputedAmount: 100.50,
      };
      const result = billingDisputeUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        disputedAmount: -1,
      };
      const result = billingDisputeUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
