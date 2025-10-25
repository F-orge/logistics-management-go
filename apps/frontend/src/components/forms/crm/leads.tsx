import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateLeadInputSchema,
  UpdateLeadInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createLeadSchema = CreateLeadInputSchema();
export const updateLeadSchema = UpdateLeadInputSchema();

export const createLeadFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createLeadSchema>,
});

export const updateLeadFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateLeadSchema>,
});

export const CreateLeadForm = withForm({
  ...createLeadFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Lead</FieldLegend>
        <FieldDescription>
          Fill in the details for the new lead.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Lead Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="leadSource">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="leadScore">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="campaignId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateLeadForm = withForm({
  ...updateLeadFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Lead</FieldLegend>
        <FieldDescription>
          Update the details for the lead.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Lead Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="email">
              {(field) => <field.InputField type="email" />}
            </form.AppField>
            <form.AppField name="leadSource">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="status">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="leadScore">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="campaignId">
              {(field) => <field.InputField />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
