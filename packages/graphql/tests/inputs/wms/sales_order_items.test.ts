import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateSalesOrderItemInputSchema,
	UpdateSalesOrderItemInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateSalesOrderItemInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateSalesOrderItemInputSchema>>;

describe("Sales Order Item Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateSalesOrderItemInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateSalesOrderItemInputSchema().safeParse(
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
			const cases: TestCase<Partial<UpdateSchema>>[] = [];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateSalesOrderItemInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateSalesOrderItemInputSchema().safeParse(
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
});
