import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateProductInputSchema,
  UpdateProductInputSchema,
  ProductType,
} from "@packages/graphql/client";
import z from "zod";

export const createProductSchema = CreateProductInputSchema();
export const updateProductSchema = UpdateProductInputSchema();

// Product Type Options
const PRODUCT_TYPE_OPTIONS = [
  { label: "Service", value: ProductType.Service },
  { label: "Good", value: ProductType.Good },
  { label: "Digital", value: ProductType.Digital },
  { label: "Subscription", value: ProductType.Subscription },
];

export const createProductFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createProductSchema>,
});

export const updateProductFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateProductSchema>,
});

export const CreateProductForm = withForm({
  ...createProductFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Product</FieldLegend>
        <FieldDescription>Fill in the details for the new product.</FieldDescription>
        <FieldGroup>
          {/* Product Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Product Details</FieldLegend>
            <FieldDescription>Basic information about the product.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Product Name *"
                    description="The name of the product."
                    placeholder="Enter product name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="sku">
                {(field) => (
                  <field.InputField
                    label="SKU *"
                    description="Stock Keeping Unit - unique product identifier."
                    placeholder="e.g., PROD-001"
                  />
                )}
              </form.AppField>
              <form.AppField name="type">
                {(field) => (
                  <field.SelectField
                    label="Type"
                    description="Category or type of product."
                    options={PRODUCT_TYPE_OPTIONS}
                    placeholder="Select product type"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Pricing Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing</FieldLegend>
            <FieldDescription>Set the pricing for this product.</FieldDescription>
            <FieldGroup>
              <form.AppField name="price">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Price *"
                    description="Product price."
                    placeholder="0.00"
                    step="0.01"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Description Section */}
          <FieldSet>
            <FieldLegend variant="label">Description</FieldLegend>
            <FieldDescription>Provide more details about this product.</FieldDescription>
            <FieldGroup>
              <form.AppField name="description">
                {(field) => (
                  <field.TextAreaField
                    label="Description"
                    description="Detailed information about the product."
                    placeholder="Enter product description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateProductForm = withForm({
  ...updateProductFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Product</FieldLegend>
        <FieldDescription>Update the details for the product.</FieldDescription>
        <FieldGroup>
          {/* Product Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Product Details</FieldLegend>
            <FieldDescription>Basic information about the product.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Product Name"
                    description="The name of the product."
                    placeholder="Enter product name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="sku">
                {(field) => (
                  <field.InputField
                    label="SKU"
                    description="Stock Keeping Unit - unique product identifier."
                    placeholder="e.g., PROD-001"
                  />
                )}
              </form.AppField>
              <form.AppField name="type">
                {(field) => (
                  <field.SelectField
                    label="Type"
                    description="Category or type of product."
                    options={PRODUCT_TYPE_OPTIONS}
                    placeholder="Select product type"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Pricing Section */}
          <FieldSet>
            <FieldLegend variant="label">Pricing</FieldLegend>
            <FieldDescription>Update the pricing for this product.</FieldDescription>
            <FieldGroup>
              <form.AppField name="price">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Price"
                    description="Product price."
                    placeholder="0.00"
                    step="0.01"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Description Section */}
          <FieldSet>
            <FieldLegend variant="label">Description</FieldLegend>
            <FieldDescription>Update details about this product.</FieldDescription>
            <FieldGroup>
              <form.AppField name="description">
                {(field) => (
                  <field.TextAreaField
                    label="Description"
                    description="Detailed information about the product."
                    placeholder="Enter product description..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
