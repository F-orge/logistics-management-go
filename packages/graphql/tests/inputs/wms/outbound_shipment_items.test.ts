import { describe, expect, it } from "bun:test";
import { TestCase } from "../helpers";
import {
  CreateOutboundShipmentItemInputSchema,
  UpdateOutboundShipmentItemInputSchema,
} from "../../../src/zod.schema";
import z from "zod";

type CreateSchema = z.infer<ReturnType<typeof CreateOutboundShipmentItemInputSchema>>;

type UpdateSchema = z.infer<ReturnType<typeof UpdateOutboundShipmentItemInputSchema>>;

describe("Outbound Shipment Item Inputs", () => {
  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = CreateOutboundShipmentItemInputSchema().safeParse(
          testCase.input
        );

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { error } = CreateOutboundShipmentItemInputSchema().safeParse(testCase.input);

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
        const { success } = UpdateOutboundShipmentItemInputSchema().safeParse(
          testCase.input
        );

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { error } = UpdateOutboundShipmentItemInputSchema().safeParse(testCase.input);

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
