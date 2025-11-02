import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateGpsPingInputSchema,
	UpdateGpsPingInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateGpsPingInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateGpsPingInputSchema>>;

describe("GPS Ping Inputs", () => {
	describe("CreateGpsPingInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid ping - required fields only",
					input: {
						vehicleId: "vehicle-123",
						latitude: 40.7128,
						longitude: -74.006,
						timestamp: new Date("2025-11-01T10:00:00Z"),
					},
					success: true,
				},
				{
					name: "with south pole coordinates",
					input: {
						vehicleId: "vehicle-456",
						latitude: -90.0,
						longitude: 0.0,
						timestamp: new Date("2025-11-01T11:00:00Z"),
					},
					success: true,
				},
				{
					name: "with negative latitude",
					input: {
						vehicleId: "vehicle-789",
						latitude: -33.8688,
						longitude: 151.2093,
						timestamp: new Date("2025-11-01T12:00:00Z"),
					},
					success: true,
				},
				{
					name: "with antimeridian longitude",
					input: {
						vehicleId: "vehicle-111",
						latitude: 0.0,
						longitude: -180.0,
						timestamp: new Date("2025-11-01T13:00:00Z"),
					},
					success: true,
				},
				{
					name: "with future timestamp",
					input: {
						vehicleId: "vehicle-222",
						latitude: 34.0522,
						longitude: -118.2437,
						timestamp: new Date("2025-12-31T23:59:59Z"),
					},
					success: true,
				},
				{
					name: "with UUID vehicleId",
					input: {
						vehicleId: "550e8400-e29b-41d4-a716-446655440000",
						latitude: 39.7392,
						longitude: -104.9903,
						timestamp: new Date("2025-11-01T14:00:00Z"),
					},
					success: true,
				},
				{
					name: "with multiple sequential timestamps",
					input: {
						vehicleId: "vehicle-333",
						latitude: 51.5074,
						longitude: -0.1278,
						timestamp: new Date("2025-11-02T08:30:00Z"),
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateGpsPingInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid ping", () => {
				const validData = {
					vehicleId: "vehicle-test",
					latitude: 40.7128,
					longitude: -74.006,
					timestamp: new Date(),
				};
				const result = CreateGpsPingInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error when vehicleId is missing", () => {
				const invalidData = {
					latitude: 40.7128,
					longitude: -74.006,
					timestamp: new Date(),
				};
				const result = CreateGpsPingInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when latitude is missing", () => {
				const invalidData = {
					vehicleId: "vehicle-123",
					longitude: -74.006,
					timestamp: new Date(),
				};
				const result = CreateGpsPingInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when latitude has wrong type", () => {
				const invalidData = {
					vehicleId: "vehicle-123",
					latitude: "40.7128",
					longitude: -74.006,
					timestamp: new Date(),
				};
				const result = CreateGpsPingInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateGpsPingInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update latitude",
					input: {
						latitude: 35.0,
					},
					success: true,
				},
				{
					name: "update longitude",
					input: {
						longitude: -120.0,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateGpsPingInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for empty update", () => {
				const result = UpdateGpsPingInputSchema().safeParse({});
				expect(result.success).toBe(true);
			});

			it("should return error when latitude has wrong type", () => {
				const invalidData = {
					latitude: "40.0",
				};
				const result = UpdateGpsPingInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
