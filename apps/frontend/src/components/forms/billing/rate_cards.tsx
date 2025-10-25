import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateRateCardInputSchema,
  UpdateRateCardInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createRateCardSchema = CreateRateCardInputSchema();
export const updateRateCardSchema = UpdateRateCardInputSchema();

export const createRateCardFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createRateCardSchema>,
});

export const updateRateCardFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateRateCardSchema>,
});

export const CreateRateCardForm = withForm({
  ...createRateCardFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Rate Card</FieldLegend>
        <FieldDescription>
          Fill in the details for the new rate card.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Rate Card Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serviceType">
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
            <form.AppField name="createdByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateRateCardForm = withForm({
  ...updateRateCardFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Rate Card</FieldLegend>
        <FieldDescription>
          Update the details for the rate card.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Rate Card Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="serviceType">
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
            <form.AppField name="createdByUserId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
