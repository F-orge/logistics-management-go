import { describe, expect, it } from "bun:test";
import type z from "zod";
import { CreateTaskEventInputSchema } from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateTaskEventInputSchema>>;

describe("Task Event Inputs", () => {
	describe("CreateTaskEventInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid task event - required fields only",
					input: {
						deliveryTaskId: "task-123",
						status: "ASSIGNED",
					},
					success: true,
				},
				{
					name: "with optional status ARRIVED",
					input: {
						deliveryTaskId: "task-456",
						status: "ARRIVED",
					},
					success: true,
				},
				{
					name: "with optional status STARTED",
					input: {
						deliveryTaskId: "task-789",
						status: "STARTED",
					},
					success: true,
				},
				{
					name: "with optional status DELIVERED",
					input: {
						deliveryTaskId: "task-111",
						status: "DELIVERED",
					},
					success: true,
				},
				{
					name: "with optional status FAILED",
					input: {
						deliveryTaskId: "task-222",
						status: "FAILED",
					},
					success: true,
				},
				{
					name: "with optional status EXCEPTION",
					input: {
						deliveryTaskId: "task-333",
						status: "EXCEPTION",
					},
					success: true,
				},
				{
					name: "with optional status RESCHEDULED",
					input: {
						deliveryTaskId: "task-444",
						status: "RESCHEDULED",
					},
					success: true,
				},
				{
					name: "with optional status CANCELLED",
					input: {
						deliveryTaskId: "task-555",
						status: "CANCELLED",
					},
					success: true,
				},
				{
					name: "with optional latitude",
					input: {
						deliveryTaskId: "task-666",
						status: "ARRIVED",
						latitude: 40.7128,
					},
					success: true,
				},
				{
					name: "with optional longitude",
					input: {
						deliveryTaskId: "task-777",
						status: "ARRIVED",
						longitude: -74.006,
					},
					success: true,
				},
				{
					name: "with latitude and longitude",
					input: {
						deliveryTaskId: "task-888",
						status: "DELIVERED",
						latitude: 34.0522,
						longitude: -118.2437,
					},
					success: true,
				},
				{
					name: "with optional notes",
					input: {
						deliveryTaskId: "task-999",
						status: "DELIVERED",
						notes: "Delivered to front porch",
					},
					success: true,
				},
				{
					name: "with optional reason",
					input: {
						deliveryTaskId: "task-aaa",
						status: "FAILED",
						reason: "Address not found",
					},
					success: true,
				},
				{
					name: "with optional timestamp",
					input: {
						deliveryTaskId: "task-bbb",
						status: "ARRIVED",
						timestamp: "2025-11-20T10:00:00Z",
					},
					success: true,
				},
				{
					name: "with all fields populated",
					input: {
						deliveryTaskId: "task-complete",
						status: "DELIVERED",
						latitude: 39.7392,
						longitude: -104.9903,
						notes: "Customer signature obtained",
						timestamp: "2025-11-20T14:30:00Z",
					},
					success: true,
				},
				{
					name: "with UUID deliveryTaskId",
					input: {
						deliveryTaskId: "550e8400-e29b-41d4-a716-446655440000",
						status: "ASSIGNED",
					},
					success: true,
				},
				{
					name: "with long notes",
					input: {
						deliveryTaskId: "task-ccc",
						status: "DELIVERED",
						notes:
							"Delivered to secure location behind main entrance as per customer instructions. Recipient verified identity before receiving package. Package condition verified as intact.",
					},
					success: true,
				},
				{
					name: "with long reason",
					input: {
						deliveryTaskId: "task-ddd",
						status: "FAILED",
						reason:
							"Recipient not available at specified address. Neighbor reported they would return in 2 hours. Attempted re-delivery scheduled.",
					},
					success: true,
				},
				{
					name: "with north pole coordinates",
					input: {
						deliveryTaskId: "task-eee",
						status: "ARRIVED",
						latitude: 90.0,
						longitude: 0.0,
					},
					success: true,
				},
				{
					name: "with all statuses tested",
					input: {
						deliveryTaskId: "task-fff",
						status: "CANCELLED",
						reason: "Customer cancelled before delivery",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateTaskEventInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid task event", () => {
				const validData = {
					deliveryTaskId: "task-test",
					status: "DELIVERED",
				};
				const result = CreateTaskEventInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
				if (result.success) {
					expect(result.data.deliveryTaskId).toBe("task-test");
					expect(result.data.status).toBe("DELIVERED");
				}
			});

			it("should return error when deliveryTaskId is missing", () => {
				const invalidData = {
					status: "DELIVERED",
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when status is missing", () => {
				const invalidData = {
					deliveryTaskId: "task-123",
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when deliveryTaskId has wrong type", () => {
				const invalidData = {
					deliveryTaskId: 12345,
					status: "DELIVERED",
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error for invalid status enum", () => {
				const invalidData = {
					deliveryTaskId: "task-123",
					status: "INVALID_STATUS",
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when latitude has wrong type", () => {
				const invalidData = {
					deliveryTaskId: "task-123",
					status: "ARRIVED",
					latitude: "40.7128",
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when longitude has wrong type", () => {
				const invalidData = {
					deliveryTaskId: "task-123",
					status: "ARRIVED",
					longitude: "-74.006",
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when notes has wrong type", () => {
				const invalidData = {
					deliveryTaskId: "task-123",
					status: "DELIVERED",
					notes: 12345,
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when reason has wrong type", () => {
				const invalidData = {
					deliveryTaskId: "task-123",
					status: "FAILED",
					reason: 12345,
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when timestamp has wrong type", () => {
				const invalidData = {
					deliveryTaskId: "task-123",
					status: "ARRIVED",
					timestamp: 12345,
				};
				const result = CreateTaskEventInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
