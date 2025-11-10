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
  TransportManagementTripsResponse,
  TransportManagementTripStopsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { TransportManagementTripStopsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementTripStopsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.TransportManagementTripStops>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementTripStops)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `TripStops created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: TransportManagementTripStopsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.TransportManagementTripStops>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementTripStops)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "TripStops updated successfully",
        })
        .unwrap();
    },
  });

export const TripStopsForm = withForm({
  defaultValues: {} as Create<Collections.TransportManagementTripStops> | Update<Collections.TransportManagementTripStops>,
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

            <form.AppField name="trip">
              {(field) => (
                <field.RelationField<TransportManagementTripsResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementTrips}
                  relationshipName="trip"
                  label="Trip"
                  description="Associated trip"
                  displayField="id"
                  recordListOption={{  }}
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

            <form.AppField name="stopNumber">
              {(field) => (
                <field.NumberField
                  label="Stop Number"
                  description="Sequence number in trip"
                  placeholder="0"
                  min={0}
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
                  description="Stop location name"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Coordinates */}
          <FieldGroup>
            <FieldLegend>Coordinates</FieldLegend>
            <FieldDescription>
              Manage coordinates information
            </FieldDescription>

            <form.AppField name="latitude">
              {(field) => (
                <field.NumberField
                  label="Latitude"
                  description="Latitude coordinate"
                  placeholder="0"
                  min={0}
                />
              )}
            </form.AppField>
            <form.AppField name="longitude">
              {(field) => (
                <field.NumberField
                  label="Longitude"
                  description="Longitude coordinate"
                  placeholder="0"
                  min={0}
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
                  description="Current stop status"
                  options={[
                    { label: "Pending", value: "pending" },
                    { label: "In-progress", value: "in-progress" },
                    { label: "Completed", value: "completed" },
                    { label: "Skipped", value: "skipped" },
                    { label: "Failed", value: "failed" }
                  ]}
                  placeholder="Select..."
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

            <form.AppField name="estimatedTime">
              {(field) => (
                <field.DateTimeField
                  label="Estimated Time"
                  description="Estimated arrival time"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="actualTime">
              {(field) => (
                <field.DateTimeField
                  label="Actual Time"
                  description="Actual arrival time"
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
        <TripStopsForm form={form as any} />
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
    queryKey: ["tripstops", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.TransportManagementTripStops)
        .getOne<TransportManagementTripStopsRecord>(searchQuery.id!),
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
        <TripStopsForm form={form as any} />
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
