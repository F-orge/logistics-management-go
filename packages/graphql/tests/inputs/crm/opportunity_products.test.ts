import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	AddOpportunityProductInputSchema,
	CreateOpportunityProductInputSchema,
	UpdateOpportunityProductInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<
	ReturnType<typeof CreateOpportunityProductInputSchema>
>;
type AddSchema = z.infer<ReturnType<typeof AddOpportunityProductInputSchema>>;
type UpdateSchema = z.infer<
	ReturnType<typeof UpdateOpportunityProductInputSchema>
>;

describe("Opportunity Product Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateOpportunityProductInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateOpportunityProductInputSchema().safeParse(
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

	describe("Add Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<AddSchema>>[] = [];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = AddOpportunityProductInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<AddSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = AddOpportunityProductInputSchema().safeParse(
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
				const { success } = UpdateOpportunityProductInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateOpportunityProductInputSchema().safeParse(
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
