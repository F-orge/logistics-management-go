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
} from "@packages/graphql/client/zod";
import z from "zod";

export const createProductSchema = CreateProductInputSchema();
export const updateProductSchema = UpdateProductInputSchema();

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
        <FieldDescription>
          Fill in the details for the new product.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Product Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sku">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="price">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the product.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Product Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="sku">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="price">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
