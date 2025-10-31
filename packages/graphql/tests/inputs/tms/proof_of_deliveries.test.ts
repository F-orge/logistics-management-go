import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateProofOfDeliveryInputSchema,
  UpdateProofOfDeliveryInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<
  ReturnType<typeof CreateProofOfDeliveryInputSchema>
>;
type UpdateSchema = z.infer<
  ReturnType<typeof UpdateProofOfDeliveryInputSchema>
>;

describe("Proof of Delivery Inputs", () => {
  describe("CreateProofOfDeliveryInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid proof - tripStopId and empty files array",
          input: {
            tripStopId: "stop-123",
            files: [],
          },
          success: true,
        },
        {
          name: "with PHOTO type",
          input: {
            tripStopId: "stop-456",
            files: [],
            type: "PHOTO",
          },
          success: true,
        },
        {
          name: "with SIGNATURE type",
          input: {
            tripStopId: "stop-789",
            files: [],
            type: "SIGNATURE",
          },
          success: true,
        },
        {
          name: "with BARCODE_SCAN type",
          input: {
            tripStopId: "stop-111",
            files: [],
            type: "BARCODE_SCAN",
          },
          success: true,
        },
        {
          name: "with PIN_VERIFICATION type",
          input: {
            tripStopId: "stop-222",
            files: [],
            type: "PIN_VERIFICATION",
          },
          success: true,
        },
        {
          name: "with latitude and longitude",
          input: {
            tripStopId: "stop-333",
            files: [],
            latitude: 40.7128,
            longitude: -74.006,
          },
          success: true,
        },
        {
          name: "with negative coordinates",
          input: {
            tripStopId: "stop-444",
            files: [],
            latitude: -33.8688,
            longitude: 151.2093,
          },
          success: true,
        },
        {
          name: "with all optional fields",
          input: {
            tripStopId: "stop-555",
            files: [],
            type: "PHOTO",
            latitude: 51.5074,
            longitude: -0.1278,
          },
          success: true,
        },
        {
          name: "with UUID tripStopId",
          input: {
            tripStopId: "550e8400-e29b-41d4-a716-446655440000",
            files: [],
          },
          success: true,
        },
        {
          name: "with zero coordinates",
          input: {
            tripStopId: "stop-666",
            files: [],
            latitude: 0.0,
            longitude: 0.0,
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateProofOfDeliveryInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid proof", () => {
        const validData = {
          tripStopId: "stop-test",
          files: [],
        };
        const result = CreateProofOfDeliveryInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when tripStopId is missing", () => {
        const invalidData = {
          files: [],
        };
        const result =
          CreateProofOfDeliveryInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when files is missing", () => {
        const invalidData = {
          tripStopId: "stop-123",
        };
        const result =
          CreateProofOfDeliveryInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when latitude has wrong type", () => {
        const invalidData = {
          tripStopId: "stop-123",
          files: [],
          latitude: "40.7128",
        };
        const result =
          CreateProofOfDeliveryInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when type is invalid", () => {
        const invalidData = {
          tripStopId: "stop-123",
          files: [],
          type: "VERBAL_CONFIRMATION",
        };
        const result =
          CreateProofOfDeliveryInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdateProofOfDeliveryInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update type to PHOTO",
          input: {
            type: "PHOTO",
          },
          success: true,
        },
        {
          name: "update type to SIGNATURE",
          input: {
            type: "SIGNATURE",
          },
          success: true,
        },
        {
          name: "update type to BARCODE_SCAN",
          input: {
            type: "BARCODE_SCAN",
          },
          success: true,
        },
        {
          name: "update type to PIN_VERIFICATION",
          input: {
            type: "PIN_VERIFICATION",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdateProofOfDeliveryInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for empty update", () => {
        const result = UpdateProofOfDeliveryInputSchema().safeParse({});
        expect(result.success).toBe(true);
      });

      it("should return error when type is invalid", () => {
        const invalidData = {
          type: "VERBAL_CONFIRMATION",
        };
        const result =
          UpdateProofOfDeliveryInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
