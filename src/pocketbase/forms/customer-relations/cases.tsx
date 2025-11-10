import { formOptions } from "@tanstack/react-form";
import { useNavigate, useRouteContext, useSearch } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import z from "zod";
import {
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
} from "@/components/ui/field";
import { useAppForm, withForm } from "@/components/ui/forms";
import FormDialog from "@/components/ui/forms/utils/dialog";
import {
  Collections,
  Create,
  CustomerRelationsContactsResponse,
  UsersResponse,
  CustomerRelationsCasesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { CustomerRelationsCasesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsCasesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.CustomerRelationsCases>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.CustomerRelationsCases)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Cases created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: CustomerRelationsCasesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.CustomerRelationsCases>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.CustomerRelationsCases)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Cases updated successfully",
        })
        .unwrap();
    },
  });

export const CasesForm = withForm({
  defaultValues: {} as Create<Collections.CustomerRelationsCases> | Update<Collections.CustomerRelationsCases>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Identification */}
          <FieldGroup>
            <FieldLegend>Identification</FieldLegend>
            <FieldDescription>
              Manage identification information
            </FieldDescription>

            <form.AppField name="caseNumber">
              {(field) => (
                <field.TextField
                  label="Case Number"
                  description="Unique case number"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Contact */}
          <FieldGroup>
            <FieldLegend>Contact</FieldLegend>
            <FieldDescription>
              Manage contact information
            </FieldDescription>

            <form.AppField name="contact">
              {(field) => (
                <field.RelationField<CustomerRelationsContactsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.CustomerRelationsContacts}
                  relationshipName="contact"
                  label="Contact"
                  description="Associated contact"
                  displayField="name"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Assignment */}
          <FieldGroup>
            <FieldLegend>Assignment</FieldLegend>
            <FieldDescription>
              Manage assignment information
            </FieldDescription>

            <form.AppField name="owner">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="owner"
                  label="Owner"
                  description="Case owner/assignee"
                  displayField="username"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Status */}
          <FieldGroup>
            <FieldLegend>Status</FieldLegend>
            <FieldDescription>
              Manage status information
            </FieldDescription>

            <form.AppField name="status">
              {(field) => (
                <field.SelectField
                  label="Status"
                  description="Current case status"
                  options={[
                    { label: "New", value: "new" },
                    { label: "In-progress", value: "in-progress" },
                    { label: "Waiting-for-customer", value: "waiting-for-customer" },
                    { label: "Waiting-for-internal", value: "waiting-for-internal" },
                    { label: "Escalated", value: "escalated" },
                    { label: "Resolved", value: "resolved" },
                    { label: "Closed", value: "closed" },
                    { label: "Cancelled", value: "cancelled" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Classification */}
          <FieldGroup>
            <FieldLegend>Classification</FieldLegend>
            <FieldDescription>
              Manage classification information
            </FieldDescription>

            <form.AppField name="type">
              {(field) => (
                <field.SelectField
                  label="Type"
                  description="Type of case"
                  options={[
                    { label: "Question", value: "question" },
                    { label: "Problem", value: "problem" },
                    { label: "Complaint", value: "complaint" },
                    { label: "Feature-request", value: "feature-request" },
                    { label: "Bug-report", value: "bug-report" },
                    { label: "Technical-support", value: "technical-support" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Priority */}
          <FieldGroup>
            <FieldLegend>Priority</FieldLegend>
            <FieldDescription>
              Manage priority information
            </FieldDescription>

            <form.AppField name="priority">
              {(field) => (
                <field.SelectField
                  label="Priority"
                  description="Case priority level"
                  options={[
                    { label: "Critical", value: "critical" },
                    { label: "High", value: "high" },
                    { label: "Medium", value: "medium" },
                    { label: "Low", value: "low" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Details */}
          <FieldGroup>
            <FieldLegend>Details</FieldLegend>
            <FieldDescription>
              Manage details information
            </FieldDescription>

            <form.AppField name="description">
              {(field) => (
                <field.TextareaField
                  label="Description"
                  description="Case description and details"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>
        </FieldSet>
      </form.AppForm>
    );
  },
});

const CreateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const form = useAppForm(CreateFormOptionFactory(pocketbase));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <CasesForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

const UpdateForm = () => {
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  const { data: record } = useSuspenseQuery({
    queryKey: ["cases", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.CustomerRelationsCases)
        .getOne<CustomerRelationsCasesRecord>(searchQuery.id!),
  });

  const form = useAppForm(UpdateFormOptionFactory(pocketbase, record));

  return (
    <form.AppForm>
      <FormDialog
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        onClear={(e) => {
          e.preventDefault();
          form.reset();
        }}
      >
        <CasesForm form={form as any} />
      </FormDialog>
    </form.AppForm>
  );
};

export default () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });

  switch (searchQuery.action) {
    case "create":
      return <CreateForm />;
    case "update":
      return <UpdateForm />;
    default:
      return null;
  }
};
