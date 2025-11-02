import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateDriverLocationInputSchema,
	UpdateDriverLocationInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateDriverLocationInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateDriverLocationInputSchema>>;

describe("Driver Location Inputs", () => {
	describe("CreateDriverLocationInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid location - required fields only",
					input: {
						driverId: "driver-123",
						latitude: 40.7128,
						longitude: -74.006,
					},
					success: true,
				},
				{
					name: "with optional accuracy",
					input: {
						driverId: "driver-456",
						latitude: 34.0522,
						longitude: -118.2437,
						accuracy: 5.5,
					},
					success: true,
				},
				{
					name: "with optional altitude",
					input: {
						driverId: "driver-789",
						latitude: 41.8781,
						longitude: -87.6298,
						altitude: 182.0,
					},
					success: true,
				},
				{
					name: "with optional heading",
					input: {
						driverId: "driver-111",
						latitude: 29.7604,
						longitude: -95.3698,
						heading: 180.0,
					},
					success: true,
				},
				{
					name: "with optional speedKmh",
					input: {
						driverId: "driver-222",
						latitude: 33.749,
						longitude: -84.388,
						speedKmh: 60.5,
					},
					success: true,
				},
				{
					name: "with all optional fields",
					input: {
						driverId: "driver-complete",
						latitude: 39.7392,
						longitude: -104.9903,
						accuracy: 8.0,
						altitude: 1609.0,
						heading: 270.0,
						speedKmh: 75.0,
					},
					success: true,
				},
				{
					name: "with north pole latitude",
					input: {
						driverId: "driver-north",
						latitude: 90.0,
						longitude: 0.0,
					},
					success: true,
				},
				{
					name: "with south pole latitude",
					input: {
						driverId: "driver-south",
						latitude: -90.0,
						longitude: 0.0,
					},
					success: true,
				},
				{
					name: "with antimeridian longitude positive",
					input: {
						driverId: "driver-antimeridian-pos",
						latitude: 0.0,
						longitude: 180.0,
					},
					success: true,
				},
				{
					name: "with antimeridian longitude negative",
					input: {
						driverId: "driver-antimeridian-neg",
						latitude: 0.0,
						longitude: -180.0,
					},
					success: true,
				},
				{
					name: "with negative latitude",
					input: {
						driverId: "driver-southern-hemisphere",
						latitude: -33.8688,
						longitude: 151.2093,
					},
					success: true,
				},
				{
					name: "with negative longitude",
					input: {
						driverId: "driver-western-hemisphere",
						latitude: 35.6762,
						longitude: -139.6503,
					},
					success: true,
				},
				{
					name: "with zero accuracy",
					input: {
						driverId: "driver-aaa",
						latitude: 48.8566,
						longitude: 2.3522,
						accuracy: 0.0,
					},
					success: true,
				},
				{
					name: "with high accuracy value",
					input: {
						driverId: "driver-bbb",
						latitude: 51.5074,
						longitude: -0.1278,
						accuracy: 1000.0,
					},
					success: true,
				},
				{
					name: "with zero altitude",
					input: {
						driverId: "driver-ccc",
						latitude: 35.6895,
						longitude: 139.6917,
						altitude: 0.0,
					},
					success: true,
				},
				{
					name: "with negative altitude (below sea level)",
					input: {
						driverId: "driver-ddd",
						latitude: 31.5087,
						longitude: 35.4615,
						altitude: -400.0,
					},
					success: true,
				},
				{
					name: "with high altitude",
					input: {
						driverId: "driver-eee",
						latitude: 37.7749,
						longitude: -122.4194,
						altitude: 8848.0,
					},
					success: true,
				},
				{
					name: "with heading 0 degrees",
					input: {
						driverId: "driver-fff",
						latitude: 1.3521,
						longitude: 103.8198,
						heading: 0.0,
					},
					success: true,
				},
				{
					name: "with heading 360 degrees",
					input: {
						driverId: "driver-ggg",
						latitude: -33.9249,
						longitude: 18.4241,
						heading: 360.0,
					},
					success: true,
				},
				{
					name: "with speed zero",
					input: {
						driverId: "driver-hhh",
						latitude: 55.7558,
						longitude: 37.6173,
						speedKmh: 0.0,
					},
					success: true,
				},
				{
					name: "with high speed",
					input: {
						driverId: "driver-iii",
						latitude: 28.6139,
						longitude: 77.209,
						speedKmh: 200.0,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateDriverLocationInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid location", () => {
				const validData = {
					driverId: "driver-test",
					latitude: 40.7128,
					longitude: -74.006,
				};
				const result = CreateDriverLocationInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.latitude).toBe(40.7128);
					expect(result.data.longitude).toBe(-74.006);
				}
			});

			it("should return error when driverId is missing", () => {
				const invalidData = {
					latitude: 40.7128,
					longitude: -74.006,
				};
				const result = CreateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when latitude is missing", () => {
				const invalidData = {
					driverId: "driver-123",
					longitude: -74.006,
				};
				const result = CreateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when longitude is missing", () => {
				const invalidData = {
					driverId: "driver-123",
					latitude: 40.7128,
				};
				const result = CreateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when driverId has wrong type", () => {
				const invalidData = {
					driverId: 12345,
					latitude: 40.7128,
					longitude: -74.006,
				};
				const result = CreateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when latitude has wrong type", () => {
				const invalidData = {
					driverId: "driver-123",
					latitude: "40.7128",
					longitude: -74.006,
				};
				const result = CreateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when longitude has wrong type", () => {
				const invalidData = {
					driverId: "driver-123",
					latitude: 40.7128,
					longitude: "-74.006",
				};
				const result = CreateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when accuracy has wrong type", () => {
				const invalidData = {
					driverId: "driver-123",
					latitude: 40.7128,
					longitude: -74.006,
					accuracy: "5.5",
				};
				const result = CreateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateDriverLocationInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update latitude only",
					input: {
						latitude: 40.758,
					},
					success: true,
				},
				{
					name: "update longitude only",
					input: {
						longitude: -73.9855,
					},
					success: true,
				},
				{
					name: "update accuracy",
					input: {
						accuracy: 10.0,
					},
					success: true,
				},
				{
					name: "update altitude",
					input: {
						altitude: 500.0,
					},
					success: true,
				},
				{
					name: "update heading",
					input: {
						heading: 45.0,
					},
					success: true,
				},
				{
					name: "update speedKmh",
					input: {
						speedKmh: 80.0,
					},
					success: true,
				},
				{
					name: "update latitude and longitude",
					input: {
						latitude: 34.0522,
						longitude: -118.2437,
					},
					success: true,
				},
				{
					name: "update multiple fields",
					input: {
						latitude: 41.8781,
						longitude: -87.6298,
						accuracy: 7.0,
						speedKmh: 55.0,
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						latitude: 39.7392,
						longitude: -104.9903,
						accuracy: 6.0,
						altitude: 1600.0,
						heading: 90.0,
						speedKmh: 65.0,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateDriverLocationInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid update", () => {
				const validData = {
					latitude: 40.7128,
					longitude: -74.006,
				};
				const result = UpdateDriverLocationInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.latitude).toBe(40.7128);
				}
			});

			it("should return success for empty update", () => {
				const validData = {};
				const result = UpdateDriverLocationInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return success for partial update", () => {
				const validData = {
					latitude: 40.7128,
					speedKmh: 70.0,
				};
				const result = UpdateDriverLocationInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error when latitude has wrong type", () => {
				const invalidData = {
					latitude: "40.7128",
				};
				const result = UpdateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when longitude has wrong type", () => {
				const invalidData = {
					longitude: "-74.006",
				};
				const result = UpdateDriverLocationInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
