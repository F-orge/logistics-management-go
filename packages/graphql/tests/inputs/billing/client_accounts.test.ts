import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateClientAccountInputSchema,
	UpdateClientAccountInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateClientAccountInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateClientAccountInputSchema>>;

describe("ClientAccount Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						clientId: "client-001",
					},
					success: true,
				},
				{
					name: "should accept all fields with complete data",
					input: {
						clientId: "client-002",
						availableCredit: 10000,
						creditLimit: 15000,
						currency: "USD",
						isCreditApproved: true,
						lastPaymentDate: "2024-01-10",
						paymentTermsDays: 30,
						walletBalance: 5000,
					},
					success: true,
				},
				{
					name: "should accept with zero available credit",
					input: {
						clientId: "client-003",
						availableCredit: 0,
					},
					success: true,
				},
				{
					name: "should accept with high credit limit",
					input: {
						clientId: "client-004",
						creditLimit: 1000000,
					},
					success: true,
				},
				{
					name: "should accept with different currency",
					input: {
						clientId: "client-005",
						currency: "EUR",
					},
					success: true,
				},
				{
					name: "should accept with credit not approved",
					input: {
						clientId: "client-006",
						isCreditApproved: false,
					},
					success: true,
				},
				{
					name: "should accept with various payment term days",
					input: {
						clientId: "client-007",
						paymentTermsDays: 60,
					},
					success: true,
				},
				{
					name: "should accept with zero wallet balance",
					input: {
						clientId: "client-008",
						walletBalance: 0,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateClientAccountInputSchema().safeParse(
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
						creditLimit: 10000,
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
					},
					success: false,
					error: {
						path: "clientId",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when availableCredit is not a number",
					input: {
						clientId: "client-001",
						availableCredit: "5000" as any,
					},
					success: false,
					error: {
						path: "availableCredit",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when creditLimit is not a number",
					input: {
						clientId: "client-001",
						creditLimit: {} as any,
					},
					success: false,
					error: {
						path: "creditLimit",
						message: "Invalid input: expected number, received object",
					},
				},
				{
					name: "should reject when currency is not a string",
					input: {
						clientId: "client-001",
						currency: 100 as any,
					},
					success: false,
					error: {
						path: "currency",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when isCreditApproved is not a boolean",
					input: {
						clientId: "client-001",
						isCreditApproved: "yes" as any,
					},
					success: false,
					error: {
						path: "isCreditApproved",
						message: "Invalid input: expected boolean, received string",
					},
				},
				{
					name: "should reject when paymentTermsDays is not a number",
					input: {
						clientId: "client-001",
						paymentTermsDays: "30" as any,
					},
					success: false,
					error: {
						path: "paymentTermsDays",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when walletBalance is not a number",
					input: {
						clientId: "client-001",
						walletBalance: [] as any,
					},
					success: false,
					error: {
						path: "walletBalance",
						message: "Invalid input: expected number, received array",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateClientAccountInputSchema().safeParse(
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
					name: "should accept partial update with credit limit",
					input: {
						creditLimit: 20000,
					},
					success: true,
				},
				{
					name: "should accept all fields for partial update",
					input: {
						availableCredit: 12000,
						creditLimit: 18000,
						currency: "GBP",
						isCreditApproved: true,
						lastPaymentDate: new Date("2024-01-15T10:00:00Z"),
						paymentTermsDays: 45,
						walletBalance: 6000,
					},
					success: true,
				},
				{
					name: "should accept updating credit approval status",
					input: {
						isCreditApproved: false,
					},
					success: true,
				},
				{
					name: "should accept updating wallet balance only",
					input: {
						walletBalance: 8500,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateClientAccountInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when creditLimit is not a number",
					input: {
						creditLimit: "20000" as any,
					},
					success: false,
					error: {
						path: "creditLimit",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when isCreditApproved is not a boolean",
					input: {
						isCreditApproved: 1 as any,
					},
					success: false,
					error: {
						path: "isCreditApproved",
						message: "Invalid input: expected boolean, received number",
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
					name: "should reject when paymentTermsDays is not a number",
					input: {
						paymentTermsDays: { days: 30 } as any,
					},
					success: false,
					error: {
						path: "paymentTermsDays",
						message: "Invalid input: expected number, received object",
					},
				},
				{
					name: "should reject when availableCredit is not a number",
					input: {
						availableCredit: true as any,
					},
					success: false,
					error: {
						path: "availableCredit",
						message: "Invalid input: expected number, received boolean",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateClientAccountInputSchema().safeParse(
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
