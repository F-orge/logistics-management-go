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

describe("TMS Inputs", () => {
  describe("Carrier Rate Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateCarrierRateInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateCarrierRateInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateCarrierRateInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateCarrierRateInputSchema()
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
            .UpdateCarrierRateInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateCarrierRateInputSchema()
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

  describe("Carrier Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateCarrierInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateCarrierInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateCarrierInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateCarrierInputSchema()
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
            .UpdateCarrierInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateCarrierInputSchema()
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

  describe("Driver Schedule Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateDriverScheduleInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateDriverScheduleInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateDriverScheduleInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateDriverScheduleInputSchema()
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
            .UpdateDriverScheduleInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateDriverScheduleInputSchema()
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

  describe("Driver Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateDriverInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateDriverInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateDriverInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateDriverInputSchema()
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
            .UpdateDriverInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateDriverInputSchema()
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

  describe("Expense Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateExpenseInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateExpenseInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateExpenseInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateExpenseInputSchema()
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
            .UpdateExpenseInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateExpenseInputSchema()
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

  describe("Geofence Event Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateGeofenceEventInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateGeofenceEventInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateGeofenceEventInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateGeofenceEventInputSchema()
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
            .UpdateGeofenceEventInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateGeofenceEventInputSchema()
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

  describe("Geofence Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateGeofenceInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateGeofenceInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateGeofenceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateGeofenceInputSchema()
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
            .UpdateGeofenceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateGeofenceInputSchema()
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

  describe("GPS Ping Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateGpsPingInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateGpsPingInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateGpsPingInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateGpsPingInputSchema()
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
            .UpdateGpsPingInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateGpsPingInputSchema()
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

  describe("Partner Invoice Item Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreatePartnerInvoiceItemInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdatePartnerInvoiceItemInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreatePartnerInvoiceItemInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreatePartnerInvoiceItemInputSchema()
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
            .UpdatePartnerInvoiceItemInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdatePartnerInvoiceItemInputSchema()
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

  describe("Partner Invoice Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreatePartnerInvoiceInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdatePartnerInvoiceInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreatePartnerInvoiceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreatePartnerInvoiceInputSchema()
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
            .UpdatePartnerInvoiceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdatePartnerInvoiceInputSchema()
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

  describe("Route Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateRouteInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateRouteInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateRouteInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateRouteInputSchema()
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
            .UpdateRouteInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateRouteInputSchema()
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

  describe("Shipment Leg Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateShipmentLegInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateShipmentLegInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateShipmentLegInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateShipmentLegInputSchema()
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
            .UpdateShipmentLegInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateShipmentLegInputSchema()
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

  describe("Trip Stop Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateTripStopInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateTripStopInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateTripStopInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateTripStopInputSchema()
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
            .UpdateTripStopInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateTripStopInputSchema()
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

  describe("Trip Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateTripInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateTripInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateTripInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateTripInputSchema()
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
            .UpdateTripInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateTripInputSchema()
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

  describe("Vehicle Maintenance Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateVehicleMaintenanceInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateVehicleMaintenanceInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateVehicleMaintenanceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateVehicleMaintenanceInputSchema()
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
            .UpdateVehicleMaintenanceInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateVehicleMaintenanceInputSchema()
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

  describe("Vehicle Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateVehicleInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateVehicleInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateVehicleInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateVehicleInputSchema()
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
            .UpdateVehicleInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateVehicleInputSchema()
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
