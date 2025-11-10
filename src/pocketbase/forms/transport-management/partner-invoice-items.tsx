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
  TransportManagementPartnerInvoiceResponse,
  TransportManagementShipmentLegsResponse,
  TransportManagementPartnerInvoiceItemsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { TransportManagementPartnerInvoiceItemsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementPartnerInvoiceItemsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.TransportManagementPartnerInvoiceItems>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementPartnerInvoiceItems)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `PartnerInvoiceItems created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: TransportManagementPartnerInvoiceItemsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.TransportManagementPartnerInvoiceItems>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementPartnerInvoiceItems)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "PartnerInvoiceItems updated successfully",
        })
        .unwrap();
    },
  });

export const PartnerInvoiceItemsForm = withForm({
  defaultValues: {} as Create<Collections.TransportManagementPartnerInvoiceItems> | Update<Collections.TransportManagementPartnerInvoiceItems>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Invoice */}
          <FieldGroup>
            <FieldLegend>Invoice</FieldLegend>
            <FieldDescription>
              Manage invoice information
            </FieldDescription>

            <form.AppField name="partnerInvoice">
              {(field) => (
                <field.RelationField<TransportManagementPartnerInvoiceResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementPartnerInvoice}
                  relationshipName="partnerInvoice"
                  label="Partner Invoice"
                  description="Parent partner invoice"
                  displayField="invoiceNumber"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Shipment */}
          <FieldGroup>
            <FieldLegend>Shipment</FieldLegend>
            <FieldDescription>
              Manage shipment information
            </FieldDescription>

            <form.AppField name="shipmentLeg">
              {(field) => (
                <field.RelationField<TransportManagementShipmentLegsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementShipmentLegs}
                  relationshipName="shipmentLeg"
                  label="Shipment Leg"
                  description="Associated shipment leg"
                  displayField="id"
                  recordListOption={{  }}
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

            <form.AppField name="amount">
              {(field) => (
                <field.NumberField
                  label="Amount"
                  description="Line item amount"
                  placeholder="0"
                  min={0}
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
        <PartnerInvoiceItemsForm form={form as any} />
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
    queryKey: ["partnerinvoiceitems", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.TransportManagementPartnerInvoiceItems)
        .getOne<TransportManagementPartnerInvoiceItemsRecord>(searchQuery.id!),
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
        <PartnerInvoiceItemsForm form={form as any} />
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
