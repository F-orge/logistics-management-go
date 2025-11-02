import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreatePartnerInvoiceItemInputSchema,
  UpdatePartnerInvoiceItemInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreatePartnerInvoiceItemInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdatePartnerInvoiceItemInputSchema>>;

describe("Partner Invoice Item Inputs", () => {
  describe("CreatePartnerInvoiceItemInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid invoice item - shipmentLegId and amount",
          input: {
            shipmentLegId: "leg-123",
            amount: 250.5,
          },
          success: true,
        },
        {
          name: "with round amount",
          input: {
            shipmentLegId: "leg-456",
            amount: 500.0,
          },
          success: true,
        },
        {
          name: "with small decimal amount",
          input: {
            shipmentLegId: "leg-789",
            amount: 10.99,
          },
          success: true,
        },
        {
          name: "with zero amount",
          input: {
            shipmentLegId: "leg-111",
            amount: 0,
          },
          success: true,
        },
        {
          name: "with large amount",
          input: {
            shipmentLegId: "leg-222",
            amount: 9999.99,
          },
          success: true,
        },
        {
          name: "with UUID shipmentLegId",
          input: {
            shipmentLegId: "550e8400-e29b-41d4-a716-446655440000",
            amount: 350.75,
          },
          success: true,
        },
        {
          name: "with three decimal places",
          input: {
            shipmentLegId: "leg-333",
            amount: 123.456,
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreatePartnerInvoiceItemInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid invoice item", () => {
        const validData = {
          shipmentLegId: "leg-test",
          amount: 200.0,
        };
        const result = CreatePartnerInvoiceItemInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when shipmentLegId is missing", () => {
        const invalidData = {
          amount: 250.5,
        };
        const result = CreatePartnerInvoiceItemInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when amount is missing", () => {
        const invalidData = {
          shipmentLegId: "leg-123",
        };
        const result = CreatePartnerInvoiceItemInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when amount has wrong type", () => {
        const invalidData = {
          shipmentLegId: "leg-123",
          amount: "250.5",
        };
        const result = CreatePartnerInvoiceItemInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when shipmentLegId has wrong type", () => {
        const invalidData = {
          shipmentLegId: 123,
          amount: 250.5,
        };
        const result = CreatePartnerInvoiceItemInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdatePartnerInvoiceItemInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "update amount only (amount is required)",
          input: {
            amount: 350.0,
          },
          success: true,
        },
        {
          name: "update amount to zero",
          input: {
            amount: 0,
          },
          success: true,
        },
        {
          name: "update to large amount",
          input: {
            amount: 5000.99,
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdatePartnerInvoiceItemInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return error for empty update (amount is required)", () => {
        const result = UpdatePartnerInvoiceItemInputSchema().safeParse({});
        expect(result.success).toBe(false);
      });

      it("should return success when amount is provided", () => {
        const validData = {
          amount: 300.0,
        };
        const result = UpdatePartnerInvoiceItemInputSchema().safeParse(validData);
        expect(result.success).toBe(true);
      });

      it("should return error when amount has wrong type", () => {
        const invalidData = {
          amount: "300.0",
        };
        const result = UpdatePartnerInvoiceItemInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
