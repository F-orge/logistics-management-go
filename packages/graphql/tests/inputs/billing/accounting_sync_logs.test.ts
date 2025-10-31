import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import { CreateAccountingSyncLogInputSchema } from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<
	ReturnType<typeof CreateAccountingSyncLogInputSchema>
>;

describe("AccountingSyncLog Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						externalSystem: "XERO",
						recordId: "rec-001",
						recordType: "INVOICE",
					},
					success: true,
				},
				{
					name: "should accept all fields with complete data",
					input: {
						externalSystem: "QUICKBOOKS",
						recordId: "rec-002",
						recordType: "PAYMENT",
						errorMessage: "Connection timeout",
						externalId: "ext-123",
						lastSyncAt: "2024-01-15T10:30:00Z",
						nextRetryAt: "2024-01-15T11:30:00Z",
						requestPayload: '{"id":"rec-002","amount":500}',
						responsePayload: '{"status":"success","id":"ext-123"}',
						retryCount: 2,
						status: "PENDING",
					},
					success: true,
				},
				{
					name: "should accept with different externalSystem",
					input: {
						externalSystem: "SAP",
						recordId: "rec-003",
						recordType: "CREDIT_NOTE",
					},
					success: true,
				},
				{
					name: "should accept with zero retry count",
					input: {
						externalSystem: "NETSUITE",
						recordId: "rec-004",
						recordType: "JOURNAL_ENTRY",
						retryCount: 0,
					},
					success: true,
				},
				{
					name: "should accept with high retry count",
					input: {
						externalSystem: "ORACLE",
						recordId: "rec-005",
						recordType: "INVOICE",
						retryCount: 10,
					},
					success: true,
				},
				{
					name: "should accept with SUCCESS status",
					input: {
						externalSystem: "XERO",
						recordId: "rec-006",
						recordType: "PAYMENT",
						status: "SUCCESS",
					},
					success: true,
				},
				{
					name: "should accept with FAILED status",
					input: {
						externalSystem: "QUICKBOOKS",
						recordId: "rec-007",
						recordType: "INVOICE",
						status: "FAILED",
					},
					success: true,
				},
				{
					name: "should accept with only externalId as optional",
					input: {
						externalSystem: "XERO",
						recordId: "rec-008",
						recordType: "PAYMENT",
						externalId: "ext-456",
					},
					success: true,
				},
				{
					name: "should accept with complex JSON payloads",
					input: {
						externalSystem: "SAP",
						recordId: "rec-009",
						recordType: "INVOICE",
						requestPayload: '{"invoice":{"items":[{"id":1,"amount":100}]}}',
						responsePayload: '{"success":true,"data":{"id":"ext-789"}}',
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateAccountingSyncLogInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when externalSystem is missing",
					input: {
						recordId: "rec-001",
						recordType: "INVOICE",
					},
					success: false,
					error: {
						path: "externalSystem",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when recordId is missing",
					input: {
						externalSystem: "XERO",
						recordType: "INVOICE",
					},
					success: false,
					error: {
						path: "recordId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when recordType is missing",
					input: {
						externalSystem: "XERO",
						recordId: "rec-001",
					},
					success: false,
					error: {
						path: "recordType",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when externalSystem is not a string",
					input: {
						externalSystem: 123 as any,
						recordId: "rec-001",
						recordType: "INVOICE",
					},
					success: false,
					error: {
						path: "externalSystem",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when recordId is not a string",
					input: {
						externalSystem: "XERO",
						recordId: 456 as any,
						recordType: "INVOICE",
					},
					success: false,
					error: {
						path: "recordId",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when recordType is not a string",
					input: {
						externalSystem: "XERO",
						recordId: "rec-001",
						recordType: {} as any,
					},
					success: false,
					error: {
						path: "recordType",
						message: "Invalid input: expected string, received object",
					},
				},
				{
					name: "should reject when retryCount is not a number",
					input: {
						externalSystem: "XERO",
						recordId: "rec-001",
						recordType: "INVOICE",
						retryCount: "5" as any,
					},
					success: false,
					error: {
						path: "retryCount",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when errorMessage is not a string",
					input: {
						externalSystem: "XERO",
						recordId: "rec-001",
						recordType: "INVOICE",
						errorMessage: { error: "timeout" } as any,
					},
					success: false,
					error: {
						path: "errorMessage",
						message: "Invalid input: expected string, received object",
					},
				},
				{
					name: "should reject when requestPayload is not a string",
					input: {
						externalSystem: "XERO",
						recordId: "rec-001",
						recordType: "INVOICE",
						requestPayload: 123 as any,
					},
					success: false,
					error: {
						path: "requestPayload",
						message: "Invalid input: expected string, received number",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateAccountingSyncLogInputSchema().safeParse(
					testCase.input,
				);

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
