import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateTripStopInputSchema,
  UpdateTripStopInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateTripStopInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateTripStopInputSchema>>;

describe("Trip Stop Inputs", () => {
  describe("CreateTripStopInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid stop - tripId and sequence",
          input: {
            tripId: "trip-123",
            sequence: 1,
          },
          success: true,
        },
        {
          name: "with PENDING status",
          input: {
            tripId: "trip-456",
            sequence: 2,
            status: "PENDING",
          },
          success: true,
        },
        {
          name: "with ARRIVED status",
          input: {
            tripId: "trip-789",
            sequence: 3,
            status: "ARRIVED",
          },
          success: true,
        },
        {
          name: "with COMPLETED status",
          input: {
            tripId: "trip-111",
            sequence: 4,
            status: "COMPLETED",
          },
          success: true,
        },
        {
          name: "with SKIPPED status",
          input: {
            tripId: "trip-222",
            sequence: 5,
            status: "SKIPPED",
          },
          success: true,
        },
        {
          name: "with address",
          input: {
            tripId: "trip-333",
            sequence: 6,
            address: "123 Main Street, Downtown",
          },
          success: true,
        },
        {
          name: "with shipment ID",
          input: {
            tripId: "trip-444",
            sequence: 7,
            shipmentId: "shipment-999",
          },
          success: true,
        },
        {
          name: "with estimated times",
          input: {
            tripId: "trip-555",
            sequence: 8,
            estimatedArrivalTime: "2025-11-01T10:00:00Z",
            estimatedDepartureTime: "2025-11-01T10:30:00Z",
          },
          success: true,
        },
        {
          name: "with all fields",
          input: {
            tripId: "trip-666",
            sequence: 9,
            status: "COMPLETED",
            address: "456 Park Avenue, Uptown",
            shipmentId: "shipment-111",
            estimatedArrivalTime: "2025-11-01T14:00:00Z",
            estimatedDepartureTime: "2025-11-01T14:45:00Z",
          },
          success: true,
        },
        {
          name: "with large sequence number",
          input: {
            tripId: "trip-777",
            sequence: 100,
          },
          success: true,
        },
        {
          name: "with zero sequence",
          input: {
            tripId: "trip-888",
            sequence: 0,
          },
          success: true,
        },
        {
          name: "with UUID tripId",
          input: {
            tripId: "550e8400-e29b-41d4-a716-446655440000",
            sequence: 1,
            status: "PENDING",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateTripStopInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid trip stop", () => {
        const validData = {
          tripId: "trip-test",
          sequence: 1,
        };
        const result = CreateTripStopInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when tripId is missing", () => {
        const invalidData = {
          sequence: 1,
        };
        const result = CreateTripStopInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when sequence is missing", () => {
        const invalidData = {
          tripId: "trip-123",
        };
        const result = CreateTripStopInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when sequence has wrong type", () => {
        const invalidData = {
          tripId: "trip-123",
          sequence: "1",
        };
        const result = CreateTripStopInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when status is invalid", () => {
        const invalidData = {
          tripId: "trip-123",
          sequence: 1,
          status: "PROCESSING",
        };
        const result = CreateTripStopInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdateTripStopInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update status to ARRIVED",
          input: {
            status: "ARRIVED",
          },
          success: true,
        },
        {
          name: "update status to COMPLETED",
          input: {
            status: "COMPLETED",
          },
          success: true,
        },
        {
          name: "update address",
          input: {
            address: "789 Oak Lane, Suburb",
          },
          success: true,
        },
        {
          name: "update sequence",
          input: {
            sequence: 5,
          },
          success: true,
        },
        {
          name: "update all fields",
          input: {
            tripId: "new-trip",
            sequence: 10,
            status: "COMPLETED",
            address: "Updated Address",
            shipmentId: "new-shipment",
            estimatedArrivalTime: "2025-11-05T11:00:00Z",
            estimatedDepartureTime: "2025-11-05T11:30:00Z",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdateTripStopInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for empty update", () => {
        const result = UpdateTripStopInputSchema().safeParse({});
        expect(result.success).toBe(true);
      });

      it("should return error when status is invalid", () => {
        const invalidData = {
          status: "PROCESSING",
        };
        const result = UpdateTripStopInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when sequence has wrong type", () => {
        const invalidData = {
          sequence: "5",
        };
        const result = UpdateTripStopInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when address has wrong type", () => {
        const invalidData = {
          address: 123,
        };
        const result = UpdateTripStopInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
