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
  TransportManagementShipmentLegsResponse,
  TransportManagementShipmentLegEventsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { TransportManagementShipmentLegEventsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementShipmentLegEventsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.TransportManagementShipmentLegEvents>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementShipmentLegEvents)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `ShipmentLegEvents created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: TransportManagementShipmentLegEventsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.TransportManagementShipmentLegEvents>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementShipmentLegEvents)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "ShipmentLegEvents updated successfully",
        })
        .unwrap();
    },
  });

export const ShipmentLegEventsForm = withForm({
  defaultValues: {} as Create<Collections.TransportManagementShipmentLegEvents> | Update<Collections.TransportManagementShipmentLegEvents>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Shipment */}
          <FieldGroup>
            <FieldLegend>Shipment</FieldLegend>
            <FieldDescription>
              Manage shipment information
            </FieldDescription>

            <form.AppField name="shipmentLegId">
              {(field) => (
                <field.RelationField<TransportManagementShipmentLegsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementShipmentLegs}
                  relationshipName="shipmentLegId"
                  label="Shipment Leg Id"
                  description="Associated shipment leg"
                  displayField="id"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Location */}
          <FieldGroup>
            <FieldLegend>Location</FieldLegend>
            <FieldDescription>
              Manage location information
            </FieldDescription>

            <form.AppField name="location">
              {(field) => (
                <field.TextField
                  label="Location"
                  description="Event location coordinates"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Message */}
          <FieldGroup>
            <FieldLegend>Message</FieldLegend>
            <FieldDescription>
              Manage message information
            </FieldDescription>

            <form.AppField name="message">
              {(field) => (
                <field.TextField
                  label="Message"
                  description="Event message or status"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Timing */}
          <FieldGroup>
            <FieldLegend>Timing</FieldLegend>
            <FieldDescription>
              Manage timing information
            </FieldDescription>

            <form.AppField name="timestamp">
              {(field) => (
                <field.DateTimeField
                  label="Timestamp"
                  description="When event occurred"
                  placeholder=""
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
        <ShipmentLegEventsForm form={form as any} />
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
    queryKey: ["shipmentlegevents", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.TransportManagementShipmentLegEvents)
        .getOne<TransportManagementShipmentLegEventsRecord>(searchQuery.id!),
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
        <ShipmentLegEventsForm form={form as any} />
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
