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

describe("WMS Inputs", () => {
  describe("Bin Threshold Inputs", () => {
    type CreateSchema = z.infer<
      ReturnType<typeof schema.CreateBinThresholdInputSchema>
    >;

    type UpdateSchema = z.infer<
      ReturnType<typeof schema.UpdateBinThresholdInputSchema>
    >;

    describe("Create Schema", () => {
      describe("Valid Cases", () => {
        const cases: TestCase<CreateSchema>[] = [];

        it.each(cases)("should validate: $name", (testCase) => {
          const { success } = schema
            .CreateBinThresholdInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<CreateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .CreateBinThresholdInputSchema()
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
            .UpdateBinThresholdInputSchema()
            .safeParse(testCase.input);

          expect(testCase.success).toBe(success);
        });
      });
      describe("Invalid Cases", () => {
        const cases: TestCase<Partial<UpdateSchema>>[] = [];

        it.each(cases)("should reject: $name", (testCase) => {
          const { success, error } = schema
            .UpdateBinThresholdInputSchema()
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

describe("Inbound Shipment Item Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateInboundShipmentItemInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateInboundShipmentItemInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateInboundShipmentItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateInboundShipmentItemInputSchema()
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
          .UpdateInboundShipmentItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateInboundShipmentItemInputSchema()
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

describe("Inbound Shipment Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateInboundShipmentInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateInboundShipmentInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateInboundShipmentInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateInboundShipmentInputSchema()
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
          .UpdateInboundShipmentInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateInboundShipmentInputSchema()
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

describe("Inventory Adjustment Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateInventoryAdjustmentInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateInventoryAdjustmentInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateInventoryAdjustmentInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateInventoryAdjustmentInputSchema()
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
          .UpdateInventoryAdjustmentInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateInventoryAdjustmentInputSchema()
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

describe("Inventory Batch Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateInventoryBatchInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateInventoryBatchInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateInventoryBatchInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateInventoryBatchInputSchema()
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
          .UpdateInventoryBatchInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateInventoryBatchInputSchema()
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

describe("Inventory Stock Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateInventoryStockInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateInventoryStockInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateInventoryStockInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateInventoryStockInputSchema()
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
          .UpdateInventoryStockInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateInventoryStockInputSchema()
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

describe("Location Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateLocationInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateLocationInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateLocationInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateLocationInputSchema()
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
          .UpdateLocationInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateLocationInputSchema()
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

describe("Outbound Shipment Item Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateOutboundShipmentItemInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateOutboundShipmentItemInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateOutboundShipmentItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateOutboundShipmentItemInputSchema()
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
          .UpdateOutboundShipmentItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateOutboundShipmentItemInputSchema()
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

describe("Outbound Shipment Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateOutboundShipmentInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateOutboundShipmentInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateOutboundShipmentInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateOutboundShipmentInputSchema()
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
          .UpdateOutboundShipmentInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateOutboundShipmentInputSchema()
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

describe("Package Item Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreatePackageItemInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdatePackageItemInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreatePackageItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreatePackageItemInputSchema()
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
          .UpdatePackageItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdatePackageItemInputSchema()
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

describe("Package Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreatePackageInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdatePackageInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreatePackageInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreatePackageInputSchema()
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
          .UpdatePackageInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdatePackageInputSchema()
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

describe("Pick Batch Item Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreatePickBatchItemInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdatePickBatchItemInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreatePickBatchItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreatePickBatchItemInputSchema()
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
          .UpdatePickBatchItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdatePickBatchItemInputSchema()
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

describe("Pick Batch Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreatePickBatchInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdatePickBatchInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreatePickBatchInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreatePickBatchInputSchema()
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
          .UpdatePickBatchInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdatePickBatchInputSchema()
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

describe("Product Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateProductInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateProductInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateProductInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
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
      const cases: TestCase<UpdateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .UpdateProductInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
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

describe("Putaway Rule Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreatePutawayRuleInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdatePutawayRuleInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreatePutawayRuleInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreatePutawayRuleInputSchema()
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
          .UpdatePutawayRuleInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdatePutawayRuleInputSchema()
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

describe("Reorder Point Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateReorderPointInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateReorderPointInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateReorderPointInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateReorderPointInputSchema()
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
          .UpdateReorderPointInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateReorderPointInputSchema()
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

describe("Return Item Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateReturnItemInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateReturnItemInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateReturnItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateReturnItemInputSchema()
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
          .UpdateReturnItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateReturnItemInputSchema()
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

describe("Return Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateReturnInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateReturnInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateReturnInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateReturnInputSchema()
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
          .UpdateReturnInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateReturnInputSchema()
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

describe("Sales Order Item Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateSalesOrderItemInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateSalesOrderItemInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateSalesOrderItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateSalesOrderItemInputSchema()
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
          .UpdateSalesOrderItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateSalesOrderItemInputSchema()
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

describe("Sales Order Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateSalesOrderInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateSalesOrderInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateSalesOrderInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateSalesOrderInputSchema()
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
          .UpdateSalesOrderInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateSalesOrderInputSchema()
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

describe("Stock Transfer Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateStockTransferInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateStockTransferInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateStockTransferInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateStockTransferInputSchema()
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
          .UpdateStockTransferInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<UpdateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .UpdateStockTransferInputSchema()
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

describe("Task Item Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateTaskItemInputSchema>
  >;

  type UpdateSchema = z.infer<
    ReturnType<typeof schema.UpdateTaskItemInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateTaskItemInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateTaskItemInputSchema()
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

describe("Task Inputs", () => {
  type CreateSchema = z.infer<ReturnType<typeof schema.CreateTaskInputSchema>>;

  type UpdateSchema = z.infer<ReturnType<typeof schema.UpdateTaskInputSchema>>;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateTaskInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateTaskInputSchema()
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

describe("Warehouse Inputs", () => {
  type CreateSchema = z.infer<
    ReturnType<typeof schema.CreateWarehouseInputSchema>
  >;

  describe("Create Schema", () => {
    describe("Valid Cases", () => {
      const cases: TestCase<CreateSchema>[] = [];

      it.each(cases)("should validate: $name", (testCase) => {
        const { success } = schema
          .CreateWarehouseInputSchema()
          .safeParse(testCase.input);

        expect(testCase.success).toBe(success);
      });
    });
    describe("Invalid Cases", () => {
      const cases: TestCase<Partial<CreateSchema>>[] = [];

      it.each(cases)("should reject: $name", (testCase) => {
        const { success, error } = schema
          .CreateWarehouseInputSchema()
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
