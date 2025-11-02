import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateNotificationInputSchema,
	UpdateNotificationInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateNotificationInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateNotificationInputSchema>>;

describe("Notification Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateNotificationInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateNotificationInputSchema().safeParse(
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
				const { success } = UpdateNotificationInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateNotificationInputSchema().safeParse(
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
