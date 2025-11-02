import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateCarrierRateInputSchema,
  UpdateCarrierRateInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateCarrierRateInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateCarrierRateInputSchema>>;

describe("Carrier Rate Inputs", () => {
  describe("CreateCarrierRateInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid rate - required fields only",
          input: {
            carrierId: "carrier-123",
            rate: 50.0,
          },
          success: true,
        },
        {
          name: "with optional unit FLAT_RATE",
          input: {
            carrierId: "carrier-456",
            rate: 100.0,
            unit: "FLAT_RATE",
          },
          success: true,
        },
        {
          name: "with optional unit PER_KG",
          input: {
            carrierId: "carrier-789",
            rate: 2.5,
            unit: "PER_KG",
          },
          success: true,
        },
        {
          name: "with optional unit PER_KM",
          input: {
            carrierId: "carrier-111",
            rate: 1.5,
            unit: "PER_KM",
          },
          success: true,
        },
        {
          name: "with optional unit PER_MILE",
          input: {
            carrierId: "carrier-222",
            rate: 2.0,
            unit: "PER_MILE",
          },
          success: true,
        },
        {
          name: "with optional unit PER_CONTAINER",
          input: {
            carrierId: "carrier-333",
            rate: 500.0,
            unit: "PER_CONTAINER",
          },
          success: true,
        },
        {
          name: "with optional origin",
          input: {
            carrierId: "carrier-444",
            rate: 75.0,
            origin: "New York",
          },
          success: true,
        },
        {
          name: "with optional destination",
          input: {
            carrierId: "carrier-555",
            rate: 75.0,
            destination: "Los Angeles",
          },
          success: true,
        },
        {
          name: "with origin and destination",
          input: {
            carrierId: "carrier-666",
            rate: 150.0,
            origin: "Chicago",
            destination: "Denver",
          },
          success: true,
        },
        {
          name: "with optional serviceType",
          input: {
            carrierId: "carrier-777",
            rate: 200.0,
            serviceType: "Express Overnight",
          },
          success: true,
        },
        {
          name: "with all fields populated",
          input: {
            carrierId: "carrier-complete",
            rate: 250.0,
            unit: "PER_KG",
            origin: "Houston",
            destination: "Miami",
            serviceType: "Two-Day Ground",
          },
          success: true,
        },
        {
          name: "with zero rate",
          input: {
            carrierId: "carrier-888",
            rate: 0,
          },
          success: true,
        },
        {
          name: "with very high rate",
          input: {
            carrierId: "carrier-999",
            rate: 99999.99,
          },
          success: true,
        },
        {
          name: "with decimal rate",
          input: {
            carrierId: "carrier-aaa",
            rate: 12.45,
          },
          success: true,
        },
        {
          name: "with UUID carrierId",
          input: {
            carrierId: "550e8400-e29b-41d4-a716-446655440000",
            rate: 50.0,
          },
          success: true,
        },
        {
          name: "with long service type description",
          input: {
            carrierId: "carrier-bbb",
            rate: 300.0,
            serviceType: "Expedited Overnight International Priority Shipping",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateCarrierRateInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid rate", () => {
        const validData = {
          carrierId: "carrier-test",
          rate: 100.0,
        };
        const result = CreateCarrierRateInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.carrierId).toBe("carrier-test");
          expect(result.data.rate).toBe(100.0);
        }
      });

      it("should return error when carrierId is missing", () => {
        const invalidData = {
          rate: 100.0,
        };
        const result = CreateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when rate is missing", () => {
        const invalidData = {
          carrierId: "carrier-123",
        };
        const result = CreateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when carrierId has wrong type", () => {
        const invalidData = {
          carrierId: 12345,
          rate: 100.0,
        };
        const result = CreateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when rate has wrong type", () => {
        const invalidData = {
          carrierId: "carrier-123",
          rate: "100.0",
        };
        const result = CreateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error for invalid unit enum", () => {
        const invalidData = {
          carrierId: "carrier-123",
          rate: 100.0,
          unit: "INVALID_UNIT",
        };
        const result = CreateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when serviceType has wrong type", () => {
        const invalidData = {
          carrierId: "carrier-123",
          rate: 100.0,
          serviceType: 12345,
        };
        const result = CreateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdateCarrierRateInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update rate only",
          input: {
            rate: 125.0,
          },
          success: true,
        },
        {
          name: "update unit only",
          input: {
            unit: "PER_KM",
          },
          success: true,
        },
        {
          name: "update origin only",
          input: {
            origin: "Seattle",
          },
          success: true,
        },
        {
          name: "update destination only",
          input: {
            destination: "Portland",
          },
          success: true,
        },
        {
          name: "update serviceType only",
          input: {
            serviceType: "Ground Shipping",
          },
          success: true,
        },
        {
          name: "update rate and unit",
          input: {
            rate: 200.0,
            unit: "PER_CONTAINER",
          },
          success: true,
        },
        {
          name: "update all fields",
          input: {
            rate: 350.0,
            unit: "PER_KG",
            origin: "Atlanta",
            destination: "Boston",
            serviceType: "Priority Express",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdateCarrierRateInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid update", () => {
        const validData = {
          rate: 150.0,
          unit: "PER_KM",
        };
        const result = UpdateCarrierRateInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.rate).toBe(150.0);
        }
      });

      it("should return success for empty update", () => {
        const validData = {};
        const result = UpdateCarrierRateInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when rate has wrong type", () => {
        const invalidData = {
          rate: "150.0",
        };
        const result = UpdateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error for invalid unit enum", () => {
        const invalidData = {
          unit: "INVALID",
        };
        const result = UpdateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when origin has wrong type", () => {
        const invalidData = {
          origin: 12345,
        };
        const result = UpdateCarrierRateInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
