import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateInventoryStockInputSchema,
	UpdateInventoryStockInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateInventoryStockInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateInventoryStockInputSchema>>;

describe("Inventory Stock Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						quantity: 100,
						reservedQuantity: 20,
					},
					success: true,
				},
				{
					name: "should accept with batch id",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						quantity: 50,
						reservedQuantity: 0,
						batchId: "batch-1",
					},
					success: true,
				},
				{
					name: "should accept with status",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						quantity: 200,
						reservedQuantity: 50,
						status: "AVAILABLE",
					},
					success: true,
				},
				{
					name: "should accept zero quantities",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						quantity: 0,
						reservedQuantity: 0,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateInventoryStockInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when locationId is missing",
					input: {
						productId: "prod-1",
						quantity: 100,
						reservedQuantity: 20,
					},
					success: false,
					error: {
						path: "locationId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when productId is missing",
					input: {
						locationId: "loc-1",
						quantity: 100,
						reservedQuantity: 20,
					},
					success: false,
					error: {
						path: "productId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when quantity is missing",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						reservedQuantity: 20,
					},
					success: false,
					error: {
						path: "quantity",
						message: "Invalid input: expected number, received undefined",
					},
				},
				{
					name: "should reject when quantity is not number",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						quantity: "100" as any,
						reservedQuantity: 20,
					},
					success: false,
					error: {
						path: "quantity",
						message: "Invalid input: expected number, received string",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateInventoryStockInputSchema().safeParse(
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
					name: "should accept quantity update",
					input: { quantity: 150 },
					success: true,
				},
				{
					name: "should accept reserved quantity update",
					input: { reservedQuantity: 30 },
					success: true,
				},
				{
					name: "should accept status update",
					input: { status: "SHIPPED" },
					success: true,
				},
				{
					name: "should accept all fields",
					input: {
						quantity: 250,
						reservedQuantity: 75,
						status: "HOLD",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateInventoryStockInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when quantity is not number",
					input: { quantity: "200" as any },
					success: false,
					error: {
						path: "quantity",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject invalid status enum",
					input: { status: "INVALID_STATUS" as any },
					success: false,
					error: {
						path: "status",
						message:
							'Invalid option: expected one of "ALLOCATED"|"AVAILABLE"|"DAMAGED"|"EXPIRED"|"HOLD"|"QUARANTINE"|"SHIPPED"',
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateInventoryStockInputSchema().safeParse(
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
