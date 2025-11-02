import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateDriverScheduleInputSchema,
	UpdateDriverScheduleInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateDriverScheduleInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateDriverScheduleInputSchema>>;

describe("Driver Schedule Inputs", () => {
	describe("CreateDriverScheduleInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid schedule - required fields only",
					input: {
						driverId: "driver-123",
						startDate: "2025-11-01",
						endDate: "2025-11-07",
					},
					success: true,
				},
				{
					name: "with optional reason VACATION",
					input: {
						driverId: "driver-456",
						startDate: "2025-11-10",
						endDate: "2025-11-17",
						reason: "VACATION",
					},
					success: true,
				},
				{
					name: "with optional reason SICK_LEAVE",
					input: {
						driverId: "driver-789",
						startDate: "2025-11-08",
						endDate: "2025-11-09",
						reason: "SICK_LEAVE",
					},
					success: true,
				},
				{
					name: "with optional reason PERSONAL_LEAVE",
					input: {
						driverId: "driver-111",
						startDate: "2025-11-15",
						endDate: "2025-11-16",
						reason: "PERSONAL_LEAVE",
					},
					success: true,
				},
				{
					name: "with optional reason TRAINING",
					input: {
						driverId: "driver-222",
						startDate: "2025-11-20",
						endDate: "2025-11-22",
						reason: "TRAINING",
					},
					success: true,
				},
				{
					name: "with single day schedule",
					input: {
						driverId: "driver-333",
						startDate: "2025-11-25",
						endDate: "2025-11-25",
					},
					success: true,
				},
				{
					name: "with long duration schedule",
					input: {
						driverId: "driver-444",
						startDate: "2025-11-01",
						endDate: "2025-11-30",
						reason: "VACATION",
					},
					success: true,
				},
				{
					name: "with future dates",
					input: {
						driverId: "driver-555",
						startDate: "2025-12-15",
						endDate: "2025-12-22",
						reason: "VACATION",
					},
					success: true,
				},
				{
					name: "with past dates",
					input: {
						driverId: "driver-666",
						startDate: "2025-10-01",
						endDate: "2025-10-08",
						reason: "TRAINING",
					},
					success: true,
				},
				{
					name: "with UUID driverId",
					input: {
						driverId: "550e8400-e29b-41d4-a716-446655440000",
						startDate: "2025-11-05",
						endDate: "2025-11-12",
					},
					success: true,
				},
				{
					name: "with all fields populated",
					input: {
						driverId: "driver-complete",
						startDate: "2025-11-18",
						endDate: "2025-11-25",
						reason: "VACATION",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateDriverScheduleInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid schedule", () => {
				const validData = {
					driverId: "driver-test",
					startDate: "2025-11-01",
					endDate: "2025-11-08",
				};
				const result = CreateDriverScheduleInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.driverId).toBe("driver-test");
				}
			});

			it("should return error when driverId is missing", () => {
				const invalidData = {
					startDate: "2025-11-01",
					endDate: "2025-11-08",
				};
				const result = CreateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when startDate is missing", () => {
				const invalidData = {
					driverId: "driver-123",
					endDate: "2025-11-08",
				};
				const result = CreateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when endDate is missing", () => {
				const invalidData = {
					driverId: "driver-123",
					startDate: "2025-11-01",
				};
				const result = CreateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when driverId has wrong type", () => {
				const invalidData = {
					driverId: 12345,
					startDate: "2025-11-01",
					endDate: "2025-11-08",
				};
				const result = CreateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error for invalid reason enum", () => {
				const invalidData = {
					driverId: "driver-123",
					startDate: "2025-11-01",
					endDate: "2025-11-08",
					reason: "INVALID_REASON",
				};
				const result = CreateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when startDate has wrong type", () => {
				const invalidData = {
					driverId: "driver-123",
					startDate: 20251101,
					endDate: "2025-11-08",
				};
				const result = CreateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateDriverScheduleInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update startDate only",
					input: {
						startDate: "2025-12-01",
					},
					success: true,
				},
				{
					name: "update endDate only",
					input: {
						endDate: "2025-12-08",
					},
					success: true,
				},
				{
					name: "update reason to VACATION",
					input: {
						reason: "VACATION",
					},
					success: true,
				},
				{
					name: "update reason to TRAINING",
					input: {
						reason: "TRAINING",
					},
					success: true,
				},
				{
					name: "update startDate and endDate",
					input: {
						startDate: "2025-12-10",
						endDate: "2025-12-17",
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						startDate: "2025-12-20",
						endDate: "2025-12-27",
						reason: "VACATION",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateDriverScheduleInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid update", () => {
				const validData = {
					startDate: "2025-12-01",
					endDate: "2025-12-08",
				};
				const result = UpdateDriverScheduleInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return success for empty update", () => {
				const validData = {};
				const result = UpdateDriverScheduleInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error for invalid reason enum", () => {
				const invalidData = {
					reason: "INVALID",
				};
				const result = UpdateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when startDate has wrong type", () => {
				const invalidData = {
					startDate: 12345,
				};
				const result = UpdateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when endDate has wrong type", () => {
				const invalidData = {
					endDate: 12345,
				};
				const result = UpdateDriverScheduleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
