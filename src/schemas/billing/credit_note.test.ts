import { describe, test, expect } from "bun:test";
import { ZodError } from "zod";
import {
  billingCreditNoteSchema,
  billingCreditNoteInsertSchema,
  billingCreditNoteUpdateSchema,
} from "./credit_note";

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

describe("BillingCreditNoteSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100.50,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
      },
      {
        name: "complete valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174002",
          amount: 10000000,
          appliedAt: new Date("2023-01-01T10:00:00Z"),
          createdAt: new Date("2023-01-01T09:00:00Z"),
          createdByUserId: "user-123-" + "a".repeat(246),
          creditNoteNumber: "CN-002-" + "b".repeat(57),
          currency: "USD",
          disputeId: "123e4567-e89b-12d3-a456-426614174003",
          invoiceId: "123e4567-e89b-12d3-a456-426614174004",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          notes: "Customer goodwill gesture " + "c".repeat(998),
          reason: "Product return " + "d".repeat(239),
          updatedAt: new Date("2023-01-01T11:00:00Z"),
        },
      },
      {
        name: "amount at minimum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174005",
          amount: 0,
          creditNoteNumber: "CN-003",
          invoiceId: "123e4567-e89b-12d3-a456-426614174006",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Minimum amount",
        },
      },
      {
        name: "amount at maximum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174007",
          amount: 10000000,
          creditNoteNumber: "CN-004",
          invoiceId: "123e4567-e89b-12d3-a456-426614174008",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Maximum amount",
        },
      },
      {
        name: "createdByUserId with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174009",
          amount: 100,
          creditNoteNumber: "CN-005",
          invoiceId: "123e4567-e89b-12d3-a456-426614174010",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "User ID max length",
          createdByUserId: "U".repeat(255),
        },
      },
      {
        name: "creditNoteNumber with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174011",
          amount: 100,
          creditNoteNumber: "N".repeat(64),
          invoiceId: "123e4567-e89b-12d3-a456-426614174012",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Credit note number max length",
        },
      },
      {
        name: "currency with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174013",
          amount: 100,
          creditNoteNumber: "CN-006",
          invoiceId: "123e4567-e89b-12d3-a456-426614174014",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Currency max length",
          currency: "C".repeat(8),
        },
      },
      {
        name: "notes with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174015",
          amount: 100,
          creditNoteNumber: "CN-007",
          invoiceId: "123e4567-e89b-12d3-a456-426614174016",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Notes max length",
          notes: "N".repeat(1024),
        },
      },
      {
        name: "reason with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174017",
          amount: 100,
          creditNoteNumber: "CN-008",
          invoiceId: "123e4567-e89b-12d3-a456-426614174018",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "R".repeat(255),
        },
      },
      {
        name: "all optional fields absent",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174019",
          amount: 1.00,
          creditNoteNumber: "CN-009",
          invoiceId: "123e4567-e89b-12d3-a456-426614174020",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Optional fields absent",
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingCreditNoteSchema.parse(input)).not.toThrow();
      const result = billingCreditNoteSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "missing id",
        input: {
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invalid id format",
        input: {
          id: "invalid-uuid",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "missing amount",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Invalid input: expected number, received NaN",
      },
      {
        name: "amount less than 0",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: -0.01,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Amount must be at least 0",
      },
      {
        name: "amount greater than 10,000,000",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 10000000.01,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Amount must be at most 10,000,000",
      },
      {
        name: "appliedAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          appliedAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "createdByUserId too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          createdByUserId: "",
        },
        expectedError: "Created by user ID is required",
      },
      {
        name: "createdByUserId too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          createdByUserId: "U".repeat(256),
        },
        expectedError: "Created by user ID must be at most 255 characters",
      },
      {
        name: "missing creditNoteNumber",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "creditNoteNumber too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Credit note number is required",
      },
      {
        name: "creditNoteNumber too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "N".repeat(65),
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Credit note number must be at most 64 characters",
      },
      {
        name: "currency too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          currency: "",
        },
        expectedError: "Currency is required",
      },
      {
        name: "currency too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          currency: "C".repeat(9),
        },
        expectedError: "Currency must be at most 8 characters",
      },
      {
        name: "disputeId invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          disputeId: "invalid-uuid",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "missing invoiceId",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invalid invoiceId format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "invalid-uuid",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "missing issueDate",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          reason: "Overcharge",
        },
        expectedError: "Invalid input: expected date, received undefined",
      },
      {
        name: "issueDate invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: "not-a-date",
          reason: "Overcharge",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "notes too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          notes: "",
        },
        expectedError: "Notes are required",
      },
      {
        name: "notes too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          notes: "N".repeat(1025),
        },
        expectedError: "Notes must be at most 1024 characters",
      },
      {
        name: "missing reason",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "reason too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "",
        },
        expectedError: "Reason is required",
      },
      {
        name: "reason too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "R".repeat(256),
        },
        expectedError: "Reason must be at most 255 characters",
      },
      {
        name: "updatedAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          amount: 100,
          creditNoteNumber: "CN-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "Overcharge",
          updatedAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingCreditNoteSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingCreditNoteSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        amount: 100.50,
        creditNoteNumber: "CN-001",
        invoiceId: "123e4567-e89b-12d3-a456-426614174001",
        issueDate: new Date("2023-01-01T00:00:00Z"),
        reason: "Overcharge",
      };
      const result = billingCreditNoteSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "invalid-uuid",
        amount: 100,
        creditNoteNumber: "CN-001",
        invoiceId: "123e4567-e89b-12d3-a456-426614174001",
        issueDate: new Date("2023-01-01T00:00:00Z"),
        reason: "Overcharge",
      };
      const result = billingCreditNoteSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("BillingCreditNoteInsertSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data (no id, createdAt, updatedAt)",
        input: {
          amount: 100.50,
          creditNoteNumber: "CN-INS-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174000",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "New Overcharge",
        },
      },
      {
        name: "complete valid data (no id, createdAt, updatedAt)",
        input: {
          amount: 10000000,
          appliedAt: new Date("2023-01-01T10:00:00Z"),
          createdByUserId: "user-insert-123-" + "e".repeat(239),
          creditNoteNumber: "CN-INS-002-" + "f".repeat(53),
          currency: "GBP",
          disputeId: "123e4567-e89b-12d3-a456-426614174001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174002",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          notes: "Insert notes " + "g".repeat(1011),
          reason: "Insert reason " + "h".repeat(240),
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingCreditNoteInsertSchema.parse(input)).not.toThrow();
      const result = billingCreditNoteInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [

      {
        name: "missing amount",
        input: {
          creditNoteNumber: "CN-INS-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174000",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "New Overcharge",
        },
        expectedError: "Invalid input: expected number, received NaN",
      },
      {
        name: "missing creditNoteNumber",
        input: {
          amount: 100,
          invoiceId: "123e4567-e89b-12d3-a456-426614174000",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "New Overcharge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "missing invoiceId",
        input: {
          amount: 100,
          creditNoteNumber: "CN-INS-001",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "New Overcharge",
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "missing issueDate",
        input: {
          amount: 100,
          creditNoteNumber: "CN-INS-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174000",
          reason: "New Overcharge",
        },
        expectedError: "Invalid input: expected date, received undefined",
      },
      {
        name: "missing reason",
        input: {
          amount: 100,
          creditNoteNumber: "CN-INS-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174000",
          issueDate: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "amount less than 0",
        input: {
          amount: -1,
          creditNoteNumber: "CN-INS-001",
          invoiceId: "123e4567-e89b-12d3-a456-426614174000",
          issueDate: new Date("2023-01-01T00:00:00Z"),
          reason: "New Overcharge",
        },
        expectedError: "Amount must be at least 0",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingCreditNoteInsertSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingCreditNoteInsertSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        amount: 100.50,
        creditNoteNumber: "CN-INS-001",
        invoiceId: "123e4567-e89b-12d3-a456-426614174000",
        issueDate: new Date("2023-01-01T00:00:00Z"),
        reason: "New Overcharge",
      };
      const result = billingCreditNoteInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        amount: -1,
        creditNoteNumber: "CN-INS-001",
        invoiceId: "123e4567-e89b-12d3-a456-426614174000",
        issueDate: new Date("2023-01-01T00:00:00Z"),
        reason: "New Overcharge",
      };
      const result = billingCreditNoteInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("BillingCreditNoteUpdateSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "partial update: only amount",
        input: {
          amount: 200.75,
        },
      },
      {
        name: "partial update: all allowed fields",
        input: {
          amount: 5000000,
          appliedAt: new Date("2023-01-02T10:00:00Z"),
          createdByUserId: "user-update-123-" + "i".repeat(239),
          creditNoteNumber: "CN-UPD-001-" + "j".repeat(53),
          currency: "JPY",
          disputeId: "123e4567-e89b-12d3-a456-426614174005",
          invoiceId: "123e4567-e89b-12d3-a456-426614174006",
          issueDate: new Date("2023-01-02T00:00:00Z"),
          notes: "Update notes " + "k".repeat(1010),
          reason: "Update reason " + "l".repeat(240),
        },
      },
      {
        name: "empty object (no changes)",
        input: {},
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingCreditNoteUpdateSchema.parse(input)).not.toThrow();
      const result = billingCreditNoteUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [

      {
        name: "amount less than 0",
        input: {
          amount: -1,
        },
        expectedError: "Amount must be at least 0",
      },
      {
        name: "creditNoteNumber too long",
        input: {
          creditNoteNumber: "N".repeat(65),
        },
        expectedError: "Credit note number must be at most 64 characters",
      },
      {
        name: "invoiceId invalid format",
        input: {
          invoiceId: "invalid-uuid",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "issueDate invalid format",
        input: {
          issueDate: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "reason too long",
        input: {
          reason: "R".repeat(256),
        },
        expectedError: "Reason must be at most 255 characters",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingCreditNoteUpdateSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingCreditNoteUpdateSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        amount: 100.50,
      };
      const result = billingCreditNoteUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        amount: -1,
      };
      const result = billingCreditNoteUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
