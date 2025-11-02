import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateProofOfDeliveryInputSchema,
	UpdateProofOfDeliveryInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<
	ReturnType<typeof CreateProofOfDeliveryInputSchema>
>;
type UpdateSchema = z.infer<
	ReturnType<typeof UpdateProofOfDeliveryInputSchema>
>;

describe("Proof Of Delivery Inputs", () => {
	describe("CreateProofOfDeliveryInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid proof - required fields only",
					input: {
						tripStopId: "stop-123",
						files: [],
					},
					success: true,
				},
				{
					name: "with optional type PHOTO",
					input: {
						tripStopId: "stop-456",
						files: [],
						type: "PHOTO",
					},
					success: true,
				},
				{
					name: "with optional type SIGNATURE",
					input: {
						tripStopId: "stop-789",
						files: [],
						type: "SIGNATURE",
					},
					success: true,
				},
				{
					name: "with optional type BARCODE_SCAN",
					input: {
						tripStopId: "stop-111",
						files: [],
						type: "BARCODE_SCAN",
					},
					success: true,
				},
				{
					name: "with optional type PIN_VERIFICATION",
					input: {
						tripStopId: "stop-222",
						files: [],
						type: "PIN_VERIFICATION",
					},
					success: true,
				},
				{
					name: "with optional latitude",
					input: {
						tripStopId: "stop-333",
						files: [],
						latitude: 40.7128,
					},
					success: true,
				},
				{
					name: "with optional longitude",
					input: {
						tripStopId: "stop-444",
						files: [],
						longitude: -74.006,
					},
					success: true,
				},
				{
					name: "with latitude and longitude",
					input: {
						tripStopId: "stop-555",
						files: [],
						latitude: 34.0522,
						longitude: -118.2437,
					},
					success: true,
				},
				{
					name: "with all fields populated",
					input: {
						tripStopId: "stop-complete",
						files: [],
						type: "PHOTO",
						latitude: 39.7392,
						longitude: -104.9903,
					},
					success: true,
				},
				{
					name: "with UUID tripStopId",
					input: {
						tripStopId: "550e8400-e29b-41d4-a716-446655440000",
						files: [],
					},
					success: true,
				},
				{
					name: "with north pole coordinates",
					input: {
						tripStopId: "stop-north",
						files: [],
						latitude: 90.0,
						longitude: 0.0,
					},
					success: true,
				},
				{
					name: "with south pole coordinates",
					input: {
						tripStopId: "stop-south",
						files: [],
						latitude: -90.0,
						longitude: 0.0,
					},
					success: true,
				},
				{
					name: "with negative latitude",
					input: {
						tripStopId: "stop-negative",
						files: [],
						latitude: -33.8688,
						longitude: 151.2093,
					},
					success: true,
				},
				{
					name: "with all proof types - PHOTO",
					input: {
						tripStopId: "stop-aaa",
						files: [],
						type: "PHOTO",
					},
					success: true,
				},
				{
					name: "with all proof types - SIGNATURE",
					input: {
						tripStopId: "stop-bbb",
						files: [],
						type: "SIGNATURE",
					},
					success: true,
				},
				{
					name: "with all proof types - BARCODE_SCAN",
					input: {
						tripStopId: "stop-ccc",
						files: [],
						type: "BARCODE_SCAN",
					},
					success: true,
				},
				{
					name: "with all proof types - PIN_VERIFICATION",
					input: {
						tripStopId: "stop-ddd",
						files: [],
						type: "PIN_VERIFICATION",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateProofOfDeliveryInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid proof with empty files", () => {
				const validData = {
					tripStopId: "stop-test",
					files: [],
				};
				const result = CreateProofOfDeliveryInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.tripStopId).toBe("stop-test");
				}
			});

			it("should return error when tripStopId is missing", () => {
				const invalidData = {
					files: [],
				};
				const result =
					CreateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when files is missing", () => {
				const invalidData = {
					tripStopId: "stop-123",
				};
				const result =
					CreateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when tripStopId has wrong type", () => {
				const invalidData = {
					tripStopId: 12345,
					files: [],
				};
				const result =
					CreateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when files has wrong type", () => {
				const invalidData = {
					tripStopId: "stop-123",
					files: "file.jpg",
				};
				const result =
					CreateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error for invalid type enum", () => {
				const invalidData = {
					tripStopId: "stop-123",
					files: [],
					type: "INVALID_TYPE",
				};
				const result =
					CreateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when latitude has wrong type", () => {
				const invalidData = {
					tripStopId: "stop-123",
					files: [],
					latitude: "40.7128",
				};
				const result =
					CreateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when longitude has wrong type", () => {
				const invalidData = {
					tripStopId: "stop-123",
					files: [],
					longitude: "-74.006",
				};
				const result =
					CreateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateProofOfDeliveryInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update type to PHOTO",
					input: {
						type: "PHOTO",
					},
					success: true,
				},
				{
					name: "update type to SIGNATURE",
					input: {
						type: "SIGNATURE",
					},
					success: true,
				},
				{
					name: "update type to BARCODE_SCAN",
					input: {
						type: "BARCODE_SCAN",
					},
					success: true,
				},
				{
					name: "update type to PIN_VERIFICATION",
					input: {
						type: "PIN_VERIFICATION",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateProofOfDeliveryInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid update", () => {
				const validData = {
					type: "PHOTO",
				};
				const result = UpdateProofOfDeliveryInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.type).toBe("PHOTO");
				}
			});

			it("should return success for empty update", () => {
				const validData = {};
				const result = UpdateProofOfDeliveryInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error for invalid type enum", () => {
				const invalidData = {
					type: "INVALID_TYPE",
				};
				const result =
					UpdateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when type has wrong type", () => {
				const invalidData = {
					type: 12345,
				};
				const result =
					UpdateProofOfDeliveryInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
