import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateCreditNoteInputSchema,
	UpdateCreditNoteInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateCreditNoteInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateCreditNoteInputSchema>>;

describe("CreditNote Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						amount: 1000,
						creditNoteNumber: "CN-001",
						invoiceId: "inv-001",
						issueDate: "2024-01-15",
						reason: "Damaged goods",
					},
					success: true,
				},
				{
					name: "should accept all fields with complete data",
					input: {
						amount: 5000,
						appliedAt: "2024-01-20",
						createdByUserId: "user-123",
						creditNoteNumber: "CN-002",
						currency: "USD",
						disputeId: "disp-001",
						invoiceId: "inv-002",
						issueDate: "2024-01-15",
						notes: "Full refund for service",
						reason: "Service not provided",
					},
					success: true,
				},
				{
					name: "should accept with zero amount",
					input: {
						amount: 0,
						creditNoteNumber: "CN-003",
						invoiceId: "inv-003",
						issueDate: "2024-01-15",
						reason: "Adjustment",
					},
					success: true,
				},
				{
					name: "should accept with high amount",
					input: {
						amount: 1000000,
						creditNoteNumber: "CN-004",
						invoiceId: "inv-004",
						issueDate: "2024-01-15",
						reason: "Bulk discount",
					},
					success: true,
				},
				{
					name: "should accept with different currency",
					input: {
						amount: 2000,
						creditNoteNumber: "CN-005",
						currency: "EUR",
						invoiceId: "inv-005",
						issueDate: "2024-01-15",
						reason: "Return",
					},
					success: true,
				},
				{
					name: "should accept with dispute reference",
					input: {
						amount: 1500,
						creditNoteNumber: "CN-006",
						disputeId: "disp-002",
						invoiceId: "inv-006",
						issueDate: "2024-01-15",
						reason: "Dispute resolution",
					},
					success: true,
				},
				{
					name: "should accept with notes",
					input: {
						amount: 3000,
						creditNoteNumber: "CN-007",
						invoiceId: "inv-007",
						issueDate: "2024-01-15",
						notes: "Partial refund for damaged items",
						reason: "Damage",
					},
					success: true,
				},
				{
					name: "should accept with applied date",
					input: {
						amount: 2500,
						appliedAt: "2024-01-25",
						creditNoteNumber: "CN-008",
						invoiceId: "inv-008",
						issueDate: "2024-01-15",
						reason: "Credit applied",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateCreditNoteInputSchema().safeParse(
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
						creditNoteNumber: "CN-001",
						invoiceId: "inv-001",
						issueDate: "2024-01-15",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "amount",
						message: "Invalid input: expected number, received undefined",
					},
				},
				{
					name: "should reject when amount is not a number",
					input: {
						amount: "5000" as any,
						creditNoteNumber: "CN-001",
						invoiceId: "inv-001",
						issueDate: "2024-01-15",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "amount",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when creditNoteNumber is missing",
					input: {
						amount: 1000,
						invoiceId: "inv-001",
						issueDate: "2024-01-15",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "creditNoteNumber",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when creditNoteNumber is not a string",
					input: {
						amount: 1000,
						creditNoteNumber: 123 as any,
						invoiceId: "inv-001",
						issueDate: "2024-01-15",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "creditNoteNumber",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when invoiceId is missing",
					input: {
						amount: 1000,
						creditNoteNumber: "CN-001",
						issueDate: "2024-01-15",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "invoiceId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when invoiceId is not a string",
					input: {
						amount: 1000,
						creditNoteNumber: "CN-001",
						invoiceId: {} as any,
						issueDate: "2024-01-15",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "invoiceId",
						message: "Invalid input: expected string, received object",
					},
				},
				{
					name: "should reject when issueDate is missing",
					input: {
						amount: 1000,
						creditNoteNumber: "CN-001",
						invoiceId: "inv-001",
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "issueDate",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when issueDate is not a string",
					input: {
						amount: 1000,
						creditNoteNumber: "CN-001",
						invoiceId: "inv-001",
						issueDate: 12345 as any,
						reason: "Damaged",
					},
					success: false,
					error: {
						path: "issueDate",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when reason is missing",
					input: {
						amount: 1000,
						creditNoteNumber: "CN-001",
						invoiceId: "inv-001",
						issueDate: "2024-01-15",
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
						amount: 1000,
						creditNoteNumber: "CN-001",
						invoiceId: "inv-001",
						issueDate: "2024-01-15",
						reason: true as any,
					},
					success: false,
					error: {
						path: "reason",
						message: "Invalid input: expected string, received boolean",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateCreditNoteInputSchema().safeParse(
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
	describe("Update Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should accept empty object",
					input: {},
					success: true,
				},
				{
					name: "should accept partial update with amount",
					input: {
						amount: 2000,
					},
					success: true,
				},
				{
					name: "should accept all fields for partial update",
					input: {
						amount: 3000,
						appliedAt: "2024-01-25",
						creditNoteNumber: "CN-009",
						currency: "GBP",
						notes: "Updated credit note",
						reason: "Updated reason",
					},
					success: true,
				},
				{
					name: "should accept updating reason only",
					input: {
						reason: "New reason",
					},
					success: true,
				},
				{
					name: "should accept updating applied date",
					input: {
						appliedAt: "2024-02-01",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateCreditNoteInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when amount is not a number",
					input: {
						amount: "3000" as any,
					},
					success: false,
					error: {
						path: "amount",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when creditNoteNumber is not a string",
					input: {
						creditNoteNumber: 999 as any,
					},
					success: false,
					error: {
						path: "creditNoteNumber",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when currency is not a string",
					input: {
						currency: null as any,
					},
					success: false,
					error: {
						path: "currency",
						message: "Invalid input: expected string, received null",
					},
				},
				{
					name: "should reject when reason is not a string",
					input: {
						reason: [] as any,
					},
					success: false,
					error: {
						path: "reason",
						message: "Invalid input: expected string, received array",
					},
				},
				{
					name: "should reject when notes is not a string",
					input: {
						notes: 123 as any,
					},
					success: false,
					error: {
						path: "notes",
						message: "Invalid input: expected string, received number",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateCreditNoteInputSchema().safeParse(
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
