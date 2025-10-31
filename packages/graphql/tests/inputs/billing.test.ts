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

describe("Billing Inputs", () => {
  describe("Account Transaction Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateAccountTransactionInputSchema>
    >;
    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateAccountTransactionInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateAccountTransactionInputSchema()
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

  describe("Accounting Sync Log Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateAccountingSyncLogInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateAccountingSyncLogInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateAccountingSyncLogInputSchema()
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

  describe("Client Account Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateClientAccountInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateClientAccountInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateClientAccountInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateClientAccountInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateClientAccountInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateClientAccountInputSchema()
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

  describe("Credit Note Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateCreditNoteInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateCreditNoteInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateCreditNoteInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateCreditNoteInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateCreditNoteInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateCreditNoteInputSchema()
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

  describe("Dispute Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateDisputeInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateDisputeInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateDisputeInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateDisputeInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateDisputeInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateDisputeInputSchema()
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

  describe("Document Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateDocumentInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateDocumentInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateDocumentInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateDocumentInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateDocumentInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateDocumentInputSchema()
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

  describe("Invoice Line Item Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateInvoiceLineItemInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateInvoiceLineItemInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateInvoiceLineItemInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateInvoiceLineItemInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateInvoiceLineItemInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateInvoiceLineItemInputSchema()
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

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateInvoiceInputSchema>
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
    describe("Update Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateInvoiceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateInvoiceInputSchema()
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

  describe("Payment Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreatePaymentInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdatePaymentInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreatePaymentInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreatePaymentInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdatePaymentInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdatePaymentInputSchema()
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

  describe("Quote Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateQuoteInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateQuoteInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateQuoteInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateQuoteInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateQuoteInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateQuoteInputSchema()
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

  describe("Rate Card Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateRateCardInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateRateCardInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateRateCardInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateRateCardInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateRateCardInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateRateCardInputSchema()
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

  describe("Rate Rule Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateRateRuleInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateRateRuleInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateRateRuleInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateRateRuleInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateRateRuleInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateRateRuleInputSchema()
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

  describe("Surcharge Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateSurchargeInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateSurchargeInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateSurchargeInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateSurchargeInputSchema()
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
        const cases: TestCase<UpdateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .UpdateSurchargeInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateSurchargeInputSchema()
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
