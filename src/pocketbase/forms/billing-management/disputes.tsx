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
  UsersResponse,
  BillingManagementInvoiceLineItemsResponse,
  BillingManagementDisputesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { BillingManagementDisputesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementDisputesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.BillingManagementDisputes>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementDisputes)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Disputes created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: BillingManagementDisputesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.BillingManagementDisputes>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementDisputes)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Disputes updated successfully",
        })
        .unwrap();
    },
  });

export const DisputesForm = withForm({
  defaultValues: {} as Create<Collections.BillingManagementDisputes> | Update<Collections.BillingManagementDisputes>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Client */}
          <FieldGroup>
            <FieldLegend>Client</FieldLegend>
            <FieldDescription>
              Manage client information
            </FieldDescription>

            <form.AppField name="client">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="client"
                  label="Client"
                  description="Client raising the dispute"
                  displayField="username"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Reference */}
          <FieldGroup>
            <FieldLegend>Reference</FieldLegend>
            <FieldDescription>
              Manage reference information
            </FieldDescription>

            <form.AppField name="lineItem">
              {(field) => (
                <field.RelationField<BillingManagementInvoiceLineItemsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.BillingManagementInvoiceLineItems}
                  relationshipName="lineItem"
                  label="Line Item"
                  description="Disputed invoice line item"
                  displayField="id"
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
                  description="Current status of dispute"
                  options={[
                    { label: "Open", value: "open" },
                    { label: "Under-review", value: "under-review" },
                    { label: "Approved", value: "approved" },
                    { label: "Denied", value: "denied" },
                    { label: "Escalated", value: "escalated" },
                    { label: "Closed", value: "closed" }
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

            <form.AppField name="reason">
              {(field) => (
                <field.TextareaField
                  label="Reason"
                  description="Reason for dispute"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Amount */}
          <FieldGroup>
            <FieldLegend>Amount</FieldLegend>
            <FieldDescription>
              Manage amount information
            </FieldDescription>

            <form.AppField name="disputeAmount">
              {(field) => (
                <field.NumberField
                  label="Dispute Amount"
                  description="Amount in dispute"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Tracking */}
          <FieldGroup>
            <FieldLegend>Tracking</FieldLegend>
            <FieldDescription>
              Manage tracking information
            </FieldDescription>

            <form.AppField name="submittedAt">
              {(field) => (
                <field.DateTimeField
                  label="Submitted At"
                  description="Date dispute was submitted"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="resolvedAt">
              {(field) => (
                <field.DateTimeField
                  label="Resolved At"
                  description="Date dispute was resolved"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Resolution */}
          <FieldGroup>
            <FieldLegend>Resolution</FieldLegend>
            <FieldDescription>
              Manage resolution information
            </FieldDescription>

            <form.AppField name="resolvedBy">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Users}
                  relationshipName="resolvedBy"
                  label="Resolved By"
                  description="User who resolved the dispute"
                  displayField="username"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
            <form.AppField name="resolutionNotes">
              {(field) => (
                <field.TextareaField
                  label="Resolution Notes"
                  description="Notes on resolution"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Evidence */}
          <FieldGroup>
            <FieldLegend>Evidence</FieldLegend>
            <FieldDescription>
              Manage evidence information
            </FieldDescription>

            <form.AppField name="attachments">
              {(field) => (
                <field.TextField
                  label="Attachments"
                  description="Supporting documents"
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
        <DisputesForm form={form as any} />
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
    queryKey: ["disputes", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.BillingManagementDisputes)
        .getOne<BillingManagementDisputesRecord>(searchQuery.id!),
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
        <DisputesForm form={form as any} />
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
