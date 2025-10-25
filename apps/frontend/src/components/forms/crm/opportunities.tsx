import { formOptions } from "@tanstack/react-form";
import { useAppForm, withForm } from "@packages/ui/components/form/index";
import {
  Button,
  Dialog,
  DialogContent,
  FieldDescription,
  FieldGroup,
  FieldLegend,
  FieldSet,
} from "@packages/ui";
import {
  CreateOpportunityInputSchema,
  UpdateOpportunityInputSchema,
  OpportunityStage,
  OpportunitySource,
  SearchCompaniesQuery,
  SearchContactsQuery,
  SearchCampaignsQuery,
  execute,
  CreateOpportunityMutation,
  UpdateOpportunityMutation,
} from "@packages/graphql/client";
import z from "zod";
import { toast } from "sonner";
import { Opportunity } from "@/components/tables/crm/opportunities";
import { Row } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const createOpportunitySchema = CreateOpportunityInputSchema();
export const updateOpportunitySchema = UpdateOpportunityInputSchema();

// Opportunity Stage Options
const OPPORTUNITY_STAGE_OPTIONS = [
  { label: "Prospecting", value: OpportunityStage.Prospecting },
  { label: "Qualification", value: OpportunityStage.Qualification },
  { label: "Need Analysis", value: OpportunityStage.NeedAnalysis },
  { label: "Demo", value: OpportunityStage.Demo },
  { label: "Proposal", value: OpportunityStage.Proposal },
  { label: "Negotiation", value: OpportunityStage.Negotiation },
  { label: "Closed Won", value: OpportunityStage.ClosedWon },
  { label: "Closed Lost", value: OpportunityStage.ClosedLost },
];

// Opportunity Source Options
const OPPORTUNITY_SOURCE_OPTIONS = [
  { label: "Website", value: OpportunitySource.Website },
  { label: "Referral", value: OpportunitySource.Referral },
  { label: "Social Media", value: OpportunitySource.SocialMedia },
  { label: "Email Campaign", value: OpportunitySource.EmailCampaign },
  { label: "Cold Call", value: OpportunitySource.ColdCall },
  { label: "Event", value: OpportunitySource.Event },
  { label: "Advertisement", value: OpportunitySource.Advertisment },
  { label: "Partner", value: OpportunitySource.Partner },
  { label: "Existing Customer", value: OpportunitySource.ExistingCustomer },
  { label: "Other", value: OpportunitySource.Other },
];

