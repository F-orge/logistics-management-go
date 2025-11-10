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
  WarehouseManagementWarehousesRecord,
  TypedPocketBase,
  Update,
} from "@/lib/pb.types";
import { WarehouseManagementWarehousesSchema } from "@/pocketbase/pb-schemas";

export const MutationSchema = WarehouseManagementWarehousesSchema.omit({
  id: true,
  created: true,
  updated: true,
}).extend({ attachments: z.file().array() });

export const CreateFormOptionFactory = (pocketbase: TypedPocketBase) =>
  formOptions({
    defaultValues: {} as Create<Collections.WarehouseManagementWarehouses>,
    validators: {
      onSubmit: MutationSchema,
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementWarehouses)
        .create(value);

      await toast
        .promise(resultPromise, {
          success: `Warehouses created successfully`,
        })
        .unwrap();
    },
  });

export const UpdateFormOptionFactory = (
  pocketbase: TypedPocketBase,
  record: WarehouseManagementWarehousesRecord
) =>
  formOptions({
    defaultValues: record as Update<Collections.WarehouseManagementWarehouses>,
    validators: {
      onSubmit: MutationSchema.partial(),
    },
    onSubmit: async ({ value }) => {
      const resultPromise = pocketbase
        .collection(Collections.WarehouseManagementWarehouses)
        .update(record.id, value);

      await toast
        .promise(resultPromise, {
          success: "Warehouses updated successfully",
        })
        .unwrap();
    },
  });

export const WarehousesForm = withForm({
  defaultValues: {} as Create<Collections.WarehouseManagementWarehouses> | Update<Collections.WarehouseManagementWarehouses>,
  render: ({ form }) => {
return (
      <form.AppForm>
        <FieldSet>
          {/* Basic Information */}
          <FieldGroup>
            <FieldLegend>Basic Information</FieldLegend>
            <FieldDescription>
              Manage basic information information
            </FieldDescription>

            <form.AppField name="name">
              {(field) => (
                <field.TextField
                  label="Name"
                  description="Warehouse name or identifier"
                  placeholder=""
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

            <form.AppField name="address">
              {(field) => (
                <field.TextField
                  label="Address"
                  description="Street address of the warehouse"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="city">
              {(field) => (
                <field.TextField
                  label="City"
                  description="City where warehouse is located"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="state">
              {(field) => (
                <field.TextField
                  label="State"
                  description="State or province"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="country">
              {(field) => (
                <field.TextField
                  label="Country"
                  description="Country"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="postalCode">
              {(field) => (
                <field.TextField
                  label="Postal Code"
                  description="Postal or zip code"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Operations */}
          <FieldGroup>
            <FieldLegend>Operations</FieldLegend>
            <FieldDescription>
              Manage operations information
            </FieldDescription>

            <form.AppField name="timezone">
              {(field) => (
                <field.TextField
                  label="Timezone"
                  description="Warehouse timezone for scheduling"
                  placeholder=""
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

            <form.AppField name="contactPerson">
              {(field) => (
                <field.TextField
                  label="Contact Person"
                  description="Primary contact person"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="contactPhone">
              {(field) => (
                <field.TextField
                  label="Contact Phone"
                  description="Contact phone number"
                  placeholder=""
                />
              )}
            </form.AppField>
            <form.AppField name="contactEmail">
              {(field) => (
                <field.EmailField
                  label="Contact Email"
                  description="Contact email address"
                  placeholder="example@email.com"
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

            <form.AppField name="isActive">
              {(field) => (
                <field.TextField
                  label="Is Active"
                  description="Whether this warehouse is currently active"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Geolocation */}
          <FieldGroup>
            <FieldLegend>Geolocation</FieldLegend>
            <FieldDescription>
              Manage geolocation information
            </FieldDescription>

            <form.AppField name="location">
              {(field) => (
                <field.TextField
                  label="Location"
                  description="Geographic coordinates (GeoPoint)"
                  placeholder=""
                />
              )}
            </form.AppField>
          </FieldGroup>

          <FieldSeparator>{" "}</FieldSeparator>

          {/* Media */}
          <FieldGroup>
            <FieldLegend>Media</FieldLegend>
            <FieldDescription>
              Manage media information
            </FieldDescription>

            <form.AppField name="images">
              {(field) => (
                <field.TextField
                  label="Images"
                  description="Warehouse photos or images"
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
        <WarehousesForm form={form as any} />
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
    queryKey: ["warehouses", searchQuery.id],
    queryFn: () =>
      pocketbase
        .collection(Collections.WarehouseManagementWarehouses)
        .getOne<WarehouseManagementWarehousesRecord>(searchQuery.id!),
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
        <WarehousesForm form={form as any} />
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
