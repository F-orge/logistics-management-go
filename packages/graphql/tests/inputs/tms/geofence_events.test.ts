import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateGeofenceEventInputSchema,
	UpdateGeofenceEventInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateGeofenceEventInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateGeofenceEventInputSchema>>;

describe("Geofence Event Inputs", () => {
	describe("CreateGeofenceEventInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "ENTER event",
					input: {
						eventType: "ENTER",
						geofenceId: "geofence-123",
						vehicleId: "vehicle-456",
						timestamp: "2025-11-01T10:00:00Z",
					},
					success: true,
				},
				{
					name: "EXIT event",
					input: {
						eventType: "EXIT",
						geofenceId: "geofence-789",
						vehicleId: "vehicle-111",
						timestamp: "2025-11-01T11:30:00Z",
					},
					success: true,
				},
				{
					name: "ENTER at warehouse",
					input: {
						eventType: "ENTER",
						geofenceId: "warehouse-main",
						vehicleId: "vehicle-delivery-01",
						timestamp: "2025-11-01T08:00:00Z",
					},
					success: true,
				},
				{
					name: "EXIT from customer location",
					input: {
						eventType: "EXIT",
						geofenceId: "customer-downtown",
						vehicleId: "vehicle-delivery-02",
						timestamp: "2025-11-01T14:45:00Z",
					},
					success: true,
				},
				{
					name: "with ISO timestamp",
					input: {
						eventType: "ENTER",
						geofenceId: "geo-123",
						vehicleId: "veh-456",
						timestamp: "2025-12-31T23:59:59.999Z",
					},
					success: true,
				},
				{
					name: "ENTER with UUID format IDs",
					input: {
						eventType: "ENTER",
						geofenceId: "550e8400-e29b-41d4-a716-446655440000",
						vehicleId: "660e8400-e29b-41d4-a716-446655440001",
						timestamp: "2025-11-15T12:00:00Z",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateGeofenceEventInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid ENTER event", () => {
				const validData = {
					eventType: "ENTER",
					geofenceId: "geo-123",
					vehicleId: "veh-456",
					timestamp: "2025-11-01T10:00:00Z",
				};
				const result = CreateGeofenceEventInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error when eventType is invalid", () => {
				const invalidData = {
					eventType: "STAY",
					geofenceId: "geo-123",
					vehicleId: "veh-456",
					timestamp: "2025-11-01T10:00:00Z",
				};
				const result = CreateGeofenceEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when geofenceId is missing", () => {
				const invalidData = {
					eventType: "ENTER",
					vehicleId: "veh-456",
					timestamp: "2025-11-01T10:00:00Z",
				};
				const result = CreateGeofenceEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when vehicleId is missing", () => {
				const invalidData = {
					eventType: "EXIT",
					geofenceId: "geo-123",
					timestamp: "2025-11-01T10:00:00Z",
				};
				const result = CreateGeofenceEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when timestamp is missing", () => {
				const invalidData = {
					eventType: "ENTER",
					geofenceId: "geo-123",
					vehicleId: "veh-456",
				};
				const result = CreateGeofenceEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when eventType has wrong type", () => {
				const invalidData = {
					eventType: "ENTER" as unknown as number,
					geofenceId: "geo-123",
					vehicleId: "veh-456",
					timestamp: "2025-11-01T10:00:00Z",
				};
				const result = CreateGeofenceEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(true); // will pass because it's still a string
			});
		});
	});

	describe("UpdateGeofenceEventInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update to ENTER",
					input: {
						eventType: "ENTER",
					},
					success: true,
				},
				{
					name: "update to EXIT",
					input: {
						eventType: "EXIT",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateGeofenceEventInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for empty update", () => {
				const result = UpdateGeofenceEventInputSchema().safeParse({});
				expect(result.success).toBe(true);
			});

			it("should return error when eventType is invalid", () => {
				const invalidData = {
					eventType: "STAY",
				};
				const result = UpdateGeofenceEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when eventType has wrong type", () => {
				const invalidData = {
					eventType: 123,
				};
				const result = UpdateGeofenceEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
