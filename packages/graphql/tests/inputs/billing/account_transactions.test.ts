import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import { CreateAccountTransactionInputSchema } from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<
	ReturnType<typeof CreateAccountTransactionInputSchema>
>;

describe("Account Transaction Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						amount: 100,
						clientAccountId: "acc-001",
						type: "DEBIT",
					},
					success: true,
				},
				{
					name: "should accept all fields with complete data",
					input: {
						amount: 500.5,
						clientAccountId: "acc-002",
						type: "CREDIT",
						description: "Payment received from client",
						processedByUserId: "user-123",
						referenceNumber: "REF-2024-001",
						runningBalance: 5000.5,
						sourceRecordId: "invoice-456",
						sourceRecordType: "INVOICE",
						transactionDate: "2024-01-15T10:30:00Z",
					},
					success: true,
				},
				{
					name: "should accept negative amount",
					input: {
						amount: -250.75,
						clientAccountId: "acc-003",
						type: "DEBIT",
					},
					success: true,
				},
				{
					name: "should accept zero amount",
					input: {
						amount: 0,
						clientAccountId: "acc-004",
						type: "ADJUSTMENT",
					},
					success: true,
				},
				{
					name: "should accept REFUND transaction type",
					input: {
						amount: 100,
						clientAccountId: "acc-005",
						type: "REFUND",
					},
					success: true,
				},
				{
					name: "should accept FEE transaction type",
					input: {
						amount: 50,
						clientAccountId: "acc-006",
						type: "FEE",
					},
					success: true,
				},
				{
					name: "should accept TOP_UP transaction type",
					input: {
						amount: 1000,
						clientAccountId: "acc-007",
						type: "TOP_UP",
					},
					success: true,
				},
				{
					name: "should accept large decimal amounts",
					input: {
						amount: 999999.99,
						clientAccountId: "acc-008",
						type: "CREDIT",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateAccountTransactionInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when amount is missing",
					input: {
						clientAccountId: "acc-001",
						type: "DEBIT",
					},
					success: false,
					error: {
						path: "amount",
						message: "Invalid input: expected number, received undefined",
					},
				},
				{
					name: "should reject when clientAccountId is missing",
					input: {
						amount: 100,
						type: "DEBIT",
					},
					success: false,
					error: {
						path: "clientAccountId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when type is missing",
					input: {
						amount: 100,
						clientAccountId: "acc-001",
					},
					success: false,
					error: {
						path: "type",
						message: "Invalid option: expected one of",
					},
				},
				{
					name: "should reject when amount is not a number",
					input: {
						amount: "100" as any,
						clientAccountId: "acc-001",
						type: "DEBIT",
					},
					success: false,
					error: {
						path: "amount",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when clientAccountId is not a string",
					input: {
						amount: 100,
						clientAccountId: 12345 as any,
						type: "DEBIT",
					},
					success: false,
					error: {
						path: "clientAccountId",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject invalid transaction type",
					input: {
						amount: 100,
						clientAccountId: "acc-001",
						type: "INVALID_TYPE" as any,
					},
					success: false,
					error: {
						path: "type",
						message: "Invalid option: expected one of",
					},
				},
				{
					name: "should reject when description is not a string",
					input: {
						amount: 100,
						clientAccountId: "acc-001",
						type: "DEBIT",
						description: 123 as any,
					},
					success: false,
					error: {
						path: "description",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when runningBalance is not a number",
					input: {
						amount: 100,
						clientAccountId: "acc-001",
						type: "DEBIT",
						runningBalance: "5000" as any,
					},
					success: false,
					error: {
						path: "runningBalance",
						message: "Invalid input: expected number, received string",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateAccountTransactionInputSchema().safeParse(
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
