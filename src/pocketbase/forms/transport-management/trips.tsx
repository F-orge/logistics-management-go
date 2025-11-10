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
  TransportManagementDriversResponse,
  TransportManagementVehiclesResponse,
  TransportManagementTripsRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { TransportManagementTripsSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = TransportManagementTripsSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.TransportManagementTrips>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementTrips)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Trips created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: TransportManagementTripsRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.TransportManagementTrips>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.TransportManagementTrips)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Trips updated successfully",
        })
        .unwrap();
    },
  });

export const TripsForm = withForm({
  defaultValues: {} as Create<Collections.TransportManagementTrips> | Update<Collections.TransportManagementTrips>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Assignment */}
          <FieldGroup>
            <FieldLegend>Assignment</FieldLegend>
            <FieldDescription>
              Manage assignment information
            </FieldDescription>

            <form.AppField name="driver">
              {(field) => (
                <field.RelationField<TransportManagementDriversResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Collections.TransportManagementDrivers}
                  relationshipName="driver"
                  label="Driver"
                  description="Driver assigned to this trip"
                  displayField="licenseNumber"
                  recordListOption={{  }}
                  required
                />
              )}
            </form.AppField>
            <form.AppField name="vehicle">
              {(field) => (
                <field.RelationField<TransportManagementVehiclesResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.Collections.TransportManagementVehicles}
                  relationshipName="vehicle"
                  label="Vehicle"
                  description="Vehicle assigned to this trip"
                  displayField="registrationNumber"
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
                  description="Current status of the trip"
                  options={[
                    { label: "Planned", value: "planned" },
                    { label: "In-progress", value: "in-progress" },
                    { label: "Completed", value: "completed" },
                    { label: "Cancelled", value: "cancelled" }
                  ]}
                  placeholder="Select..."
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
        <TripsForm form={form as any} />
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
    queryKey: ["trips", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.TransportManagementTrips)
        .getOne<TransportManagementTripsRecord>(searchQuery.id!),
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
        <TripsForm form={form as any} />
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
