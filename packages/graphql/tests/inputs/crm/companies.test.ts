import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateCompanyInputSchema,
	UpdateCompanyInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateCompanyInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateCompanyInputSchema>>;

describe("Company Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid data with required name only",
					input: {
						name: "Acme Corporation",
					},
					success: true,
				},
				{
					name: "valid with full address",
					input: {
						name: "Tech Innovations Ltd",
						street: "123 Main Street",
						city: "San Francisco",
						state: "CA",
						postalCode: "94105",
						country: "USA",
					},
					success: true,
				},
				{
					name: "valid with all optional fields",
					input: {
						name: "Global Trading Inc",
						street: "456 Oak Avenue",
						city: "New York",
						state: "NY",
						postalCode: "10001",
						country: "United States",
						phoneNumber: "+1-555-123-4567",
						website: "https://www.example.com",
						industry: "Technology",
						annualRevenue: 5000000,
						ownerId: "owner-123",
					},
					success: true,
				},
				{
					name: "valid with zero annual revenue",
					input: {
						name: "Startup",
						annualRevenue: 0,
					},
					success: true,
				},
				{
					name: "valid with very large annual revenue",
					input: {
						name: "Fortune 500 Co",
						annualRevenue: 999999999999,
					},
					success: true,
				},
				{
					name: "valid with decimal annual revenue",
					input: {
						name: "Tech Corp",
						annualRevenue: 1234567.89,
					},
					success: true,
				},
				{
					name: "valid with special characters in name",
					input: {
						name: "O'Reilly & Associates, Inc.",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateCompanyInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "missing required name",
					input: {},
					success: false,
					error: { path: "name", message: "Required" },
				},
				{
					name: "name is not a string",
					input: {
						name: 123 as any,
					},
					success: false,
					error: { path: "name", message: "Expected string" },
				},
				{
					name: "annualRevenue is not a number",
					input: {
						name: "Company",
						annualRevenue: "one million" as any,
					},
					success: false,
					error: { path: "annualRevenue", message: "Expected number" },
				},
				{
					name: "city is not a string",
					input: {
						name: "Company",
						city: 123 as any,
					},
					success: false,
					error: { path: "city", message: "Expected string" },
				},
				{
					name: "multiple fields with invalid types",
					input: {
						name: 456 as any,
						city: ["San Francisco"] as any,
						annualRevenue: -5000,
					},
					success: false,
					error: { path: "name", message: "Expected string" },
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateCompanyInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						(err.code === "invalid_type" ||
							err.code === "too_small" ||
							err.message === testCase.error?.message),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
	describe("Update Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty object (all optional)",
					input: {},
					success: true,
				},
				{
					name: "update name only",
					input: {
						name: "New Company Name",
					},
					success: true,
				},
				{
					name: "update address fields",
					input: {
						street: "789 Broadway",
						city: "Los Angeles",
						state: "CA",
						postalCode: "90001",
						country: "USA",
					},
					success: true,
				},
				{
					name: "update business info",
					input: {
						phoneNumber: "+1-555-999-8888",
						website: "https://newsite.com",
						industry: "Finance",
						annualRevenue: 2500000,
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						name: "Updated Corp",
						street: "999 Park Ave",
						city: "Boston",
						state: "MA",
						postalCode: "02101",
						country: "USA",
						phoneNumber: "+1-617-555-1234",
						website: "https://updated.com",
						industry: "Consulting",
						annualRevenue: 5000000,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateCompanyInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "name is not a string",
					input: {
						name: 456 as any,
					},
					success: false,
					error: { path: "name", message: "Expected string" },
				},
				{
					name: "annualRevenue is not a number",
					input: {
						annualRevenue: "2000000" as any,
					},
					success: false,
					error: { path: "annualRevenue", message: "Expected number" },
				},
				{
					name: "city is not a string",
					input: {
						city: ["San Francisco"] as any,
					},
					success: false,
					error: { path: "city", message: "Expected string" },
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateCompanyInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						(err.code === "invalid_type" ||
							err.code === "too_small" ||
							err.message === testCase.error?.message),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
});
