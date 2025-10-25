import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateWmsProductInputSchema,
  UpdateWmsProductInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createWmsProductSchema = CreateWmsProductInputSchema();
export const updateWmsProductSchema = UpdateWmsProductInputSchema();

export const createWmsProductFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createWmsProductSchema>,
});

export const updateWmsProductFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateWmsProductSchema>,
});

export const CreateWmsProductForm = withForm({
  ...createWmsProductFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create WMS Product</FieldLegend>
        <FieldDescription>
          Create a new product in warehouse inventory.
        </FieldDescription>
        <FieldGroup>
          {/* Product Identification Section */}
          <FieldSet>
            <FieldLegend variant="label">Product Identification</FieldLegend>
            <FieldDescription>
              Name, SKU, barcode, and description.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="name">
                  {(field) => (
                    <field.InputField
                      label="Product Name *"
                      description="Product name."
                      placeholder="e.g., Widget A"
                    />
                  )}
                </form.AppField>
                <form.AppField name="sku">
                  {(field) => (
                    <field.InputField
                      label="SKU *"
                      description="Stock Keeping Unit."
                      placeholder="e.g., SKU-001"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="barcode">
                {(field) => (
                  <field.InputField
                    label="Barcode"
                    description="Product barcode for scanning."
                    placeholder="e.g., 8718247062827"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.TextAreaField
                    label="Description"
                    description="Detailed product description."
                    placeholder="Enter product description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Pricing Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing</FieldLegend>
            <FieldDescription>
              Cost price for inventory valuation.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="costPrice">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Cost Price *"
                    description="Product cost price."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Dimensions Section */}
          <FieldSet>
            <FieldLegend variant="label">Dimensions</FieldLegend>
            <FieldDescription>Physical dimensions of product.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="length">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Length *"
                      description="Product length (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="width">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Width *"
                      description="Product width (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="height">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Height *"
                      description="Product height (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="weight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight *"
                      description="Product weight (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Relations</FieldLegend>
            <FieldDescription>
              Product status and supplier/client information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status *"
                    description="Product status."
                    placeholder="e.g., Active, Discontinued"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="supplierId">
                  {(field) => (
                    <field.InputField
                      label="Supplier"
                      description="Primary supplier for this product."
                      placeholder="Supplier ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client"
                      description="Client owning this product."
                      placeholder="Client ID"
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

export const UpdateWmsProductForm = withForm({
  ...updateWmsProductFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update WMS Product</FieldLegend>
        <FieldDescription>
          Update product in warehouse inventory.
        </FieldDescription>
        <FieldGroup>
          {/* Product Identification Section */}
          <FieldSet>
            <FieldLegend variant="label">Product Identification</FieldLegend>
            <FieldDescription>
              Update name, SKU, barcode, and description.
            </FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="name">
                  {(field) => (
                    <field.InputField
                      label="Product Name"
                      description="Product name."
                      placeholder="e.g., Widget A"
                    />
                  )}
                </form.AppField>
                <form.AppField name="sku">
                  {(field) => (
                    <field.InputField
                      label="SKU"
                      description="Stock Keeping Unit."
                      placeholder="e.g., SKU-001"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="barcode">
                {(field) => (
                  <field.InputField
                    label="Barcode"
                    description="Product barcode for scanning."
                    placeholder="e.g., 8718247062827"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.TextAreaField
                    label="Description"
                    description="Detailed product description."
                    placeholder="Enter product description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Pricing Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing</FieldLegend>
            <FieldDescription>Update cost price.</FieldDescription>
            <FieldGroup>
              <form.AppField name="costPrice">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Cost Price"
                    description="Product cost price."
                    placeholder="0.00"
                    step="any"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Dimensions Section */}
          <FieldSet>
            <FieldLegend variant="label">Dimensions</FieldLegend>
            <FieldDescription>Update physical dimensions.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="length">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Length"
                      description="Product length (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="width">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Width"
                      description="Product width (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="height">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Height"
                      description="Product height (cm)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
                <form.AppField name="weight">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Weight"
                      description="Product weight (kg)."
                      placeholder="0.00"
                      step="any"
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>

          {/* Status & Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Relations</FieldLegend>
            <FieldDescription>
              Update status and supplier/client information.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Product status."
                    placeholder="e.g., Active, Discontinued"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="supplierId">
                  {(field) => (
                    <field.InputField
                      label="Supplier"
                      description="Primary supplier for this product."
                      placeholder="Supplier ID"
                    />
                  )}
                </form.AppField>
                <form.AppField name="clientId">
                  {(field) => (
                    <field.InputField
                      label="Client"
                      description="Client owning this product."
                      placeholder="Client ID"
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
