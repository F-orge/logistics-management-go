import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateSurchargeInputSchema,
  UpdateSurchargeInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createSurchargeSchema = CreateSurchargeInputSchema();
export const updateSurchargeSchema = UpdateSurchargeInputSchema();

export const createSurchargeFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createSurchargeSchema>,
});

export const updateSurchargeFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateSurchargeSchema>,
});

export const CreateSurchargeForm = withForm({
  ...createSurchargeFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Surcharge</FieldLegend>
        <FieldDescription>
          Fill in the details for the new surcharge.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Surcharge Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="calculationMethod">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="validFrom">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="validTo">
              {(field) => <field.InputField type="date" />}
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

export const UpdateSurchargeForm = withForm({
  ...updateSurchargeFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Surcharge</FieldLegend>
        <FieldDescription>
          Update the details for the surcharge.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Surcharge Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="type">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="amount">
              {(field) => <field.InputField type="number" step="any" />}
            </form.AppField>
            <form.AppField name="calculationMethod">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="isActive">
              {(field) => <field.InputField type="checkbox" />}
            </form.AppField>
            <form.AppField name="validFrom">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="validTo">
              {(field) => <field.InputField type="date" />}
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
