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
        <FieldDescription>Fill in the details for the new campaign.</FieldDescription>
        <FieldGroup>
          {/* Campaign Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Campaign Details</FieldLegend>
            <FieldDescription>Basic campaign information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Campaign Name *"
                    description="Name of the marketing campaign."
                    placeholder="e.g., Summer 2025 Promotion"
                  />
                )}
              </form.AppField>
              <form.AppField name="budget">
                {(field) => (
                  <field.InputField
                    type="number"
                    step="0.01"
                    label="Budget"
                    description="Total budget allocated for this campaign."
                    placeholder="0.00"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>Campaign start and end dates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Start Date"
                      description="When the campaign begins."
                    />
                  )}
                </form.AppField>
                <form.AppField name="endDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="End Date"
                      description="When the campaign ends."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
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
        <FieldDescription>Update the details for the campaign.</FieldDescription>
        <FieldGroup>
          {/* Campaign Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Campaign Details</FieldLegend>
            <FieldDescription>Basic campaign information.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Campaign Name"
                    description="Name of the marketing campaign."
                    placeholder="e.g., Summer 2025 Promotion"
                  />
                )}
              </form.AppField>
              <form.AppField name="budget">
                {(field) => (
                  <field.InputField
                    type="number"
                    step="0.01"
                    label="Budget"
                    description="Total budget allocated for this campaign."
                    placeholder="0.00"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Timeline Section */}
          <FieldSet>
            <FieldLegend variant="label">Timeline</FieldLegend>
            <FieldDescription>Campaign start and end dates.</FieldDescription>
            <FieldGroup>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="startDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="Start Date"
                      description="When the campaign begins."
                    />
                  )}
                </form.AppField>
                <form.AppField name="endDate">
                  {(field) => (
                    <field.InputField
                      type="date"
                      label="End Date"
                      description="When the campaign ends."
                    />
                  )}
                </form.AppField>
              </div>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
