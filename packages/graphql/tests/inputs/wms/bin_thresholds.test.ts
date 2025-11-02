import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateBinThresholdInputSchema,
	UpdateBinThresholdInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateBinThresholdInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateBinThresholdInputSchema>>;

describe("Bin Threshold Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						minQuantity: 10,
						maxQuantity: 100,
					},
					success: true,
				},
				{
					name: "should accept all fields",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						minQuantity: 5,
						maxQuantity: 500,
						alertThreshold: 20,
						reorderQuantity: 200,
						isActive: true,
					},
					success: true,
				},
				{
					name: "should accept with isActive false",
					input: {
						locationId: "loc-2",
						productId: "prod-2",
						minQuantity: 0,
						maxQuantity: 1000,
						isActive: false,
					},
					success: true,
				},
				{
					name: "should accept with alert threshold",
					input: {
						locationId: "loc-3",
						productId: "prod-3",
						minQuantity: 50,
						maxQuantity: 200,
						alertThreshold: 75,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateBinThresholdInputSchema().safeParse(
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
						minQuantity: 10,
						maxQuantity: 100,
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
						minQuantity: 10,
						maxQuantity: 100,
					},
					success: false,
					error: {
						path: "productId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when minQuantity is missing",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						maxQuantity: 100,
					},
					success: false,
					error: {
						path: "minQuantity",
						message: "Invalid input: expected number, received undefined",
					},
				},
				{
					name: "should reject when maxQuantity is missing",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						minQuantity: 10,
					},
					success: false,
					error: {
						path: "maxQuantity",
						message: "Invalid input: expected number, received undefined",
					},
				},
				{
					name: "should reject when minQuantity is not number",
					input: {
						locationId: "loc-1",
						productId: "prod-1",
						minQuantity: "10" as any,
						maxQuantity: 100,
					},
					success: false,
					error: {
						path: "minQuantity",
						message: "Invalid input: expected number, received string",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateBinThresholdInputSchema().safeParse(
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
					name: "should accept minQuantity only",
					input: { minQuantity: 15 },
					success: true,
				},
				{
					name: "should accept all fields",
					input: {
						minQuantity: 20,
						maxQuantity: 200,
						alertThreshold: 50,
						reorderQuantity: 100,
						isActive: true,
					},
					success: true,
				},
				{
					name: "should accept partial update",
					input: {
						maxQuantity: 500,
						alertThreshold: 100,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateBinThresholdInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when minQuantity is not number",
					input: { minQuantity: "50" as any },
					success: false,
					error: {
						path: "minQuantity",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when isActive is not boolean",
					input: { isActive: 1 as any },
					success: false,
					error: {
						path: "isActive",
						message: "Invalid input: expected boolean, received number",
					},
				},
				{
					name: "should reject when alertThreshold is not number",
					input: { alertThreshold: true as any },
					success: false,
					error: {
						path: "alertThreshold",
						message: "Invalid input: expected number, received boolean",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateBinThresholdInputSchema().safeParse(
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
