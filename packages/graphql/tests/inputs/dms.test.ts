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

describe("DMS Inputs", () => {
  describe("Customer Tracking Link Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateCustomerTrackingLinkInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateCustomerTrackingLinkInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateCustomerTrackingLinkInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateCustomerTrackingLinkInputSchema()
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

  describe("Delivery Route Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateDeliveryRouteInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateDeliveryRouteInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateDeliveryRouteInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateDeliveryRouteInputSchema()
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
            .UpdateDeliveryRouteInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateDeliveryRouteInputSchema()
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

describe("Delivery Task Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateDeliveryTaskInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateDeliveryTaskInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateDeliveryTaskInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateDeliveryTaskInputSchema()
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
          .UpdateDeliveryTaskInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateDeliveryTaskInputSchema()
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

describe("Driver Location Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateDriverLocationInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateDriverLocationInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateDriverLocationInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateDriverLocationInputSchema()
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
          .UpdateDriverLocationInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateDriverLocationInputSchema()
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

describe("Proof Of Delivery Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateProofOfDeliveryInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateProofOfDeliveryInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateProofOfDeliveryInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateProofOfDeliveryInputSchema()
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
          .UpdateProofOfDeliveryInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateProofOfDeliveryInputSchema()
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

describe("Task Event Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateTaskEventInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateTaskEventInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateTaskEventInputSchema()
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
