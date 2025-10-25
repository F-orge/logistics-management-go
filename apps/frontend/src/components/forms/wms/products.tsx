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
          Fill in the details for the new WMS product.
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
            <form.AppField name="barcode">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="costPrice">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="length">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="width">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="height">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="supplierId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
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
          Update the details for the WMS product.
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
            <form.AppField name="barcode">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="description">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="costPrice">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="length">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="width">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="height">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="weight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="supplierId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
