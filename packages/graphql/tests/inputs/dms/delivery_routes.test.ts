import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateDeliveryRouteInputSchema,
	UpdateDeliveryRouteInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateDeliveryRouteInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateDeliveryRouteInputSchema>>;

describe("Delivery Route Inputs", () => {
	describe("CreateDeliveryRouteInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid route - required fields only",
					input: {
						driverId: "driver-123",
						routeDate: "2025-11-01",
					},
					success: true,
				},
				{
					name: "with optional status PLANNED",
					input: {
						driverId: "driver-456",
						routeDate: "2025-11-02",
						status: "PLANNED",
					},
					success: true,
				},
				{
					name: "with optional status IN_PROGRESS",
					input: {
						driverId: "driver-789",
						routeDate: "2025-11-03",
						status: "IN_PROGRESS",
					},
					success: true,
				},
				{
					name: "with optional status COMPLETED",
					input: {
						driverId: "driver-111",
						routeDate: "2025-11-04",
						status: "COMPLETED",
					},
					success: true,
				},
				{
					name: "with optional status PAUSED",
					input: {
						driverId: "driver-222",
						routeDate: "2025-11-05",
						status: "PAUSED",
					},
					success: true,
				},
				{
					name: "with optional status CANCELLED",
					input: {
						driverId: "driver-333",
						routeDate: "2025-11-06",
						status: "CANCELLED",
					},
					success: true,
				},
				{
					name: "with optional estimatedDurationMinutes",
					input: {
						driverId: "driver-444",
						routeDate: "2025-11-07",
						estimatedDurationMinutes: 480,
					},
					success: true,
				},
				{
					name: "with short estimatedDurationMinutes",
					input: {
						driverId: "driver-555",
						routeDate: "2025-11-08",
						estimatedDurationMinutes: 15,
					},
					success: true,
				},
				{
					name: "with long estimatedDurationMinutes",
					input: {
						driverId: "driver-666",
						routeDate: "2025-11-09",
						estimatedDurationMinutes: 1440,
					},
					success: true,
				},
				{
					name: "with optional totalDistanceKm",
					input: {
						driverId: "driver-777",
						routeDate: "2025-11-10",
						totalDistanceKm: 150.5,
					},
					success: true,
				},
				{
					name: "with short distance",
					input: {
						driverId: "driver-888",
						routeDate: "2025-11-11",
						totalDistanceKm: 5.0,
					},
					success: true,
				},
				{
					name: "with long distance",
					input: {
						driverId: "driver-999",
						routeDate: "2025-11-12",
						totalDistanceKm: 500.75,
					},
					success: true,
				},
				{
					name: "with optional startedAt",
					input: {
						driverId: "driver-aaa",
						routeDate: "2025-11-13",
						startedAt: "2025-11-13T08:00:00Z",
					},
					success: true,
				},
				{
					name: "with optional optimizedRouteData",
					input: {
						driverId: "driver-bbb",
						routeDate: "2025-11-14",
						optimizedRouteData: '{"waypoints": ["point1", "point2", "point3"]}',
					},
					success: true,
				},
				{
					name: "with all fields populated",
					input: {
						driverId: "driver-complete",
						routeDate: "2025-11-15",
						status: "IN_PROGRESS",
						estimatedDurationMinutes: 360,
						totalDistanceKm: 200.0,
						startedAt: "2025-11-15T07:30:00Z",
						optimizedRouteData: '{"route": "optimized"}',
					},
					success: true,
				},
				{
					name: "with UUID driverId",
					input: {
						driverId: "550e8400-e29b-41d4-a716-446655440000",
						routeDate: "2025-11-16",
					},
					success: true,
				},
				{
					name: "with past routeDate",
					input: {
						driverId: "driver-ccc",
						routeDate: "2025-10-15",
					},
					success: true,
				},
				{
					name: "with future routeDate",
					input: {
						driverId: "driver-ddd",
						routeDate: "2025-12-31",
					},
					success: true,
				},
				{
					name: "with zero distance",
					input: {
						driverId: "driver-eee",
						routeDate: "2025-11-17",
						totalDistanceKm: 0,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateDeliveryRouteInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid route", () => {
				const validData = {
					driverId: "driver-test",
					routeDate: "2025-11-20",
				};
				const result = CreateDeliveryRouteInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.driverId).toBe("driver-test");
					expect(result.data.routeDate).toBe("2025-11-20");
				}
			});

			it("should return error when driverId is missing", () => {
				const invalidData = {
					routeDate: "2025-11-20",
				};
				const result = CreateDeliveryRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when routeDate is missing", () => {
				const invalidData = {
					driverId: "driver-123",
				};
				const result = CreateDeliveryRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error for invalid status enum", () => {
				const invalidData = {
					driverId: "driver-123",
					routeDate: "2025-11-20",
					status: "INVALID_STATUS",
				};
				const result = CreateDeliveryRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when estimatedDurationMinutes has wrong type", () => {
				const invalidData = {
					driverId: "driver-123",
					routeDate: "2025-11-20",
					estimatedDurationMinutes: "480",
				};
				const result = CreateDeliveryRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when totalDistanceKm has wrong type", () => {
				const invalidData = {
					driverId: "driver-123",
					routeDate: "2025-11-20",
					totalDistanceKm: "150.5",
				};
				const result = CreateDeliveryRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateDeliveryRouteInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
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
					name: "update status to CANCELLED",
					input: {
						status: "CANCELLED",
					},
					success: true,
				},
				{
					name: "update routeDate",
					input: {
						routeDate: "2025-11-25",
					},
					success: true,
				},
				{
					name: "update estimatedDurationMinutes",
					input: {
						estimatedDurationMinutes: 600,
					},
					success: true,
				},
				{
					name: "update totalDistanceKm",
					input: {
						totalDistanceKm: 250.0,
					},
					success: true,
				},
				{
					name: "update startedAt",
					input: {
						startedAt: "2025-11-25T08:00:00Z",
					},
					success: true,
				},
				{
					name: "update completedAt",
					input: {
						completedAt: "2025-11-25T18:00:00Z",
					},
					success: true,
				},
				{
					name: "update optimizedRouteData",
					input: {
						optimizedRouteData: '{"updated": true}',
					},
					success: true,
				},
				{
					name: "update multiple fields",
					input: {
						status: "IN_PROGRESS",
						estimatedDurationMinutes: 480,
						totalDistanceKm: 180.0,
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						routeDate: "2025-11-26",
						status: "COMPLETED",
						estimatedDurationMinutes: 420,
						totalDistanceKm: 175.5,
						startedAt: "2025-11-26T07:00:00Z",
						completedAt: "2025-11-26T17:00:00Z",
						optimizedRouteData: '{"final": true}',
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateDeliveryRouteInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid update", () => {
				const validData = {
					status: "COMPLETED",
					totalDistanceKm: 200.0,
				};
				const result = UpdateDeliveryRouteInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.status).toBe("COMPLETED");
					expect(result.data.totalDistanceKm).toBe(200.0);
				}
			});

			it("should return success for empty update", () => {
				const validData = {};
				const result = UpdateDeliveryRouteInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error for invalid status", () => {
				const invalidData = {
					status: "INVALID",
				};
				const result = UpdateDeliveryRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when estimatedDurationMinutes has wrong type", () => {
				const invalidData = {
					estimatedDurationMinutes: "480",
				};
				const result = UpdateDeliveryRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
