import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateReturnInputSchema,
  UpdateReturnInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createReturnSchema = CreateReturnInputSchema();
export const updateReturnSchema = UpdateReturnInputSchema();

export const createReturnFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createReturnSchema>,
});

export const updateReturnFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateReturnSchema>,
});

export const CreateReturnForm = withForm({
  ...createReturnFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Return</FieldLegend>
        <FieldDescription>
          Fill in the details for the new return.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Return Details</FieldLegend>
            <form.AppField name="returnNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateReturnForm = withForm({
  ...updateReturnFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Return</FieldLegend>
        <FieldDescription>
          Update the details for the return.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Return Details</FieldLegend>
            <form.AppField name="returnNumber">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="salesOrderId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="clientId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="reason">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
