import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateCarrierInputSchema,
  UpdateCarrierInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateCarrierInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateCarrierInputSchema>>;

describe("Carrier Inputs", () => {
  describe("CreateCarrierInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [
        {
          name: "minimum valid carrier - required fields only",
          input: {
            name: "Express Logistics",
          },
          success: true,
        },
        {
          name: "with optional contactPerson",
          input: {
            name: "Fast Freight Inc",
            contactPerson: "John Smith",
          },
          success: true,
        },
        {
          name: "with optional contactPhone",
          input: {
            name: "Quick Delivery Co",
            contactPhone: "+1-555-123-4567",
          },
          success: true,
        },
        {
          name: "with optional contactEmail",
          input: {
            name: "Swift Transport",
            contactEmail: "contact@swift-transport.com",
          },
          success: true,
        },
        {
          name: "with optional servicesOffered",
          input: {
            name: "Comprehensive Logistics",
            servicesOffered: "Ground shipping, Air freight, International delivery",
          },
          success: true,
        },
        {
          name: "with all optional fields",
          input: {
            name: "Full Service Carrier",
            contactPerson: "Jane Doe",
            contactPhone: "+1-555-987-6543",
            contactEmail: "info@fullservice.com",
            servicesOffered: "Same-day delivery, Next-day delivery, Freight services",
          },
          success: true,
        },
        {
          name: "with short carrier name",
          input: {
            name: "ABC",
          },
          success: true,
        },
        {
          name: "with long carrier name",
          input: {
            name: "International Express Logistics and Freight Management Corporation",
          },
          success: true,
        },
        {
          name: "with complex contact person name",
          input: {
            name: "Global Shipping",
            contactPerson: "María José García-López",
          },
          success: true,
        },
        {
          name: "with international phone",
          input: {
            name: "International Carrier",
            contactPhone: "+44-20-7946-0958",
          },
          success: true,
        },
        {
          name: "with corporate email",
          input: {
            name: "Corporate Logistics",
            contactEmail: "logistics@corporate-solutions.co.uk",
          },
          success: true,
        },
        {
          name: "with long services description",
          input: {
            name: "Comprehensive Services",
            servicesOffered:
              "Ground shipping within continental US, Air freight for international destinations, Marine shipping, Rail transport, Warehousing and distribution, Last-mile delivery services, Real-time tracking",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateCarrierInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid carrier", () => {
        const validData = {
          name: "Test Carrier",
        };
        const result = CreateCarrierInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.name).toBe("Test Carrier");
        }
      });

      it("should return error when name is missing", () => {
        const invalidData = {
          contactPerson: "John Doe",
        };
        const result = CreateCarrierInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when name has wrong type", () => {
        const invalidData = {
          name: 12345,
        };
        const result = CreateCarrierInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when contactPerson has wrong type", () => {
        const invalidData = {
          name: "Carrier",
          contactPerson: 12345,
        };
        const result = CreateCarrierInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when contactEmail has wrong type", () => {
        const invalidData = {
          name: "Carrier",
          contactEmail: 12345,
        };
        const result = CreateCarrierInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });

  describe("UpdateCarrierInputSchema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [
        {
          name: "empty update - all fields optional",
          input: {},
          success: true,
        },
        {
          name: "update name only",
          input: {
            name: "Updated Carrier Name",
          },
          success: true,
        },
        {
          name: "update contactPerson only",
          input: {
            contactPerson: "New Contact",
          },
          success: true,
        },
        {
          name: "update contactPhone only",
          input: {
            contactPhone: "+1-555-999-8888",
          },
          success: true,
        },
        {
          name: "update contactEmail only",
          input: {
            contactEmail: "newemail@carrier.com",
          },
          success: true,
        },
        {
          name: "update servicesOffered only",
          input: {
            servicesOffered: "Updated services list",
          },
          success: true,
        },
        {
          name: "update multiple fields",
          input: {
            name: "Updated Carrier",
            contactPerson: "Updated Person",
            contactPhone: "+1-555-111-2222",
          },
          success: true,
        },
        {
          name: "update all fields",
          input: {
            name: "Fully Updated Carrier",
            contactPerson: "Full Name",
            contactPhone: "+1-555-333-4444",
            contactEmail: "full@updated.com",
            servicesOffered: "All services available",
          },
          success: true,
        },
      ];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdateCarrierInputSchema().safeParse(
          testCase.input
        );

        expect(success).toBe(testCase.success);
      });
    });

    describe("SafeParse Tests", () => {
      it("should return success for valid update", () => {
        const validData = {
          name: "Updated Carrier",
          contactEmail: "updated@email.com",
        };
        const result = UpdateCarrierInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
        if (result.success) {
          expect(result.data.name).toBe("Updated Carrier");
        }
      });

      it("should return success for empty update", () => {
        const validData = {};
        const result = UpdateCarrierInputSchema().safeParse(validData);

        expect(result.success).toBe(true);
      });

      it("should return error when name has wrong type", () => {
        const invalidData = {
          name: 12345,
        };
        const result = UpdateCarrierInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });

      it("should return error when contactPhone has wrong type", () => {
        const invalidData = {
          contactPhone: 12345,
        };
        const result = UpdateCarrierInputSchema().safeParse(invalidData);

        expect(result.success).toBe(false);
      });
    });
  });
});
