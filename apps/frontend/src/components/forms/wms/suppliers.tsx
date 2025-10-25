import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateSupplierInputSchema,
  UpdateSupplierInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createSupplierSchema = CreateSupplierInputSchema();
export const updateSupplierSchema = UpdateSupplierInputSchema();

export const createSupplierFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createSupplierSchema>,
});

export const updateSupplierFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateSupplierSchema>,
});

export const CreateSupplierForm = withForm({
  ...createSupplierFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Supplier</FieldLegend>
        <FieldDescription>
          Fill in the details for the new supplier.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Supplier Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactPerson">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="phoneNumber">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateSupplierForm = withForm({
  ...updateSupplierFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Supplier</FieldLegend>
        <FieldDescription>
          Update the details for the supplier.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Supplier Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactPerson">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="phoneNumber">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
