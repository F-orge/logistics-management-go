import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreatePackageInputSchema,
	UpdatePackageInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreatePackageInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdatePackageInputSchema>>;

describe("Package Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreatePackageInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreatePackageInputSchema().safeParse(testCase.input);

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
				const { success } = UpdatePackageInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdatePackageInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(issue: any) =>
						issue.path[0] === testCase.error?.path &&
						issue.message === testCase.error?.message,
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
});
