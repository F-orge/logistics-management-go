import { describe, test, expect } from "bun:test";
import { ZodError } from "zod";
import {
  billingRateCardSchema,
  billingRateCardInsertSchema,
  billingRateCardUpdateSchema,
} from "./rate_card";
import { BillingServiceTypeEnum } from "@/db/types";

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

describe("BillingRateCardSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Standard Rate Card",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
      },
      {
        name: "complete valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174001",
          createdAt: new Date("2023-01-01T10:00:00Z"),
          createdByUserId: "user-123",
          description: "Comprehensive rate card for all shipping services.",
          isActive: true,
          name: "Premium Shipping Rates 2024",
          serviceType: BillingServiceTypeEnum.Shipping,
          updatedAt: new Date("2023-01-01T11:00:00Z"),
          validFrom: new Date("2023-01-01T00:00:00Z"),
          validTo: new Date("2024-12-31T23:59:59Z"),
        },
      },
      {
        name: "all optional fields absent",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174002",
          name: "Basic Rate Card",
          serviceType: BillingServiceTypeEnum.Fulfillment,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
      },
      {
        name: "createdByUserId max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174003",
          name: "User ID Test",
          serviceType: BillingServiceTypeEnum.Customs,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          createdByUserId: "U".repeat(255),
        },
      },
      {
        name: "description max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174004",
          name: "Description Test",
          serviceType: BillingServiceTypeEnum.Handling,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          description: "D".repeat(1024),
        },
      },
      {
        name: "name max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174005",
          name: "N".repeat(255),
          serviceType: BillingServiceTypeEnum.Insurance,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
      },
      {
        name: "isActive false",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174006",
          name: "Inactive Rate",
          serviceType: BillingServiceTypeEnum.Packaging,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          isActive: false,
        },
      },
      {
        name: "validTo date present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174007",
          name: "Temporary Rate",
          serviceType: BillingServiceTypeEnum.Returns,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          validTo: new Date("2023-06-30T23:59:59Z"),
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingRateCardSchema.parse(input)).not.toThrow();
      const result = billingRateCardSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "missing id",
        input: {
          name: "Invalid Rate Card",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "invalid id format",
        input: {
          id: "invalid-uuid",
          name: "Invalid Rate Card",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid UUID",
      },
      {
        name: "missing name",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "name too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Name is required",
      },
      {
        name: "name too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "N".repeat(256),
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Name must be at most 255 characters",
      },
      {
        name: "missing serviceType",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Invalid Rate Card",
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid option",
      },
      {
        name: "invalid serviceType enum value",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Invalid Rate Card",
          serviceType: "invalid-service",
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid option",
      },
      {
        name: "missing validFrom",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Invalid Rate Card",
          serviceType: BillingServiceTypeEnum.Shipping,
        },
        expectedError: "Invalid input: expected date, received undefined",
      },
      {
        name: "invalid validFrom date format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Invalid Rate Card",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "createdByUserId too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "User ID Test",
          serviceType: BillingServiceTypeEnum.Customs,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          createdByUserId: "U".repeat(256),
        },
        expectedError: "Created by user ID must be at most 255 characters",
      },
      {
        name: "description too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Description Test",
          serviceType: BillingServiceTypeEnum.Handling,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          description: "D".repeat(1025),
        },
        expectedError: "Description must be at most 1024 characters",
      },
      {
        name: "invalid createdAt date format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Invalid Rate Card",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          createdAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "invalid updatedAt date format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Invalid Rate Card",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          updatedAt: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
      {
        name: "invalid validTo date format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Invalid Rate Card",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          validTo: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingRateCardSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingRateCardSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Valid Rate Card",
        serviceType: BillingServiceTypeEnum.Shipping,
        validFrom: new Date("2023-01-01T00:00:00Z"),
      };
      const result = billingRateCardSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "invalid-uuid",
        name: "Invalid Rate Card",
        serviceType: BillingServiceTypeEnum.Shipping,
        validFrom: new Date("2023-01-01T00:00:00Z"),
      };
      const result = billingRateCardSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("BillingRateCardInsertSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data (no id, createdAt, updatedAt)",
        input: {
          name: "New Insert Rate Card",
          serviceType: BillingServiceTypeEnum.Storage,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
      },
      {
        name: "complete valid data (no id, createdAt, updatedAt)",
        input: {
          createdByUserId: "user-insert",
          description: "Insertable rate card for storage services.",
          isActive: true,
          name: "Insertable Storage Rates",
          serviceType: BillingServiceTypeEnum.Storage,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          validTo: new Date("2024-12-31T23:59:59Z"),
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingRateCardInsertSchema.parse(input)).not.toThrow();
      const result = billingRateCardInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "should reject with id present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Insert Fail",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Unrecognized key: \"id\"",
      },
      {
        name: "should reject with createdAt present",
        input: {
          name: "Insert Fail",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          createdAt: new Date(),
        },
        expectedError: "Unrecognized key: \"createdAt\"",
      },
      {
        name: "should reject with updatedAt present",
        input: {
          name: "Insert Fail",
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
          updatedAt: new Date(),
        },
        expectedError: "Unrecognized key: \"updatedAt\"",
      },
      {
        name: "missing name",
        input: {
          serviceType: BillingServiceTypeEnum.Shipping,
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid input: expected string, received undefined",
      },
      {
        name: "missing serviceType",
        input: {
          name: "Insert Fail",
          validFrom: new Date("2023-01-01T00:00:00Z"),
        },
        expectedError: "Invalid option",
      },
      {
        name: "missing validFrom",
        input: {
          name: "Insert Fail",
          serviceType: BillingServiceTypeEnum.Shipping,
        },
        expectedError: "Invalid input: expected date, received undefined",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingRateCardInsertSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingRateCardInsertSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        name: "Valid Insert Rate Card",
        serviceType: BillingServiceTypeEnum.Shipping,
        validFrom: new Date("2023-01-01T00:00:00Z"),
      };
      const result = billingRateCardInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Invalid Insert Rate Card",
        serviceType: BillingServiceTypeEnum.Shipping,
        validFrom: new Date("2023-01-01T00:00:00Z"),
      };
      const result = billingRateCardInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("BillingRateCardUpdateSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "partial update: only name",
        input: {
          name: "Updated Rate Card Name",
        },
      },
      {
        name: "partial update: only serviceType",
        input: {
          serviceType: BillingServiceTypeEnum.Returns,
        },
      },
      {
        name: "partial update: all allowed fields",
        input: {
          createdByUserId: "user-update",
          description: "Updated description for the rate card.",
          isActive: false,
          name: "Updated Rate Card",
          serviceType: BillingServiceTypeEnum.Customs,
          validFrom: new Date("2023-02-01T00:00:00Z"),
          validTo: new Date("2024-11-30T23:59:59Z"),
        },
      },
      {
        name: "empty object (no changes)",
        input: {},
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => billingRateCardUpdateSchema.parse(input)).not.toThrow();
      const result = billingRateCardUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "should reject with id present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Update Fail",
        },
        expectedError: "Unrecognized key: \"id\"",
      },
      {
        name: "should reject with createdAt present",
        input: {
          name: "Update Fail",
          createdAt: new Date(),
        },
        expectedError: "Unrecognized key: \"createdAt\"",      },
      {
        name: "should reject with updatedAt present",
        input: {
          name: "Update Fail",
          updatedAt: new Date(),
        },
        expectedError: "Unrecognized key: \"updatedAt\"",      },
      {
        name: "name too long",
        input: {
          name: "N".repeat(256),
        },
        expectedError: "Name must be at most 255 characters",
      },
      {
        name: "invalid serviceType enum value",
        input: {
          serviceType: "invalid-service",
        },
        expectedError: "Invalid option",
      },
      {
        name: "invalid validFrom date format",
        input: {
          validFrom: "not-a-date",
        },
        expectedError: "Invalid input: expected date, received string",
      },
    ];

    test.each(invalidTestCases)("should reject: $name", ({ input, expectedError }) => {
      let error: ZodError | undefined;
      try {
        billingRateCardUpdateSchema.parse(input);
      } catch (e) {
        if (e instanceof ZodError) {
          error = e;
        }
      }
      expect(error).toBeInstanceOf(ZodError);
      expect(error?.issues[0].message).toContain(expectedError);
    });
  });

  describe("SafeParse Tests for billingRateCardUpdateSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        name: "Valid Update Rate Card",
      };
      const result = billingRateCardUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Invalid Update Rate Card",
      };
      const result = billingRateCardUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});