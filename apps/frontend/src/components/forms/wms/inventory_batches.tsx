import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateInventoryBatchInputSchema,
  UpdateInventoryBatchInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createInventoryBatchSchema = CreateInventoryBatchInputSchema();
export const updateInventoryBatchSchema = UpdateInventoryBatchInputSchema();

export const createInventoryBatchFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createInventoryBatchSchema>,
});

export const updateInventoryBatchFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateInventoryBatchSchema>,
});

export const CreateInventoryBatchForm = withForm({
  ...createInventoryBatchFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Inventory Batch</FieldLegend>
        <FieldDescription>Create a new inventory batch for product tracking.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link batch to a product.</FieldDescription>
            <FieldGroup>
              <form.AppField name="productId">
                {(field) => (
                  <field.InputField
                    label="Product *"
                    description="Product for this batch."
                    placeholder="Product ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Batch Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Batch Details</FieldLegend>
            <FieldDescription>Batch number and expiration information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="batchNumber">
                  {(field) => (
                    <field.InputField
                      label="Batch Number *"
                      description="Unique identifier for this batch."
                      placeholder="e.g., BATCH-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="expirationDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Expiration Date *"
                      description="When this batch expires."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateInventoryBatchForm = withForm({
  ...updateInventoryBatchFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Inventory Batch</FieldLegend>
        <FieldDescription>Update inventory batch information.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update product association.</FieldDescription>
            <FieldGroup>
              <form.AppField name="productId">
                {(field) => (
                  <field.InputField
                    label="Product"
                    description="Product for this batch."
                    placeholder="Product ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Batch Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Batch Details</FieldLegend>
            <FieldDescription>Update batch number and expiration information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="batchNumber">
                  {(field) => (
                    <field.InputField
                      label="Batch Number"
                      description="Unique identifier for this batch."
                      placeholder="e.g., BATCH-2024-001"
                    />
                  )}
                </form.AppField>
                <form.AppField name="expirationDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Expiration Date"
                      description="When this batch expires."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
