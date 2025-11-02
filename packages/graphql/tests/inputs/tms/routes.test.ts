import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateRouteInputSchema,
	UpdateRouteInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateRouteInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateRouteInputSchema>>;

describe("Route Inputs", () => {
	describe("CreateRouteInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid route - tripId only",
					input: {
						tripId: "trip-123",
					},
					success: true,
				},
				{
					name: "with total distance",
					input: {
						tripId: "trip-456",
						totalDistance: 100.5,
					},
					success: true,
				},
				{
					name: "with total duration",
					input: {
						tripId: "trip-789",
						totalDuration: 3600,
					},
					success: true,
				},
				{
					name: "with zero distance",
					input: {
						tripId: "trip-111",
						totalDistance: 0,
					},
					success: true,
				},
				{
					name: "with large distance value",
					input: {
						tripId: "trip-222",
						totalDistance: 5000.75,
					},
					success: true,
				},
				{
					name: "with optimized route data",
					input: {
						tripId: "trip-333",
						optimizedRouteData:
							'{"waypoints": [{"lat": 40.7128, "lng": -74.006}]}',
					},
					success: true,
				},
				{
					name: "with all fields",
					input: {
						tripId: "trip-444",
						totalDistance: 250.5,
						totalDuration: 7200,
						optimizedRouteData: '{"optimized": true, "segments": 5}',
					},
					success: true,
				},
				{
					name: "with UUID trip ID",
					input: {
						tripId: "550e8400-e29b-41d4-a716-446655440000",
						totalDistance: 150.0,
						totalDuration: 4500,
					},
					success: true,
				},
				{
					name: "with decimal duration",
					input: {
						tripId: "trip-555",
						totalDuration: 3600.5,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateRouteInputSchema().safeParse(testCase.input);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid route", () => {
				const validData = {
					tripId: "trip-test",
					totalDistance: 100.0,
					totalDuration: 3600,
				};
				const result = CreateRouteInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error when tripId is missing", () => {
				const invalidData = {
					totalDistance: 100.0,
					totalDuration: 3600,
				};
				const result = CreateRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when totalDistance has wrong type", () => {
				const invalidData = {
					tripId: "trip-123",
					totalDistance: "100.0",
				};
				const result = CreateRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when totalDuration has wrong type", () => {
				const invalidData = {
					tripId: "trip-123",
					totalDuration: "3600",
				};
				const result = CreateRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when optimizedRouteData has wrong type", () => {
				const invalidData = {
					tripId: "trip-123",
					optimizedRouteData: 123,
				};
				const result = CreateRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateRouteInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update totalDistance",
					input: {
						totalDistance: 200.0,
					},
					success: true,
				},
				{
					name: "update totalDuration",
					input: {
						totalDuration: 5400,
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
					name: "update all fields",
					input: {
						totalDistance: 300.5,
						totalDuration: 7200,
						optimizedRouteData: '{"segments": 6}',
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateRouteInputSchema().safeParse(testCase.input);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for empty update", () => {
				const result = UpdateRouteInputSchema().safeParse({});
				expect(result.success).toBe(true);
			});

			it("should return error when totalDistance has wrong type", () => {
				const invalidData = {
					totalDistance: "200.0",
				};
				const result = UpdateRouteInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
