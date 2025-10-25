import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateOpportunityInputSchema,
  UpdateOpportunityInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createOpportunitySchema = CreateOpportunityInputSchema();
export const updateOpportunitySchema = UpdateOpportunityInputSchema();

export const createOpportunityFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createOpportunitySchema>,
});

export const updateOpportunityFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateOpportunitySchema>,
});

export const CreateOpportunityForm = withForm({
  ...createOpportunityFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Opportunity</FieldLegend>
        <FieldDescription>
          Fill in the details for the new opportunity.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Opportunity Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="stage">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="dealValue">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="probability">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="expectedCloseDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="lostReason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="source">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="companyId">
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

export const UpdateOpportunityForm = withForm({
  ...updateOpportunityFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Opportunity</FieldLegend>
        <FieldDescription>
          Update the details for the opportunity.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Opportunity Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="stage">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="dealValue">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="probability">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="expectedCloseDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="lostReason">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="source">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="ownerId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="contactId">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="companyId">
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
