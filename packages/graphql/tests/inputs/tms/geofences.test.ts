import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateGeofenceInputSchema,
  UpdateGeofenceInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateGeofenceInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateGeofenceInputSchema>>;

describe("Geofence Inputs", () => {
  describe("CreateGeofenceInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid geofence - name only",
          input: {
            name: "Main Warehouse",
          },
          success: true,
        },
        {
          name: "with latitude and longitude",
          input: {
            name: "Customer Location A",
            latitude: 40.7128,
            longitude: -74.006,
          },
          success: true,
        },
        {
          name: "with negative coordinates",
          input: {
            name: "Sydney Distribution Center",
            latitude: -33.8688,
            longitude: 151.2093,
          },
          success: true,
        },
        {
          name: "with maximum positive latitude",
          input: {
            name: "Arctic Hub",
            latitude: 89.9999,
            longitude: -180.0,
          },
          success: true,
        },
        {
          name: "with minimum negative latitude",
          input: {
            name: "Antarctic Depot",
            latitude: -89.9999,
            longitude: 180.0,
          },
          success: true,
        },
        {
          name: "with zero coordinates",
          input: {
            name: "Prime Meridian Checkpoint",
            latitude: 0.0,
            longitude: 0.0,
          },
          success: true,
        },
        {
          name: "with single character name",
          input: {
            name: "A",
            latitude: 35.0,
            longitude: -120.0,
          },
          success: true,
        },
        {
          name: "with long geofence name",
          input: {
            name: "International Airport Terminal 5 Loading Zone Area",
            latitude: 51.4775,
            longitude: -0.4613,
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateGeofenceInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid geofence", () => {
        const validData = {
          name: "Test Geofence",
          latitude: 40.0,
          longitude: -120.0,
        };
        const result = CreateGeofenceInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when name is missing", () => {
        const invalidData = {
          latitude: 40.0,
          longitude: -120.0,
        };
        const result = CreateGeofenceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when latitude has wrong type", () => {
        const invalidData = {
          name: "Test",
          latitude: "40.0",
          longitude: -120.0,
        };
        const result = CreateGeofenceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when longitude has wrong type", () => {
        const invalidData = {
          name: "Test",
          latitude: 40.0,
          longitude: "-120.0",
        };
        const result = CreateGeofenceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdateGeofenceInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update name only",
          input: {
            name: "Updated Warehouse Name",
          },
          success: true,
        },
        {
          name: "update latitude only",
          input: {
            latitude: 45.5,
          },
          success: true,
        },
        {
          name: "update longitude only",
          input: {
            longitude: -122.5,
          },
          success: true,
        },
        {
          name: "update all fields",
          input: {
            name: "New Hub Location",
            latitude: 37.7749,
            longitude: -122.4194,
          },
          success: true,
        },
        {
          name: "update name and latitude",
          input: {
            name: "Depot B",
            latitude: 48.8566,
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdateGeofenceInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for empty update", () => {
        const result = UpdateGeofenceInputSchema().safeParse({});
        expect(result.success).toBe(true);
      });

      it("should return error when name has wrong type", () => {
        const invalidData = {
          name: 123,
        };
        const result = UpdateGeofenceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when latitude has wrong type", () => {
        const invalidData = {
          latitude: "45.5",
        };
        const result = UpdateGeofenceInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
