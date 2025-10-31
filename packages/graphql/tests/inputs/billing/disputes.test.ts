import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
	CreateDisputeInputSchema,
	UpdateDisputeInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateDisputeInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateDisputeInputSchema>>;

describe("Dispute Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						clientId: "client-001",
						lineItemId: "lineitem-001",
						reason: "Item not received",
					},
					success: true,
				},
				{
					name: "should accept all fields with complete data",
					input: {
						clientId: "client-002",
						disputedAmount: 500,
						lineItemId: "lineitem-002",
						reason: "Damaged shipment",
						resolutionNotes: "Replacement sent",
						resolvedAt: "2024-01-20",
						resolvedByUserId: "user-123",
						status: "CLOSED",
					},
					success: true,
				},
				{
					name: "should accept with zero disputed amount",
					input: {
						clientId: "client-003",
						disputedAmount: 0,
						lineItemId: "lineitem-003",
						reason: "Quality issue",
					},
					success: true,
				},
				{
					name: "should accept with high disputed amount",
					input: {
						clientId: "client-004",
						disputedAmount: 50000,
						lineItemId: "lineitem-004",
						reason: "Bulk order issue",
					},
					success: true,
				},
				{
					name: "should accept with resolution notes",
					input: {
						clientId: "client-005",
						lineItemId: "lineitem-005",
						reason: "Missing items",
						resolutionNotes: "Refund processed",
					},
					success: true,
				},
				{
					name: "should accept with resolved date",
					input: {
						clientId: "client-006",
						lineItemId: "lineitem-006",
						reason: "Late delivery",
						resolvedAt: "2024-01-25",
					},
					success: true,
				},
				{
					name: "should accept with resolved by user",
					input: {
						clientId: "client-007",
						lineItemId: "lineitem-007",
						reason: "Product defect",
						resolvedByUserId: "user-456",
					},
					success: true,
				},
				{
					name: "should accept with disputed status",
					input: {
						clientId: "client-008",
						lineItemId: "lineitem-008",
						reason: "Billing discrepancy",
						status: "UNDER_REVIEW",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateDisputeInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when clientId is missing",
					input: {
						lineItemId: "lineitem-001",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "clientId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when clientId is not a string",
					input: {
						clientId: 123 as any,
						lineItemId: "lineitem-001",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "clientId",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when lineItemId is missing",
					input: {
						clientId: "client-001",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "lineItemId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when lineItemId is not a string",
					input: {
						clientId: "client-001",
						lineItemId: {} as any,
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "lineItemId",
						message: "Invalid input: expected string, received object",
					},
				},
				{
					name: "should reject when reason is missing",
					input: {
						clientId: "client-001",
						lineItemId: "lineitem-001",
					},
					success: false,
					error: {
						path: "reason",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when reason is not a string",
					input: {
						clientId: "client-001",
						lineItemId: "lineitem-001",
						reason: 123 as any,
					},
					success: false,
					error: {
						path: "reason",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when disputedAmount is not a number",
					input: {
						clientId: "client-001",
						disputedAmount: "500" as any,
						lineItemId: "lineitem-001",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "disputedAmount",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when resolutionNotes is not a string",
					input: {
						clientId: "client-001",
						lineItemId: "lineitem-001",
						reason: "Damaged",
						resolutionNotes: true as any,
					},
					success: false,
					error: {
						path: "resolutionNotes",
						message: "Invalid input: expected string, received boolean",
					},
				},
				{
					name: "should reject when resolvedByUserId is not a string",
					input: {
						clientId: "client-001",
						lineItemId: "lineitem-001",
						reason: "Damaged",
						resolvedByUserId: [] as any,
					},
					success: false,
					error: {
						path: "resolvedByUserId",
						message: "Invalid input: expected string, received array",
					},
				},
				{
					name: "should reject when resolvedAt is not a string",
					input: {
						clientId: "client-001",
						lineItemId: "lineitem-001",
						reason: "Damaged",
						resolvedAt: 12345 as any,
					},
					success: false,
					error: {
						path: "resolvedAt",
						message: "Invalid input: expected string, received number",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateDisputeInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						err.message.includes(testCase.error?.message.split(",")[0] || ""),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
	describe("Update Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should accept empty object",
					input: {},
					success: true,
				},
				{
					name: "should accept partial update with reason",
					input: {
						reason: "Updated reason",
					},
					success: true,
				},
				{
					name: "should accept all fields for partial update",
					input: {
						disputedAmount: 1000,
						reason: "Updated reason",
						resolutionNotes: "Updated notes",
						resolvedAt: "2024-02-01",
						resolvedByUserId: "user-789",
						status: "APPROVED",
					},
					success: true,
				},
				{
					name: "should accept updating status only",
					input: {
						status: "CLOSED",
					},
					success: true,
				},
				{
					name: "should accept updating resolved date",
					input: {
						resolvedAt: "2024-02-10",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateDisputeInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when reason is not a string",
					input: {
						reason: 123 as any,
					},
					success: false,
					error: {
						path: "reason",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when disputedAmount is not a number",
					input: {
						disputedAmount: "1000" as any,
					},
					success: false,
					error: {
						path: "disputedAmount",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when resolutionNotes is not a string",
					input: {
						resolutionNotes: null as any,
					},
					success: false,
					error: {
						path: "resolutionNotes",
						message: "Invalid input: expected string, received null",
					},
				},
				{
					name: "should reject when resolvedByUserId is not a string",
					input: {
						resolvedByUserId: {} as any,
					},
					success: false,
					error: {
						path: "resolvedByUserId",
						message: "Invalid input: expected string, received object",
					},
				},
				{
					name: "should reject when resolvedAt is not a string",
					input: {
						resolvedAt: false as any,
					},
					success: false,
					error: {
						path: "resolvedAt",
						message: "Invalid input: expected string, received boolean",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateDisputeInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						err.message.includes(testCase.error?.message.split(",")[0] || ""),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
});
