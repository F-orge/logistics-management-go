import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateLocationInputSchema,
	UpdateLocationInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateLocationInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateLocationInputSchema>>;

describe("Location Inputs", () => {
	describe("Create Schema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "should accept minimal required fields",
					input: {
						name: "Bin A1",
						type: "PICK_BIN",
						warehouseId: "wh-1",
					},
					success: true,
				},
				{
					name: "should accept all fields",
					input: {
						name: "Bulk Storage Area 1",
						type: "BULK_STORAGE",
						warehouseId: "wh-1",
						barcode: "LOC-001",
						level: 1,
						maxPallets: 10,
						maxWeight: 5000.0,
						maxVolume: 100.0,
						isPickable: true,
						isReceivable: true,
						hazmatApproved: false,
						temperatureControlled: false,
						xCoordinate: 10.5,
						yCoordinate: 20.3,
						zCoordinate: 5.0,
					},
					success: true,
				},
				{
					name: "should accept with parent location",
					input: {
						name: "Sublocation B2",
						type: "PACKING_STATION",
						warehouseId: "wh-1",
						parentLocationId: "loc-parent-1",
					},
					success: true,
				},
				{
					name: "should accept receiving dock type",
					input: {
						name: "Receiving Dock 1",
						type: "RECEIVING_DOCK",
						warehouseId: "wh-1",
						isReceivable: true,
					},
					success: true,
				},
				{
					name: "should accept cross dock location",
					input: {
						name: "Cross Dock Area",
						type: "CROSS_DOCK_AREA",
						warehouseId: "wh-1",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateLocationInputSchema().safeParse(
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
						type: "PICK_BIN",
						warehouseId: "wh-1",
					},
					success: false,
					error: {
						path: "name",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject when type is missing",
					input: {
						name: "Bin A1",
						warehouseId: "wh-1",
					},
					success: false,
					error: {
						path: "type",
						message:
							'Invalid option: expected one of "BULK_STORAGE"|"CROSS_DOCK_AREA"|"DAMAGED_GOODS"|"PACKING_STATION"|"PICK_BIN"|"QUALITY_CONTROL"|"RECEIVING_DOCK"|"RESERVE_STORAGE"|"RETURNS_AREA"|"STAGING_AREA"',
					},
				},
				{
					name: "should reject when warehouseId is missing",
					input: {
						name: "Bin A1",
						type: "PICK_BIN",
					},
					success: false,
					error: {
						path: "warehouseId",
						message: "Invalid input: expected string, received undefined",
					},
				},
				{
					name: "should reject invalid location type",
					input: {
						name: "Bin A1",
						type: "INVALID_TYPE" as any,
						warehouseId: "wh-1",
					},
					success: false,
					error: {
						path: "type",
						message:
							'Invalid option: expected one of "BULK_STORAGE"|"CROSS_DOCK_AREA"|"DAMAGED_GOODS"|"PACKING_STATION"|"PICK_BIN"|"QUALITY_CONTROL"|"RECEIVING_DOCK"|"RESERVE_STORAGE"|"RETURNS_AREA"|"STAGING_AREA"',
					},
				},
				{
					name: "should reject when maxPallets is not number",
					input: {
						name: "Bin A1",
						type: "PICK_BIN",
						warehouseId: "wh-1",
						maxPallets: "10" as any,
					},
					success: false,
					error: {
						path: "maxPallets",
						message: "Invalid input: expected number, received string",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = CreateLocationInputSchema().safeParse(testCase.input);
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
					input: { name: "Updated Location Name" },
					success: true,
				},
				{
					name: "should accept all fields",
					input: {
						name: "Updated Location",
						type: "RESERVE_STORAGE",
						barcode: "LOC-002",
						level: 2,
						maxPallets: 15,
						maxWeight: 6000.0,
						maxVolume: 120.0,
						isPickable: false,
						isReceivable: true,
						hazmatApproved: true,
						temperatureControlled: true,
						xCoordinate: 15.5,
						yCoordinate: 25.3,
						zCoordinate: 8.0,
					},
					success: true,
				},
				{
					name: "should accept partial update",
					input: {
						level: 3,
						isPickable: true,
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateLocationInputSchema().safeParse(
					testCase.input,
				);
				expect(testCase.success).toBe(success);
			});
		});
		describe("Invalid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "should reject invalid type enum",
					input: { type: "UNKNOWN" as any },
					success: false,
					error: {
						path: "type",
						message:
							'Invalid option: expected one of "BULK_STORAGE"|"CROSS_DOCK_AREA"|"DAMAGED_GOODS"|"PACKING_STATION"|"PICK_BIN"|"QUALITY_CONTROL"|"RECEIVING_DOCK"|"RESERVE_STORAGE"|"RETURNS_AREA"|"STAGING_AREA"',
					},
				},
				{
					name: "should reject when level is not number",
					input: { level: "1" as any },
					success: false,
					error: {
						path: "level",
						message: "Invalid input: expected number, received string",
					},
				},
				{
					name: "should reject when isPickable is not boolean",
					input: { isPickable: "yes" as any },
					success: false,
					error: {
						path: "isPickable",
						message: "Invalid input: expected boolean, received string",
					},
				},
			];

			it.each(cases)("should reject: $name", (testCase) => {
				const { error } = UpdateLocationInputSchema().safeParse(testCase.input);
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
