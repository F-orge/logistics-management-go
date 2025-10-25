import { formOptions } from "@tanstack/react-form";
import { withForm } from "@packages/ui/components/form/index";
import {
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateCampaignInputSchema,
  UpdateCampaignInputSchema,
} from "@packages/graphql/client/zod";
import z from "zod";

export const createCampaignSchema = CreateCampaignInputSchema();
export const updateCampaignSchema = UpdateCampaignInputSchema();

export const createCampaignFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCampaignSchema>,
});

export const updateCampaignFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCampaignSchema>,
});

export const CreateCampaignForm = withForm({
  ...createCampaignFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Campaign</FieldLegend>
        <FieldDescription>
          Fill in the details for the new campaign.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Campaign Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="budget">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="startDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="endDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});

export const UpdateCampaignForm = withForm({
  ...updateCampaignFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Campaign</FieldLegend>
        <FieldDescription>
          Update the details for the campaign.
        </FieldDescription>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Campaign Details</FieldLegend>
            <form.AppField name="name">
              {(field) => <field.InputField />}
            </form.AppField>
            <form.AppField name="budget">
              {(field) => <field.InputField type="number" />}
            </form.AppField>
            <form.AppField name="startDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
            <form.AppField name="endDate">
              {(field) => <field.InputField type="date" />}
            </form.AppField>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
