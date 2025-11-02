import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateInventoryAdjustmentInputSchema,
	UpdateInventoryAdjustmentInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<
	ReturnType<typeof CreateInventoryAdjustmentInputSchema>
>;

type UpdateSchema = z.infer<
	ReturnType<typeof UpdateInventoryAdjustmentInputSchema>
>;

describe("Inventory Adjustment Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						productId: "prod-1",
						quantityChange: 50,
						userId: "user-1",
						warehouseId: "wh-1",
					},
					success: true,
				},
				{
					name: "should accept negative quantity change",
					input: {
						productId: "prod-1",
						quantityChange: -25,
						userId: "user-1",
						warehouseId: "wh-1",
					},
					success: true,
				},
				{
					name: "should accept with reason",
					input: {
						productId: "prod-1",
						quantityChange: 100,
						userId: "user-1",
						warehouseId: "wh-1",
						reason: "CYCLE_COUNT",
					},
					success: true,
				},
				{
					name: "should accept with notes",
					input: {
						productId: "prod-1",
						quantityChange: 30,
						userId: "user-1",
						warehouseId: "wh-1",
						notes: "Damaged goods discovered during inventory check",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateInventoryAdjustmentInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when productId is missing",
					input: {
						quantityChange: 50,
						userId: "user-1",
						warehouseId: "wh-1",
					},
					success: false,
					error: {
						path: "productId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when quantityChange is missing",
					input: {
						productId: "prod-1",
						userId: "user-1",
						warehouseId: "wh-1",
					},
					success: false,
					error: {
						path: "quantityChange",
						message: "Invalid input: expected number, received undefined",
					},
				},
				{
					name: "should reject when userId is missing",
					input: {
						productId: "prod-1",
						quantityChange: 50,
						warehouseId: "wh-1",
					},
					success: false,
					error: {
						path: "userId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when warehouseId is missing",
					input: {
						productId: "prod-1",
						quantityChange: 50,
						userId: "user-1",
					},
					success: false,
					error: {
						path: "warehouseId",
						message: "Invalid input: expected string, received undefined",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateInventoryAdjustmentInputSchema().safeParse(
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
					name: "should accept notes update",
					input: { notes: "Updated reason for adjustment" },
					success: true,
				},
				{
					name: "should accept reason update",
					input: { reason: "DAMAGED_GOODS" },
					success: true,
				},
				{
					name: "should accept all fields",
					input: {
						notes: "Correction for previous entry",
						reason: "MANUAL_CORRECTION",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateInventoryAdjustmentInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when reason is invalid enum",
					input: { reason: "INVALID_REASON" as any },
					success: false,
					error: {
						path: "reason",
						message:
							'Invalid option: expected one of "CYCLE_COUNT"|"DAMAGED_GOODS"|"EXPIRED"|"MANUAL_CORRECTION"|"RETURN_TO_VENDOR"|"THEFT"',
					},
				},
				{
					name: "should reject when notes is not string",
					input: { notes: 123 as any },
					success: false,
					error: {
						path: "notes",
						message: "Invalid input: expected string, received number",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateInventoryAdjustmentInputSchema().safeParse(
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
