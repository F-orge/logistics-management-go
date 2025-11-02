import { describe, expect, it } from "bun:test";
import type z from "zod";
import {
	CreateVehicleInputSchema,
	UpdateVehicleInputSchema,
} from "../../../src/zod.schema";
import type { TestCase } from "../helpers";

type CreateSchema = z.infer<ReturnType<typeof CreateVehicleInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateVehicleInputSchema>>;

describe("Vehicle Inputs", () => {
	describe("CreateVehicleInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<CreateSchema>>[] = [
				{
					name: "minimum valid vehicle - required fields only",
					input: {
						registrationNumber: "ABC-1234",
					},
					success: true,
				},
				{
					name: "with optional make",
					input: {
						registrationNumber: "XYZ-5678",
						make: "Toyota",
					},
					success: true,
				},
				{
					name: "with optional model",
					input: {
						registrationNumber: "DEF-9012",
						model: "Camry",
					},
					success: true,
				},
				{
					name: "with make and model",
					input: {
						registrationNumber: "GHI-3456",
						make: "Honda",
						model: "CR-V",
					},
					success: true,
				},
				{
					name: "with optional year",
					input: {
						registrationNumber: "JKL-7890",
						year: 2023,
					},
					success: true,
				},
				{
					name: "with optional VIN",
					input: {
						registrationNumber: "MNO-1234",
						vin: "1HGBH41JXMN109186",
					},
					success: true,
				},
				{
					name: "with optional status AVAILABLE",
					input: {
						registrationNumber: "PQR-5678",
						status: "AVAILABLE",
					},
					success: true,
				},
				{
					name: "with optional status ON_TRIP",
					input: {
						registrationNumber: "STU-9012",
						status: "ON_TRIP",
					},
					success: true,
				},
				{
					name: "with optional status IN_MAINTENANCE",
					input: {
						registrationNumber: "VWX-3456",
						status: "IN_MAINTENANCE",
					},
					success: true,
				},
				{
					name: "with optional capacityWeight",
					input: {
						registrationNumber: "YZA-7890",
						capacityWeight: 5000.0,
					},
					success: true,
				},
				{
					name: "with optional capacityVolume",
					input: {
						registrationNumber: "BCD-1234",
						capacityVolume: 25.5,
					},
					success: true,
				},
				{
					name: "with optional currentMileage",
					input: {
						registrationNumber: "EFG-5678",
						currentMileage: 150000,
					},
					success: true,
				},
				{
					name: "with optional lastMaintenanceDate",
					input: {
						registrationNumber: "HIJ-9012",
						lastMaintenanceDate: "2025-10-15",
					},
					success: true,
				},
				{
					name: "with all fields populated",
					input: {
						registrationNumber: "KLM-3456",
						make: "Volvo",
						model: "FH16",
						year: 2022,
						vin: "YV2FL53D962345678",
						status: "AVAILABLE",
						capacityWeight: 20000.0,
						capacityVolume: 100.0,
						currentMileage: 500000,
						lastMaintenanceDate: "2025-09-01",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = CreateVehicleInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for valid vehicle", () => {
				const validData = {
					registrationNumber: "TEST-123",
				};
				const result = CreateVehicleInputSchema().safeParse(validData);

				expect(result.success).toBe(true);
			});

			it("should return error when registrationNumber is missing", () => {
				const invalidData = {
					make: "Toyota",
				};
				const result = CreateVehicleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error for invalid status enum", () => {
				const invalidData = {
					registrationNumber: "ABC-1234",
					status: "INVALID_STATUS",
				};
				const result = CreateVehicleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});

			it("should return error when year has wrong type", () => {
				const invalidData = {
					registrationNumber: "ABC-1234",
					year: "2023",
				};
				const result = CreateVehicleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});

	describe("UpdateVehicleInputSchema", () => {
		describe("Valid Cases", () => {
			const cases: TestCase<Partial<UpdateSchema>>[] = [
				{
					name: "empty update - all fields optional",
					input: {},
					success: true,
				},
				{
					name: "update status to AVAILABLE",
					input: {
						status: "AVAILABLE",
					},
					success: true,
				},
				{
					name: "update currentMileage",
					input: {
						currentMileage: 200000,
					},
					success: true,
				},
				{
					name: "update registrationNumber",
					input: {
						registrationNumber: "NEW-9999",
					},
					success: true,
				},
				{
					name: "update all fields",
					input: {
						registrationNumber: "UPD-1234",
						make: "Updated Make",
						model: "Updated Model",
						year: 2024,
						vin: "NEWVIN1234567890",
						status: "AVAILABLE",
						capacityWeight: 15000.0,
						capacityVolume: 80.0,
						currentMileage: 250000,
						lastMaintenanceDate: "2025-11-01",
					},
					success: true,
				},
			];

			it.each(cases)("should validate: $name", (testCase) => {
				const { success } = UpdateVehicleInputSchema().safeParse(
					testCase.input,
				);

				expect(success).toBe(testCase.success);
			});
		});

		describe("SafeParse Tests", () => {
			it("should return success for empty update", () => {
				const result = UpdateVehicleInputSchema().safeParse({});
				expect(result.success).toBe(true);
			});

			it("should return error for invalid status", () => {
				const invalidData = {
					status: "INVALID",
				};
				const result = UpdateVehicleInputSchema().safeParse(invalidData);

				expect(result.success).toBe(false);
			});
		});
	});
});
