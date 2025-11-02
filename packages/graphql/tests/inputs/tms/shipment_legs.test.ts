import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateShipmentLegInputSchema,
	UpdateShipmentLegInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateShipmentLegInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateShipmentLegInputSchema>>;

describe("Shipment Leg Inputs", () => {
	describe("CreateShipmentLegInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid shipment leg - shipmentId and legSequence",
					input: {
						shipmentId: "shipment-123",
						legSequence: 1,
					},
					success: true,
				},
				{
					name: "with PENDING status",
					input: {
						shipmentId: "shipment-456",
						legSequence: 2,
						status: "PENDING",
					},
					success: true,
				},
				{
					name: "with IN_TRANSIT status",
					input: {
						shipmentId: "shipment-789",
						legSequence: 3,
						status: "IN_TRANSIT",
					},
					success: true,
				},
				{
					name: "with DELIVERED status",
					input: {
						shipmentId: "shipment-111",
						legSequence: 4,
						status: "DELIVERED",
					},
					success: true,
				},
				{
					name: "with FAILED status",
					input: {
						shipmentId: "shipment-222",
						legSequence: 5,
						status: "FAILED",
					},
					success: true,
				},
				{
					name: "with CANCELLED status",
					input: {
						shipmentId: "shipment-333",
						legSequence: 6,
						status: "CANCELLED",
					},
					success: true,
				},
				{
					name: "with carrier ID",
					input: {
						shipmentId: "shipment-444",
						legSequence: 7,
						carrierId: "carrier-123",
					},
					success: true,
				},
				{
					name: "with trip reference",
					input: {
						shipmentId: "shipment-555",
						legSequence: 8,
						internalTripId: "trip-456",
					},
					success: true,
				},
				{
					name: "with locations",
					input: {
						shipmentId: "shipment-666",
						legSequence: 9,
						startLocation: "Warehouse A",
						endLocation: "Warehouse B",
					},
					success: true,
				},
				{
					name: "with all fields",
					input: {
						shipmentId: "shipment-777",
						legSequence: 10,
						carrierId: "carrier-789",
						internalTripId: "trip-111",
						status: "DELIVERED",
						startLocation: "Distribution Center",
						endLocation: "Customer Location",
					},
					success: true,
				},
				{
					name: "with UUID shipmentId",
					input: {
						shipmentId: "550e8400-e29b-41d4-a716-446655440000",
						legSequence: 1,
					},
					success: true,
				},
				{
					name: "with zero leg sequence",
					input: {
						shipmentId: "shipment-888",
						legSequence: 0,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateShipmentLegInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid shipment leg", () => {
				const validData = {
					shipmentId: "shipment-test",
					legSequence: 1,
				};
				const result = CreateShipmentLegInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error when shipmentId is missing", () => {
				const invalidData = {
					legSequence: 1,
				};
				const result = CreateShipmentLegInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when legSequence is missing", () => {
				const invalidData = {
					shipmentId: "shipment-123",
				};
				const result = CreateShipmentLegInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when legSequence has wrong type", () => {
				const invalidData = {
					shipmentId: "shipment-123",
					legSequence: "1",
				};
				const result = CreateShipmentLegInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when status is invalid", () => {
				const invalidData = {
					shipmentId: "shipment-123",
					legSequence: 1,
					status: "PROCESSING",
				};
				const result = CreateShipmentLegInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateShipmentLegInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update status to IN_TRANSIT",
					input: {
						status: "IN_TRANSIT",
					},
					success: true,
				},
				{
					name: "update status to DELIVERED",
					input: {
						status: "DELIVERED",
					},
					success: true,
				},
				{
					name: "update carrier ID",
					input: {
						carrierId: "new-carrier-123",
					},
					success: true,
				},
				{
					name: "update locations",
					input: {
						startLocation: "Updated Start",
						endLocation: "Updated End",
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						carrierId: "updated-carrier",
						internalTripId: "new-trip",
						legSequence: 5,
						status: "DELIVERED",
						startLocation: "New Start",
						endLocation: "New End",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateShipmentLegInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for empty update", () => {
				const result = UpdateShipmentLegInputSchema().safeParse({});
				expect(result.success).toBe(true);
			});

			it("should return error when status is invalid", () => {
				const invalidData = {
					status: "PROCESSING",
				};
				const result = UpdateShipmentLegInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when legSequence has wrong type", () => {
				const invalidData = {
					legSequence: "5",
				};
				const result = UpdateShipmentLegInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
