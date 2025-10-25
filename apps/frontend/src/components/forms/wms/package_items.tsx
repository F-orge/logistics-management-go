import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreatePackageItemInputSchema,
  UpdatePackageItemInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createPackageItemSchema = CreatePackageItemInputSchema();
export const updatePackageItemSchema = UpdatePackageItemInputSchema();

export const createPackageItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createPackageItemSchema>,
});

export const updatePackageItemFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updatePackageItemSchema>,
});

export const CreatePackageItemForm = withForm({
  ...createPackageItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Package Item</FieldLegend>
        <FieldDescription>Add product line items to package.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link item to package, product, and batch.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="packageId">
                  {(field) => (
                    <field.InputField
                      label="Package *"
                      description="The package this item belongs to."
                      placeholder="Package ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product *"
                      description="The product in this package item."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="batchId">
                {(field) => (
                  <field.InputField
                    label="Batch"
                    description="Batch ID if applicable."
                    placeholder="Batch ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>Quantity, lot number, and serial information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity *"
                      description="Number of units."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="lotNumber">
                  {(field) => (
                    <field.InputField
                      label="Lot Number"
                      description="Lot/batch number for traceability."
                      placeholder="e.g., LOT-2024-0001"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="serialNumbers">
                {(field) => (
                  <field.InputField
                    label="Serial Numbers"
                    description="Serial numbers (comma-separated if multiple)."
                    placeholder="e.g., SN001, SN002, SN003"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Weight & Expiry Section */}
          <FieldSet>
            <FieldLegend variant="label">Weight & Expiry</FieldLegend>
            <FieldDescription>Unit weight and expiration date.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="unitWeight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Unit Weight"
                      description="Weight per unit (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="expiryDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Expiry Date"
                      description="Product expiration date."
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

export const UpdatePackageItemForm = withForm({
  ...updatePackageItemFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Package Item</FieldLegend>
        <FieldDescription>Update product line items in package.</FieldDescription>
        <FieldGroup>
          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Update package, product, and batch associations.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="packageId">
                  {(field) => (
                    <field.InputField
                      label="Package"
                      description="The package this item belongs to."
                      placeholder="Package ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="productId">
                  {(field) => (
                    <field.InputField
                      label="Product"
                      description="The product in this package item."
                      placeholder="Product ID"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="batchId">
                {(field) => (
                  <field.InputField
                    label="Batch"
                    description="Batch ID if applicable."
                    placeholder="Batch ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Item Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Item Details</FieldLegend>
            <FieldDescription>Update quantity, lot number, and serial information.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="quantity">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Quantity"
                      description="Number of units."
                      placeholder="0"
                      step="1"
                    />
                  )}
                </form.AppField>
                <form.AppField name="lotNumber">
                  {(field) => (
                    <field.InputField
                      label="Lot Number"
                      description="Lot/batch number for traceability."
                      placeholder="e.g., LOT-2024-0001"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="serialNumbers">
                {(field) => (
                  <field.InputField
                    label="Serial Numbers"
                    description="Serial numbers (comma-separated if multiple)."
                    placeholder="e.g., SN001, SN002, SN003"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Weight & Expiry Section */}
          <FieldSet>
            <FieldLegend variant="label">Weight & Expiry</FieldLegend>
            <FieldDescription>Update unit weight and expiration date.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="unitWeight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Unit Weight"
                      description="Weight per unit (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="expiryDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Expiry Date"
                      description="Product expiration date."
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
