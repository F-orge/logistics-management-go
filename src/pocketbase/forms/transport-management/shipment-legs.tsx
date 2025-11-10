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
  WarehouseManagementPackagesResponse,
  TransportManagementCarriersResponse,
  TransportManagementTripsResponse,
  TransportManagementShipmentLegsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { TransportManagementShipmentLegsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementShipmentLegsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.TransportManagementShipmentLegs>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementShipmentLegs)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `ShipmentLegs created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: TransportManagementShipmentLegsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.TransportManagementShipmentLegs>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementShipmentLegs)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "ShipmentLegs updated successfully",
        })
        .unwrap();
    },
  });

export const ShipmentLegsForm = withForm({
  defaultValues: {} as Create<Collections.TransportManagementShipmentLegs> | Update<Collections.TransportManagementShipmentLegs>,
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

            <form.AppField name="shipment">
              {(field) => (
                <field.RelationField<WarehouseManagementPackagesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.WarehouseManagementPackages}
                  relationshipName="shipment"
                  label="Shipment"
                  description="Parent shipment"
                  displayField="packageNumber"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Carrier */}
          <FieldGroup>
            <FieldLegend>Carrier</FieldLegend>
            <FieldDescription>
              Manage carrier information
            </FieldDescription>

            <form.AppField name="carrier">
              {(field) => (
                <field.RelationField<TransportManagementCarriersResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementCarriers}
                  relationshipName="carrier"
                  label="Carrier"
                  description="Carrier for this leg"
                  displayField="name"
                  recordListOption={{  }}
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Route */}
          <FieldGroup>
            <FieldLegend>Route</FieldLegend>
            <FieldDescription>
              Manage route information
            </FieldDescription>

            <form.AppField name="startLocation">
              {(field) => (
                <field.TextField
                  label="Start Location"
                  description="Start location coordinates"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="endLocation">
              {(field) => (
                <field.TextField
                  label="End Location"
                  description="End location coordinates"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Sequence */}
          <FieldGroup>
            <FieldLegend>Sequence</FieldLegend>
            <FieldDescription>
              Manage sequence information
            </FieldDescription>

            <form.AppField name="legSequence">
              {(field) => (
                <field.NumberField
                  label="Leg Sequence"
                  description="Sequence number in shipment"
                  placeholder="0"
                  min={0}
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
                  description="Current status"
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "In-transit", value: "in-transit" },
                    { label: "Delivered", value: "delivered" },
                    { label: "Cancelled", value: "cancelled" },
                    { label: "Failed", value: "failed" }
                  ]}
                  placeholder="Select..."
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Trip */}
          <FieldGroup>
            <FieldLegend>Trip</FieldLegend>
            <FieldDescription>
              Manage trip information
            </FieldDescription>

            <form.AppField name="internalTrip">
              {(field) => (
                <field.RelationField<TransportManagementTripsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementTrips}
                  relationshipName="internalTrip"
                  label="Internal Trip"
                  description="Associated internal trip"
                  displayField="id"
                  recordListOption={{  }}
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
        <ShipmentLegsForm form={form as any} />
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
    queryKey: ["shipmentlegs", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.TransportManagementShipmentLegs)
        .getOne<TransportManagementShipmentLegsRecord>(searchQuery.id!),
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
        <ShipmentLegsForm form={form as any} />
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
