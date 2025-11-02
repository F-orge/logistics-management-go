import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateLeadInputSchema,
	UpdateLeadInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateLeadInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateLeadInputSchema>>;

describe("Lead Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid with required fields only",
					input: {
						email: "prospect@example.com",
						name: "John Prospect",
						ownerId: "owner-123",
					},
					success: true,
				},
				{
					name: "valid with all optional fields",
					input: {
						email: "lead@company.com",
						name: "Jane Lead",
						ownerId: "owner-456",
						campaignId: "campaign-789",
						leadScore: 75,
						leadSource: "WEBSITE",
						status: "QUALIFIED",
					},
					success: true,
				},
				{
					name: "valid with leadScore of zero",
					input: {
						email: "test@test.com",
						name: "Test User",
						ownerId: "owner-1",
						leadScore: 0,
					},
					success: true,
				},
				{
					name: "valid with high leadScore",
					input: {
						email: "hot@lead.com",
						name: "Hot Lead",
						ownerId: "owner-1",
						leadScore: 100,
					},
					success: true,
				},
				{
					name: "valid with COLD leadSource",
					input: {
						email: "cold@example.com",
						name: "Cold Prospect",
						ownerId: "owner-1",
						leadSource: "COLD_CALL",
					},
					success: true,
				},
				{
					name: "valid with UNQUALIFIED status",
					input: {
						email: "unqualified@example.com",
						name: "Unqualified Lead",
						ownerId: "owner-1",
						status: "UNQUALIFIED",
					},
					success: true,
				},
				{
					name: "valid with CONVERTED status",
					input: {
						email: "converted@example.com",
						name: "Converted Lead",
						ownerId: "owner-1",
						status: "CONVERTED",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateLeadInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "missing email",
					input: {
						name: "John Prospect",
						ownerId: "owner-123",
					},
					success: false,
					error: { path: "email", message: "Required" },
				},
				{
					name: "missing name",
					input: {
						email: "prospect@example.com",
						ownerId: "owner-123",
					},
					success: false,
					error: { path: "name", message: "Required" },
				},
				{
					name: "missing ownerId",
					input: {
						email: "prospect@example.com",
						name: "John Prospect",
					},
					success: false,
					error: { path: "ownerId", message: "Required" },
				},
				{
					name: "email is not a string",
					input: {
						email: 12345 as any,
						name: "John Prospect",
						ownerId: "owner-123",
					},
					success: false,
					error: { path: "email", message: "Expected string" },
				},
				{
					name: "name is not a string",
					input: {
						email: "prospect@example.com",
						name: 123 as any,
						ownerId: "owner-123",
					},
					success: false,
					error: { path: "name", message: "Expected string" },
				},
				{
					name: "leadScore is not a number",
					input: {
						email: "prospect@example.com",
						name: "John Prospect",
						ownerId: "owner-123",
						leadScore: "high" as any,
					},
					success: false,
					error: { path: "leadScore", message: "Expected number" },
				},
				{
					name: "invalid leadSource enum",
					input: {
						email: "prospect@example.com",
						name: "John Prospect",
						ownerId: "owner-123",
						leadSource: "INVALID_SOURCE" as any,
					},
					success: false,
					error: { path: "leadSource", message: "Invalid enum value" },
				},
				{
					name: "invalid status enum",
					input: {
						email: "prospect@example.com",
						name: "John Prospect",
						ownerId: "owner-123",
						status: "INVALID_STATUS" as any,
					},
					success: false,
					error: { path: "status", message: "Invalid enum value" },
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateLeadInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						(err.code === "invalid_type" ||
							err.code === "too_small" ||
							err.code === "too_big" ||
							err.code === "invalid_value" ||
							err.code === "invalid_format" ||
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
					name: "update email only",
					input: {
						email: "newemail@example.com",
					},
					success: true,
				},
				{
					name: "update status only",
					input: {
						status: "QUALIFIED",
					},
					success: true,
				},
				{
					name: "update leadScore only",
					input: {
						leadScore: 85,
					},
					success: true,
				},
				{
					name: "update conversion details",
					input: {
						convertedAt: new Date("2024-01-15"),
						convertedCompanyId: "comp-123",
						convertedContactId: "contact-456",
						convertedOpportunityId: "opp-789",
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						email: "updated@example.com",
						name: "Updated Name",
						leadScore: 90,
						leadSource: "REFERRAL",
						status: "CONVERTED",
						convertedAt: new Date("2024-01-15"),
						convertedCompanyId: "comp-1",
						convertedContactId: "contact-1",
						convertedOpportunityId: "opp-1",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateLeadInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "email is not a string",
					input: {
						email: 123 as any,
					},
					success: false,
					error: { path: "email", message: "Expected string" },
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
					name: "leadScore is not a number",
					input: {
						leadScore: "high" as any,
					},
					success: false,
					error: { path: "leadScore", message: "Expected number" },
				},
				{
					name: "invalid status enum",
					input: {
						status: "UNKNOWN" as any,
					},
					success: false,
					error: { path: "status", message: "Invalid enum value" },
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateLeadInputSchema().safeParse(testCase.input);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						(err.code === "invalid_type" ||
							err.code === "too_small" ||
							err.code === "too_big" ||
							err.code === "invalid_value" ||
							err.code === "invalid_format" ||
							err.message === testCase.error?.message),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
});
