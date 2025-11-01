import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
	CreateTripInputSchema,
	UpdateTripInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateTripInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateTripInputSchema>>;

describe("Trip Inputs", () => {
	describe("CreateTripInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid trip - no required fields",
					input: {},
					success: true,
				},
				{
					name: "with PLANNED status",
					input: {
						status: "PLANNED",
					},
					success: true,
				},
				{
					name: "with IN_PROGRESS status",
					input: {
						status: "IN_PROGRESS",
					},
					success: true,
				},
				{
					name: "with COMPLETED status",
					input: {
						status: "COMPLETED",
					},
					success: true,
				},
				{
					name: "with CANCELLED status",
					input: {
						status: "CANCELLED",
					},
					success: true,
				},
				{
					name: "with driver and vehicle",
					input: {
						driverId: "driver-123",
						vehicleId: "vehicle-456",
					},
					success: true,
				},
				{
					name: "with start and end locations",
					input: {
						startLocation: "123 Main St, City",
						endLocation: "456 Park Ave, Town",
					},
					success: true,
				},
				{
					name: "with start and end times",
					input: {
						startTime: "2025-11-01T08:00:00Z",
						endTime: "2025-11-01T17:00:00Z",
					},
					success: true,
				},
				{
					name: "with all fields",
					input: {
						driverId: "driver-789",
						vehicleId: "vehicle-111",
						status: "COMPLETED",
						startLocation: "Warehouse A",
						endLocation: "Warehouse B",
						startTime: "2025-11-01T06:00:00Z",
						endTime: "2025-11-01T18:00:00Z",
					},
					success: true,
				},
				{
					name: "with UUID driver ID",
					input: {
						driverId: "550e8400-e29b-41d4-a716-446655440000",
						status: "IN_PROGRESS",
					},
					success: true,
				},
				{
					name: "with UUID vehicle ID",
					input: {
						vehicleId: "660e8400-e29b-41d4-a716-446655440001",
						status: "PLANNED",
					},
					success: true,
				},
				{
					name: "with partial fields - driver and status",
					input: {
						driverId: "driver-222",
						status: "COMPLETED",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateTripInputSchema().safeParse(testCase.input);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid trip", () => {
				const validData = {
					driverId: "driver-test",
					vehicleId: "vehicle-test",
					status: "PLANNED",
				};
				const result = CreateTripInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error when status is invalid", () => {
				const invalidData = {
					status: "PAUSED",
				};
				const result = CreateTripInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when driverId has wrong type", () => {
				const invalidData = {
					driverId: 123,
				};
				const result = CreateTripInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when vehicleId has wrong type", () => {
				const invalidData = {
					vehicleId: 456,
				};
				const result = CreateTripInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when status has wrong type", () => {
				const invalidData = {
					status: 123,
				};
				const result = CreateTripInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateTripInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update status to PLANNED",
					input: {
						status: "PLANNED",
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
					name: "update all fields",
					input: {
						status: "IN_PROGRESS",
						startLocation: "Updated Start",
						endLocation: "Updated End",
						startTime: "2025-11-05T08:00:00Z",
						endTime: "2025-11-05T17:00:00Z",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateTripInputSchema().safeParse(testCase.input);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for empty update", () => {
				const result = UpdateTripInputSchema().safeParse({});
				expect(result.success).toBe(true);
			});

			it("should return error when status is invalid", () => {
				const invalidData = {
					status: "PAUSED",
				};
				const result = UpdateTripInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when startTime has wrong type", () => {
				const invalidData = {
					startTime: 12345,
				};
				const result = UpdateTripInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
