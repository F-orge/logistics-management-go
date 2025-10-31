import { describe, expect, it } from "bun:test";
import * as schema from "../../src/zod.schema";
import z from "zod";

type TestCase<T> = {
  name: String;
  input: T;
  success: boolean;
  error?: {
    path: string;
    message: string;
  };
};

describe("CRM Inputs", () => {
  describe("Product Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateProductInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateProductInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [
          {
            name: "Valid Product with all fields",
            input: {
              name: "Premium Laptop",
              sku: "SKU-1111",
              description: "High-performance laptop for professionals",
              price: 99999,
              type: "DIGITAL",
            },
            success: true,
          },
          {
            name: "Valid Product with minimum fields",
            input: {
              name: "Basic Widget",
              price: 2999,
              description: undefined,
              sku: undefined,
              type: undefined,
            },
            success: true,
          },
          {
            name: "Valid Product with zero price",
            input: {
              name: "Free Sample",
              price: 0,
              description: undefined,
              sku: undefined,
              type: undefined,
            },
            success: true,
          },
        ];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateProductInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [
          {
            name: "Product name required",
            input: {
              description: "My product",
              price: 1000,
            },
            success: false,
            error: {
              path: "name",
              message: "Invalid input: expected string, received undefined",
            },
          },
          {
            name: "Product price required",
            input: {
              name: "My product",
              description: "A product without price",
            },
            success: false,
            error: {
              path: "price",
              message: "Invalid input: expected number, received undefined",
            },
          },
          {
            name: "Product name must be string",
            input: {
              name: 12345 as any,
              price: 1000,
            },
            success: false,
            error: {
              path: "name",
              message: "Invalid input: expected string, received number",
            },
          },
          {
            name: "Product price must be number",
            input: {
              name: "My product",
              price: "1000" as any,
            },
            success: false,
            error: {
              path: "price",
              message: "Invalid input: expected number, received string",
            },
          },
        ];

        it.each(cases)("should reject: $name", (testCase) => {
          const { error } = schema
            .CreateProductInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
    describe("Update Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<UpdateSchema>[] = [
          {
            name: "Update product name only",
            input: {
              name: "Updated Product Name",
              description: undefined,
              price: undefined,
              sku: undefined,
              type: undefined,
            },
            success: true,
          },
          {
            name: "Update product price only",
            input: {
              price: 5999,
              name: undefined,
              description: undefined,
              sku: undefined,
              type: undefined,
            },
            success: true,
          },
          {
            name: "Update product with all fields",
            input: {
              name: "Updated Name",
              sku: "SKU-2222",
              description: "Updated description",
              price: 15999,
              type: "GOOD",
            },
            success: true,
          },
          {
            name: "Update with empty object (all optional)",
            input: {
              name: undefined,
              description: undefined,
              price: undefined,
              sku: undefined,
              type: undefined,
            },
            success: true,
          },
        ];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateProductInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [
          {
            name: "Update product name must be string",
            input: {
              name: 12345 as any,
            },
            success: false,
            error: {
              path: "name",
              message: "Invalid input: expected string, received number",
            },
          },
          {
            name: "Update product price must be number",
            input: {
              price: "5999" as any,
            },
            success: false,
            error: {
              path: "price",
              message: "Invalid input: expected number, received string",
            },
          },
        ];

        it.each(cases)("should reject: $name", (testCase) => {
          const { error } = schema
            .UpdateProductInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Attachment Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateAttachmentInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateAttachmentInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateAttachmentInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Campaign Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateCampaignInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateCampaignInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateCampaignInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Case Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateCaseInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateCaseInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateCaseInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Company Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateCompanyInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateCompanyInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateCompanyInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Contact Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateContactInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateContactInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateContactInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Interaction Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateInteractionInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateInteractionInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateInteractionInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Invoice Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateInvoiceInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateInvoiceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateInvoiceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Invoice Item Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateInvoiceItemInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateInvoiceItemInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateInvoiceItemInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Lead Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateLeadInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateLeadInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateLeadInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Notification Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateNotificationInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateNotificationInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateNotificationInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Opportunity Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateOpportunityInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateOpportunityInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateOpportunityInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });

  describe("Opportunity Product Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateOpportunityProductInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateOpportunityProductInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateOpportunityProductInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(false);

          const matchingError = error?.issues.find(
            (err) =>
              err.path[0] === testCase.error?.path &&
              err.message === testCase.error?.message
          );

          expect(matchingError).toBeDefined();
        });
      });
    });
  });
});
