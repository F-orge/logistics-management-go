import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateInventoryBatchInputSchema,
	UpdateInventoryBatchInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateInventoryBatchInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateInventoryBatchInputSchema>>;

describe("Inventory Batch Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						batchNumber: "BATCH-001",
						productId: "prod-1",
					},
					success: true,
				},
				{
					name: "should accept with expiration date",
					input: {
						batchNumber: "BATCH-002",
						productId: "prod-1",
						expirationDate: new Date("2025-12-31"),
					},
					success: true,
				},
				{
					name: "should accept various batch number formats",
					input: {
						batchNumber: "LOT-2024-Q4-001",
						productId: "prod-2",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateInventoryBatchInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when batchNumber is missing",
					input: {
						productId: "prod-1",
					},
					success: false,
					error: {
						path: "batchNumber",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when productId is missing",
					input: {
						batchNumber: "BATCH-001",
					},
					success: false,
					error: {
						path: "productId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when batchNumber is not string",
					input: {
						batchNumber: 123 as any,
						productId: "prod-1",
					},
					success: false,
					error: {
						path: "batchNumber",
						message: "Invalid input: expected string, received number",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateInventoryBatchInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						err.message === testCase.error?.message,
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
					name: "should accept batchNumber update",
					input: { batchNumber: "BATCH-UPDATE-001" },
					success: true,
				},
				{
					name: "should accept expiration date update",
					input: { expirationDate: new Date("2026-06-30") },
					success: true,
				},
				{
					name: "should accept all fields",
					input: {
						batchNumber: "BATCH-003",
						expirationDate: new Date("2025-11-30"),
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateInventoryBatchInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when batchNumber is not string",
					input: { batchNumber: true as any },
					success: false,
					error: {
						path: "batchNumber",
						message: "Invalid input: expected string, received boolean",
					},
				},
				{
					name: "should reject when expirationDate is not date",
					input: { expirationDate: {} as any },
					success: false,
					error: {
						path: "expirationDate",
						message: "Invalid input: expected date",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateInventoryBatchInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						(testCase.error?.message === "" ||
							err.message.includes(testCase.error?.message || "")),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
});
