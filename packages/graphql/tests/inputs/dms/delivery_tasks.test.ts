import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
	CreateDeliveryTaskInputSchema,
	UpdateDeliveryTaskInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateDeliveryTaskInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateDeliveryTaskInputSchema>>;

describe("Delivery Task Inputs", () => {
	describe("CreateDeliveryTaskInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid task - required fields only",
					input: {
						deliveryAddress: "123 Main St, City, State 12345",
						deliveryRouteId: "route-123",
						packageId: "pkg-001",
						routeSequence: 1,
					},
					success: true,
				},
				{
					name: "with optional recipientName",
					input: {
						deliveryAddress: "456 Oak Ave, Town, State 67890",
						deliveryRouteId: "route-456",
						packageId: "pkg-002",
						routeSequence: 2,
						recipientName: "John Doe",
					},
					success: true,
				},
				{
					name: "with optional recipientPhone",
					input: {
						deliveryAddress: "789 Pine Rd, Village, State 11111",
						deliveryRouteId: "route-789",
						packageId: "pkg-003",
						routeSequence: 3,
						recipientPhone: "+1-555-123-4567",
					},
					success: true,
				},
				{
					name: "with optional deliveryInstructions",
					input: {
						deliveryAddress: "321 Elm St, Hamlet, State 22222",
						deliveryRouteId: "route-111",
						packageId: "pkg-004",
						routeSequence: 4,
						deliveryInstructions: "Leave at front door if no one home",
					},
					success: true,
				},
				{
					name: "with optional status PENDING",
					input: {
						deliveryAddress: "654 Maple Dr, Borough, State 33333",
						deliveryRouteId: "route-222",
						packageId: "pkg-005",
						routeSequence: 5,
						status: "PENDING",
					},
					success: true,
				},
				{
					name: "with optional status ASSIGNED",
					input: {
						deliveryAddress: "987 Cedar Ln, County, State 44444",
						deliveryRouteId: "route-333",
						packageId: "pkg-006",
						routeSequence: 6,
						status: "ASSIGNED",
					},
					success: true,
				},
				{
					name: "with optional status OUT_FOR_DELIVERY",
					input: {
						deliveryAddress: "111 Birch St, Region, State 55555",
						deliveryRouteId: "route-444",
						packageId: "pkg-007",
						routeSequence: 7,
						status: "OUT_FOR_DELIVERY",
					},
					success: true,
				},
				{
					name: "with optional status DELIVERED",
					input: {
						deliveryAddress: "222 Spruce Ave, Zone, State 66666",
						deliveryRouteId: "route-555",
						packageId: "pkg-008",
						routeSequence: 8,
						status: "DELIVERED",
					},
					success: true,
				},
				{
					name: "with optional status FAILED",
					input: {
						deliveryAddress: "333 Willow Way, Area, State 77777",
						deliveryRouteId: "route-666",
						packageId: "pkg-009",
						routeSequence: 9,
						status: "FAILED",
					},
					success: true,
				},
				{
					name: "with optional status RESCHEDULED",
					input: {
						deliveryAddress: "444 Ash Park, District, State 88888",
						deliveryRouteId: "route-777",
						packageId: "pkg-010",
						routeSequence: 10,
						status: "RESCHEDULED",
					},
					success: true,
				},
				{
					name: "with optional status CANCELLED",
					input: {
						deliveryAddress: "555 Poplar Plaza, Sector, State 99999",
						deliveryRouteId: "route-888",
						packageId: "pkg-011",
						routeSequence: 11,
						status: "CANCELLED",
					},
					success: true,
				},
				{
					name: "with optional estimatedArrivalTime",
					input: {
						deliveryAddress: "666 Hickory Hill, Division, State 00000",
						deliveryRouteId: "route-999",
						packageId: "pkg-012",
						routeSequence: 12,
						estimatedArrivalTime: "2025-11-20T10:30:00Z",
					},
					success: true,
				},
				{
					name: "with optional actualArrivalTime",
					input: {
						deliveryAddress: "777 Chestnut Ct, Quad, State 11111",
						deliveryRouteId: "route-aaa",
						packageId: "pkg-013",
						routeSequence: 13,
						actualArrivalTime: "2025-11-20T10:45:00Z",
					},
					success: true,
				},
				{
					name: "with all fields populated",
					input: {
						deliveryAddress: "999 Walnut Sq, Complex, State 99999",
						deliveryRouteId: "route-complete",
						packageId: "pkg-complete",
						routeSequence: 50,
						recipientName: "Jane Smith",
						recipientPhone: "+1-555-987-6543",
						deliveryInstructions: "Ring doorbell twice, wait 5 minutes",
						status: "DELIVERED",
						estimatedArrivalTime: "2025-11-20T14:00:00Z",
						actualArrivalTime: "2025-11-20T13:55:00Z",
					},
					success: true,
				},
				{
					name: "with high route sequence number",
					input: {
						deliveryAddress: "1000 Tamarind Ter, Metro, State 12345",
						deliveryRouteId: "route-bbb",
						packageId: "pkg-014",
						routeSequence: 999,
					},
					success: true,
				},
				{
					name: "with sequence zero",
					input: {
						deliveryAddress: "1001 Juniper Jct, Metropolis, State 67890",
						deliveryRouteId: "route-ccc",
						packageId: "pkg-015",
						routeSequence: 0,
					},
					success: false,
				},
				{
					name: "with long address",
					input: {
						deliveryAddress:
							"123 Very Long Street Name With Multiple Words, Apartment 456, Building B, Complex Name, City, County, State 12345, Country",
						deliveryRouteId: "route-ddd",
						packageId: "pkg-016",
						routeSequence: 15,
					},
					success: true,
				},
				{
					name: "with complex recipient name",
					input: {
						deliveryAddress: "1002 Oak St, Town, State 11111",
						deliveryRouteId: "route-eee",
						packageId: "pkg-017",
						routeSequence: 16,
						recipientName: "José García-López",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateDeliveryTaskInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid task", () => {
				const validData = {
					deliveryAddress: "123 Test St",
					deliveryRouteId: "route-test",
					packageId: "pkg-test",
					routeSequence: 1,
				};
				const result = CreateDeliveryTaskInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.deliveryAddress).toBe("123 Test St");
				}
			});

			it("should return error when deliveryAddress is missing", () => {
				const invalidData = {
					deliveryRouteId: "route-123",
					packageId: "pkg-123",
					routeSequence: 1,
				};
				const result = CreateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when deliveryRouteId is missing", () => {
				const invalidData = {
					deliveryAddress: "123 Main St",
					packageId: "pkg-123",
					routeSequence: 1,
				};
				const result = CreateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when packageId is missing", () => {
				const invalidData = {
					deliveryAddress: "123 Main St",
					deliveryRouteId: "route-123",
					routeSequence: 1,
				};
				const result = CreateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when routeSequence is missing", () => {
				const invalidData = {
					deliveryAddress: "123 Main St",
					deliveryRouteId: "route-123",
					packageId: "pkg-123",
				};
				const result = CreateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when routeSequence has wrong type", () => {
				const invalidData = {
					deliveryAddress: "123 Main St",
					deliveryRouteId: "route-123",
					packageId: "pkg-123",
					routeSequence: "1",
				};
				const result = CreateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error for invalid status enum", () => {
				const invalidData = {
					deliveryAddress: "123 Main St",
					deliveryRouteId: "route-123",
					packageId: "pkg-123",
					routeSequence: 1,
					status: "INVALID_STATUS",
				};
				const result = CreateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateDeliveryTaskInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
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
					name: "update status to FAILED",
					input: {
						status: "FAILED",
					},
					success: true,
				},
				{
					name: "update deliveryAddress",
					input: {
						deliveryAddress: "New Address, City, State 99999",
					},
					success: true,
				},
				{
					name: "update deliveryInstructions",
					input: {
						deliveryInstructions: "Updated: Ring twice",
					},
					success: true,
				},
				{
					name: "update recipientName",
					input: {
						recipientName: "Updated Recipient",
					},
					success: true,
				},
				{
					name: "update recipientPhone",
					input: {
						recipientPhone: "+1-555-999-8888",
					},
					success: true,
				},
				{
					name: "update attemptCount",
					input: {
						attemptCount: 2,
					},
					success: true,
				},
				{
					name: "update failureReason to ACCESS_DENIED",
					input: {
						failureReason: "ACCESS_DENIED",
					},
					success: true,
				},
				{
					name: "update failureReason to RECIPIENT_NOT_HOME",
					input: {
						failureReason: "RECIPIENT_NOT_HOME",
					},
					success: true,
				},
				{
					name: "update failureReason to OTHER",
					input: {
						failureReason: "OTHER",
					},
					success: true,
				},
				{
					name: "update estimatedArrivalTime",
					input: {
						estimatedArrivalTime: "2025-11-25T15:00:00Z",
					},
					success: true,
				},
				{
					name: "update actualArrivalTime",
					input: {
						actualArrivalTime: "2025-11-25T15:15:00Z",
					},
					success: true,
				},
				{
					name: "update deliveryTime",
					input: {
						deliveryTime: "2025-11-25T15:20:00Z",
					},
					success: true,
				},
				{
					name: "update multiple fields",
					input: {
						status: "DELIVERED",
						recipientName: "John Updated",
						actualArrivalTime: "2025-11-25T16:00:00Z",
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						deliveryAddress: "Updated Address",
						deliveryInstructions: "Updated instructions",
						recipientName: "Updated Name",
						recipientPhone: "+1-555-111-2222",
						status: "DELIVERED",
						estimatedArrivalTime: "2025-11-26T10:00:00Z",
						actualArrivalTime: "2025-11-26T10:30:00Z",
						deliveryTime: "2025-11-26T10:35:00Z",
						attemptCount: 1,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateDeliveryTaskInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid update", () => {
				const validData = {
					status: "DELIVERED",
					actualArrivalTime: "2025-11-25T10:00:00Z",
				};
				const result = UpdateDeliveryTaskInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.status).toBe("DELIVERED");
				}
			});

			it("should return success for empty update", () => {
				const validData = {};
				const result = UpdateDeliveryTaskInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error for invalid status enum", () => {
				const invalidData = {
					status: "INVALID_STATUS",
				};
				const result = UpdateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error for invalid failureReason enum", () => {
				const invalidData = {
					failureReason: "INVALID_REASON",
				};
				const result = UpdateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when attemptCount has wrong type", () => {
				const invalidData = {
					attemptCount: "2",
				};
				const result = UpdateDeliveryTaskInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
