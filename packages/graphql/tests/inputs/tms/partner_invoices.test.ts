import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreatePartnerInvoiceInputSchema,
  UpdatePartnerInvoiceInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreatePartnerInvoiceInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdatePartnerInvoiceInputSchema>>;

describe("Partner Invoice Inputs", () => {
  describe("CreatePartnerInvoiceInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid invoice - required fields only",
          input: {
            carrierId: "carrier-123",
            invoiceNumber: "INV-001",
            invoiceDate: "2025-11-01",
            items: [],
          },
          success: true,
        },
        {
          name: "with PENDING status",
          input: {
            carrierId: "carrier-456",
            invoiceNumber: "INV-002",
            invoiceDate: "2025-11-02",
            items: [],
            status: "PENDING",
          },
          success: true,
        },
        {
          name: "with PAID status",
          input: {
            carrierId: "carrier-789",
            invoiceNumber: "INV-003",
            invoiceDate: "2025-11-03",
            items: [],
            status: "PAID",
          },
          success: true,
        },
        {
          name: "with OVERDUE status",
          input: {
            carrierId: "carrier-111",
            invoiceNumber: "INV-004",
            invoiceDate: "2025-11-04",
            items: [],
            status: "OVERDUE",
          },
          success: true,
        },
        {
          name: "with DISPUTED status",
          input: {
            carrierId: "carrier-222",
            invoiceNumber: "INV-005",
            invoiceDate: "2025-11-05",
            items: [],
            status: "DISPUTED",
          },
          success: true,
        },
        {
          name: "with CANCELLED status",
          input: {
            carrierId: "carrier-333",
            invoiceNumber: "INV-006",
            invoiceDate: "2025-11-06",
            items: [],
            status: "CANCELLED",
          },
          success: true,
        },
        {
          name: "with one invoice item",
          input: {
            carrierId: "carrier-444",
            invoiceNumber: "INV-007",
            invoiceDate: "2025-11-07",
            items: [
              {
                shipmentLegId: "leg-123",
                amount: 250.5,
              },
            ],
          },
          success: true,
        },
        {
          name: "with multiple invoice items",
          input: {
            carrierId: "carrier-555",
            invoiceNumber: "INV-008",
            invoiceDate: "2025-11-08",
            items: [
              {
                shipmentLegId: "leg-456",
                amount: 150.0,
              },
              {
                shipmentLegId: "leg-789",
                amount: 200.0,
              },
              {
                shipmentLegId: "leg-111",
                amount: 100.5,
              },
            ],
          },
          success: true,
        },
        {
          name: "with UUID carrierId",
          input: {
            carrierId: "550e8400-e29b-41d4-a716-446655440000",
            invoiceNumber: "INV-009",
            invoiceDate: "2025-11-09",
            items: [],
          },
          success: true,
        },
        {
          name: "with ISO date format",
          input: {
            carrierId: "carrier-666",
            invoiceNumber: "INV-010",
            invoiceDate: "2025-11-10T12:00:00Z",
            items: [],
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreatePartnerInvoiceInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid invoice", () => {
        const validData = {
          carrierId: "carrier-test",
          invoiceNumber: "INV-TEST",
          invoiceDate: "2025-11-01",
          items: [],
        };
        const result = CreatePartnerInvoiceInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when carrierId is missing", () => {
        const invalidData = {
          invoiceNumber: "INV-001",
          invoiceDate: "2025-11-01",
          items: [],
        };
        const result = CreatePartnerInvoiceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when invoiceNumber is missing", () => {
        const invalidData = {
          carrierId: "carrier-123",
          invoiceDate: "2025-11-01",
          items: [],
        };
        const result = CreatePartnerInvoiceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when invoiceDate is missing", () => {
        const invalidData = {
          carrierId: "carrier-123",
          invoiceNumber: "INV-001",
          items: [],
        };
        const result = CreatePartnerInvoiceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when items is missing", () => {
        const invalidData = {
          carrierId: "carrier-123",
          invoiceNumber: "INV-001",
          invoiceDate: "2025-11-01",
        };
        const result = CreatePartnerInvoiceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when status is invalid", () => {
        const invalidData = {
          carrierId: "carrier-123",
          invoiceNumber: "INV-001",
          invoiceDate: "2025-11-01",
          items: [],
          status: "PROCESSING",
        };
        const result = CreatePartnerInvoiceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdatePartnerInvoiceInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update status to PAID",
          input: {
            status: "PAID",
          },
          success: true,
        },
        {
          name: "update status to OVERDUE",
          input: {
            status: "OVERDUE",
          },
          success: true,
        },
        {
          name: "update status to DISPUTED",
          input: {
            status: "DISPUTED",
          },
          success: true,
        },
        {
          name: "update status to CANCELLED",
          input: {
            status: "CANCELLED",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdatePartnerInvoiceInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for empty update", () => {
        const result = UpdatePartnerInvoiceInputSchema().safeParse({});
        expect(result.success).toBe(true);
      });

      it("should return error when status is invalid", () => {
        const invalidData = {
          status: "PROCESSING",
        };
        const result = UpdatePartnerInvoiceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
