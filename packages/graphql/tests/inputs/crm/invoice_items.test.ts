import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateInvoiceItemInputSchema,
  AddInvoiceItemInputSchema,
  UpdateInvoiceItemInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateInvoiceItemInputSchema>>;
type AddSchema = z.infer<ReturnType<typeof AddInvoiceItemInputSchema>>;
type UpdateSchema = z.infer<ReturnType<typeof UpdateInvoiceItemInputSchema>>;

describe("Invoice Item Inputs", () => {
  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateInvoiceItemInputSchema().safeParse(
          testCase.input
        );

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { error } = CreateInvoiceItemInputSchema().safeParse(testCase.input);

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

  describe("Add Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<AddSchema>>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = AddInvoiceItemInputSchema().safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<AddSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { error } = AddInvoiceItemInputSchema().safeParse(testCase.input);

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
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = UpdateInvoiceItemInputSchema().safeParse(
          testCase.input
        );

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { error } = UpdateInvoiceItemInputSchema().safeParse(testCase.input);

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
