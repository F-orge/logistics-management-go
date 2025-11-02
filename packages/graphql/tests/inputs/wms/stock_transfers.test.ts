import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateStockTransferInputSchema,
  UpdateStockTransferInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateStockTransferInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateStockTransferInputSchema>>;

describe("Stock Transfer Inputs", () => {
  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateStockTransferInputSchema().safeParse(
          testCase.input
        );

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { error } = CreateStockTransferInputSchema().safeParse(testCase.input);

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
        const { success } = UpdateStockTransferInputSchema().safeParse(
          testCase.input
        );

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { error } = UpdateStockTransferInputSchema().safeParse(testCase.input);

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
