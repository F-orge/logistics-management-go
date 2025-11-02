import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
	CreateOpportunityInputSchema,
	UpdateOpportunityInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateOpportunityInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateOpportunityInputSchema>>;

describe("Opportunity Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid with required fields (ADVERTISMENT source)",
					input: {
						name: "Deal Alpha",
						ownerId: "owner-123",
						source: "ADVERTISMENT",
						stage: "PROSPECTING",
						products: [],
					},
					success: true,
				},
				{
					name: "valid with COLD_CALL source",
					input: {
						name: "Enterprise Solution",
						ownerId: "owner-456",
						source: "COLD_CALL",
						stage: "QUALIFICATION",
						products: [
							{
								productId: "prod-789",
								quantity: 5,
							},
						],
					},
					success: true,
				},
				{
					name: "valid with multiple products and EMAIL_CAMPAIGN source",
					input: {
						name: "Multi-Product Deal",
						ownerId: "owner-1",
						source: "EMAIL_CAMPAIGN",
						stage: "PROPOSAL",
						products: [
							{ productId: "prod-1", quantity: 10 },
							{ productId: "prod-2", quantity: 5 },
							{ productId: "prod-3", quantity: 1 },
						],
					},
					success: true,
				},
				{
					name: "valid with all optional fields and PARTNER source",
					input: {
						name: "Large Enterprise Deal",
						ownerId: "owner-1",
						source: "PARTNER",
						stage: "CLOSED_WON",
						products: [{ productId: "prod-100", quantity: 100 }],
						campaignId: "camp-1",
						companyId: "comp-1",
						contactId: "contact-1",
						dealValue: 500000,
						expectedCloseDate: new Date("2024-12-31"),
						probability: 0.95,
					},
					success: true,
				},
				{
					name: "valid with CLOSED_LOST stage and lostReason",
					input: {
						name: "Lost Deal",
						ownerId: "owner-1",
						source: "REFERRAL",
						stage: "CLOSED_LOST",
						products: [],
						lostReason: "Price sensitivity",
					},
					success: true,
				},
				{
					name: "valid with EVENT source and probability zero",
					input: {
						name: "Low Probability Deal",
						ownerId: "owner-1",
						source: "EVENT",
						stage: "PROSPECTING",
						products: [],
						probability: 0,
					},
					success: true,
				},
				{
					name: "valid with EXISTING_CUSTOMER source and high dealValue",
					input: {
						name: "Expansion Deal",
						ownerId: "owner-1",
						source: "EXISTING_CUSTOMER",
						stage: "CLOSED_WON",
						products: [],
						dealValue: 1000000,
						probability: 1,
					},
					success: true,
				},
				{
					name: "valid with OTHER source and DEMO stage",
					input: {
						name: "Demo Deal",
						ownerId: "owner-2",
						source: "OTHER",
						stage: "DEMO",
						products: [],
					},
					success: true,
				},
				{
					name: "valid with WEBSITE source and NEED_ANALYSIS stage",
					input: {
						name: "Web Lead Deal",
						ownerId: "owner-3",
						source: "WEBSITE",
						stage: "NEED_ANALYSIS",
						products: [],
					},
					success: true,
				},
				{
					name: "valid with SOCIAL_MEDIA source and NEGOTIATION stage",
					input: {
						name: "Social Lead Deal",
						ownerId: "owner-4",
						source: "SOCIAL_MEDIA",
						stage: "NEGOTIATION",
						products: [],
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateOpportunityInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "missing name",
					input: {
						ownerId: "owner-123",
						source: "PARTNER",
						stage: "PROSPECTING",
						products: [],
					},
					success: false,
					error: { path: "name", message: "Required" },
				},
				{
					name: "missing ownerId",
					input: {
						name: "Deal",
						source: "PARTNER",
						stage: "PROSPECTING",
						products: [],
					},
					success: false,
					error: { path: "ownerId", message: "Required" },
				},
				{
					name: "missing source",
					input: {
						name: "Deal",
						ownerId: "owner-123",
						stage: "PROSPECTING",
						products: [],
					},
					success: false,
					error: { path: "source", message: "Required" },
				},
				{
					name: "missing stage",
					input: {
						name: "Deal",
						ownerId: "owner-123",
						source: "PARTNER",
						products: [],
					},
					success: false,
					error: { path: "stage", message: "Required" },
				},
				{
					name: "missing products array",
					input: {
						name: "Deal",
						ownerId: "owner-123",
						source: "PARTNER",
						stage: "PROSPECTING",
					},
					success: false,
					error: { path: "products", message: "Required" },
				},
				{
					name: "invalid source enum",
					input: {
						name: "Deal",
						ownerId: "owner-123",
						source: "INVALID_SOURCE" as any,
						stage: "PROSPECTING",
						products: [],
					},
					success: false,
					error: { path: "source", message: "Invalid enum value" },
				},
				{
					name: "invalid stage enum",
					input: {
						name: "Deal",
						ownerId: "owner-123",
						source: "PARTNER",
						stage: "INVALID_STAGE" as any,
						products: [],
					},
					success: false,
					error: { path: "stage", message: "Invalid enum value" },
				},
				{
					name: "products is not an array",
					input: {
						name: "Deal",
						ownerId: "owner-123",
						source: "PARTNER",
						stage: "PROSPECTING",
						products: "invalid" as any,
					},
					success: false,
					error: { path: "products", message: "Expected array" },
				},
				{
					name: "name is not a string",
					input: {
						name: 123 as any,
						ownerId: "owner-123",
						source: "PARTNER",
						stage: "PROSPECTING",
						products: [],
					},
					success: false,
					error: { path: "name", message: "Expected string" },
				},
				{
					name: "ownerId is not a string",
					input: {
						name: "Deal",
						ownerId: 123 as any,
						source: "PARTNER",
						stage: "PROSPECTING",
						products: [],
					},
					success: false,
					error: { path: "ownerId", message: "Expected string" },
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateOpportunityInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						(err.code === "invalid_type" ||
							err.code === "too_small" ||
							err.code === "too_big" ||
							err.code === "invalid_value" ||
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
						name: "Updated Deal Name",
					},
					success: true,
				},
				{
					name: "update stage only",
					input: {
						stage: "NEGOTIATION",
					},
					success: true,
				},
				{
					name: "update probability",
					input: {
						probability: 0.75,
					},
					success: true,
				},
				{
					name: "update deal value",
					input: {
						dealValue: 750000,
					},
					success: true,
				},
				{
					name: "update source",
					input: {
						source: "REFERRAL",
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						name: "Updated Opportunity",
						dealValue: 1000000,
						expectedCloseDate: new Date("2024-06-30"),
						lostReason: "Budget cut",
						probability: 0.5,
						source: "PARTNER",
						stage: "PROPOSAL",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateOpportunityInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "invalid stage enum",
					input: {
						stage: "UNKNOWN" as any,
					},
					success: false,
					error: { path: "stage", message: "Invalid enum value" },
				},
				{
					name: "invalid source enum",
					input: {
						source: "INVALID_SOURCE" as any,
					},
					success: false,
					error: { path: "source", message: "Invalid enum value" },
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
					name: "dealValue is not a number",
					input: {
						dealValue: "not a number" as any,
					},
					success: false,
					error: { path: "dealValue", message: "Expected number" },
				},
				{
					name: "probability is not a number",
					input: {
						probability: "not a number" as any,
					},
					success: false,
					error: { path: "probability", message: "Expected number" },
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateOpportunityInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						(err.code === "invalid_type" ||
							err.code === "too_small" ||
							err.code === "too_big" ||
							err.code === "invalid_value" ||
							err.message === testCase.error?.message),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
});
