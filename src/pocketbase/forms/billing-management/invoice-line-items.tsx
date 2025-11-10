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
  BillingManagementInvoicesResponse,
  BillingManagementInvoiceLineItemsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { BillingManagementInvoiceLineItemsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = BillingManagementInvoiceLineItemsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.BillingManagementInvoiceLineItems>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementInvoiceLineItems)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `InvoiceLineItems created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: BillingManagementInvoiceLineItemsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.BillingManagementInvoiceLineItems>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.BillingManagementInvoiceLineItems)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "InvoiceLineItems updated successfully",
        })
        .unwrap();
    },
  });

export const InvoiceLineItemsForm = withForm({
  defaultValues: {} as Create<Collections.BillingManagementInvoiceLineItems> | Update<Collections.BillingManagementInvoiceLineItems>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Reference */}
          <FieldGroup>
            <FieldLegend>Reference</FieldLegend>
            <FieldDescription>
              Manage reference information
            </FieldDescription>

            <form.AppField name="invoice">
              {(field) => (
                <field.RelationField<BillingManagementInvoicesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.BillingManagementInvoices}
                  relationshipName="invoice"
                  label="Invoice"
                  description="Parent invoice"
                  displayField="invoiceNumber"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Item */}
          <FieldGroup>
            <FieldLegend>Item</FieldLegend>
            <FieldDescription>
              Manage item information
            </FieldDescription>

            <form.AppField name="description">
              {(field) => (
                <field.TextareaField
                  label="Description"
                  description="Item description"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Quantity */}
          <FieldGroup>
            <FieldLegend>Quantity</FieldLegend>
            <FieldDescription>
              Manage quantity information
            </FieldDescription>

            <form.AppField name="quantity">
              {(field) => (
                <field.NumberField
                  label="Quantity"
                  description="Quantity of item"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Pricing */}
          <FieldGroup>
            <FieldLegend>Pricing</FieldLegend>
            <FieldDescription>
              Manage pricing information
            </FieldDescription>

            <form.AppField name="unitPrice">
              {(field) => (
                <field.NumberField
                  label="Unit Price"
                  description="Price per unit"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Discount */}
          <FieldGroup>
            <FieldLegend>Discount</FieldLegend>
            <FieldDescription>
              Manage discount information
            </FieldDescription>

            <form.AppField name="discountRate">
              {(field) => (
                <field.NumberField
                  label="Discount Rate"
                  description="Discount percentage"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="discountAmount">
              {(field) => (
                <field.NumberField
                  label="Discount Amount"
                  description="Discount amount"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Tax */}
          <FieldGroup>
            <FieldLegend>Tax</FieldLegend>
            <FieldDescription>
              Manage tax information
            </FieldDescription>

            <form.AppField name="taxRate">
              {(field) => (
                <field.NumberField
                  label="Tax Rate"
                  description="Tax percentage"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="taxAmount">
              {(field) => (
                <field.NumberField
                  label="Tax Amount"
                  description="Tax amount"
                  placeholder="0"
                  min={0}
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
        <InvoiceLineItemsForm form={form as any} />
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
    queryKey: ["invoicelineitems", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.BillingManagementInvoiceLineItems)
        .getOne<BillingManagementInvoiceLineItemsRecord>(searchQuery.id!),
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
        <InvoiceLineItemsForm form={form as any} />
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
