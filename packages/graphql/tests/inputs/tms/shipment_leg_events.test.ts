import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import { CreateShipmentLegEventInputSchema } from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<
  ReturnType<typeof CreateShipmentLegEventInputSchema>
>;

describe("Shipment Leg Event Inputs", () => {
  describe("CreateShipmentLegEventInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid event - shipmentLegId only",
          input: {
            shipmentLegId: "leg-123",
          },
          success: true,
        },
        {
          name: "with location",
          input: {
            shipmentLegId: "leg-456",
            location: "123 Main Street",
          },
          success: true,
        },
        {
          name: "with status message",
          input: {
            shipmentLegId: "leg-789",
            statusMessage: "Delivery completed successfully",
          },
          success: true,
        },
        {
          name: "with both location and status message",
          input: {
            shipmentLegId: "leg-111",
            location: "456 Park Avenue",
            statusMessage: "Package received at distribution center",
          },
          success: true,
        },
        {
          name: "with coordinates in location",
          input: {
            shipmentLegId: "leg-222",
            location: "40.7128,-74.0060",
          },
          success: true,
        },
        {
          name: "with UUID shipmentLegId",
          input: {
            shipmentLegId: "550e8400-e29b-41d4-a716-446655440000",
            location: "Warehouse B",
            statusMessage: "In transit",
          },
          success: true,
        },
        {
          name: "with detailed status message",
          input: {
            shipmentLegId: "leg-333",
            statusMessage:
              "Delayed due to weather conditions. Expected delivery tomorrow.",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateShipmentLegEventInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid event", () => {
        const validData = {
          shipmentLegId: "leg-test",
        };
        const result = CreateShipmentLegEventInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when shipmentLegId is missing", () => {
        const invalidData = {
          location: "123 Main Street",
        };
        const result =
          CreateShipmentLegEventInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when location has wrong type", () => {
        const invalidData = {
          shipmentLegId: "leg-123",
          location: 123,
        };
        const result =
          CreateShipmentLegEventInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when statusMessage has wrong type", () => {
        const invalidData = {
          shipmentLegId: "leg-123",
          statusMessage: 456,
        };
        const result =
          CreateShipmentLegEventInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
