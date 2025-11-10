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
  DeliveryManagementDriverLocationRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { DeliveryManagementDriverLocationSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = DeliveryManagementDriverLocationSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.DeliveryManagementDriverLocation>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.DeliveryManagementDriverLocation)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `DriverLocation created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: DeliveryManagementDriverLocationRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.DeliveryManagementDriverLocation>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.DeliveryManagementDriverLocation)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "DriverLocation updated successfully",
        })
        .unwrap();
    },
  });

export const DriverLocationForm = withForm({
  defaultValues: {} as Create<Collections.DeliveryManagementDriverLocation> | Update<Collections.DeliveryManagementDriverLocation>,
  render: ({ form }) => {
    const { pocketbase } = useRouteContext({
      from: "/dashboard/$schema/$collection",
    });

    return (
      <form.AppForm>
        <FieldSet>
          {/* Driver */}
          <FieldGroup>
            <FieldLegend>Driver</FieldLegend>
            <FieldDescription>
              Manage driver information
            </FieldDescription>

            <form.AppField name="driver">
              {(field) => (
                <field.RelationField<TransportManagementDriversResponse>
                  pocketbase={pocketbase}
                  collectionName={Collections.TransportManagementDrivers}
                  relationshipName="driver"
                  label="Driver"
                  description="Associated driver"
                  displayField="licenseNumber"
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

            <form.AppField name="coordinates">
              {(field) => (
                <field.TextField
                  label="Coordinates"
                  description="GPS coordinates (latitude, longitude)"
                  placeholder=""
                  required
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Movement */}
          <FieldGroup>
            <FieldLegend>Movement</FieldLegend>
            <FieldDescription>
              Manage movement information
            </FieldDescription>

            <form.AppField name="heading">
              {(field) => (
                <field.TextField
                  label="Heading"
                  description="Direction heading"
                  placeholder=""
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
                  description="When location was recorded"
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
        <DriverLocationForm form={form as any} />
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
    queryKey: ["driverlocation", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.DeliveryManagementDriverLocation)
        .getOne<DeliveryManagementDriverLocationRecord>(searchQuery.id!),
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
        <DriverLocationForm form={form as any} />
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
