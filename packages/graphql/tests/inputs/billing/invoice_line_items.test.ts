import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
	CreateInvoiceLineItemInputSchema,
	UpdateInvoiceLineItemInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<
	ReturnType<typeof CreateInvoiceLineItemInputSchema>
>;

type UpdateSchema = z.infer<
	ReturnType<typeof UpdateInvoiceLineItemInputSchema>
>;

describe("InvoiceLineItem Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						description: "Product A",
						quantity: 10,
						unitPrice: 100,
					},
					success: true,
				},
				{
					name: "should accept all fields with complete data",
					input: {
						description: "Premium Service Package",
						discountRate: 10,
						quantity: 5,
						sourceRecordId: "srv-001",
						sourceRecordType: "Service",
						taxRate: 8,
						unitPrice: 500,
					},
					success: true,
				},
				{
					name: "should accept with zero quantity",
					input: {
						description: "Free item",
						quantity: 0,
						unitPrice: 50,
					},
					success: true,
				},
				{
					name: "should accept with zero unit price",
					input: {
						description: "Promotional item",
						quantity: 20,
						unitPrice: 0,
					},
					success: true,
				},
				{
					name: "should accept with discount rate",
					input: {
						description: "Bulk Order",
						discountRate: 15,
						quantity: 100,
						unitPrice: 25,
					},
					success: true,
				},
				{
					name: "should accept with tax rate",
					input: {
						description: "Taxable Product",
						quantity: 8,
						taxRate: 12,
						unitPrice: 200,
					},
					success: true,
				},
				{
					name: "should accept with source record",
					input: {
						description: "Item from catalog",
						quantity: 3,
						sourceRecordId: "prod-123",
						sourceRecordType: "Product",
						unitPrice: 300,
					},
					success: true,
				},
				{
					name: "should accept with high quantity and price",
					input: {
						description: "Large quantity order",
						quantity: 1000,
						unitPrice: 1000,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateInvoiceLineItemInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when description is missing",
					input: {
						quantity: 10,
						unitPrice: 100,
					},
					success: false,
					error: {
						path: "description",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when description is not a string",
					input: {
						description: 123 as any,
						quantity: 10,
						unitPrice: 100,
					},
					success: false,
					error: {
						path: "description",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when quantity is missing",
					input: {
						description: "Product",
						unitPrice: 100,
					},
					success: false,
					error: {
						path: "quantity",
						message: "Invalid input: expected number, received undefined",
					},
				},
				{
					name: "should reject when quantity is not a number",
					input: {
						description: "Product",
						quantity: "10" as any,
						unitPrice: 100,
					},
					success: false,
					error: {
						path: "quantity",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when unitPrice is missing",
					input: {
						description: "Product",
						quantity: 10,
					},
					success: false,
					error: {
						path: "unitPrice",
						message: "Invalid input: expected number, received undefined",
					},
				},
				{
					name: "should reject when unitPrice is not a number",
					input: {
						description: "Product",
						quantity: 10,
						unitPrice: "100" as any,
					},
					success: false,
					error: {
						path: "unitPrice",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when discountRate is not a number",
					input: {
						description: "Product",
						discountRate: "10" as any,
						quantity: 10,
						unitPrice: 100,
					},
					success: false,
					error: {
						path: "discountRate",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when taxRate is not a number",
					input: {
						description: "Product",
						quantity: 10,
						taxRate: true as any,
						unitPrice: 100,
					},
					success: false,
					error: {
						path: "taxRate",
						message: "Invalid input: expected number, received boolean",
					},
				},
				{
					name: "should reject when sourceRecordId is not a string",
					input: {
						description: "Product",
						quantity: 10,
						sourceRecordId: 123 as any,
						unitPrice: 100,
					},
					success: false,
					error: {
						path: "sourceRecordId",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when sourceRecordType is not a string",
					input: {
						description: "Product",
						quantity: 10,
						sourceRecordType: {} as any,
						unitPrice: 100,
					},
					success: false,
					error: {
						path: "sourceRecordType",
						message: "Invalid input: expected string, received object",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateInvoiceLineItemInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						err.message.includes(testCase.error?.message.split(",")[0] || ""),
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
					name: "should accept partial update with description",
					input: {
						description: "Updated Product",
					},
					success: true,
				},
				{
					name: "should accept all fields for partial update",
					input: {
						description: "Updated service",
						discountRate: 20,
						quantity: 15,
						taxRate: 10,
						unitPrice: 600,
					},
					success: true,
				},
				{
					name: "should accept updating quantity only",
					input: {
						quantity: 25,
					},
					success: true,
				},
				{
					name: "should accept updating discount rate",
					input: {
						discountRate: 5,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateInvoiceLineItemInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when description is not a string",
					input: {
						description: 123 as any,
					},
					success: false,
					error: {
						path: "description",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when quantity is not a number",
					input: {
						quantity: "20" as any,
					},
					success: false,
					error: {
						path: "quantity",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when discountRate is not a number",
					input: {
						discountRate: null as any,
					},
					success: false,
					error: {
						path: "discountRate",
						message: "Invalid input: expected number, received null",
					},
				},
				{
					name: "should reject when taxRate is not a number",
					input: {
						taxRate: "10" as any,
					},
					success: false,
					error: {
						path: "taxRate",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when unitPrice is not a number",
					input: {
						unitPrice: [] as any,
					},
					success: false,
					error: {
						path: "unitPrice",
						message: "Invalid input: expected number, received array",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateInvoiceLineItemInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(false);

				const matchingError = error?.issues.find(
					(err) =>
						err.path[0] === testCase.error?.path &&
						err.message.includes(testCase.error?.message.split(",")[0] || ""),
				);

				expect(matchingError).toBeDefined();
			});
		});
	});
});
