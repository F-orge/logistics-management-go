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
  CreateLeadInputSchema,
  UpdateLeadInputSchema,
  LeadSource,
  LeadStatus,
  SearchCampaignsQuery,
  execute,
  CreateLeadMutation,
  UpdateLeadMutation,
} from "@packages/graphql/client";
import z from "zod";
import { toast } from "sonner";
import { Lead } from "@/components/tables/crm/leads";
import { Row } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const createLeadSchema = CreateLeadInputSchema();
export const updateLeadSchema = UpdateLeadInputSchema();

// Lead Source Options
const LEAD_SOURCE_OPTIONS = [
  { label: "Website", value: LeadSource.Website },
  { label: "Referral", value: LeadSource.Referral },
  { label: "Social Media", value: LeadSource.SocialMedia },
  { label: "Email Campaign", value: LeadSource.EmailCampaign },
  { label: "Cold Call", value: LeadSource.ColdCall },
  { label: "Event", value: LeadSource.Event },
  { label: "Advertisement", value: LeadSource.Advertisment },
  { label: "Partner", value: LeadSource.Partner },
  { label: "Other", value: LeadSource.Other },
];

// Lead Status Options
const LEAD_STATUS_OPTIONS = [
  { label: "New", value: LeadStatus.New },
  { label: "Contacted", value: LeadStatus.Contacted },
  { label: "Qualified", value: LeadStatus.Qualified },
  { label: "Unqualified", value: LeadStatus.Unqualified },
  { label: "Converted", value: LeadStatus.Converted },
];

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
                  <field.SelectField
                    label="Lead Source"
                    description="How the lead was acquired."
                    options={LEAD_SOURCE_OPTIONS}
                    placeholder="Select lead source"
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
                  <field.SelectField
                    label="Status"
                    description="Current lead status."
                    options={LEAD_STATUS_OPTIONS}
                    placeholder="Select status"
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
                    description="Associated marketing campaign."
                    placeholder="Search campaign..."
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
                  <field.SelectField
                    label="Lead Source"
                    description="How the lead was acquired."
                    options={LEAD_SOURCE_OPTIONS}
                    placeholder="Select lead source"
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
                  <field.SelectField
                    label="Status"
                    description="Current lead status."
                    options={LEAD_STATUS_OPTIONS}
                    placeholder="Select status"
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
                    description="Associated marketing campaign."
                    placeholder="Search campaign..."
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

export const NewLeadDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/crm/leads" });
  const searchQuery = useSearch({ from: "/dashboard/crm/leads" });

  const form = useAppForm({
    ...createLeadFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateLeadMutation,
        { lead: value }
      );

      if (data) {
        toast.success("Successfully created lead");
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
            <CreateLeadForm form={form} />
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

export const UpdateLeadDialogForm = ({ data }: { data: Lead[] }) => {
  const navigate = useNavigate({ from: "/dashboard/crm/leads" });
  const searchQuery = useSearch({ from: "/dashboard/crm/leads" });

  const lead = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateLeadFormOption,
    defaultValues: lead,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateLeadMutation,
        { id: lead.id, lead: value }
      );

      if (data) {
        toast.success("Successfully updated lead");
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
            <UpdateLeadForm form={form} />
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
