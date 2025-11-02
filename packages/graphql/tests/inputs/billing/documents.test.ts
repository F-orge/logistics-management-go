import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
	CreateDocumentInputSchema,
	UpdateDocumentInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateDocumentInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateDocumentInputSchema>>;

describe("Document Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: "invoice-001.pdf",
						filePath: "/documents/invoices/invoice-001.pdf",
						recordId: "inv-001",
						recordType: "Invoice",
					},
					success: true,
				},
				{
					name: "should accept all fields with complete data",
					input: {
						documentType: "PROOF_OF_DELIVERY",
						fileName: "pod-001.pdf",
						filePath: "/documents/pods/pod-001.pdf",
						fileSize: 2048576,
						mimeType: "application/pdf",
						recordId: "delivery-001",
						recordType: "DeliveryTask",
						uploadedByUserId: "user-123",
					},
					success: true,
				},
				{
					name: "should accept with zero file size",
					input: {
						documentType: "BOL",
						fileName: "bol.pdf",
						filePath: "/documents/bols/bol.pdf",
						fileSize: 0,
						recordId: "bol-001",
						recordType: "BillOfLading",
					},
					success: true,
				},
				{
					name: "should accept with mime type",
					input: {
						documentType: "PACKING_LIST",
						fileName: "packing-list.docx",
						filePath: "/documents/packing-lists/packing-list.docx",
						mimeType:
							"application/vnd.openxmlformats-officedocument.wordprocessingml.document",
						recordId: "pl-001",
						recordType: "PackingList",
					},
					success: true,
				},
				{
					name: "should accept with uploaded by user",
					input: {
						documentType: "CREDIT_NOTE",
						fileName: "credit-note.pdf",
						filePath: "/documents/credit-notes/credit-note.pdf",
						recordId: "cn-001",
						recordType: "CreditNote",
						uploadedByUserId: "user-456",
					},
					success: true,
				},
				{
					name: "should accept with receipt type",
					input: {
						documentType: "RECEIPT",
						fileName: "receipt.pdf",
						filePath: "/documents/receipts/receipt.pdf",
						recordId: "rcpt-001",
						recordType: "Receipt",
					},
					success: true,
				},
				{
					name: "should accept with customs declaration",
					input: {
						documentType: "CUSTOMS_DECLARATION",
						fileName: "customs.pdf",
						filePath: "/documents/customs/customs.pdf",
						recordId: "cust-001",
						recordType: "CustomsDeclaration",
					},
					success: true,
				},
				{
					name: "should accept with shipping label",
					input: {
						documentType: "SHIPPING_LABEL",
						fileName: "label.pdf",
						filePath: "/documents/labels/label.pdf",
						recordId: "lbl-001",
						recordType: "ShippingLabel",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateDocumentInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should reject when documentType is missing",
					input: {
						fileName: "invoice.pdf",
						filePath: "/documents/invoices/invoice.pdf",
						recordId: "inv-001",
						recordType: "Invoice",
					},
					success: false,
					error: {
						path: "documentType",
						message: "Invalid option",
					},
				},
				{
					name: "should reject when fileName is missing",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						filePath: "/documents/invoices/invoice.pdf",
						recordId: "inv-001",
						recordType: "Invoice",
					},
					success: false,
					error: {
						path: "fileName",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when fileName is not a string",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: 123 as any,
						filePath: "/documents/invoices/invoice.pdf",
						recordId: "inv-001",
						recordType: "Invoice",
					},
					success: false,
					error: {
						path: "fileName",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when filePath is missing",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: "invoice.pdf",
						recordId: "inv-001",
						recordType: "Invoice",
					},
					success: false,
					error: {
						path: "filePath",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when filePath is not a string",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: "invoice.pdf",
						filePath: {} as any,
						recordId: "inv-001",
						recordType: "Invoice",
					},
					success: false,
					error: {
						path: "filePath",
						message: "Invalid input: expected string, received object",
					},
				},
				{
					name: "should reject when recordId is missing",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: "invoice.pdf",
						filePath: "/documents/invoices/invoice.pdf",
						recordType: "Invoice",
					},
					success: false,
					error: {
						path: "recordId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when recordId is not a string",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: "invoice.pdf",
						filePath: "/documents/invoices/invoice.pdf",
						recordId: 999 as any,
						recordType: "Invoice",
					},
					success: false,
					error: {
						path: "recordId",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when recordType is missing",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: "invoice.pdf",
						filePath: "/documents/invoices/invoice.pdf",
						recordId: "inv-001",
					},
					success: false,
					error: {
						path: "recordType",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when recordType is not a string",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: "invoice.pdf",
						filePath: "/documents/invoices/invoice.pdf",
						recordId: "inv-001",
						recordType: [] as any,
					},
					success: false,
					error: {
						path: "recordType",
						message: "Invalid input: expected string, received array",
					},
				},
				{
					name: "should reject when fileSize is not a number",
					input: {
						documentType: "COMMERCIAL_INVOICE",
						fileName: "invoice.pdf",
						filePath: "/documents/invoices/invoice.pdf",
						fileSize: "2048" as any,
						recordId: "inv-001",
						recordType: "Invoice",
					},
					success: false,
					error: {
						path: "fileSize",
						message: "Invalid input: expected number, received string",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateDocumentInputSchema().safeParse(testCase.input);

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
					name: "should accept partial update with fileName",
					input: {
						fileName: "updated-invoice.pdf",
					},
					success: true,
				},
				{
					name: "should accept all fields for partial update",
					input: {
						documentType: "PROOF_OF_DELIVERY",
						fileName: "updated-pod.pdf",
						filePath: "/documents/pods/updated-pod.pdf",
						fileSize: 3145728,
						mimeType: "application/pdf",
						recordId: "delivery-002",
						recordType: "DeliveryTask",
						uploadedByUserId: "user-789",
					},
					success: true,
				},
				{
					name: "should accept updating filePath only",
					input: {
						filePath: "/documents/archived/invoice.pdf",
					},
					success: true,
				},
				{
					name: "should accept updating uploadedByUserId",
					input: {
						uploadedByUserId: "user-999",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateDocumentInputSchema().safeParse(
					testCase.input,
				);

				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject when fileName is not a string",
					input: {
						fileName: 123 as any,
					},
					success: false,
					error: {
						path: "fileName",
						message: "Invalid input: expected string, received number",
					},
				},
				{
					name: "should reject when filePath is not a string",
					input: {
						filePath: null as any,
					},
					success: false,
					error: {
						path: "filePath",
						message: "Invalid input: expected string, received null",
					},
				},
				{
					name: "should reject when fileSize is not a number",
					input: {
						fileSize: "2048" as any,
					},
					success: false,
					error: {
						path: "fileSize",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when recordId is not a string",
					input: {
						recordId: {} as any,
					},
					success: false,
					error: {
						path: "recordId",
						message: "Invalid input: expected string, received object",
					},
				},
				{
					name: "should reject when recordType is not a string",
					input: {
						recordType: 999 as any,
					},
					success: false,
					error: {
						path: "recordType",
						message: "Invalid input: expected string, received number",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateDocumentInputSchema().safeParse(testCase.input);

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
