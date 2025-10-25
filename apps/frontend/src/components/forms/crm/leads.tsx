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
          {/* Lead Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Lead Details</FieldLegend>
            <FieldDescription>
              Basic lead information and source.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Lead Name *"
                    description="Name of the lead or company."
                    placeholder="e.g., Acme Corp"
                  />
                )}
              </form.AppField>
              <form.AppField name="email">
                {(field) => (
                  <field.InputField
                    type="email"
                    label="Email"
                    description="Contact email address."
                    placeholder="contact@example.com"
                  />
                )}
              </form.AppField>
              <form.AppField name="leadSource">
                {(field) => (
                  <field.InputField
                    label="Lead Source"
                    description="How the lead was acquired."
                    placeholder="e.g., Website, Referral"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status & Scoring Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Scoring</FieldLegend>
            <FieldDescription>
              Lead status and quality assessment.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current lead status."
                    placeholder="e.g., New, Qualified"
                  />
                )}
              </form.AppField>
              <form.AppField name="leadScore">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Lead Score"
                    description="Quality score for this lead."
                    placeholder="0-100"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this lead to related entities.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="campaignId">
                {(field) => (
                  <field.InputField
                    label="Campaign"
                    description="Associated marketing campaign."
                    placeholder="Campaign ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Account Owner"
                    description="The person responsible for this lead."
                    placeholder="Owner ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
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
        <FieldDescription>Update the details for the lead.</FieldDescription>
        <FieldGroup>
          {/* Lead Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Lead Details</FieldLegend>
            <FieldDescription>
              Basic lead information and source.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Lead Name"
                    description="Name of the lead or company."
                    placeholder="e.g., Acme Corp"
                  />
                )}
              </form.AppField>
              <form.AppField name="email">
                {(field) => (
                  <field.InputField
                    type="email"
                    label="Email"
                    description="Contact email address."
                    placeholder="contact@example.com"
                  />
                )}
              </form.AppField>
              <form.AppField name="leadSource">
                {(field) => (
                  <field.InputField
                    label="Lead Source"
                    description="How the lead was acquired."
                    placeholder="e.g., Website, Referral"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Status & Scoring Section */}
          <FieldSet>
            <FieldLegend variant="label">Status & Scoring</FieldLegend>
            <FieldDescription>
              Lead status and quality assessment.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="status">
                {(field) => (
                  <field.InputField
                    label="Status"
                    description="Current lead status."
                    placeholder="e.g., New, Qualified"
                  />
                )}
              </form.AppField>
              <form.AppField name="leadScore">
                {(field) => (
                  <field.InputField
                    type="number"
                    label="Lead Score"
                    description="Quality score for this lead."
                    placeholder="0-100"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>
              Link this lead to related entities.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="campaignId">
                {(field) => (
                  <field.InputField
                    label="Campaign"
                    description="Associated marketing campaign."
                    placeholder="Campaign ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Account Owner"
                    description="The person responsible for this lead."
                    placeholder="Owner ID"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>
        </FieldGroup>
      </FieldSet>
    );
  },
});
