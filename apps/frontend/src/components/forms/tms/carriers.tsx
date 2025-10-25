import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCarrierInputSchema,
  UpdateCarrierInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCarrierSchema = CreateCarrierInputSchema();
export const updateCarrierSchema = UpdateCarrierInputSchema();

export const createCarrierFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCarrierSchema>,
});

export const updateCarrierFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCarrierSchema>,
});

export const CreateCarrierForm = withForm({
  ...createCarrierFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Carrier</FieldLegend>
        <FieldDescription>
          Fill in the details for the new carrier.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Carrier Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactPerson">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactEmail">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="contactPhone">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
            <form.AppField name="servicesOffered">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateCarrierForm = withForm({
  ...updateCarrierFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Carrier</FieldLegend>
        <FieldDescription>
          Update the details for the carrier.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Carrier Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactPerson">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactEmail">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="contactPhone">
              {(field) => <field.InputField type="tel" />}
            </form.AppField>
            <form.AppField name="servicesOffered">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
