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
        <FieldDescription>Fill in the details for the new opportunity.</FieldDescription>
        <FieldGroup>
          {/* Opportunity Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Opportunity Details</FieldLegend>
            <FieldDescription>Basic information about the sales opportunity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name *"
                    description="The name of the opportunity."
                    placeholder="Enter opportunity name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="source">
                {(field) => (
                  <field.InputField
                    label="Source"
                    description="How the opportunity was sourced."
                    placeholder="e.g., Inbound Lead, Referral, Marketing Campaign"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Deal Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Deal Information</FieldLegend>
            <FieldDescription>Financial and stage details of the deal.</FieldDescription>
            <FieldGroup>
              <form.AppField name="stage">
                {(field) => (
                  <field.InputField
                    label="Stage *"
                    description="Current stage in the sales pipeline."
                    placeholder="e.g., Qualification, Proposal, Negotiation, Closed Won"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="dealValue">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Deal Value *"
                      description="Estimated deal amount."
                      placeholder="0.00"
                      step="0.01"
                    />
                  )}
                </form.AppField>
                <form.AppField name="probability">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Probability (%)"
                      description="Estimated probability of closing (0-100)."
                      placeholder="50"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="expectedCloseDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Expected Close Date"
                    description="Forecasted close date."
                  />
                )}
              </form.AppField>
              <form.AppField name="lostReason">
                {(field) => (
                  <field.InputField
                    label="Lost Reason"
                    description="If lost, explain why."
                    placeholder="e.g., Budget constraints, Competitor, No decision"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this opportunity to contacts, companies, and campaigns.</FieldDescription>
            <FieldGroup>
              <form.AppField name="companyId">
                {(field) => (
                  <field.InputField
                    label="Company *"
                    description="The company associated with this opportunity."
                    placeholder="Company ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="contactId">
                {(field) => (
                  <field.InputField
                    label="Contact"
                    description="The primary contact for this opportunity."
                    placeholder="Contact ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="campaignId">
                {(field) => (
                  <field.InputField
                    label="Campaign"
                    description="The campaign that led to this opportunity."
                    placeholder="Campaign ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Owner"
                    description="The sales representative owning this opportunity."
                    placeholder="User ID"
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

export const UpdateOpportunityForm = withForm({
  ...updateOpportunityFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Opportunity</FieldLegend>
        <FieldDescription>Update the details for the opportunity.</FieldDescription>
        <FieldGroup>
          {/* Opportunity Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Opportunity Details</FieldLegend>
            <FieldDescription>Basic information about the sales opportunity.</FieldDescription>
            <FieldGroup>
              <form.AppField name="name">
                {(field) => (
                  <field.InputField
                    label="Name"
                    description="The name of the opportunity."
                    placeholder="Enter opportunity name..."
                  />
                )}
              </form.AppField>
              <form.AppField name="source">
                {(field) => (
                  <field.InputField
                    label="Source"
                    description="How the opportunity was sourced."
                    placeholder="e.g., Inbound Lead, Referral, Marketing Campaign"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Deal Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Deal Information</FieldLegend>
            <FieldDescription>Financial and stage details of the deal.</FieldDescription>
            <FieldGroup>
              <form.AppField name="stage">
                {(field) => (
                  <field.InputField
                    label="Stage"
                    description="Current stage in the sales pipeline."
                    placeholder="e.g., Qualification, Proposal, Negotiation, Closed Won"
                  />
                )}
              </form.AppField>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.AppField name="dealValue">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Deal Value"
                      description="Estimated deal amount."
                      placeholder="0.00"
                      step="0.01"
                    />
                  )}
                </form.AppField>
                <form.AppField name="probability">
                  {(field) => (
                    <field.InputField
                      type="number"
                      label="Probability (%)"
                      description="Estimated probability of closing (0-100)."
                      placeholder="50"
                      step="1"
                    />
                  )}
                </form.AppField>
              </div>
              <form.AppField name="expectedCloseDate">
                {(field) => (
                  <field.InputField
                    type="date"
                    label="Expected Close Date"
                    description="Forecasted close date."
                  />
                )}
              </form.AppField>
              <form.AppField name="lostReason">
                {(field) => (
                  <field.InputField
                    label="Lost Reason"
                    description="If lost, explain why."
                    placeholder="e.g., Budget constraints, Competitor, No decision"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Relations Section */}
          <FieldSet>
            <FieldLegend variant="label">Relations</FieldLegend>
            <FieldDescription>Link this opportunity to contacts, companies, and campaigns.</FieldDescription>
            <FieldGroup>
              <form.AppField name="companyId">
                {(field) => (
                  <field.InputField
                    label="Company"
                    description="The company associated with this opportunity."
                    placeholder="Company ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="contactId">
                {(field) => (
                  <field.InputField
                    label="Contact"
                    description="The primary contact for this opportunity."
                    placeholder="Contact ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="campaignId">
                {(field) => (
                  <field.InputField
                    label="Campaign"
                    description="The campaign that led to this opportunity."
                    placeholder="Campaign ID"
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Owner"
                    description="The sales representative owning this opportunity."
                    placeholder="User ID"
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
