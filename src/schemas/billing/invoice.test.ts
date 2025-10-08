import { describe, test, expect } from "bun:test";
import { ZodError } from "zod";
import {
  billingInvoiceSchema,
  billingInvoiceInsertSchema,
  billingInvoiceUpdateSchema,
} from "./invoice";
import { BillingInvoiceStatusEnum } from "@/db/types";

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

describe("BillingInvoiceSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
      },
      {
        name: "complete valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174002",
          amountOutstanding: 10000000,
          amountPaid: 10000000,
          clientId: "123e4567-e89b-12d3-a456-426614174003",
          createdAt: new Date("2023-01-01T10:00:00Z"),
          createdByUserId: "user-inv-123-" + "a".repeat(239),
          currency: "PHP",
          discountAmount: 1000000,
          dueDate: new Date("2023-01-31T00:00:00Z"),
          invoiceNumber: "INV-002-" + "b".repeat(56),
          issueDate: new Date("2023-01-01T00:00:00Z"),
          notes: "Invoice notes " + "c".repeat(1009),
          paidAt: new Date("2023-01-15T00:00:00Z"),
          paymentTerms: "Net 30 days " + "d".repeat(240),
          quoteId: "123e4567-e89b-12d3-a456-426614174004",
          sentAt: new Date("2023-01-02T00:00:00Z"),
          status: BillingInvoiceStatusEnum.Paid,
          subtotal: 9000000,
          taxAmount: 1000000,
          totalAmount: 10000000,
          updatedAt: new Date("2023-01-01T11:00:00Z"),
        },
      },
      {
        name: "amountOutstanding at minimum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174005",
          clientId: "123e4567-e89b-12d3-a456-426614174006",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-003",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          amountOutstanding: 0,
        },
      },
      {
        name: "amountOutstanding at maximum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174007",
          clientId: "123e4567-e89b-12d3-a456-426614174008",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-004",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          amountOutstanding: 10000000,
        },
      },
      {
        name: "amountPaid at minimum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174009",
          clientId: "123e4567-e89b-12d3-a456-426614174010",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-005",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          amountPaid: 0,
        },
      },
      {
        name: "amountPaid at maximum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174011",
          clientId: "123e4567-e89b-12d3-a456-426614174012",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-006",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          amountPaid: 10000000,
        },
      },
      {
        name: "createdByUserId with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174013",
          clientId: "123e4567-e89b-12d3-a456-426614174014",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-007",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          createdByUserId: "U".repeat(255),
        },
      },
      {
        name: "currency with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174015",
          clientId: "123e4567-e89b-12d3-a456-426614174016",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-008",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          currency: "C".repeat(8),
        },
      },
      {
        name: "discountAmount at minimum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174017",
          clientId: "123e4567-e89b-12d3-a456-426614174018",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-009",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          discountAmount: 0,
        },
      },
      {
        name: "discountAmount at maximum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174019",
          clientId: "123e4567-e89b-12d3-a456-426614174020",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-010",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          discountAmount: 1000000,
        },
      },
      {
        name: "invoiceNumber with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174021",
          clientId: "123e4567-e89b-12d3-a456-426614174022",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "N".repeat(64),
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
      },
      {
        name: "notes with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174023",
          clientId: "123e4567-e89b-12d3-a456-426614174024",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-011",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          notes: "N".repeat(1024),
        },
      },
      {
        name: "paymentTerms with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174025",
          clientId: "123e4567-e89b-12d3-a456-426614174026",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-012",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          paymentTerms: "P".repeat(255),
        },
      },
      {
        name: "subtotal at minimum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174027",
          clientId: "123e4567-e89b-12d3-a456-426614174028",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-013",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          subtotal: 0,
        },
      },
      {
        name: "subtotal at maximum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174029",
          clientId: "123e4567-e89b-12d3-a456-426614174030",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-014",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          subtotal: 10000000,
        },
      },
      {
        name: "taxAmount at minimum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174031",
          clientId: "123e4567-e89b-12d3-a456-426614174032",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-015",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          taxAmount: 0,
        },
      },
      {
        name: "taxAmount at maximum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174033",
          clientId: "123e4567-e89b-12d3-a456-426614174034",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-016",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          taxAmount: 1000000,
        },
      },
      {
        name: "totalAmount at minimum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174035",
          clientId: "123e4567-e89b-12d3-a456-426614174036",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-017",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 0,
        },
      },
      {
        name: "totalAmount at maximum boundary",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174037",
          clientId: "123e4567-e89b-12d3-a456-426614174038",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-018",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 10000000,
        },
      },
      {
        name: "all optional fields absent",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174039",
          clientId: "123e4567-e89b-12d3-a456-426614174040",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-019",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 1.00,
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingInvoiceSchema.parse(input)).not.toThrow();
      const result = billingInvoiceSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "missing id",
        input: {
          amountOutstanding: 100,
          amountPaid: 0,
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invalid id format",
        input: {
          id: "invalid-uuid",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "amountOutstanding less than 0",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          amountOutstanding: -0.01,
        },
        expectedError: "Amount outstanding must be at least 0",
      },
      {
        name: "amountOutstanding greater than 10,000,000",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          amountOutstanding: 10000000.01,
        },
        expectedError: "Amount outstanding must be at most 10,000,000",
      },
      {
        name: "amountPaid less than 0",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          amountPaid: -0.01,
        },
        expectedError: "Amount paid must be at least 0",
      },
      {
        name: "amountPaid greater than 10,000,000",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          amountPaid: 10000000.01,
        },
        expectedError: "Amount paid must be at most 10,000,000",
      },
      {
        name: "missing clientId",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invalid clientId format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "invalid-uuid",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "createdAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          createdAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "createdByUserId too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          createdByUserId: "",
        },
        expectedError: "Created by user ID is required",
      },
      {
        name: "createdByUserId too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          createdByUserId: "U".repeat(256),
        },
        expectedError: "Created by user ID must be at most 255 characters",
      },
      {
        name: "currency too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          currency: "",
        },
        expectedError: "Currency is required",
      },
      {
        name: "currency too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          currency: "C".repeat(9),
        },
        expectedError: "Currency must be at most 8 characters",
      },
      {
        name: "discountAmount less than 0",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          discountAmount: -0.01,
        },
        expectedError: "Discount amount must be at least 0",
      },
      {
        name: "discountAmount greater than 1,000,000",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          discountAmount: 1000000.01,
        },
        expectedError: "Discount amount must be at most 1,000,000",
      },
      {
        name: "missing dueDate",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invalid input: expected date, received undefined",
      },
      {
        name: "dueDate invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: "not-a-date",
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "missing invoiceNumber",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invoiceNumber too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invoice number is required",
      },
      {
        name: "invoiceNumber too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "N".repeat(65),
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
        },
        expectedError: "Invoice number must be at most 64 characters",
      },
      {
        name: "missing issueDate",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          totalAmount: 100.00,
        },
        expectedError: "Invalid input: expected date, received undefined",
      },
      {
        name: "issueDate invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: "not-a-date",
          totalAmount: 100.00,
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "notes too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          notes: "",
        },
        expectedError: "Notes are required",
      },
      {
        name: "notes too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          notes: "N".repeat(1025),
        },
        expectedError: "Notes must be at most 1024 characters",
      },
      {
        name: "paidAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          paidAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "paymentTerms too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          paymentTerms: "",
        },
        expectedError: "Payment terms are required",
      },
      {
        name: "paymentTerms too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          paymentTerms: "P".repeat(256),
        },
        expectedError: "Payment terms must be at most 255 characters",
      },
      {
        name: "quoteId invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          quoteId: "invalid-uuid",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "sentAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          sentAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "status invalid enum value",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          status: "invalid-status",
        },
        expectedError: "Invalid option: expected one of \"cancelled\"|\"disputed\"|\"draft\"|\"paid\"|\"partial-paid\"|\"past-due\"|\"sent\"|\"viewed\"|\"void\"",
      },
      {
        name: "subtotal less than 0",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          subtotal: -0.01,
        },
        expectedError: "Subtotal must be at least 0",
      },
      {
        name: "subtotal greater than 10,000,000",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          subtotal: 10000000.01,
        },
        expectedError: "Subtotal must be at most 10,000,000",
      },
      {
        name: "taxAmount less than 0",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          taxAmount: -0.01,
        },
        expectedError: "Tax amount must be at least 0",
      },
      {
        name: "taxAmount greater than 1,000,000",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          taxAmount: 1000000.01,
        },
        expectedError: "Tax amount must be at most 1,000,000",
      },
      {
        name: "missing totalAmount",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
        },
        expectedError: "Invalid input: expected number, received NaN",
      },
      {
        name: "totalAmount less than 0",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: -0.01,
        },
        expectedError: "Total amount must be at least 0",
      },
      {
        name: "totalAmount greater than 10,000,000",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 10000000.01,
        },
        expectedError: "Total amount must be at most 10,000,000",
      },
      {
        name: "updatedAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 100.00,
          updatedAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingInvoiceSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingInvoiceSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        clientId: "123e4567-e89b-12d3-a456-426614174001",
        dueDate: new Date("2023-01-01T00:00:00Z"),
        invoiceNumber: "INV-001",
        issueDate: new Date("2022-12-01T00:00:00Z"),
        totalAmount: 100.00,
      };
      const result = billingInvoiceSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "invalid-uuid",
        clientId: "123e4567-e89b-12d3-a456-426614174001",
        dueDate: new Date("2023-01-01T00:00:00Z"),
        invoiceNumber: "INV-001",
        issueDate: new Date("2022-12-01T00:00:00Z"),
        totalAmount: 100.00,
      };
      const result = billingInvoiceSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("BillingInvoiceInsertSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data (no id, createdAt, updatedAt)",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
        },
      },
      {
        name: "complete valid data (no id, createdAt, updatedAt)",
        input: {
          amountOutstanding: 5000000,
          amountPaid: 5000000,
          clientId: "123e4567-e89b-12d3-a456-426614174001",
          createdByUserId: "user-insert-inv-123-" + "e".repeat(230),
          currency: "CAD",
          discountAmount: 500000,
          dueDate: new Date("2023-01-31T00:00:00Z"),
          invoiceNumber: "INV-INS-002-" + "f".repeat(50),
          issueDate: new Date("2023-01-01T00:00:00Z"),
          notes: "Insert invoice notes " + "g".repeat(1000),
          paidAt: new Date("2023-01-15T00:00:00Z"),
          paymentTerms: "Net 60 days " + "h".repeat(240),
          quoteId: "123e4567-e89b-12d3-a456-426614174002",
          sentAt: new Date("2023-01-02T00:00:00Z"),
          status: BillingInvoiceStatusEnum.Draft,
          subtotal: 4500000,
          taxAmount: 500000,
          totalAmount: 5000000,
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingInvoiceInsertSchema.parse(input)).not.toThrow();
      const result = billingInvoiceInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [

      {
        name: "missing clientId",
        input: {
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "missing dueDate",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
        },
        expectedError: "Invalid input: expected date, received undefined",
      },
      {
        name: "missing invoiceNumber",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "missing issueDate",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          totalAmount: 50.00,
        },
        expectedError: "Invalid input: expected date, received undefined",
      },
      {
        name: "missing totalAmount",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
        },
        expectedError: "Invalid input: expected number, received NaN",
      },
      {
        name: "amountOutstanding less than 0",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
          amountOutstanding: -1,
        },
        expectedError: "Amount outstanding must be at least 0",
      },
      {
        name: "createdByUserId too long",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
          createdByUserId: "U".repeat(256),
        },
        expectedError: "Created by user ID must be at most 255 characters",
      },
      {
        name: "currency too long",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
          currency: "C".repeat(9),
        },
        expectedError: "Currency must be at most 8 characters",
      },
      {
        name: "notes too long",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
          notes: "N".repeat(1025),
        },
        expectedError: "Notes must be at most 1024 characters",
      },
      {
        name: "paymentTerms too long",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
          paymentTerms: "P".repeat(256),
        },
        expectedError: "Payment terms must be at most 255 characters",
      },
      {
        name: "status invalid enum value",
        input: {
          clientId: "123e4567-e89b-12d3-a456-426614174000",
          dueDate: new Date("2023-01-01T00:00:00Z"),
          invoiceNumber: "INV-INS-001",
          issueDate: new Date("2022-12-01T00:00:00Z"),
          totalAmount: 50.00,
          status: "invalid-status",
        },
        expectedError: "Invalid option: expected one of \"cancelled\"|\"disputed\"|\"draft\"|\"paid\"|\"partial-paid\"|\"past-due\"|\"sent\"|\"viewed\"|\"void\"",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingInvoiceInsertSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingInvoiceInsertSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        clientId: "123e4567-e89b-12d3-a456-426614174000",
        dueDate: new Date("2023-01-01T00:00:00Z"),
        invoiceNumber: "INV-INS-001",
        issueDate: new Date("2022-12-01T00:00:00Z"),
        totalAmount: 50.00,
      };
      const result = billingInvoiceInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        clientId: "123e4567-e89b-12d3-a456-426614174000",
        dueDate: new Date("2023-01-01T00:00:00Z"),
        invoiceNumber: "INV-INS-001",
        issueDate: new Date("2022-12-01T00:00:00Z"),
        totalAmount: -1, // Invalid totalAmount
      };
      const result = billingInvoiceInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("BillingInvoiceUpdateSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "partial update: only amountOutstanding",
        input: {
          amountOutstanding: 200.75,
        },
      },
      {
        name: "partial update: all allowed fields",
        input: {
          amountOutstanding: 5000000,
          amountPaid: 5000000,
          createdByUserId: "user-update-inv-123-" + "i".repeat(220),
          currency: "JPY",
          discountAmount: 750000,
          dueDate: new Date("2023-01-02T00:00:00Z"),
          invoiceNumber: "INV-UPD-001-" + "j".repeat(50),
          issueDate: new Date("2022-12-02T00:00:00Z"),
          notes: "Update invoice notes " + "k".repeat(1000),
          paidAt: new Date("2023-01-16T00:00:00Z"),
          paymentTerms: "Net 90 days " + "l".repeat(240),
          quoteId: "123e4567-e89b-12d3-a456-426614174005",
          sentAt: new Date("2023-01-03T00:00:00Z"),
          status: BillingInvoiceStatusEnum.Sent,
          subtotal: 6000000,
          taxAmount: 750000,
          totalAmount: 6750000,
        },
      },
      {
        name: "empty object (no changes)",
        input: {},
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingInvoiceUpdateSchema.parse(input)).not.toThrow();
      const result = billingInvoiceUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [

      {
        name: "amountOutstanding less than 0",
        input: {
          amountOutstanding: -1,
        },
        expectedError: "Amount outstanding must be at least 0",
      },
      {
        name: "amountPaid greater than 10,000,000",
        input: {
          amountPaid: 10000000.01,
        },
        expectedError: "Amount paid must be at most 10,000,000",
      },
      {
        name: "createdByUserId too long",
        input: {
          createdByUserId: "U".repeat(256),
        },
        expectedError: "Created by user ID must be at most 255 characters",
      },
      {
        name: "currency too long",
        input: {
          currency: "C".repeat(9),
        },
        expectedError: "Currency must be at most 8 characters",
      },
      {
        name: "discountAmount greater than 1,000,000",
        input: {
          discountAmount: 1000000.01,
        },
        expectedError: "Discount amount must be at most 1,000,000",
      },
      {
        name: "invoiceNumber too long",
        input: {
          invoiceNumber: "N".repeat(65),
        },
        expectedError: "Invoice number must be at most 64 characters",
      },
      {
        name: "notes too long",
        input: {
          notes: "N".repeat(1025),
        },
        expectedError: "Notes must be at most 1024 characters",
      },
      {
        name: "paymentTerms too long",
        input: {
          paymentTerms: "P".repeat(256),
        },
        expectedError: "Payment terms must be at most 255 characters",
      },
      {
        name: "quoteId invalid format",
        input: {
          quoteId: "invalid-uuid",
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "status invalid enum value",
        input: {
          status: "invalid-status",
        },
        expectedError: "Invalid option: expected one of \"cancelled\"|\"disputed\"|\"draft\"|\"paid\"|\"partial-paid\"|\"past-due\"|\"sent\"|\"viewed\"|\"void\"",
      },
      {
        name: "subtotal greater than 10,000,000",
        input: {
          subtotal: 10000000.01,
        },
        expectedError: "Subtotal must be at most 10,000,000",
      },
      {
        name: "taxAmount greater than 1,000,000",
        input: {
          taxAmount: 1000000.01,
        },
        expectedError: "Tax amount must be at most 1,000,000",
      },
      {
        name: "totalAmount greater than 10,000,000",
        input: {
          totalAmount: 10000000.01,
        },
        expectedError: "Total amount must be at most 10,000,000",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingInvoiceUpdateSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingInvoiceUpdateSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        amountOutstanding: 100.50,
      };
      const result = billingInvoiceUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        amountOutstanding: 100,
        totalAmount: -1, // Invalid totalAmount
      };
      const result = billingInvoiceUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
