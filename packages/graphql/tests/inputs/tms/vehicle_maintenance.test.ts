import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateVehicleMaintenanceInputSchema,
  UpdateVehicleMaintenanceInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateVehicleMaintenanceInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateVehicleMaintenanceInputSchema>>;

describe("Vehicle Maintenance Inputs", () => {
  describe("CreateVehicleMaintenanceInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid maintenance - required fields only",
          input: {
            serviceDate: new Date("2025-11-01"),
          },
          success: true,
        },
        {
          name: "with optional serviceType OIL_CHANGE",
          input: {
            serviceDate: new Date("2025-11-02"),
            serviceType: "OIL_CHANGE",
          },
          success: true,
        },
        {
          name: "with optional serviceType TIRE_REPLACEMENT",
          input: {
            serviceDate: new Date("2025-11-03"),
            serviceType: "TIRE_REPLACEMENT",
          },
          success: true,
        },
        {
          name: "with optional serviceType BRAKE_SERVICE",
          input: {
            serviceDate: new Date("2025-11-04"),
            serviceType: "BRAKE_SERVICE",
          },
          success: true,
        },
        {
          name: "with optional serviceType INSPECTION",
          input: {
            serviceDate: new Date("2025-11-05"),
            serviceType: "INSPECTION",
          },
          success: true,
        },
        {
          name: "with optional serviceType ROUTINE_MAINTENANCE",
          input: {
            serviceDate: new Date("2025-11-06"),
            serviceType: "ROUTINE_MAINTENANCE",
          },
          success: true,
        },
        {
          name: "with optional serviceType REPAIR",
          input: {
            serviceDate: new Date("2025-11-07"),
            serviceType: "REPAIR",
          },
          success: true,
        },
        {
          name: "with optional cost",
          input: {
            serviceDate: new Date("2025-11-08"),
            cost: 250.0,
          },
          success: true,
        },
        {
          name: "with optional notes",
          input: {
            serviceDate: new Date("2025-11-09"),
            notes: "Routine maintenance performed",
          },
          success: true,
        },
        {
          name: "with all optional fields",
          input: {
            serviceDate: new Date("2025-11-10"),
            serviceType: "OIL_CHANGE",
            cost: 150.0,
            notes: "Replaced oil filter and performed engine oil change",
          },
          success: true,
        },
        {
          name: "with past date",
          input: {
            serviceDate: new Date("2025-10-01"),
          },
          success: true,
        },
        {
          name: "with future date",
          input: {
            serviceDate: new Date("2025-12-31"),
          },
          success: true,
        },
        {
          name: "with zero cost",
          input: {
            serviceDate: new Date("2025-11-11"),
            cost: 0.0,
          },
          success: true,
        },
        {
          name: "with high cost",
          input: {
            serviceDate: new Date("2025-11-12"),
            cost: 5000.0,
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } =
          CreateVehicleMaintenanceInputSchema().safeParse(testCase.input);

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid maintenance", () => {
        const validData = {
          serviceDate: new Date("2025-11-15"),
        };
        const result =
          CreateVehicleMaintenanceInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when serviceDate is missing", () => {
        const invalidData = {
          serviceType: "OIL_CHANGE",
        };
        const result =
          CreateVehicleMaintenanceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error for invalid serviceType enum", () => {
        const invalidData = {
          serviceDate: new Date("2025-11-15"),
          serviceType: "INVALID_TYPE",
        };
        const result =
          CreateVehicleMaintenanceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when cost has wrong type", () => {
        const invalidData = {
          serviceDate: new Date("2025-11-15"),
          cost: "250.0",
        };
        const result =
          CreateVehicleMaintenanceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdateVehicleMaintenanceInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update serviceDate",
          input: {
            serviceDate: new Date("2025-12-01"),
          },
          success: true,
        },
        {
          name: "update serviceType",
          input: {
            serviceType: "TIRE_REPLACEMENT",
          },
          success: true,
        },
        {
          name: "update cost",
          input: {
            cost: 300.0,
          },
          success: true,
        },
        {
          name: "update notes",
          input: {
            notes: "Updated notes",
          },
          success: true,
        },
        {
          name: "update multiple fields",
          input: {
            serviceDate: new Date("2025-12-05"),
            serviceType: "INSPECTION",
            cost: 200.0,
          },
          success: true,
        },
        {
          name: "update all fields",
          input: {
            serviceDate: new Date("2025-12-10"),
            serviceType: "BRAKE_SERVICE",
            cost: 400.0,
            notes: "Full brake system inspection and replacement",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } =
          UpdateVehicleMaintenanceInputSchema().safeParse(testCase.input);

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for empty update", () => {
        const result = UpdateVehicleMaintenanceInputSchema().safeParse({});
        expect(result.success).toBe(true);
      });

      it("should return error for invalid serviceType", () => {
        const invalidData = {
          serviceType: "INVALID",
        };
        const result =
          UpdateVehicleMaintenanceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when cost has wrong type", () => {
        const invalidData = {
          cost: "300.0",
        };
        const result =
          UpdateVehicleMaintenanceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