// No standalone fetcher functions needed - they'll be defined inline

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
          {/* Opportunity Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Opportunity Details</FieldLegend>
            <FieldDescription>
              Basic information about the sales opportunity.
            </FieldDescription>
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
                  <field.SelectField
                    label="Source"
                    description="How the opportunity was sourced."
                    options={OPPORTUNITY_SOURCE_OPTIONS}
                    placeholder="Select source"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Deal Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Deal Information</FieldLegend>
            <FieldDescription>
              Financial and stage details of the deal.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="stage">
                {(field) => (
                  <field.SelectField
                    label="Stage *"
                    description="Current stage in the sales pipeline."
                    options={OPPORTUNITY_STAGE_OPTIONS}
                    placeholder="Select stage"
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
                  <field.TextAreaField
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
            <FieldDescription>
              Link this opportunity to contacts, companies, and campaigns.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="companyId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchCompaniesQuery,
                        { search: query || "" }
                      );
                      return data?.crm?.companies || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Company *"
                    description="The company associated with this opportunity."
                    placeholder="Search company..."
                  />
                )}
              </form.AppField>
              <form.AppField name="contactId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchContactsQuery,
                        { search: query || "" }
                      );
                      return data?.crm?.contacts || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Contact"
                    description="The primary contact for this opportunity."
                    placeholder="Search contact..."
                  />
                )}
              </form.AppField>
              <form.AppField name="campaignId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchCampaignsQuery,
                        { search: query || "" }
                      );
                      return data?.crm?.campaigns || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Campaign"
                    description="The campaign that led to this opportunity."
                    placeholder="Search campaign..."
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
        <FieldDescription>
          Update the details for the opportunity.
        </FieldDescription>
        <FieldGroup>
          {/* Opportunity Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Opportunity Details</FieldLegend>
            <FieldDescription>
              Basic information about the sales opportunity.
            </FieldDescription>
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
                  <field.SelectField
                    label="Source"
                    description="How the opportunity was sourced."
                    options={OPPORTUNITY_SOURCE_OPTIONS}
                    placeholder="Select source"
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Deal Information Section */}
          <FieldSet>
            <FieldLegend variant="label">Deal Information</FieldLegend>
            <FieldDescription>
              Financial and stage details of the deal.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="stage">
                {(field) => (
                  <field.SelectField
                    label="Stage"
                    description="Current stage in the sales pipeline."
                    options={OPPORTUNITY_STAGE_OPTIONS}
                    placeholder="Select stage"
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
                  <field.TextAreaField
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
            <FieldDescription>
              Link this opportunity to contacts, companies, and campaigns.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="companyId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchCompaniesQuery,
                        { search: query || "" }
                      );
                      return data?.crm?.companies || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Company"
                    description="The company associated with this opportunity."
                    placeholder="Search company..."
                  />
                )}
              </form.AppField>
              <form.AppField name="contactId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchContactsQuery,
                        { search: query || "" }
                      );
                      return data?.crm?.contacts || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Contact"
                    description="The primary contact for this opportunity."
                    placeholder="Search contact..."
                  />
                )}
              </form.AppField>
              <form.AppField name="campaignId">
                {(field) => (
                  <field.AsyncSelectField<{ label: string; value: string }>
                    fetcher={async (query) => {
                      const { data } = await execute(
                        "/api/graphql",
                        SearchCampaignsQuery,
                        { search: query || "" }
                      );
                      return data?.crm?.campaigns || [];
                    }}
                    renderOption={(option) => option.label}
                    getOptionValue={(option) => option.value}
                    getDisplayValue={(option) => option.label}
                    label="Campaign"
                    description="The campaign that led to this opportunity."
                    placeholder="Search campaign..."
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

export const NewOpportunityDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/crm/opportunities" });
  const searchQuery = useSearch({ from: "/dashboard/crm/opportunities" });

  const form = useAppForm({
    ...createOpportunityFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateOpportunityMutation,
        { opportunity: value }
      );

      if (data) {
        toast.success("Successfully created opportunity");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({ search: (prev) => ({ ...prev, new: undefined }) });
    },
  });

  return (
    <Dialog
      open={searchQuery.new}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, new: undefined }) })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateOpportunityForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Create
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export const UpdateOpportunityDialogForm = ({
  data,
}: {
  data: Opportunity[];
}) => {
  const navigate = useNavigate({ from: "/dashboard/crm/opportunities" });
  const searchQuery = useSearch({ from: "/dashboard/crm/opportunities" });

  const opportunity = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateOpportunityFormOption,
    defaultValues: opportunity,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateOpportunityMutation,
        { id: opportunity.id, opportunity: value }
      );

      if (data) {
        toast.success("Successfully updated opportunity");
      }

      if (errors) {
        toast.error("Operation Error");
        console.error(errors);
      }
      navigate({
        search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
      });
    },
  });

  return (
    <Dialog
      open={searchQuery.edit && !!searchQuery.id}
      onOpenChange={() =>
        navigate({
          search: (prev) => ({ ...prev, edit: undefined, id: undefined }),
        })
      }
    >
      <DialogContent className="!max-h-3/4 overflow-y-auto">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <UpdateOpportunityForm form={form} />
            <form.Subscribe>
              {(el) => (
                <Button type="submit" disabled={el.isSubmitting}>
                  Update
                </Button>
              )}
            </form.Subscribe>
          </form.AppForm>
        </form>
      </DialogContent>
    </Dialog>
  );
};
