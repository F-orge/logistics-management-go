import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateWarehouseInputSchema,
	UpdateWarehouseInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateWarehouseInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateWarehouseInputSchema>>;

describe("Warehouse Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: { name: "Main Warehouse" },
					success: true,
				},
				{
					name: "should accept all fields with complete data",
					input: {
						name: "Central Distribution Center",
						address: "123 Warehouse Ave",
						city: "Atlanta",
						state: "GA",
						country: "United States",
						postalCode: "30301",
						contactPerson: "John Smith",
						contactEmail: "john@warehouse.com",
						contactPhone: "+1-404-555-0100",
						timezone: "America/New_York",
						isActive: true,
					},
					success: true,
				},
				{
					name: "should accept isActive as false",
					input: {
						name: "Inactive Warehouse",
						isActive: false,
					},
					success: true,
				},
				{
					name: "should accept warehouse with address",
					input: {
						name: "Warehouse with Address",
						address: "456 Storage Lane",
					},
					success: true,
				},
				{
					name: "should accept warehouse with contact details",
					input: {
						name: "Contact Warehouse",
						contactPerson: "Jane Smith",
						contactEmail: "jane@warehouse.com",
						contactPhone: "+1-555-0100",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateWarehouseInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when name is missing",
					input: {
						address: "123 Warehouse Ave",
						city: "Atlanta",
					},
					success: false,
					error: {
						path: "name",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when isActive is not boolean",
					input: {
						name: "Warehouse",
						isActive: "yes" as any,
					},
					success: false,
					error: {
						path: "isActive",
						message: "Invalid input: expected boolean, received string",
					},
				},
				{
					name: "should reject when address is not string",
					input: {
						name: "Warehouse",
						address: 123 as any,
					},
					success: false,
					error: {
						path: "address",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when country is not string",
					input: {
						name: "Warehouse",
						country: {} as any,
					},
					success: false,
					error: {
						path: "country",
						message: "Invalid input: expected string, received object",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateWarehouseInputSchema().safeParse(
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
					name: "should accept name only",
					input: { name: "Updated Warehouse Name" },
					success: true,
				},
				{
					name: "should accept all fields for partial update",
					input: {
						name: "Updated Warehouse",
						address: "789 Distribution Blvd",
						city: "New York",
						state: "NY",
						country: "United States",
						postalCode: "10001",
						contactPerson: "Jane Doe",
						contactEmail: "jane@warehouse.com",
						contactPhone: "+1-212-555-0100",
						timezone: "America/New_York",
						isActive: true,
					},
					success: true,
				},
				{
					name: "should accept partial update with city and state",
					input: {
						city: "Chicago",
						state: "IL",
					},
					success: true,
				},
				{
					name: "should accept toggling isActive to false",
					input: { isActive: false },
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateWarehouseInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when isActive is not boolean",
					input: { isActive: "true" as any },
					success: false,
					error: {
						path: "isActive",
						message: "Invalid input: expected boolean, received string",
					},
				},
				{
					name: "should reject when address is not string",
					input: {
						address: 123 as any,
					},
					success: false,
					error: {
						path: "address",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when contactPhone is number",
					input: {
						contactPhone: 5551234567 as any,
					},
					success: false,
					error: {
						path: "contactPhone",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when timezone is number",
					input: {
						timezone: 123 as any,
					},
					success: false,
					error: {
						path: "timezone",
						message: "Invalid input: expected string, received number",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateWarehouseInputSchema().safeParse(
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
