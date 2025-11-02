import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
	CreateContactInputSchema,
	UpdateContactInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateContactInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateContactInputSchema>>;

describe("Contact Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid data with required fields only",
					input: {
						companyId: "comp-123",
						email: "john@example.com",
						name: "John Doe",
						ownerId: "owner-456",
					},
					success: true,
				},
				{
					name: "valid data with all fields",
					input: {
						companyId: "comp-123",
						email: "jane.doe@company.co.uk",
						name: "Jane Doe",
						ownerId: "owner-456",
						jobTitle: "Sales Manager",
						phoneNumber: "+1-555-123-4567",
					},
					success: true,
				},
				{
					name: "valid with long email address",
					input: {
						companyId: "comp-123",
						email:
							"very.long.email.address.with.special+tag@subdomain.example.com",
						name: "Person",
						ownerId: "owner-456",
					},
					success: true,
				},
				{
					name: "valid with minimal name",
					input: {
						companyId: "c1",
						email: "a@b.co",
						name: "A",
						ownerId: "o1",
					},
					success: true,
				},
				{
					name: "valid with only jobTitle optional",
					input: {
						companyId: "comp-123",
						email: "test@example.com",
						name: "Test User",
						ownerId: "owner-456",
						jobTitle: "Director",
					},
					success: true,
				},
				{
					name: "valid with only phoneNumber optional",
					input: {
						companyId: "comp-123",
						email: "test@example.com",
						name: "Test User",
						ownerId: "owner-456",
						phoneNumber: "+1-555-999-9999",
					},
					success: true,
				},
				{
					name: "valid with empty jobTitle string",
					input: {
						companyId: "comp-123",
						email: "test@example.com",
						name: "Test User",
						ownerId: "owner-456",
						jobTitle: "",
					},
					success: false,
				},
				{
					name: "valid with empty phoneNumber string",
					input: {
						companyId: "comp-123",
						email: "test@example.com",
						name: "Test User",
						ownerId: "owner-456",
						phoneNumber: "",
					},
					success: false,
				},
				{
					name: "valid with special characters in name",
					input: {
						companyId: "comp-123",
						email: "test@example.com",
						name: "José María O'Neill-Smith",
						ownerId: "owner-456",
					},
					success: true,
				},
				{
					name: "valid with numeric company and owner IDs",
					input: {
						companyId: "123456",
						email: "contact@firm.com",
						name: "Contact Name",
						ownerId: "789012",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateContactInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "missing companyId",
					input: {
						email: "john@example.com",
						name: "John Doe",
						ownerId: "owner-456",
					},
					success: false,
					error: { path: "companyId", message: "Required" },
				},
				{
					name: "missing email",
					input: {
						companyId: "comp-123",
						name: "John Doe",
						ownerId: "owner-456",
					},
					success: false,
					error: { path: "email", message: "Required" },
				},
				{
					name: "missing name",
					input: {
						companyId: "comp-123",
						email: "john@example.com",
						ownerId: "owner-456",
					},
					success: false,
					error: { path: "name", message: "Required" },
				},
				{
					name: "missing ownerId",
					input: {
						companyId: "comp-123",
						email: "john@example.com",
						name: "John Doe",
					},
					success: false,
					error: { path: "ownerId", message: "Required" },
				},
				{
					name: "companyId is number instead of string",
					input: {
						companyId: 123 as any,
						email: "john@example.com",
						name: "John Doe",
						ownerId: "owner-456",
					},
					success: false,
					error: { path: "companyId", message: "Expected string" },
				},
				{
					name: "email is number instead of string",
					input: {
						companyId: "comp-123",
						email: 12345 as any,
						name: "John Doe",
						ownerId: "owner-456",
					},
					success: false,
					error: { path: "email", message: "Expected string" },
				},
				{
					name: "name is number instead of string",
					input: {
						companyId: "comp-123",
						email: "john@example.com",
						name: 123 as any,
						ownerId: "owner-456",
					},
					success: false,
					error: { path: "name", message: "Expected string" },
				},
				{
					name: "ownerId is number instead of string",
					input: {
						companyId: "comp-123",
						email: "john@example.com",
						name: "John Doe",
						ownerId: 456 as any,
					},
					success: false,
					error: { path: "ownerId", message: "Expected string" },
				},

				{
					name: "jobTitle is not a string",
					input: {
						companyId: "comp-123",
						email: "john@example.com",
						name: "John Doe",
						ownerId: "owner-456",
						jobTitle: 123 as any,
					},
					success: false,
					error: { path: "jobTitle", message: "Expected string" },
				},
				{
					name: "phoneNumber is not a string",
					input: {
						companyId: "comp-123",
						email: "john@example.com",
						name: "John Doe",
						ownerId: "owner-456",
						phoneNumber: 1234567890 as any,
					},
					success: false,
					error: { path: "phoneNumber", message: "Expected string" },
				},
				{
					name: "extra unknown field",
					input: {
						companyId: "comp-123",
						email: "john@example.com",
						name: "John Doe",
						ownerId: "owner-456",
						unknownField: "should be ignored",
					} as any,
					success: true,
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateContactInputSchema().safeParse(testCase.input);

				if (testCase.success) {
					expect(error).toBeUndefined();
				} else {
					expect(testCase.success).toBe(false);

					const matchingError = error?.issues.find(
						(err) =>
							err.path[0] === testCase.error?.path &&
							err.code === "invalid_type",
					);

					expect(matchingError).toBeDefined();
				}
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
					name: "update email only",
					input: {
						email: "newemail@example.com",
					},
					success: true,
				},
				{
					name: "update name only",
					input: {
						name: "Updated Name",
					},
					success: true,
				},
				{
					name: "update jobTitle only",
					input: {
						jobTitle: "VP of Sales",
					},
					success: true,
				},
				{
					name: "update phoneNumber only",
					input: {
						phoneNumber: "+1-555-777-8888",
					},
					success: true,
				},
				{
					name: "update multiple fields",
					input: {
						email: "updated@example.com",
						name: "Updated Name",
						jobTitle: "New Job Title",
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						email: "all@example.com",
						name: "All Updated",
						jobTitle: "C-Level",
						phoneNumber: "+1-555-111-2222",
					},
					success: true,
				},
				{
					name: "clear optional fields with empty strings",
					input: {
						jobTitle: "",
						phoneNumber: "",
					},
					success: false,
				},
				{
					name: "update with special character email",
					input: {
						email: "user+tag@domain.co.uk",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateContactInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "email is not a string",
					input: {
						email: 12345 as any,
					},
					success: false,
					error: { path: "email", message: "Expected string" },
				},
				{
					name: "name is not a string",
					input: {
						name: true as any,
					},
					success: false,
					error: { path: "name", message: "Expected string" },
				},
				{
					name: "jobTitle is not a string",
					input: {
						jobTitle: { title: "Manager" } as any,
					},
					success: false,
					error: { path: "jobTitle", message: "Expected string" },
				},
				{
					name: "phoneNumber is not a string",
					input: {
						phoneNumber: ["555-1234"] as any,
					},
					success: false,
					error: { path: "phoneNumber", message: "Expected string" },
				},
				{
					name: "multiple invalid types",
					input: {
						email: 123 as any,
						name: false as any,
						jobTitle: null as any,
					},
					success: false,
					error: { path: "email", message: "Expected string" },
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateContactInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						(err.code === "invalid_type" ||
							err.message === testCase.error?.message),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
});
