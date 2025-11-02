import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateCustomerTrackingLinkInputSchema,
  UpdateCustomerTrackingLinkInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateCustomerTrackingLinkInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateCustomerTrackingLinkInputSchema>>;

describe("Customer Tracking Link Inputs", () => {
  describe("CreateCustomerTrackingLinkInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid tracking link - required fields only",
          input: {
            deliveryTaskId: "task-123",
            trackingToken: "token-abc-def-ghi",
          },
          success: true,
        },
        {
          name: "with optional expiresAt",
          input: {
            deliveryTaskId: "task-456",
            trackingToken: "token-xyz-789",
            expiresAt: "2025-12-31T23:59:59Z",
          },
          success: true,
        },
        {
          name: "with short tracking token",
          input: {
            deliveryTaskId: "task-789",
            trackingToken: "abc",
          },
          success: true,
        },
        {
          name: "with long tracking token",
          input: {
            deliveryTaskId: "task-999",
            trackingToken:
              "very-long-tracking-token-with-many-characters-1234567890-abcdefghijklmnop",
          },
          success: true,
        },
        {
          name: "with future expiration date",
          input: {
            deliveryTaskId: "task-111",
            trackingToken: "token-future",
            expiresAt: "2026-06-30T12:00:00Z",
          },
          success: true,
        },
        {
          name: "with near-term expiration",
          input: {
            deliveryTaskId: "task-222",
            trackingToken: "token-short-lived",
            expiresAt: "2025-11-01T00:00:00Z",
          },
          success: true,
        },
        {
          name: "with UUID-style deliveryTaskId",
          input: {
            deliveryTaskId: "550e8400-e29b-41d4-a716-446655440000",
            trackingToken: "uuid-token",
          },
          success: true,
        },
        {
          name: "with UUID-style tracking token",
          input: {
            deliveryTaskId: "task-333",
            trackingToken: "550e8400-e29b-41d4-a716-446655440000",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateCustomerTrackingLinkInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid tracking link", () => {
        const validData = {
          deliveryTaskId: "task-valid",
          trackingToken: "token-valid",
        };
        const result =
          CreateCustomerTrackingLinkInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.deliveryTaskId).toBe("task-valid");
          expect(result.data.trackingToken).toBe("token-valid");
        }
      });

      it("should return error when deliveryTaskId is missing", () => {
        const invalidData = {
          trackingToken: "token-123",
        };
        const result =
          CreateCustomerTrackingLinkInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when trackingToken is missing", () => {
        const invalidData = {
          deliveryTaskId: "task-123",
        };
        const result =
          CreateCustomerTrackingLinkInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when deliveryTaskId has wrong type", () => {
        const invalidData = {
          deliveryTaskId: 12345,
          trackingToken: "token-123",
        };
        const result =
          CreateCustomerTrackingLinkInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when trackingToken has wrong type", () => {
        const invalidData = {
          deliveryTaskId: "task-123",
          trackingToken: 98765,
        };
        const result =
          CreateCustomerTrackingLinkInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when expiresAt has wrong type", () => {
        const invalidData = {
          deliveryTaskId: "task-123",
          trackingToken: "token-123",
          expiresAt: 12345,
        };
        const result =
          CreateCustomerTrackingLinkInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdateCustomerTrackingLinkInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update accessCount only",
          input: {
            accessCount: 5,
          },
          success: true,
        },
        {
          name: "update accessCount to zero",
          input: {
            accessCount: 0,
          },
          success: true,
        },
        {
          name: "update accessCount to high number",
          input: {
            accessCount: 1000,
          },
          success: true,
        },
        {
          name: "update isActive to true",
          input: {
            isActive: true,
          },
          success: true,
        },
        {
          name: "update isActive to false",
          input: {
            isActive: false,
          },
          success: true,
        },
        {
          name: "update expiresAt only",
          input: {
            expiresAt: "2026-01-15T10:30:00Z",
          },
          success: true,
        },
        {
          name: "update accessCount and isActive",
          input: {
            accessCount: 10,
            isActive: true,
          },
          success: true,
        },
        {
          name: "update all fields",
          input: {
            accessCount: 3,
            expiresAt: "2025-12-25T00:00:00Z",
            isActive: false,
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdateCustomerTrackingLinkInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid update", () => {
        const validData = {
          accessCount: 5,
          isActive: true,
        };
        const result =
          UpdateCustomerTrackingLinkInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.accessCount).toBe(5);
          expect(result.data.isActive).toBe(true);
        }
      });

      it("should return success for empty update", () => {
        const validData = {};
        const result =
          UpdateCustomerTrackingLinkInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when accessCount has wrong type", () => {
        const invalidData = {
          accessCount: "5",
        };
        const result =
          UpdateCustomerTrackingLinkInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when isActive has wrong type", () => {
        const invalidData = {
          isActive: "true",
        };
        const result =
          UpdateCustomerTrackingLinkInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when expiresAt has wrong type", () => {
        const invalidData = {
          expiresAt: 12345,
        };
        const result =
          UpdateCustomerTrackingLinkInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
