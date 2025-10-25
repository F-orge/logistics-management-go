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
  CreateCaseInputSchema,
  UpdateCaseInputSchema,
  CaseType,
  CasePriority,
  CaseStatus,
  SearchContactsQuery,
  execute,
  CreateCaseMutation,
  UpdateCaseMutation,
} from "@packages/graphql/client";
import z from "zod";
import { toast } from "sonner";
import { Case } from "@/components/tables/crm/cases";
import { Row } from "@tanstack/react-table";
import { useNavigate, useSearch } from "@tanstack/react-router";

export const createCaseSchema = CreateCaseInputSchema();
export const updateCaseSchema = UpdateCaseInputSchema();

// Case Type Options
const CASE_TYPE_OPTIONS = [
  { label: "Question", value: CaseType.Question },
  { label: "Problem", value: CaseType.Problem },
  { label: "Complaint", value: CaseType.Complaint },
  { label: "Feature Request", value: CaseType.FeatureRequest },
  { label: "Bug Report", value: CaseType.BugReport },
  { label: "Technical Support", value: CaseType.TechnicalSupport },
];

// Case Priority Options
const CASE_PRIORITY_OPTIONS = [
  { label: "Low", value: CasePriority.Low },
  { label: "Medium", value: CasePriority.Medium },
  { label: "High", value: CasePriority.High },
  { label: "Critical", value: CasePriority.Critical },
];

// Case Status Options
const CASE_STATUS_OPTIONS = [
  { label: "New", value: CaseStatus.New },
  { label: "In Progress", value: CaseStatus.InProgress },
  { label: "Waiting for Customer", value: CaseStatus.WaitingForCustomer },
  { label: "Waiting for Internal", value: CaseStatus.WaitingForInternal },
  { label: "Escalated", value: CaseStatus.Escalated },
  { label: "Resolved", value: CaseStatus.Resolved },
  { label: "Closed", value: CaseStatus.Closed },
  { label: "Cancelled", value: CaseStatus.Cancelled },
];

export const createCaseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof createCaseSchema>,
});

export const updateCaseFormOption = formOptions({
  defaultValues: {} as z.infer<typeof updateCaseSchema>,
});

export const CreateCaseForm = withForm({
  ...createCaseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Create Case</FieldLegend>
        <FieldDescription>
          Fill in the details for the new case.
        </FieldDescription>
        <FieldGroup>
          {/* Case Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Case Details</FieldLegend>
            <FieldDescription>
              Basic case information and classification.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="caseNumber">
                {(field) => (
                  <field.InputField
                    label="Case Number"
                    description="Unique identifier for this case."
                    placeholder="e.g., CASE-001"
                  />
                )}
              </form.AppField>
              <form.AppField name="type">
                {(field) => (
                  <field.SelectField
                    label="Type *"
                    description="Category or type of the case."
                    options={CASE_TYPE_OPTIONS}
                    placeholder="Select case type"
                  />
                )}
              </form.AppField>
              <form.AppField name="priority">
                {(field) => (
                  <field.SelectField
                    label="Priority *"
                    description="Urgency level of the case."
                    options={CASE_PRIORITY_OPTIONS}
                    placeholder="Select priority"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.SelectField
                    label="Status *"
                    description="Current status of the case."
                    options={CASE_STATUS_OPTIONS}
                    placeholder="Select status"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.TextAreaField
                    label="Description"
                    description="Detailed information about the case."
                    placeholder="Describe the case..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Assignment Section */}
          <FieldSet>
            <FieldLegend variant="label">Assignment</FieldLegend>
            <FieldDescription>
              Link this case to contacts and assign ownership.
            </FieldDescription>
            <FieldGroup>
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
                    description="The contact associated with this case."
                    placeholder="Search contact..."
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Case Owner"
                    description="The person responsible for resolving this case."
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

export const UpdateCaseForm = withForm({
  ...updateCaseFormOption,
  render: ({ form }) => {
    return (
      <FieldSet>
        <FieldLegend>Update Case</FieldLegend>
        <FieldDescription>Update the details for the case.</FieldDescription>
        <FieldGroup>
          {/* Case Details Section */}
          <FieldSet>
            <FieldLegend variant="label">Case Details</FieldLegend>
            <FieldDescription>
              Basic case information and classification.
            </FieldDescription>
            <FieldGroup>
              <form.AppField name="caseNumber">
                {(field) => (
                  <field.InputField
                    label="Case Number"
                    description="Unique identifier for this case."
                    placeholder="e.g., CASE-001"
                  />
                )}
              </form.AppField>
              <form.AppField name="type">
                {(field) => (
                  <field.SelectField
                    label="Type"
                    description="Category or type of the case."
                    options={CASE_TYPE_OPTIONS}
                    placeholder="Select case type"
                  />
                )}
              </form.AppField>
              <form.AppField name="priority">
                {(field) => (
                  <field.SelectField
                    label="Priority"
                    description="Urgency level of the case."
                    options={CASE_PRIORITY_OPTIONS}
                    placeholder="Select priority"
                  />
                )}
              </form.AppField>
              <form.AppField name="status">
                {(field) => (
                  <field.SelectField
                    label="Status"
                    description="Current status of the case."
                    options={CASE_STATUS_OPTIONS}
                    placeholder="Select status"
                  />
                )}
              </form.AppField>
              <form.AppField name="description">
                {(field) => (
                  <field.TextAreaField
                    label="Description"
                    description="Detailed information about the case."
                    placeholder="Describe the case..."
                  />
                )}
              </form.AppField>
            </FieldGroup>
          </FieldSet>

          {/* Assignment Section */}
          <FieldSet>
            <FieldLegend variant="label">Assignment</FieldLegend>
            <FieldDescription>
              Link this case to contacts and assign ownership.
            </FieldDescription>
            <FieldGroup>
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
                    description="The contact associated with this case."
                    placeholder="Search contact..."
                  />
                )}
              </form.AppField>
              <form.AppField name="ownerId">
                {(field) => (
                  <field.InputField
                    label="Case Owner"
                    description="The person responsible for resolving this case."
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

export const NewCaseDialogForm = () => {
  const navigate = useNavigate({ from: "/dashboard/crm/cases" });
  const searchQuery = useSearch({ from: "/dashboard/crm/cases" });

  const form = useAppForm({
    ...createCaseFormOption,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        CreateCaseMutation,
        { case: value }
      );

      if (data) {
        toast.success("Successfully created case");
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
      <DialogContent>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <form.AppForm>
            <CreateCaseForm form={form} />
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

export const UpdateCaseDialogForm = ({ data }: { data: Case[] }) => {
  const navigate = useNavigate({ from: "/dashboard/crm/cases" });
  const searchQuery = useSearch({ from: "/dashboard/crm/cases" });

  const caseItem = data.find((value) => value.id === searchQuery.id)!;

  const form = useAppForm({
    ...updateCaseFormOption,
    defaultValues: caseItem,
    onSubmit: async ({ value }) => {
      const { data, errors } = await execute(
        "/api/graphql",
        UpdateCaseMutation,
        { id: caseItem.id, case: value }
      );

      if (data) {
        toast.success("Successfully updated case");
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
            <UpdateCaseForm form={form} />
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
