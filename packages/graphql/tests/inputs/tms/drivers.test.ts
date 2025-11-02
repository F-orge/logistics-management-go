import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateDriverInputSchema,
	UpdateDriverInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateDriverInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateDriverInputSchema>>;

describe("Driver Inputs", () => {
	describe("CreateDriverInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid driver - required fields only",
					input: {
						licenseNumber: "DL123456",
						userId: "user-123",
					},
					success: true,
				},
				{
					name: "with optional status ACTIVE",
					input: {
						licenseNumber: "DL234567",
						userId: "user-456",
						status: "ACTIVE",
					},
					success: true,
				},
				{
					name: "with optional status INACTIVE",
					input: {
						licenseNumber: "DL345678",
						userId: "user-789",
						status: "INACTIVE",
					},
					success: true,
				},
				{
					name: "with optional status ON_LEAVE",
					input: {
						licenseNumber: "DL456789",
						userId: "user-111",
						status: "ON_LEAVE",
					},
					success: true,
				},
				{
					name: "with optional contactPhone",
					input: {
						licenseNumber: "DL567890",
						userId: "user-222",
						contactPhone: "+1-555-123-4567",
					},
					success: true,
				},
				{
					name: "with optional licenseExpiryDate",
					input: {
						licenseNumber: "DL678901",
						userId: "user-333",
						licenseExpiryDate: "2026-12-31",
					},
					success: true,
				},
				{
					name: "with all optional fields",
					input: {
						licenseNumber: "DL789012",
						userId: "user-444",
						status: "ACTIVE",
						contactPhone: "+1-555-987-6543",
						licenseExpiryDate: "2027-06-30",
					},
					success: true,
				},
				{
					name: "with international license number",
					input: {
						licenseNumber: "IND-DL-2024-AB-001",
						userId: "user-555",
					},
					success: true,
				},
				{
					name: "with international phone",
					input: {
						licenseNumber: "DL890123",
						userId: "user-666",
						contactPhone: "+44-7911-123456",
					},
					success: true,
				},
				{
					name: "with future expiry date",
					input: {
						licenseNumber: "DL901234",
						userId: "user-777",
						licenseExpiryDate: "2030-12-31",
					},
					success: true,
				},
				{
					name: "with near-term expiry date",
					input: {
						licenseNumber: "DL012345",
						userId: "user-888",
						licenseExpiryDate: "2025-11-30",
					},
					success: true,
				},
				{
					name: "with UUID userId",
					input: {
						licenseNumber: "DL123456",
						userId: "550e8400-e29b-41d4-a716-446655440000",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateDriverInputSchema().safeParse(testCase.input);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid driver", () => {
				const validData = {
					licenseNumber: "DL123456",
					userId: "user-test",
				};
				const result = CreateDriverInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.licenseNumber).toBe("DL123456");
					expect(result.data.userId).toBe("user-test");
				}
			});

			it("should return error when licenseNumber is missing", () => {
				const invalidData = {
					userId: "user-123",
				};
				const result = CreateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when userId is missing", () => {
				const invalidData = {
					licenseNumber: "DL123456",
				};
				const result = CreateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when licenseNumber has wrong type", () => {
				const invalidData = {
					licenseNumber: 12345,
					userId: "user-123",
				};
				const result = CreateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when userId has wrong type", () => {
				const invalidData = {
					licenseNumber: "DL123456",
					userId: 12345,
				};
				const result = CreateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error for invalid status enum", () => {
				const invalidData = {
					licenseNumber: "DL123456",
					userId: "user-123",
					status: "UNKNOWN_STATUS",
				};
				const result = CreateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when contactPhone has wrong type", () => {
				const invalidData = {
					licenseNumber: "DL123456",
					userId: "user-123",
					contactPhone: 12345,
				};
				const result = CreateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateDriverInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update licenseNumber only",
					input: {
						licenseNumber: "NEW-DL-789012",
					},
					success: true,
				},
				{
					name: "update status to ACTIVE",
					input: {
						status: "ACTIVE",
					},
					success: true,
				},
				{
					name: "update status to INACTIVE",
					input: {
						status: "INACTIVE",
					},
					success: true,
				},
				{
					name: "update contactPhone",
					input: {
						contactPhone: "+1-555-999-8888",
					},
					success: true,
				},
				{
					name: "update licenseExpiryDate",
					input: {
						licenseExpiryDate: "2028-01-31",
					},
					success: true,
				},
				{
					name: "update multiple fields",
					input: {
						licenseNumber: "UPD-DL-456789",
						status: "ACTIVE",
						contactPhone: "+1-555-111-2222",
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						licenseNumber: "FINAL-DL-123456",
						status: "ACTIVE",
						contactPhone: "+1-555-333-4444",
						licenseExpiryDate: "2029-12-31",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateDriverInputSchema().safeParse(testCase.input);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid update", () => {
				const validData = {
					status: "ACTIVE",
					contactPhone: "+1-555-123-4567",
				};
				const result = UpdateDriverInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.status).toBe("ACTIVE");
				}
			});

			it("should return success for empty update", () => {
				const validData = {};
				const result = UpdateDriverInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error for invalid status enum", () => {
				const invalidData = {
					status: "INVALID",
				};
				const result = UpdateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when licenseNumber has wrong type", () => {
				const invalidData = {
					licenseNumber: 12345,
				};
				const result = UpdateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when contactPhone has wrong type", () => {
				const invalidData = {
					contactPhone: 12345,
				};
				const result = UpdateDriverInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
