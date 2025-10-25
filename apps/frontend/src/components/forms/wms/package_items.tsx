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
        <FieldDescription>
          Fill in the details for the new package item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="packageId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="lotNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serialNumbers">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expiryDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="unitWeight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
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
        <FieldDescription>
          Update the details for the package item.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Item Details</FieldLegend>
            <form.AppField name="packageId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="productId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="batchId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="quantity">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="lotNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serialNumbers">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="expiryDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="unitWeight">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
