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
  CustomerRelationsOpportunitiesResponse,
  UsersResponse,
  CustomerRelationsInvoicesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { CustomerRelationsInvoicesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = CustomerRelationsInvoicesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.CustomerRelationsInvoices>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.CustomerRelationsInvoices)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Invoices created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: CustomerRelationsInvoicesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.CustomerRelationsInvoices>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.CustomerRelationsInvoices)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Invoices updated successfully",
        })
        .unwrap();
    },
  });

export const InvoicesForm = withForm({
  defaultValues: {} as Create<Collections.CustomerRelationsInvoices> | Update<Collections.CustomerRelationsInvoices>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Basic Information */}
          <FieldGroup>
            <FieldLegend>Basic Information</FieldLegend>
            <FieldDescription>
              Manage basic information information
            </FieldDescription>

            <form.AppField name="invoiceNumber">
              {(field) => (
                <field.TextField
                  label="Invoice Number"
                  description="Unique invoice number"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Related Records */}
          <FieldGroup>
            <FieldLegend>Related Records</FieldLegend>
            <FieldDescription>
              Manage related records information
            </FieldDescription>

            <form.AppField name="opportunity">
              {(field) => (
                <field.RelationField<CustomerRelationsOpportunitiesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Collections.CustomerRelationsOpportunities}
                  relationshipName="opportunity"
                  label="Opportunity"
                  description="Associated opportunity if applicable"
                  displayField="name"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Dates */}
          <FieldGroup>
            <FieldLegend>Dates</FieldLegend>
            <FieldDescription>
              Manage dates information
            </FieldDescription>

            <form.AppField name="issueDate">
              {(field) => (
                <field.DateTimeField
                  label="Issue Date"
                  description="Invoice issuance date"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="dueDate">
              {(field) => (
                <field.DateTimeField
                  label="Due Date"
                  description="Payment due date"
                  placeholder=""
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
                  description="Payment status"
                  options={[
                    { label: "Draft", value: "draft" },
                    { label: "Sent", value: "sent" },
                    { label: "Viewed", value: "viewed" },
                    { label: "Paid", value: "paid" },
                    { label: "Partial-paid", value: "partial-paid" },
                    { label: "Past-due", value: "past-due" },
                    { label: "Disputed", value: "disputed" },
                    { label: "Cancelled", value: "cancelled" },
                    { label: "Void", value: "void" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Amounts */}
          <FieldGroup>
            <FieldLegend>Amounts</FieldLegend>
            <FieldDescription>
              Manage amounts information
            </FieldDescription>

            <form.AppField name="subtotal">
              {(field) => (
                <field.NumberField
                  label="Subtotal"
                  description="Subtotal before discounts and taxes"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="totalAmount">
              {(field) => (
                <field.NumberField
                  label="Total Amount"
                  description="Total invoice amount"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Discounts */}
          <FieldGroup>
            <FieldLegend>Discounts</FieldLegend>
            <FieldDescription>
              Manage discounts information
            </FieldDescription>

            <form.AppField name="discountAmount">
              {(field) => (
                <field.NumberField
                  label="Discount Amount"
                  description="Total discount amount"
                  placeholder="0"
                  min={0}
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

            <form.AppField name="notes">
              {(field) => (
                <field.TextareaField
                  label="Notes"
                  description="Additional notes or terms"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Ownership */}
          <FieldGroup>
            <FieldLegend>Ownership</FieldLegend>
            <FieldDescription>
              Manage ownership information
            </FieldDescription>

            <form.AppField name="createdBy">
              {(field) => (
                <field.RelationField<UsersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Collections.Users}
                  relationshipName="createdBy"
                  label="Created By"
                  description="User who created this invoice"
                  displayField="name"
                  recordListOption={{  }}
                  required
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
        <InvoicesForm form={form as any} />
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
    queryKey: ["invoices", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.CustomerRelationsInvoices)
        .getOne<CustomerRelationsInvoicesRecord>(searchQuery.id!),
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
        <InvoicesForm form={form as any} />
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
