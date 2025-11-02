import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateExpenseInputSchema,
  UpdateExpenseInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateExpenseInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateExpenseInputSchema>>;

describe("Expense Inputs", () => {
  describe("CreateExpenseInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid expense - required fields only",
          input: {
            amount: 50.0,
          },
          success: true,
        },
        {
          name: "with optional type FUEL",
          input: {
            amount: 75.0,
            type: "FUEL",
          },
          success: true,
        },
        {
          name: "with optional type MAINTENANCE",
          input: {
            amount: 150.0,
            type: "MAINTENANCE",
          },
          success: true,
        },
        {
          name: "with optional type TOLLS",
          input: {
            amount: 25.0,
            type: "TOLLS",
          },
          success: true,
        },
        {
          name: "with optional status PENDING",
          input: {
            amount: 100.0,
            status: "PENDING",
          },
          success: true,
        },
        {
          name: "with optional currency USD",
          input: {
            amount: 100.0,
            currency: "USD",
          },
          success: true,
        },
        {
          name: "with optional currency EUR",
          input: {
            amount: 85.0,
            currency: "EUR",
          },
          success: true,
        },
        {
          name: "with optional driverId",
          input: {
            amount: 200.0,
            driverId: "driver-123",
          },
          success: true,
        },
        {
          name: "with optional tripId",
          input: {
            amount: 300.0,
            tripId: "trip-456",
          },
          success: true,
        },
        {
          name: "with all fields",
          input: {
            amount: 500.0,
            type: "FUEL",
            status: "APPROVED",
            currency: "USD",
            driverId: "driver-789",
            tripId: "trip-789",
            description: "Fuel expense for trip",
            fuelQuantity: 50.0,
            odometerReading: 150000,
            receiptUrl: "https://example.com/receipt.pdf",
            expenseDate: new Date("2025-11-01"),
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateExpenseInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid expense", () => {
        const validData = {
          amount: 100.0,
        };
        const result = CreateExpenseInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when amount is missing", () => {
        const invalidData = {
          type: "FUEL",
        };
        const result = CreateExpenseInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error for invalid type enum", () => {
        const invalidData = {
          amount: 100.0,
          type: "INVALID_TYPE",
        };
        const result = CreateExpenseInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error for invalid status enum", () => {
        const invalidData = {
          amount: 100.0,
          status: "INVALID_STATUS",
        };
        const result = CreateExpenseInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error for invalid currency enum", () => {
        const invalidData = {
          amount: 100.0,
          currency: "INVALID_CURRENCY",
        };
        const result = CreateExpenseInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdateExpenseInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update amount",
          input: {
            amount: 200.0,
          },
          success: true,
        },
        {
          name: "update status to APPROVED",
          input: {
            status: "APPROVED",
          },
          success: true,
        },
        {
          name: "update all fields",
          input: {
            amount: 350.0,
            type: "MAINTENANCE",
            status: "REIMBURSED",
            currency: "EUR",
            description: "Vehicle maintenance",
            fuelQuantity: 0,
            odometerReading: 160000,
            expenseDate: new Date("2025-11-10"),
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdateExpenseInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for empty update", () => {
        const result = UpdateExpenseInputSchema().safeParse({});
        expect(result.success).toBe(true);
      });

      it("should return error for invalid status", () => {
        const invalidData = {
          status: "INVALID",
        };
        const result = UpdateExpenseInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
